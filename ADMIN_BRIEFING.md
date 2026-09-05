# Briefing — Inicialização do `vota_brasil_admin_front`

Você vai criar o **painel administrativo** do Vota Brasil — repositório novo, do zero, em uma pasta vazia. Este briefing contém todo o contexto: propósito, stack, versões exatas, configs literais, componentes UI a copiar, padrão de camada de dados, convenções e escopo da V1.

Leia tudo antes de começar. **Não pule etapas. Não invente versões diferentes das listadas.** Quando algo estiver ambíguo, pergunte ao usuário antes de codar.

---

## 1. Contexto

**Vota Brasil** é um sistema de consulta legislativa (proposições, tramitações, votações da Câmara dos Deputados). Existe:

- **Backend Go** — REST API em `http://localhost:8080`, documentada (CRUD de proposições, votações, tramitações, deputados, etc.). Para esta V1 do admin, o backend **não será consumido** — toda a camada de dados será mockada, exatamente como foi feito no frontend público no início.
- **Frontend público** (`vota_brasil_user_front`) — já existe, em produção, consome o backend real. Sua paleta visual, componentes UI base e padrões de código devem ser **espelhados** no admin para manter coerência.
- **Painel admin** (este projeto) — interface separada para gestão de dados (CRUD de proposições, gestão de votações, monitoramento da ingestão). Público-alvo: equipe interna.

> A V1 será **toda mockada**. A camada de dados (`features/<feature>/api.ts`) deve ter assinatura assíncrona como se já consumisse a API real — quando o backend for plugado, troca-se apenas a implementação.

## 2. Premissas que você deve confirmar antes de iniciar

Pergunte ao usuário:

1. **Nome do diretório/repositório** — assumindo `vota_brasil_admin_front`. Confirme.
2. **Autenticação** — o admin terá login? Para V1 mockada, recomendo **deixar fora** (proteger por rede) e adicionar depois. Confirme.

O escopo da V1 está fixado na seção 12 e foi aprovado pelo product owner — siga literal, não invente features. Se quiser sugerir algo fora desse escopo, **proponha como follow-up** no fim, não inclua sem perguntar.

## 3. Stack e versões exatas

Use **estas versões idênticas** (não atualize, não escolha "última"). Gerenciador: **pnpm**.

### `package.json`

```json
{
  "name": "vota-brasil-admin-front",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "format": "prettier --write .",
    "format:check": "prettier --check .",
    "typecheck": "tsc --noEmit",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "next": "15.5.15",
    "react": "19.0.0",
    "react-dom": "19.0.0"
  },
  "devDependencies": {
    "@testing-library/dom": "10.4.0",
    "@testing-library/jest-dom": "6.6.3",
    "@testing-library/react": "16.1.0",
    "@testing-library/user-event": "14.5.2",
    "@types/node": "22.10.7",
    "@types/react": "19.0.7",
    "@types/react-dom": "19.0.3",
    "@eslint/eslintrc": "3.3.5",
    "@typescript-eslint/eslint-plugin": "8.59.0",
    "@typescript-eslint/parser": "8.59.0",
    "@vitejs/plugin-react": "4.3.4",
    "autoprefixer": "10.4.20",
    "eslint": "9.39.4",
    "eslint-config-next": "15.5.15",
    "eslint-config-prettier": "9.1.0",
    "jsdom": "25.0.1",
    "postcss": "8.5.1",
    "prettier": "3.4.2",
    "tailwindcss": "3.4.17",
    "typescript": "5.7.3",
    "vite-tsconfig-paths": "5.1.4",
    "vitest": "2.1.8"
  },
  "engines": {
    "node": ">=18.18.0"
  }
}
```

Após criar o `package.json`, rode `pnpm install` para gerar o `pnpm-lock.yaml`.

## 4. Setup inicial (passo a passo)

Execute na ordem:

1. `git init` no diretório vazio.
2. Criar `package.json` (acima) e rodar `pnpm install`.
3. Criar todos os arquivos de configuração (seção 5).
4. Criar a estrutura de pastas (seção 6).
5. Copiar tokens visuais, CSS global e componentes UI base (seções 7 e 8).
6. Implementar layout admin (seção 9).
7. Implementar camada de dados mockada e features iniciais (seções 10 e 12).
8. Rodar `pnpm typecheck && pnpm lint && pnpm test && pnpm build` — tudo verde.
9. Commits por etapa lógica (não um commit gigante no final).

## 5. Configs literais (copie como está)

### `tsconfig.json`

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": false,
    "skipLibCheck": true,
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "noFallthroughCasesInSwitch": true,
    "forceConsistentCasingInFileNames": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] },
    "types": ["vitest/globals", "@testing-library/jest-dom"]
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts", "vitest.setup.ts"],
  "exclude": ["node_modules"]
}
```

### `next.config.mjs`

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
};

export default nextConfig;
```

### `eslint.config.mjs`

```js
import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;
```

### `.prettierrc`

```json
{
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all",
  "printWidth": 100,
  "tabWidth": 2,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

### `.prettierignore`

```
node_modules
.next
dist
build
coverage
pnpm-lock.yaml
package-lock.json
yarn.lock
```

### `postcss.config.mjs`

```js
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
```

### `tailwind.config.ts`

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Paleta institucional (idêntica ao frontend público)
        brand: {
          50: "#ecfdf5",
          100: "#d1fae5",
          200: "#a7f3d0",
          300: "#6ee7b7",
          400: "#34d399",
          500: "#10b981",
          600: "#059669",
          700: "#047857",
          800: "#065f46",
          900: "#064e3b",
        },
        surface: {
          900: "#0b1220",
          800: "#111827",
          700: "#1f2937",
          600: "#374151",
        },
        status: {
          tramitacao: "#2563eb",
          pauta: "#d97706",
          aprovada: "#059669",
          arquivada: "#4b5563",
          rejeitada: "#dc2626",
        },
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)",
      },
    },
  },
  plugins: [],
};

export default config;
```

### `vitest.config.mts`

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    css: false,
    include: ["src/**/*.{test,spec}.{ts,tsx}"],
  },
});
```

### `vitest.setup.ts`

```ts
import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { createElement } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

afterEach(() => {
  cleanup();
});

vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) =>
    createElement("a", { href, ...rest }, children),
}));

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
    back: vi.fn(),
    forward: vi.fn(),
    prefetch: vi.fn(),
  }),
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
  redirect: (url: string) => {
    throw new Error(`NEXT_REDIRECT:${url}`);
  },
}));
```

### `.gitignore`

```
node_modules
.next
out
build
dist
coverage

# typescript / next
*.tsbuildinfo
next-env.d.ts

# env
.env
.env.local
.env.*.local

# editor / os
.DS_Store
.vscode
.idea

# logs
*.log

# caches / deploy
.turbo
.vercel

# yarn pnp
.pnp
.pnp.*

# certs
*.pem
```

### `.env.example`

```
# URL base da API REST do Vota Brasil. Não consumida na V1 (mockada).
NEXT_PUBLIC_API_BASE_URL=http://localhost:8080

# Toggle de mocks. Quando "true" (default na V1), api.ts retorna dados de mocks.ts.
NEXT_PUBLIC_USE_MOCKS=true
```

## 6. Estrutura de pastas

Princípio: **package by feature**. Cada feature tem componentes, hooks, tipos, api e mocks próprios.

```
src/
  app/                          # App Router
    layout.tsx                  # Shell (sidebar + main)
    page.tsx                    # Redireciona para /ingestao
    ingestao/
      page.tsx                  # Tela única "Controle de Ingestão"
  components/
    layout/                     # Shell, Sidebar
    ui/                         # Badge, Button, Card, EmptyState, ExpandablePanel, Input, Select
  features/
    ingestao/
      api.ts                    # listAdminProposicoes, getMetrics, updatePriority, requestSync, getSyncInfo
      mocks.ts                  # Estado em memória + helpers
      types.ts                  # SyncStatus, AdminProposicao, IngestaoMetrics, params
      normalize.ts              # statusVariant, priorityLabel, etc.
      components/
        IngestaoMetrics.tsx
        IngestaoFilters.tsx
        IngestaoTable.tsx
        IngestaoRow.tsx
        SyncStatusBadge.tsx
        PriorityCell.tsx
        SyncActionButton.tsx
        SyncDetailsDrawer.tsx
        Paginator.tsx
      __tests__/
  lib/
    http.ts                     # Cliente HTTP centralizado (mesmo padrão do público)
    format.ts                   # formatDate, formatProposicaoIdentifier, formatRelativeDate
    __tests__/
  styles/
    globals.css
```

## 7. Tokens visuais e CSS global

### `src/styles/globals.css`

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html,
  body {
    @apply h-full bg-slate-50 text-slate-900 antialiased;
  }

  body {
    font-feature-settings: "cv11", "ss01";
  }

  :focus-visible {
    @apply outline-2 outline-offset-2 outline-brand-500;
  }
}
```

## 8. Componentes UI base (copiar literal)

Todos vivem em `src/components/ui/`. **São agnósticos ao domínio** — não importam de `features/`.

### `Badge.tsx`

```tsx
import type { HTMLAttributes, ReactNode } from "react";

export type BadgeVariant = "neutral" | "info" | "success" | "warning" | "danger";

const VARIANT_CLASSES: Record<BadgeVariant, string> = {
  neutral: "bg-slate-100 text-slate-700 ring-slate-200",
  info: "bg-blue-50 text-blue-700 ring-blue-200",
  success: "bg-brand-50 text-brand-700 ring-brand-200",
  warning: "bg-amber-50 text-amber-700 ring-amber-200",
  danger: "bg-red-50 text-red-700 ring-red-200",
};

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  children: ReactNode;
}

export function Badge({ variant = "neutral", className = "", children, ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${VARIANT_CLASSES[variant]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  );
}
```

### `Button.tsx`

```tsx
import type { ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary" | "ghost";
export type ButtonSize = "sm" | "md";

const BASE =
  "inline-flex items-center justify-center gap-2 rounded-md font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500 disabled:cursor-not-allowed disabled:opacity-50";

const VARIANT: Record<ButtonVariant, string> = {
  primary: "bg-brand-600 text-white hover:bg-brand-700",
  secondary: "bg-white text-slate-900 border border-slate-300 hover:bg-slate-50",
  ghost: "bg-transparent text-slate-700 hover:bg-slate-100",
};

const SIZE: Record<ButtonSize, string> = {
  sm: "h-8 px-3 text-sm",
  md: "h-10 px-4 text-sm",
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${BASE} ${VARIANT[variant]} ${SIZE[size]} ${className}`}
      {...rest}
    />
  );
}
```

### `Card.tsx`

```tsx
import type { HTMLAttributes, ReactNode } from "react";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export function Card({ className = "", children, ...rest }: CardProps) {
  return (
    <div
      className={`rounded-lg border border-slate-200 bg-white shadow-soft ${className}`}
      {...rest}
    >
      {children}
    </div>
  );
}
```

### `EmptyState.tsx`

```tsx
import type { ReactNode } from "react";

interface EmptyStateProps {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ title, description, icon, action, className = "" }: EmptyStateProps) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed border-slate-300 bg-white px-6 py-12 text-center ${className}`}
    >
      {icon ?? <DefaultIcon />}
      <div>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
        {description ? <p className="mt-1 text-sm text-slate-600">{description}</p> : null}
      </div>
      {action ? <div className="mt-2">{action}</div> : null}
    </div>
  );
}

function DefaultIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      className="h-8 w-8 text-slate-400"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 3.75H5.25A1.5 1.5 0 003.75 5.25v13.5A1.5 1.5 0 005.25 20.25h13.5a1.5 1.5 0 001.5-1.5V15"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.5 3.75h3.75v3.75M20.25 3.75L12 12"
      />
    </svg>
  );
}
```

### `ExpandablePanel.tsx`

```tsx
"use client";

import { useId, useState } from "react";
import type { ReactNode } from "react";

interface ExpandablePanelProps {
  header: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  ariaLabel?: string;
  className?: string;
}

export function ExpandablePanel({
  header,
  children,
  defaultOpen = false,
  ariaLabel,
  className = "",
}: ExpandablePanelProps) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className={`overflow-hidden rounded-lg border border-slate-200 bg-white ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={ariaLabel}
        className="flex w-full items-center justify-between gap-4 px-4 py-3 text-left hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-500"
      >
        <div className="min-w-0 flex-1">{header}</div>
        <ChevronIcon open={open} />
      </button>
      {open ? (
        <div id={panelId} className="border-t border-slate-200 bg-slate-50/50 px-4 py-4">
          {children}
        </div>
      ) : null}
    </div>
  );
}

function ChevronIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 20 20"
      fill="currentColor"
      className={`h-4 w-4 shrink-0 text-slate-500 transition-transform ${open ? "rotate-180" : ""}`}
    >
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 011.06.02L10 11.06l3.71-3.83a.75.75 0 111.08 1.04l-4.25 4.39a.75.75 0 01-1.08 0L5.21 8.27a.75.75 0 01.02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}
```

### `Input.tsx`

```tsx
import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  leadingIcon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { label, hint, error, leadingIcon, className = "", id, ...rest },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined;

  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={inputId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <div className="relative">
        {leadingIcon ? (
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-slate-400">
            {leadingIcon}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={`h-10 w-full rounded-md border border-slate-300 bg-white text-sm text-slate-900 placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${leadingIcon ? "pl-9" : "pl-3"} pr-3 ${error ? "border-red-400 focus:border-red-500 focus:ring-red-500/30" : ""} ${className}`}
          {...rest}
        />
      </div>
      {error ? (
        <p id={`${inputId}-error`} className="text-xs text-red-600">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-slate-500">
          {hint}
        </p>
      ) : null}
    </div>
  );
});
```

### `Select.tsx`

```tsx
import { forwardRef, useId } from "react";
import type { ReactNode, SelectHTMLAttributes } from "react";

export interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  options: SelectOption[];
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(function Select(
  { label, options, className = "", id, ...rest },
  ref,
) {
  const autoId = useId();
  const selectId = id ?? autoId;

  return (
    <div className="flex flex-col gap-1">
      {label ? (
        <label htmlFor={selectId} className="text-sm font-medium text-slate-700">
          {label}
        </label>
      ) : null}
      <select
        ref={ref}
        id={selectId}
        className={`h-10 w-full rounded-md border border-slate-300 bg-white px-3 text-sm text-slate-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/30 ${className}`}
        {...rest}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
});
```

## 9. Layout (Shell + Sidebar) — adaptado para admin

A sidebar do admin segue o mesmo visual escuro do público, mas com **branding e itens de navegação diferentes**. Brand: "Vota Brasil — Admin".

### `src/components/layout/Shell.tsx`

```tsx
import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface ShellProps {
  children: ReactNode;
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <Sidebar />
      <main className="flex-1 overflow-x-hidden bg-slate-50">
        <div className="mx-auto w-full max-w-6xl px-4 py-6 md:px-8 md:py-10">{children}</div>
      </main>
    </div>
  );
}
```

### `src/components/layout/Sidebar.tsx`

Use a estrutura visual idêntica à do frontend público (sticky, mobile drawer, brand com ícone, item ativo com `bg-brand-600`), mas com **um único item** de navegação na V1:

- `/ingestao` — "Controle de Ingestão" (ícone de raios/refresh ou engrenagem)

Brand: ícone (mesmo visual de "casa"), título "Vota Brasil", subtítulo **"Admin"** (em vez de "Consulta pública").

> Implemente espelhando o `Sidebar.tsx` do `vota_brasil_user_front` — mesma marcação, mesmas classes, só ajustando o array `NAV` e o subtítulo do `Brand`. A sidebar continua valendo o investimento (consistência visual + base para itens futuros), mesmo com só um item agora.

### `src/app/layout.tsx`

```tsx
import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Shell } from "@/components/layout/Shell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vota Brasil — Admin",
    template: "%s · Vota Brasil Admin",
  },
  description: "Painel administrativo do Vota Brasil.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
```

### `src/app/page.tsx`

```tsx
import { redirect } from "next/navigation";

export default function HomePage(): never {
  redirect("/ingestao");
}
```

## 10. Camada de dados (mockada — padrão a seguir)

**Princípios** (cumpra à risca):

- Nenhum componente chama `fetch` direto. Tudo passa por `features/<feature>/api.ts`.
- `api.ts` tem assinatura assíncrona, mesmo lendo dos mocks. Quando o backend for plugado, troca-se apenas a implementação.
- Toggle via env: `NEXT_PUBLIC_USE_MOCKS=true` (default V1) faz `api.ts` ler de `mocks.ts`. Quando `false`, vai pro `lib/http.ts`.
- `lib/http.ts` já fica pronto, mesmo sem uso real na V1.

### `src/lib/http.ts`

```ts
/**
 * Cliente HTTP centralizado para a API REST do Vota Brasil.
 * Base URL vem de `NEXT_PUBLIC_API_BASE_URL` (default `http://localhost:8080`).
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
  return "http://localhost:8080";
}

const BASE_URL = resolveBaseUrl();

export interface HttpRequestOptions extends Omit<RequestInit, "body"> {
  json?: unknown;
  timeoutMs?: number;
  query?: Record<string, string | number | boolean | undefined | null>;
}

function buildUrl(path: string, query?: HttpRequestOptions["query"]): string {
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
  const { json, timeoutMs = DEFAULT_TIMEOUT_MS, query, headers, ...rest } = options;
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
```

### Padrão de `features/<feature>/api.ts` mockado

```ts
import { httpRequest } from "@/lib/http";
import { listMock, getMock /*…*/ } from "./mocks";
import type { /* tipos */ } from "./types";

const USE_MOCKS = process.env.NEXT_PUBLIC_USE_MOCKS !== "false";

export async function listFoo(params: ListFooParams = {}): Promise<Paginated<Foo>> {
  if (USE_MOCKS) return listMock(params);
  // implementação real aguardando plug:
  // const raw = await httpRequest<RawPaginated<RawFoo>>("/foos", { query: { ... } });
  // return { data: raw.data.map(toFoo), pagination: toPagination(raw.pagination) };
  throw new Error("backend not yet integrated");
}

export async function createFoo(input: CreateFoo): Promise<Foo> {
  if (USE_MOCKS) return createMock(input);
  throw new Error("backend not yet integrated");
}
```

> Repare: na V1, `USE_MOCKS` é `true` por default (note o `!== "false"`). Para testar a integração futura sem mocks, `NEXT_PUBLIC_USE_MOCKS=false`.

### Mocks — convenção

- Mocks em `features/<feature>/mocks.ts`, mantendo o mesmo shape exato do que o backend real devolveria (use o "Modelos" da seção 13 como contrato).
- `simulateLatency()` opcional — `await new Promise(r => setTimeout(r, 50))` para sentir o feel de rede.
- Para CRUD: estado em memória dentro do módulo (export `__resetMocks()` para uso em testes).

## 11. Convenções de código

- **TypeScript estrito**, sem `any`, sem `as unknown as X`.
- **Server Components por padrão.** `"use client"` apenas onde tiver estado/efeito/listener.
- **Páginas finas**: páginas do App Router coordenam dados e layout; lógica fica em componentes de feature.
- **Tipos como contrato**: toda entidade tem tipo explícito em `features/<feature>/types.ts`.
- **Sem estado global prematuro**. URL, server state, React local. Só introduzir Zustand/Redux/etc. com problema concreto.
- **Sem libs de UI pesadas** (MUI, Ant). Tailwind + primitivos próprios bastam.
- **Acessibilidade**: `aria-*` em interativos, foco visível, contraste adequado, seletores por papel/texto nos testes.
- **Textos de UI em pt-BR**; **código em inglês**.
- **Comentários**: só quando o "porquê" for não-óbvio. Não narre o "o quê".
- **Sem `// removido`, sem retro-compat para código que nunca rodou**.

### Lint, format, test obrigatórios

Antes de considerar qualquer feature pronta:

```bash
pnpm typecheck && pnpm lint && pnpm test && pnpm build
```

Tudo deve estar verde.

### Commits

Um commit por etapa lógica (não um commit gigante por feature). Mensagens curtas, foco no "porquê" quando relevante.

## 12. Escopo da V1 do admin

A V1 entrega **uma única tela**: **Controle de Ingestão**, em `/ingestao`. Frase-guia:

> A V1 do admin deve ajudar o time a controlar a ingestão das proposições, não administrar todo o produto.

O administrador **não** edita dados oficiais (ementa, tramitações, votações). A tela existe para:
- consultar proposições cadastradas e seu estado de sincronização;
- alterar prioridade de atualização;
- disparar atualização manual;
- identificar e tratar erros de ingestão.

### 12.0 Tipos do domínio (referência)

```ts
// src/features/ingestao/types.ts

export type SyncStatus =
  | "NEVER_SYNCED"
  | "PENDING"
  | "SYNCING"
  | "SYNCED"
  | "ERROR";

/** 1..5 — onde 5 é "muito alta" e 1 é "manual". */
export type PriorityLevel = 1 | 2 | 3 | 4 | 5;

export interface AdminProposicao {
  id: number;
  externalId: number;
  tipo: string;
  numero: number;
  ano: number;
  ementa: string | null;
  priorityLevel: PriorityLevel;
  lastSyncedAt: string | null;
  lastRelevantChangeAt: string | null;
  nextSyncAt: string | null;
  syncStatus: SyncStatus;
  syncErrorMessage: string | null;
  syncAttempts: number;
}

export interface IngestaoMetrics {
  totalProposicoes: number;
  comErro: number;
  atualizadasHoje: number;
  prioridadeAlta: number;        // priorityLevel >= 4
  pendentes: number;             // syncStatus === "PENDING" || "NEVER_SYNCED"
  ultimaIngestaoAt: string | null;
}

export interface ListAdminProposicoesParams {
  page?: number;
  limit?: number;
  /** Busca em tipo/número/ano/ementa/external_id/id (client-side sobre o array em memória, na V1). */
  search?: string;
  tipo?: string;
  ano?: number;
  priorityLevel?: PriorityLevel;
  syncStatus?: SyncStatus;
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
}

export interface Paginated<T> {
  data: T[];
  pagination: Pagination;
}
```

### 12.1 Bootstrap do projeto (commit isolado)

- Configs (seção 5), estrutura de pastas (seção 6), CSS global, componentes UI base (seção 8), layout (Shell + Sidebar com 1 item), `app/page.tsx` redirecionando para `/ingestao`, `app/ingestao/page.tsx` placeholder.
- Verificações: `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.

### 12.2 Tipos + camada de dados mockada (commit isolado)

- `features/ingestao/types.ts` (acima).
- `features/ingestao/mocks.ts`:
  - Array em memória com **~50 proposições** cobrindo todas as combinações relevantes:
    - todos os 5 valores de `syncStatus` representados;
    - prioridades de 1 a 5 distribuídas;
    - alguns com `syncErrorMessage` realista (ex.: `"Câmara API: 503 Service Unavailable"`, `"Timeout após 10s"`, `"deputado_id 12345 não encontrado"`);
    - alguns com `syncAttempts > 0`;
    - misturar tipos (PL, PEC, MPV, PLP, PDL) e anos (2023..2026).
  - Helper `simulateLatency()` (~80ms) em todas as funções para sentir feel de rede.
  - `__resetMocks()` exportado para uso em testes.
- `features/ingestao/api.ts` com toggle de mocks (mesmo padrão da seção 10):
  - `listAdminProposicoes(params): Promise<Paginated<AdminProposicao>>` — aplica filtros e paginação sobre o array em memória.
  - `getIngestaoMetrics(): Promise<IngestaoMetrics>` — calcula a partir do array.
  - `updatePriority(id, priorityLevel): Promise<AdminProposicao>` — muta a prioridade no mock e retorna o estado atualizado. Recalcula `nextSyncAt` (heurística simples, ex.: prioridade 5 = +6h, 1 = +30d).
  - `requestSync(id): Promise<{ syncStatus: SyncStatus }>` — muta `syncStatus` para `PENDING`, depois para `SYNCING` (após 1s, via `setTimeout`), depois para `SYNCED` ou `ERROR` (após 2s, com chance de erro definida em util `mockSyncOutcome()` — ex.: 80% sucesso). Em caso de erro, popula `syncErrorMessage` e incrementa `syncAttempts`.
  - `getSyncInfo(id): Promise<AdminProposicao | null>`.
- Testes unitários da `api.ts` cobrindo: filtros isolados, filtros combinados, paginação, mutação de prioridade, fluxo completo de `requestSync` (use `vi.useFakeTimers()`).

### 12.3 Métricas no topo (commit isolado)

- Componente `IngestaoMetrics` renderiza cards (`Card` reutilizado) com:
  - Total de proposições
  - Com erro
  - Atualizadas hoje
  - Prioridade alta (`>= 4`)
  - Pendentes
  - Última ingestão (data/hora — `formatDateTime`)
- Cada card: número grande, label pequeno, ícone opcional.
- Cards com número 0 não somem — mostram `0` (zero é informação relevante).
- Teste: renderiza os 6 indicadores com valores corretos.

### 12.4 Tabela + paginação (commit isolado)

- Componente `IngestaoTable` com colunas:
  - Proposição (`PL 1234/2024`)
  - Ementa (truncada, 2 linhas)
  - Prioridade (componente `PriorityCell` — apenas display por enquanto)
  - Última sync (`formatRelativeDate`, ex.: "há 2h"; "—" se `null`)
  - Última mudança relevante (idem)
  - Próxima sync (`formatRelativeDate`; mostra "agendada para …" se futuro)
  - Status (componente `SyncStatusBadge`)
  - Ações (placeholder por enquanto)
- `EmptyState` quando não houver resultados.
- `Paginator` reutiliza o padrão do frontend público (page/limit, "Mostrando X-Y de Z", anterior/próxima).
- Default `limit=20`. Paginação via query string (`?page=N`).
- Testes: smoke test de renderização com 3 linhas + empty state.

### 12.5 Filtros (commit isolado)

- Componente `IngestaoFilters` (Client Component) com:
  - Input de busca (`search`) — debounce de 300ms; ao submeter form ou blur, atualiza URL.
  - Chips para tipo (TODOS, PL, PEC, MPV, PLP, PDL).
  - `Select` para ano (TODOS + lista dinâmica baseada nos anos presentes nos mocks).
  - `Select` para prioridade (TODAS, 1..5 com label).
  - `Select` para status de ingestão (TODOS + 5 valores traduzidos).
  - Toggle "Apenas com erro" (atalho para `syncStatus=ERROR`).
  - Toggle "Apenas pendentes" (atalho para `syncStatus=PENDING` ou `NEVER_SYNCED` — backend precisa decidir; na V1, manda `syncStatus=PENDING`).
  - Botão "Limpar filtros".
- Filtros mudam URL (search params); página é Server Component que lê e refaz a query.
- Mudar qualquer filtro reseta `page` para 1.
- Testes: chips ativos refletem URL; submeter busca chama `router.replace` com payload esperado.

### 12.6 Alterar prioridade (commit isolado)

- Componente `PriorityCell` vira **interativo**: clique abre um pequeno popover ou usa `<select>` inline com as 5 prioridades.
  - Labels: `5 Muito alta`, `4 Alta`, `3 Média`, `2 Baixa`, `1 Manual`.
  - Cores discretas por prioridade (5 vermelho/laranja, 1 cinza).
- Ao mudar: chama `updatePriority`, mostra estado de loading no select, ao concluir atualiza linha (use `router.refresh()` em Client Component, ou re-fetch em padrão Server Action — fica a critério; padrão recomendado: Server Action).
- Em caso de erro, mostra `aria-live` com mensagem e mantém valor anterior.
- Teste: mudar prioridade chama `updatePriority(id, novoNivel)`.

### 12.7 Atualização manual + retry (commit isolado)

- Componente `SyncActionButton`:
  - Quando `syncStatus === "ERROR"` → label "Tentar novamente" (variant `secondary` com ícone de refresh).
  - Quando `syncStatus === "SYNCING"` → desabilitado, label "Atualizando…" com spinner.
  - Caso contrário → "Atualizar agora".
- Clique chama `requestSync(id)`. Otimistically muda status para `PENDING`. Em background, mock progride para `SYNCING` → `SYNCED`/`ERROR`.
- Confirmação? **Não** — a ação é segura e reversível (sempre dá pra tentar de novo). Não bloquear o admin com diálogo desnecessário.
- Mensagem de erro fica visível na coluna **Status** quando `syncStatus === "ERROR"` (truncada, com `title` para tooltip nativo).
- Teste: clique em "Atualizar agora" chama `requestSync` e atualiza UI para "Atualizando…".

### 12.8 Drawer de detalhes técnicos (commit isolado)

- Componente `SyncDetailsDrawer` — drawer lateral (use `<dialog>` HTML nativo com `position: fixed` ou um pattern simples com `<div role="dialog" aria-modal>`; **sem libs externas**).
- Trigger: ícone "ver detalhes" (i de info) na coluna ações ou clique na própria linha.
- Conteúdo:
  - Cabeçalho: identificador (`PL 1234/2024`), `SyncStatusBadge`, botão fechar.
  - Lista de campos:
    - ID interno
    - ID externo (Câmara)
    - Prioridade (com label)
    - Status
    - Última sincronização (`formatDateTime`)
    - Última mudança relevante (`formatDateTime`)
    - Próxima sincronização prevista (`formatDateTime`)
    - Tentativas (`syncAttempts`)
    - Última mensagem de erro (em bloco `<pre>` com fundo claro, se houver)
  - Botão de ação principal: "Atualizar agora" / "Tentar novamente" (mesmo `SyncActionButton`).
- Acessibilidade: foco move para o drawer ao abrir, `Esc` fecha, foco volta ao trigger ao fechar, `aria-labelledby` aponta para o título.
- Teste: abre/fecha por trigger, fecha com `Esc`, renderiza todos os campos.

### 12.9 Ajustes finos e definição de pronto (commit isolado, se necessário)

- Validar todos os critérios de aceite (seção 13 do escopo do produto, replicado abaixo na seção 14 deste briefing).
- Garantir `pnpm typecheck && pnpm lint && pnpm test && pnpm build` verde.
- Garantir cobertura mínima razoável (não chase 100% — foque em comportamento observável).

> Tudo acima usa **apenas dados mockados**. O contrato dos tipos deve bater com o backend real (seção 13) para a transição futura ser só trocar `api.ts`.

## 13. Referência da API backend (para mockar com shape correto)

> **Não consuma na V1**, mas use estes shapes ao desenhar `types.ts` e `mocks.ts`. Convenção do frontend: camelCase nos tipos do domínio; o snake_case do backend é traduzido na borda (em `api.ts`, função `to<Entity>`).

### 13.1 Estado atual do backend

O backend já expõe `GET /proposicoes` (consulta pública), mas **não** tem ainda os endpoints `/admin/*` que esta tela vai precisar. **Não tente improvisar com os endpoints públicos** — eles não retornam `sync_status`, `sync_error_message`, `sync_attempts` nem `next_sync_at`.

Os endpoints abaixo são o **contrato esperado** (ainda a ser implementado pelo backend). Use-os como guia para os shapes dos mocks.

### 13.2 Endpoints administrativos esperados

Todos paginados (`{ data, pagination: { page, limit, total } }`).

#### `GET /admin/proposicoes`

Query params:
- `page` (int, default 1)
- `page_size` (int, default 20, máximo 100) — equivalente ao `limit` da API pública
- `search` (string) — busca em `tipo`, `numero`, `ano`, `ementa`, `external_id`, `id`
- `tipo` (string)
- `ano` (int)
- `priority_level` (1..5)
- `sync_status` (`NEVER_SYNCED | PENDING | SYNCING | SYNCED | ERROR`)

Resposta (raw):

```ts
type RawAdminProposicao = {
  id: number;
  external_id: number;
  tipo: string;
  numero: number;
  ano: number;
  ementa: string | null;
  priority_level: number;             // 1..5
  last_synced_at: string | null;      // RFC3339
  last_relevant_change_at: string | null;
  next_sync_at: string | null;
  sync_status: "NEVER_SYNCED" | "PENDING" | "SYNCING" | "SYNCED" | "ERROR";
  sync_error_message: string | null;
  sync_attempts: number;
};
```

#### `GET /admin/ingestao/metrics`

Resposta:

```ts
type RawIngestaoMetrics = {
  total_proposicoes: number;
  com_erro: number;
  atualizadas_hoje: number;
  prioridade_alta: number;            // priority_level >= 4
  pendentes: number;                  // sync_status IN (PENDING, NEVER_SYNCED)
  ultima_ingestao_at: string | null;
};
```

#### `PATCH /admin/proposicoes/{id}/priority`

Body:

```json
{ "priority_level": 5 }
```

Validação: `1 <= priority_level <= 5`. Retorna `RawAdminProposicao` atualizado.

#### `POST /admin/proposicoes/{id}/sync`

Sem body. Enfileira job de sincronização. Resposta:

```json
{
  "message": "Proposição enviada para atualização.",
  "sync_status": "PENDING"
}
```

#### `GET /admin/proposicoes/{id}/sync-info`

Resposta: mesmo shape de `RawAdminProposicao` (campos de sync) — pode ser exatamente o mesmo objeto, ou apenas o subconjunto técnico. Trate como `RawAdminProposicao | null` (404 = `null`).

### 13.3 Mapper raw → domínio (referência)

```ts
function nullable<T>(v: T | null | undefined): T | null {
  return v ?? null;
}

function toAdminProposicao(r: RawAdminProposicao): AdminProposicao {
  return {
    id: r.id,
    externalId: r.external_id,
    tipo: r.tipo,
    numero: r.numero,
    ano: r.ano,
    ementa: nullable(r.ementa),
    priorityLevel: r.priority_level as PriorityLevel,
    lastSyncedAt: nullable(r.last_synced_at),
    lastRelevantChangeAt: nullable(r.last_relevant_change_at),
    nextSyncAt: nullable(r.next_sync_at),
    syncStatus: r.sync_status,
    syncErrorMessage: nullable(r.sync_error_message),
    syncAttempts: r.sync_attempts,
  };
}
```

> Importante: campos opcionais do backend Go usam `omitempty` — podem vir como `null` **ou ausentes** no JSON. Normalize para `null` na borda (`v ?? null`).

### 13.4 Pendências para o backend (registrar no fim do projeto)

Ao terminar a V1 mockada, gere um documento curto (`BACKEND_PENDENCIAS.md`) listando:

1. Novos campos na tabela `proposicoes` (ou tabela auxiliar `proposicao_sync_state`):
   ```sql
   priority_level         SMALLINT     NOT NULL DEFAULT 3,
   last_synced_at         TIMESTAMPTZ  NULL,
   last_relevant_change_at TIMESTAMPTZ NULL,
   next_sync_at           TIMESTAMPTZ  NULL,
   sync_status            TEXT         NOT NULL DEFAULT 'NEVER_SYNCED',
   sync_error_message     TEXT         NULL,
   sync_attempts          INT          NOT NULL DEFAULT 0
   ```
   (Backend já tem `priority_level`, `last_synced_at`, `last_relevant_change_at` — falta o resto.)
2. Endpoints `/admin/*` listados na seção 13.2.
3. Worker/job queue que processa `requestSync` de forma assíncrona, atualiza `sync_status`, `sync_attempts`, `sync_error_message`.
4. Recálculo de `next_sync_at` quando `priority_level` muda (heurística: 5 → +6h, 4 → +12h, 3 → +24h, 2 → +7d, 1 → manual/null).
5. Autenticação dos endpoints `/admin/*` (a definir — pode ser por bearer token, mTLS, ou rede privada).

## 14. Definição de pronto

### 14.1 Cada commit

Um commit só é "pronto" quando:

- [ ] `pnpm typecheck` limpo
- [ ] `pnpm lint` sem warnings
- [ ] `pnpm test` 100% passando
- [ ] `pnpm build` sem erro
- [ ] Componente novo ou alterado tem ao menos um teste de comportamento
- [ ] Acessibilidade básica: `aria-label` em botões só de ícone, foco visível, contraste OK
- [ ] Sem código morto, sem TODO sem owner, sem `console.log` esquecido

### 14.2 V1 inteira (critérios de aceite do produto)

A V1 está pronta quando o usuário consegue, na tela de Controle de Ingestão:

- [ ] Acessar a tela e ver os indicadores de ingestão
- [ ] Listar proposições com paginação real
- [ ] Buscar proposições (search em tipo/numero/ano/ementa/external_id/id)
- [ ] Filtrar por tipo, ano, prioridade e status de ingestão
- [ ] Ver coluna de prioridade, última sync, última mudança relevante e status
- [ ] Alterar a prioridade de uma proposição diretamente da tabela
- [ ] Solicitar atualização manual ("Atualizar agora")
- [ ] Ver mensagem de erro compreensível em proposições com `syncStatus === "ERROR"`
- [ ] Tentar novamente uma proposição com erro
- [ ] Abrir o drawer de detalhes técnicos com todas as informações da seção 12.8
- [ ] **Não** consegue editar dados oficiais (ementa, tramitações, votações) — não há nem botão pra isso
- [ ] **Não** há funcionalidades fora do escopo da V1 (sem CRUD de proposições, sem dashboard genérico, sem gestão de usuários)

## 15. O que evitar

### Técnico
- Estado global sem necessidade
- Bibliotecas pesadas de UI
- Lógica de negócio em componentes de página
- `any`, `as unknown as X`
- Mock direto no JSX — sempre via `api.ts`
- Rota nova sem mocks e sem teste
- Comentários de "o quê" (deixe os identificadores falarem)

### Escopo (proibido na V1, conforme escopo do produto)
- Criar dashboard genérico ou área administrativa completa
- Gestão de usuários, papéis, permissões
- Edição livre de dados oficiais (ementa, tramitações, votações)
- Fluxo de aprovação ou edição de resumos de IA
- Curadoria editorial (destaques, publicação/despublicação)
- Auditoria administrativa completa
- Comparação de payloads antigos vs novos
- Configuração de regras globais do worker
- Dashboards analíticos, relatórios exportáveis
- Telas separadas para tramitações ou votações
- Busca direta na API externa da Câmara

> Frase-guia: **"A V1 do admin deve ajudar o time a controlar a ingestão das proposições, não administrar todo o produto."**

## 16. Estilo de resposta esperado

- Em **português do Brasil**
- Direto, técnico, pragmático
- Distinguir fato, suposição e recomendação
- Quando incerto, **pergunte ao usuário antes de codar** — não invente premissas

---

**Comece confirmando** o nome do diretório e a decisão sobre auth (seção 2). O escopo está fechado — siga a seção 12 literalmente. Em seguida, execute o setup inicial (seção 4) e siga a ordem de commits da seção 12.
