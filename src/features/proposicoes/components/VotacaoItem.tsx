import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import { ExpandablePanel } from "@/components/ui/ExpandablePanel";
import { formatDate } from "@/lib/format";
import type { Votacao, VotacaoResultado } from "../types";
import { AISummaryPlaceholder } from "./AISummaryPlaceholder";

const RESULTADO_LABEL: Record<VotacaoResultado, string> = {
  aprovada: "Aprovada",
  rejeitada: "Rejeitada",
  pendente: "Pendente",
};

const RESULTADO_VARIANT: Record<VotacaoResultado, BadgeVariant> = {
  aprovada: "success",
  rejeitada: "danger",
  pendente: "warning",
};

interface VotacaoItemProps {
  votacao: Votacao;
}

export function VotacaoItem({ votacao }: VotacaoItemProps) {
  return (
    <ExpandablePanel
      ariaLabel={`Detalhes da votação: ${votacao.titulo}`}
      header={
        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-slate-900">
              {votacao.titulo}
            </p>
            <p className="text-xs text-slate-500">
              {formatDate(votacao.ocorridaEm)}
            </p>
          </div>
          <Badge variant={RESULTADO_VARIANT[votacao.resultado]}>
            {RESULTADO_LABEL[votacao.resultado]}
          </Badge>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {votacao.placar ? (
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            <PlacarCell label="Sim" value={votacao.placar.sim} />
            <PlacarCell label="Não" value={votacao.placar.nao} />
            <PlacarCell
              label="Abstenção"
              value={votacao.placar.abstencao}
            />
            <PlacarCell label="Ausente" value={votacao.placar.ausente} />
          </dl>
        ) : (
          <p className="text-sm italic text-slate-500">
            Placar ainda não divulgado.
          </p>
        )}
        {votacao.detalhesAdicionais ? (
          <p className="text-sm leading-relaxed text-slate-700">
            {votacao.detalhesAdicionais}
          </p>
        ) : null}
        <AISummaryPlaceholder message="Ainda não há resumo por IA disponível para esta votação." />
        <div className="flex justify-end">
          <Link
            href={`/proposicoes/${votacao.proposicaoId}/votacoes/${votacao.id}`}
            className="text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
            aria-label={`Ver votos da votação: ${votacao.titulo}`}
          >
            Ver votos →
          </Link>
        </div>
      </div>
    </ExpandablePanel>
  );
}

function PlacarCell({
  label,
  value,
}: {
  label: string;
  value: number | undefined;
}) {
  return (
    <div className="rounded-md border border-slate-200 bg-white px-3 py-2">
      <dt className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-base font-semibold text-slate-900">
        {value ?? "—"}
      </dd>
    </div>
  );
}
