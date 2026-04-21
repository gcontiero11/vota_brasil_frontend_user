import "@testing-library/jest-dom/vitest";
import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import { createElement } from "react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

afterEach(() => {
  cleanup();
});

/**
 * Mock mínimo de `next/link`: renderiza uma âncora comum, preservando
 * `href` e `children`. Suficiente para testes que não dependem de
 * navegação real.
 */
vi.mock("next/link", () => ({
  default: ({
    href,
    children,
    ...rest
  }: { href: string; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) =>
    createElement("a", { href, ...rest }, children),
}));

/**
 * Mock de `next/navigation` — fornece hooks inertes para componentes
 * cliente que consultam a URL em testes.
 */
vi.mock("next/navigation", () => ({
  usePathname: () => "/proposicoes",
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
