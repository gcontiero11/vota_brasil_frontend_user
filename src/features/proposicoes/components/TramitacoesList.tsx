import { EmptyState } from "@/components/ui/EmptyState";
import type { Tramitacao } from "../types";
import { TramitacaoItem } from "./TramitacaoItem";

interface TramitacoesListProps {
  tramitacoes: Tramitacao[];
}

export function TramitacoesList({ tramitacoes }: TramitacoesListProps) {
  if (tramitacoes.length === 0) {
    return (
      <EmptyState
        title="Sem tramitações registradas"
        description="Esta proposição ainda não teve movimentações catalogadas."
      />
    );
  }

  const ordenadas = [...tramitacoes].sort(
    (a, b) =>
      new Date(b.ocorridaEm).getTime() - new Date(a.ocorridaEm).getTime(),
  );

  return (
    <ol className="flex flex-col gap-3">
      {ordenadas.map((t) => (
        <li key={t.id}>
          <TramitacaoItem tramitacao={t} />
        </li>
      ))}
    </ol>
  );
}
