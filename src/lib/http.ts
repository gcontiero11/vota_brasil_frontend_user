/**
 * Cliente HTTP centralizado.
 *
 * Enquanto o backend não está disponível, este módulo não é exercitado pelas
 * features — elas consomem `mocks.ts` via `api.ts`. A infraestrutura fica
 * pronta para ser plugada quando houver endpoints reais.
 */

export class HttpError extends Error {
  constructor(
    public readonly status: number,
    public readonly statusText: string,
    public readonly url: string,
    public readonly body: unknown,
  ) {
    super(`HTTP ${status} ${statusText} @ ${url}`);
    this.name = "HttpError";
  }
}

const DEFAULT_TIMEOUT_MS = 10_000;

function resolveBaseUrl(): string {
  const explicit = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (explicit) return explicit.replace(/\/+$/, "");

  const port = process.env.NEXT_PUBLIC_API_PORT?.trim();
  if (port) return `http://localhost:${port}`;

  return "";
}

const BASE_URL = resolveBaseUrl();

export interface HttpRequestOptions extends Omit<RequestInit, "body"> {
  /** Corpo JSON. Será serializado e enviará `Content-Type: application/json`. */
  json?: unknown;
  /** Timeout em milissegundos. Default: 10s. */
  timeoutMs?: number;
  /** Query string serializável. */
  query?: Record<string, string | number | boolean | undefined | null>;
}

function buildUrl(
  path: string,
  query?: HttpRequestOptions["query"],
): string {
  const base = path.startsWith("http") ? path : `${BASE_URL}${path}`;
  if (!query) return base;
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(query)) {
    if (value === undefined || value === null) continue;
    search.set(key, String(value));
  }
  const qs = search.toString();
  return qs ? `${base}?${qs}` : base;
}

export async function httpRequest<T>(
  path: string,
  options: HttpRequestOptions = {},
): Promise<T> {
  const { json, timeoutMs = DEFAULT_TIMEOUT_MS, query, headers, ...rest } =
    options;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  const url = buildUrl(path, query);

  try {
    const res = await fetch(url, {
      ...rest,
      signal: controller.signal,
      headers: {
        Accept: "application/json",
        ...(json !== undefined ? { "Content-Type": "application/json" } : {}),
        ...headers,
      },
      body: json !== undefined ? JSON.stringify(json) : (rest as RequestInit).body,
    });

    if (!res.ok) {
      const body = await safeJson(res);
      throw new HttpError(res.status, res.statusText, url, body);
    }

    if (res.status === 204) return undefined as T;
    return (await res.json()) as T;
  } finally {
    clearTimeout(timeout);
  }
}

async function safeJson(res: Response): Promise<unknown> {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
