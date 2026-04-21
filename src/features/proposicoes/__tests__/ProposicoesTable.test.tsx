import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { ProposicoesTable } from "../components/ProposicoesTable";
import type { Proposicao } from "../types";

const proposicoesMock: Proposicao[] = [
  {
    id: "p-001",
    tipo: "PL",
    numero: 2345,
    ano: 2024,
    ementa: "Institui o Programa Nacional de Incentivo à Leitura.",
    autoria: { nome: "Dep. Ana Ribeiro", partido: "PFAM", uf: "SP" },
    status: "em_tramitacao",
    ultimaMovimentacaoAt: new Date().toISOString(),
  },
  {
    id: "p-002",
    tipo: "PEC",
    numero: 17,
    ano: 2024,
    ementa: "Amplia o direito ao ensino médio em tempo integral.",
    autoria: { nome: "Dep. Bruno Teixeira" },
    status: "pronta_para_pauta",
    ultimaMovimentacaoAt: new Date().toISOString(),
  },
];

describe("ProposicoesTable", () => {
  it("renderiza as linhas das proposições fornecidas", () => {
    render(<ProposicoesTable proposicoes={proposicoesMock} />);

    expect(screen.getByText("PL 2345/2024")).toBeInTheDocument();
    expect(screen.getByText("PEC 17/2024")).toBeInTheDocument();
    expect(
      screen.getByText(/Institui o Programa Nacional/),
    ).toBeInTheDocument();
    expect(screen.getByText(/Dep\. Ana Ribeiro/)).toBeInTheDocument();
    expect(screen.getByText("Em tramitação")).toBeInTheDocument();
    expect(screen.getByText("Pronta para pauta")).toBeInTheDocument();
  });

  it("gera link de detalhes por proposição", () => {
    render(<ProposicoesTable proposicoes={proposicoesMock} />);
    const detalhe = screen.getByRole("link", {
      name: /Ver detalhes da proposição PL 2345\/2024/,
    });
    expect(detalhe).toHaveAttribute("href", "/proposicoes/p-001");
  });

  it("exibe empty state quando a lista está vazia", () => {
    render(<ProposicoesTable proposicoes={[]} />);
    expect(
      screen.getByText("Nenhuma proposição encontrada"),
    ).toBeInTheDocument();
    expect(screen.queryByRole("table")).not.toBeInTheDocument();
  });
});
