import type { ReactNode } from "react";
import { EmptyState } from "@/components/ui/EmptyState";
import type { VotoIndividual } from "../types";
import { VotoRow } from "./VotoRow";

interface VotosTableProps {
  votos: VotoIndividual[];
}

export function VotosTable({ votos }: VotosTableProps) {
  if (votos.length === 0) {
    return (
      <EmptyState
        title="Nenhum voto encontrado"
        description="Ajuste o filtro de partido ou aguarde a divulgação dos votos."
      />
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[560px] border-collapse">
          <thead className="bg-slate-50">
            <tr>
              <Th>Deputado(a)</Th>
              <Th>Partido</Th>
              <Th>UF</Th>
              <Th>Voto</Th>
            </tr>
          </thead>
          <tbody>
            {votos.map((v) => (
              <VotoRow key={v.id} voto={v} />
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
