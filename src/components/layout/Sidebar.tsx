"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import type { ReactElement } from "react";

interface NavItem {
  href: string;
  label: string;
  icon: (props: { className?: string }) => ReactElement;
}

const NAV: NavItem[] = [
  {
    href: "/proposicoes",
    label: "Proposições",
    icon: ({ className }) => (
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.75"
        className={className}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M8.25 6.75h7.5M8.25 12h7.5m-7.5 5.25h4.5M5.25 4.5h13.5a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V6a1.5 1.5 0 011.5-1.5z"
        />
      </svg>
    ),
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Topbar — visível apenas em telas estreitas */}
      <header className="sticky top-0 z-20 flex items-center justify-between border-b border-surface-700 bg-surface-900 px-4 py-3 text-slate-100 md:hidden">
        <Brand />
        <button
          type="button"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-controls="primary-nav"
          aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
          className="rounded-md p-2 hover:bg-surface-700"
        >
          <MenuIcon open={mobileOpen} />
        </button>
      </header>

      <aside
        id="primary-nav"
        className={`${mobileOpen ? "block" : "hidden"} border-b border-surface-700 bg-surface-900 text-slate-100 md:sticky md:top-0 md:flex md:h-screen md:w-64 md:shrink-0 md:flex-col md:border-b-0 md:border-r`}
      >
        <div className="hidden px-5 py-5 md:block">
          <Brand />
        </div>

        <nav className="flex flex-col gap-1 px-3 py-3">
          {NAV.map((item) => {
            const active =
              pathname === item.href || pathname.startsWith(`${item.href}/`);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMobileOpen(false)}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  active
                    ? "bg-brand-600 text-white"
                    : "text-slate-300 hover:bg-surface-700 hover:text-white"
                }`}
              >
                <Icon className="h-5 w-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto hidden px-5 py-4 text-xs text-slate-400 md:block">
          Dados legislativos — Câmara dos Deputados.
        </div>
      </aside>
    </>
  );
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-600 text-white">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 13.5L12 4.5l8.25 9M5.25 10.5V19.5A.75.75 0 006 20.25h12a.75.75 0 00.75-.75V10.5"
          />
        </svg>
      </div>
      <div className="leading-tight">
        <p className="text-sm font-semibold text-white">Vota Brasil</p>
        <p className="text-xs text-slate-400">Consulta pública</p>
      </div>
    </div>
  );
}

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-5 w-5"
    >
      {open ? (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M6 6l12 12M6 18L18 6"
        />
      ) : (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
        />
      )}
    </svg>
  );
}
