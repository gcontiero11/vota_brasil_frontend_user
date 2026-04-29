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
  detalhesAdicionais:
    "Relatoria designada após acordo entre lideranças partidárias.",
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
  it("mostra a tag do tipo no cabeçalho mesmo colapsado", () => {
    render(<TramitacaoItem tramitacao={tramitacao} />);

    expect(screen.getByText("Relator")).toBeInTheDocument();
  });

  it("começa colapsado e mostra apenas o cabeçalho", () => {
    render(<TramitacaoItem tramitacao={tramitacao} />);

    const toggle = screen.getByRole("button", {
      name: /Detalhes da tramitação/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(
      screen.queryByText(tramitacao.detalhesAdicionais as string),
    ).not.toBeInTheDocument();
  });

  it("expande e mostra os detalhes adicionais sem placeholder de IA", async () => {
    render(<TramitacaoItem tramitacao={tramitacao} />);

    await userEvent.click(
      screen.getByRole("button", { name: /Detalhes da tramitação/ }),
    );

    expect(
      screen.getByText(tramitacao.detalhesAdicionais as string),
    ).toBeInTheDocument();
    expect(screen.queryByText(/Resumo por IA/)).not.toBeInTheDocument();
  });

  it("mostra fallback quando não há detalhes adicionais", async () => {
    render(
      <TramitacaoItem
        tramitacao={{ ...tramitacao, detalhesAdicionais: undefined }}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Detalhes da tramitação/ }),
    );

    expect(
      screen.getByText("Sem detalhes adicionais registrados."),
    ).toBeInTheDocument();
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
