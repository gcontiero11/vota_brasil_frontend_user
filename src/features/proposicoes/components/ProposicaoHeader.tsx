import {
  formatDate,
  formatProposicaoIdentifier,
  formatTipoLabel,
} from "@/lib/format";
import type { Proposicao } from "../types";
import { StatusBadge } from "./StatusBadge";

interface ProposicaoHeaderProps {
  proposicao: Proposicao;
}

export function ProposicaoHeader({ proposicao }: ProposicaoHeaderProps) {
  const identifier = formatProposicaoIdentifier(proposicao);

  return (
    <header className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          {identifier}
        </h1>
        <StatusBadge status={proposicao.status} />
      </div>
      <p className="text-sm text-slate-500">
        {formatTipoLabel(proposicao.tipo)}
      </p>
      <p className="text-base leading-relaxed text-slate-800">
        {proposicao.ementa ?? "Ementa não disponível."}
      </p>
      <dl className="mt-2 grid grid-cols-1 gap-3 border-t border-slate-200 pt-4 sm:grid-cols-2">
        <InfoItem
          label="Última movimentação"
          value={
            proposicao.ultimaMovimentacaoAt
              ? formatDate(proposicao.ultimaMovimentacaoAt)
              : "—"
          }
        />
        <InfoItem label="ID externo (Câmara)" value={String(proposicao.externalId)} />
      </dl>
    </header>
  );
}

function InfoItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-sm text-slate-800">{value}</dd>
    </div>
  );
}
