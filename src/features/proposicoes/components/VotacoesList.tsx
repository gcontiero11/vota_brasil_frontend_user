import { EmptyState } from "@/components/ui/EmptyState";
import type { Votacao } from "../types";
import { VotacaoItem } from "./VotacaoItem";

interface VotacoesListProps {
  votacoes: Votacao[];
}

export function VotacoesList({ votacoes }: VotacoesListProps) {
  if (votacoes.length === 0) {
    return (
      <EmptyState
        title="Sem votações registradas"
        description="Esta proposição ainda não passou por votações."
      />
    );
  }

  const ordenadas = [...votacoes].sort(
    (a, b) =>
      new Date(b.ocorridaEm).getTime() - new Date(a.ocorridaEm).getTime(),
  );

  return (
    <ul className="flex flex-col gap-3">
      {ordenadas.map((v) => (
        <li key={v.id}>
          <VotacaoItem votacao={v} />
        </li>
      ))}
    </ul>
  );
}
