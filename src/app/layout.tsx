import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Shell } from "@/components/layout/Shell";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: "Vota Brasil — Consulta pública",
    template: "%s · Vota Brasil",
  },
  description:
    "Consulta pública de proposições, tramitações e votações da Câmara dos Deputados.",
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
