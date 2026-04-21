import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { VotacaoItem } from "../components/VotacaoItem";
import type { Votacao } from "../types";

const votacao: Votacao = {
  id: "v-1",
  proposicaoId: "p-1",
  titulo: "Aprovação em plenário",
  ocorridaEm: "2025-02-05T17:30:00.000Z",
  resultado: "aprovada",
  placar: { sim: 320, nao: 89, abstencao: 6, ausente: 98 },
};

describe("VotacaoItem", () => {
  it("começa colapsada e exibe título, data e resultado", () => {
    render(<VotacaoItem votacao={votacao} />);

    expect(screen.getByText("Aprovação em plenário")).toBeInTheDocument();
    expect(screen.getByText("Aprovada")).toBeInTheDocument();

    const toggle = screen.getByRole("button", {
      name: /Detalhes da votação/,
    });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByText(/Sim/)).not.toBeInTheDocument();
  });

  it("expande e mostra placar + placeholder de IA", async () => {
    render(<VotacaoItem votacao={votacao} />);

    await userEvent.click(
      screen.getByRole("button", { name: /Detalhes da votação/ }),
    );

    expect(screen.getByText("Sim")).toBeInTheDocument();
    expect(screen.getByText("320")).toBeInTheDocument();
    expect(screen.getByText("89")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Ainda não há resumo por IA disponível para esta votação.",
      ),
    ).toBeInTheDocument();
  });

  it("exibe fallback quando não há placar", async () => {
    render(
      <VotacaoItem
        votacao={{ ...votacao, placar: undefined, resultado: "pendente" }}
      />,
    );
    await userEvent.click(
      screen.getByRole("button", { name: /Detalhes da votação/ }),
    );

    expect(
      screen.getByText("Placar ainda não divulgado."),
    ).toBeInTheDocument();
    expect(screen.getByText("Pendente")).toBeInTheDocument();
  });
});
