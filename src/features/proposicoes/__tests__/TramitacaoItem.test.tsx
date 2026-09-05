import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { TramitacaoItem } from "../components/TramitacaoItem";
import { VotacaoCard } from "../components/VotacaoCard";
import type { Tramitacao, Votacao } from "../types";

const tramitacao: Tramitacao = {
  id: 1,
  proposicaoId: 10,
  externalId: null,
  sequencia: 3,
  dataHora: "2025-01-10T15:00:00.000Z",
  siglaOrgao: "CEDUC",
  descricaoSituacao: "Designação de Relator",
  despacho: "Designação do relator na Comissão de Educação.",
  regime: "Ordinário",
};

const votacao: Votacao = {
  id: 99,
  externalId: "10-1",
  proposicaoPrincipalId: 10,
  dataHora: "2025-02-01T17:30:00.000Z",
  descricao: "Aprovação do parecer do relator",
  resultado: "aprovado",
  tipoRaw: "Nominal",
};

describe("TramitacaoItem", () => {
  it("renderiza descrição_situacao, despacho e meta (órgão · regime · data)", () => {
    render(<TramitacaoItem tramitacao={tramitacao} />);

    expect(screen.getByText("Designação de Relator")).toBeInTheDocument();
    expect(
      screen.getByText("Designação do relator na Comissão de Educação."),
    ).toBeInTheDocument();
    expect(screen.getByText(/CEDUC/)).toBeInTheDocument();
    expect(screen.getByText(/Ordinário/)).toBeInTheDocument();
  });
});

describe("VotacaoCard", () => {
  it("mostra a descrição, o resultado bruto e o link para os votos", () => {
    render(<VotacaoCard votacao={votacao} proposicaoId={10} />);

    expect(
      screen.getByText("Aprovação do parecer do relator"),
    ).toBeInTheDocument();
    expect(screen.getByText("aprovado")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Ver votos da votação/ });
    expect(link).toHaveAttribute("href", "/proposicoes/10/votacoes/99");
  });

  it("usa fallback de descrição quando ausente e marca como pendente", () => {
    render(
      <VotacaoCard
        votacao={{ ...votacao, descricao: null, resultado: null }}
        proposicaoId={10}
      />,
    );

    expect(screen.getByText("Votação sem descrição")).toBeInTheDocument();
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });
});
