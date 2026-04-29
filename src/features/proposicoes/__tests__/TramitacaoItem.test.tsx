import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TramitacaoItem } from "../components/TramitacaoItem";
import type { Tramitacao } from "../types";

const tramitacao: Tramitacao = {
  id: "t-1",
  proposicaoId: "p-1",
  tipo: "RELATOR",
  descricao: "Designação de relator na Comissão de Educação.",
  orgao: "CEDUC",
  ocorridaEm: "2025-01-10T15:00:00.000Z",
};

const tramitacaoVotacao: Tramitacao = {
  id: "t-2",
  proposicaoId: "p-1",
  tipo: "VOTACAO",
  descricao: "Aprovação do parecer do relator.",
  orgao: "CEDUC",
  ocorridaEm: "2025-02-01T17:30:00.000Z",
  votacao: {
    id: "v-1",
    proposicaoId: "p-1",
    titulo: "Aprovação do parecer do relator",
    ocorridaEm: "2025-02-01T17:30:00.000Z",
    resultado: "aprovada",
    placar: { sim: 30, nao: 12, abstencao: 6, ausente: 2 },
    resumo:
      "Comissão decide sobre o parecer favorável apresentado pelo relator.",
  },
};

describe("TramitacaoItem", () => {
  it("renderiza tipo, descrição e órgão sem botão de expandir para tipos não-VOTACAO", () => {
    render(<TramitacaoItem tramitacao={tramitacao} />);

    expect(screen.getByText("Relator")).toBeInTheDocument();
    expect(screen.getByText(tramitacao.descricao)).toBeInTheDocument();
    expect(screen.getByText(/CEDUC/)).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Detalhes da tramitação/ }),
    ).not.toBeInTheDocument();
  });

  it("começa colapsado e mostra apenas o cabeçalho quando tipo é VOTACAO", () => {
    render(<TramitacaoItem tramitacao={tramitacaoVotacao} />);

    const toggle = screen.getByRole("button", {
      name: /Detalhes da tramitação/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText(tramitacaoVotacao.votacao!.resumo as string),
    ).not.toBeInTheDocument();
  });

  it("renderiza placar, resumo e link para votos quando tipo é VOTACAO", async () => {
    render(<TramitacaoItem tramitacao={tramitacaoVotacao} />);

    expect(screen.getByText("Votação")).toBeInTheDocument();
    expect(screen.getByText("Aprovada")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", { name: /Detalhes da tramitação/ }),
    );

    expect(
      screen.getByText(tramitacaoVotacao.votacao!.resumo as string),
    ).toBeInTheDocument();
    expect(screen.getByText("Sim")).toBeInTheDocument();
    expect(screen.getByText("30")).toBeInTheDocument();

    const link = screen.getByRole("link", { name: /Ver votos da votação/ });
    expect(link).toHaveAttribute("href", "/proposicoes/p-1/votacoes/v-1");
  });
});
