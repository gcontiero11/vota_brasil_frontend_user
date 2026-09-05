import { EmptyState } from "@/components/ui/EmptyState";
import type { Tramitacao, Votacao } from "../types";
import { TramitacaoItem } from "./TramitacaoItem";
import { VotacaoCard } from "./VotacaoCard";

interface TramitacoesListProps {
  proposicaoId: number;
  tramitacoes: Tramitacao[];
  votacoes: Votacao[];
}

type TimelineEntry =
  | { kind: "tramitacao"; key: string; ts: number; tramitacao: Tramitacao }
  | { kind: "votacao"; key: string; ts: number; votacao: Votacao };

export function TramitacoesList({
  proposicaoId,
  tramitacoes,
  votacoes,
}: TramitacoesListProps) {
  if (tramitacoes.length === 0 && votacoes.length === 0) {
    return (
      <EmptyState
        title="Sem tramitações registradas"
        description="Esta proposição ainda não teve movimentações catalogadas."
      />
    );
  }

  const entries: TimelineEntry[] = [
    ...tramitacoes.map<TimelineEntry>((t) => ({
      kind: "tramitacao",
      key: `t-${t.id}`,
      ts: new Date(t.dataHora).getTime(),
      tramitacao: t,
    })),
    ...votacoes.map<TimelineEntry>((v) => ({
      kind: "votacao",
      key: `v-${v.id}`,
      ts: new Date(v.dataHora).getTime(),
      votacao: v,
    })),
  ].sort((a, b) => b.ts - a.ts);

  return (
    <ol className="flex flex-col gap-3">
      {entries.map((entry) => (
        <li key={entry.key}>
          {entry.kind === "tramitacao" ? (
            <TramitacaoItem tramitacao={entry.tramitacao} />
          ) : (
            <VotacaoCard
              votacao={entry.votacao}
              proposicaoId={proposicaoId}
            />
          )}
        </li>
      ))}
    </ol>
  );
}
