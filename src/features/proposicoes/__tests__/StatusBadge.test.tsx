import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { StatusBadge } from "../components/StatusBadge";
import type { ProposicaoStatus } from "../types";

const CASES: Array<{
  status: ProposicaoStatus;
  label: string;
  variantClass: string;
}> = [
  {
    status: "em_tramitacao",
    label: "Em tramitação",
    variantClass: "text-blue-700",
  },
  {
    status: "pronta_para_pauta",
    label: "Pronta para pauta",
    variantClass: "text-amber-700",
  },
  {
    status: "aprovada",
    label: "Aprovada",
    variantClass: "text-brand-700",
  },
  {
    status: "arquivada",
    label: "Arquivada",
    variantClass: "text-slate-700",
  },
  {
    status: "rejeitada",
    label: "Rejeitada",
    variantClass: "text-red-700",
  },
];

describe("StatusBadge", () => {
  it.each(CASES)(
    "mapeia o status $status para rótulo '$label' com a cor correta",
    ({ status, label, variantClass }) => {
      const { container } = render(<StatusBadge status={status} />);
      const badge = screen.getByText(label);
      expect(badge).toBeInTheDocument();
      expect(container.firstChild).toHaveClass(variantClass);
    },
  );
});
