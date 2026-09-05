import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "../components/StatusBadge";

const CASES: Array<{ status: string; variantClass: string }> = [
  { status: "Em tramitação", variantClass: "text-blue-700" },
  { status: "Pronta para Pauta no Plenário", variantClass: "text-amber-700" },
  { status: "Aprovada", variantClass: "text-brand-700" },
  { status: "Transformada em Lei", variantClass: "text-brand-700" },
  { status: "Arquivada", variantClass: "text-slate-700" },
  { status: "Rejeitada", variantClass: "text-red-700" },
];

describe("StatusBadge", () => {
  it.each(CASES)(
    "mapeia o status livre '$status' para a cor correta",
    ({ status, variantClass }) => {
      const { container } = render(<StatusBadge status={status} />);
      expect(screen.getByText(status)).toBeInTheDocument();
      expect(container.firstChild).toHaveClass(variantClass);
    },
  );

  it("mostra rótulo neutro para status null", () => {
    render(<StatusBadge status={null} />);
    expect(screen.getByText("Sem status")).toBeInTheDocument();
  });
});
