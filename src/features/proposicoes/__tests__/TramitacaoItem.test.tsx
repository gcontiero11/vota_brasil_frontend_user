import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { TramitacaoItem } from "../components/TramitacaoItem";
import type { Tramitacao } from "../types";

const tramitacao: Tramitacao = {
  id: "t-1",
  proposicaoId: "p-1",
  descricao: "Designação de relator na Comissão de Educação.",
  orgao: "CEDUC",
  ocorridaEm: "2025-01-10T15:00:00.000Z",
  detalhesAdicionais:
    "Relatoria designada após acordo entre lideranças partidárias.",
};

describe("TramitacaoItem", () => {
  it("começa colapsado e mostra apenas o cabeçalho", () => {
    render(<TramitacaoItem tramitacao={tramitacao} />);

    const toggle = screen.getByRole("button", {
      name: /Detalhes da tramitação/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");

    expect(
      screen.queryByText(/Resumo por IA/),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(tramitacao.detalhesAdicionais as string),
    ).not.toBeInTheDocument();
  });

  it("expande ao clicar e mostra detalhes + placeholder de IA", async () => {
    render(<TramitacaoItem tramitacao={tramitacao} />);

    const toggle = screen.getByRole("button", {
      name: /Detalhes da tramitação/,
    });
    await userEvent.click(toggle);

    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(
      screen.getByText(tramitacao.detalhesAdicionais as string),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ainda não há resumo por IA disponível para esta tramitação.",
      ),
    ).toBeInTheDocument();
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
});
