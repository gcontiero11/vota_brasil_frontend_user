import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { Proposicao } from "../types";
import { ProposicaoRow } from "./ProposicaoRow";

interface ProposicoesTableProps {
  proposicoes: Proposicao[];
}

export function ProposicoesTable({ proposicoes }: ProposicoesTableProps) {
  if (proposicoes.length === 0) {
    return (
      <EmptyState
        title="Nenhuma proposição encontrada"
        description="Ajuste os filtros e tente novamente."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <Th>Proposição</Th>
              <Th>Ementa</Th>
              <Th>Status</Th>
              <Th>Última mov.</Th>
              <Th className="text-right">Detalhes</Th>
            </tr>
          </thead>
          <tbody>
            {proposicoes.map((p) => (
              <ProposicaoRow key={p.id} proposicao={p} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Th({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <th
      scope="col"
      className={`border-b border-slate-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-600 ${className}`}
    >
      {children}
    </th>
  );
}
