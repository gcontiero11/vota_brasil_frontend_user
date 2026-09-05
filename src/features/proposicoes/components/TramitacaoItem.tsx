import { formatDate } from "@/lib/format";
import type { Tramitacao } from "../types";

interface TramitacaoItemProps {
  tramitacao: Tramitacao;
}

export function TramitacaoItem({ tramitacao }: TramitacaoItemProps) {
  const meta = [
    tramitacao.siglaOrgao,
    tramitacao.regime,
    formatDate(tramitacao.dataHora),
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <div className="rounded-lg border border-slate-200 bg-white px-4 py-3">
      <div className="flex flex-col gap-1">
        <span className="inline-flex w-fit items-center rounded-full bg-slate-100 px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-slate-600 ring-1 ring-inset ring-slate-200">
          Tramitação
        </span>
        {tramitacao.descricaoSituacao ? (
          <p className="text-sm font-medium text-slate-900">
            {tramitacao.descricaoSituacao}
          </p>
        ) : null}
        {tramitacao.despacho ? (
          <p className="text-sm leading-relaxed text-slate-700">
            {tramitacao.despacho}
          </p>
        ) : null}
        <p className="text-xs text-slate-500">{meta}</p>
      </div>
    </div>
  );
}
