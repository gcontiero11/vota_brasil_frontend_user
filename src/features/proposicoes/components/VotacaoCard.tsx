import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import {
  categorizeVotacaoResultado,
  votacaoResultadoVariant,
} from "../normalize";
import type { Votacao } from "../types";

interface VotacaoCardProps {
  votacao: Votacao;
  proposicaoId: number;
}

const CATEGORIA_LABEL: Record<
  ReturnType<typeof categorizeVotacaoResultado>,
  string
> = {
  aprovada: "Aprovada",
  rejeitada: "Rejeitada",
  pendente: "Pendente",
};

export function VotacaoCard({ votacao, proposicaoId }: VotacaoCardProps) {
  const resultadoLabel =
    votacao.resultado ?? CATEGORIA_LABEL[categorizeVotacaoResultado(null)];

  return (
    <div className="rounded-lg border border-brand-200 bg-brand-50/40 px-4 py-3">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex flex-col gap-1">
            <span className="inline-flex w-fit items-center rounded-full bg-brand-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-brand-700 ring-1 ring-inset ring-brand-200">
              Votação
            </span>
            <p className="text-sm font-medium text-slate-900">
              {votacao.descricao ?? "Votação sem descrição"}
            </p>
            <p className="text-xs text-slate-500">
              {formatDate(votacao.dataHora)}
              {votacao.tipoRaw ? ` · ${votacao.tipoRaw}` : ""}
            </p>
          </div>
          <Badge variant={votacaoResultadoVariant(votacao.resultado)}>
            {resultadoLabel}
          </Badge>
        </div>
        <div className="flex justify-end">
          <Link
            href={`/proposicoes/${proposicaoId}/votacoes/${votacao.id}`}
            className="text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
            aria-label={`Ver votos da votação: ${votacao.descricao ?? votacao.externalId}`}
          >
            Ver votos →
          </Link>
        </div>
      </div>
    </div>
  );
}
