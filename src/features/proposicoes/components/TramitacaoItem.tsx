import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import { ExpandablePanel } from "@/components/ui/ExpandablePanel";
import { formatDate } from "@/lib/format";
import type { Tramitacao, Votacao, VotacaoResultado } from "../types";
import { TramitacaoTipoTag } from "./TramitacaoTipoTag";

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

interface TramitacaoItemProps {
  tramitacao: Tramitacao;
}

export function TramitacaoItem({ tramitacao }: TramitacaoItemProps) {
  const votacao = tramitacao.tipo === "VOTACAO" ? tramitacao.votacao : undefined;

  return (
    <ExpandablePanel
      ariaLabel={`Detalhes da tramitação: ${tramitacao.descricao}`}
      header={
        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-start sm:justify-between sm:gap-3">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              <TramitacaoTipoTag tipo={tramitacao.tipo} />
            </div>
            <p className="text-sm font-medium text-slate-900">
              {tramitacao.descricao}
            </p>
            <p className="text-xs text-slate-500">
              {tramitacao.orgao} · {formatDate(tramitacao.ocorridaEm)}
            </p>
          </div>
          {votacao ? (
            <Badge variant={RESULTADO_VARIANT[votacao.resultado]}>
              {RESULTADO_LABEL[votacao.resultado]}
            </Badge>
          ) : null}
        </div>
      }
    >
      {votacao ? (
        <VotacaoConteudo votacao={votacao} />
      ) : (
        <TramitacaoConteudo tramitacao={tramitacao} />
      )}
    </ExpandablePanel>
  );
}

function TramitacaoConteudo({ tramitacao }: { tramitacao: Tramitacao }) {
  if (tramitacao.detalhesAdicionais) {
    return (
      <p className="text-sm leading-relaxed text-slate-700">
        {tramitacao.detalhesAdicionais}
      </p>
    );
  }
  return (
    <p className="text-sm italic text-slate-500">
      Sem detalhes adicionais registrados.
    </p>
  );
}

function VotacaoConteudo({ votacao }: { votacao: Votacao }) {
  return (
    <div className="flex flex-col gap-3">
      {votacao.resumo ? (
        <p className="text-sm leading-relaxed text-slate-700">
          {votacao.resumo}
        </p>
      ) : null}
      {votacao.placar ? (
        <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          <PlacarCell label="Sim" value={votacao.placar.sim} />
          <PlacarCell label="Não" value={votacao.placar.nao} />
          <PlacarCell label="Abstenção" value={votacao.placar.abstencao} />
          <PlacarCell label="Ausente" value={votacao.placar.ausente} />
        </dl>
      ) : (
        <p className="text-sm italic text-slate-500">
          Placar ainda não divulgado.
        </p>
      )}
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
