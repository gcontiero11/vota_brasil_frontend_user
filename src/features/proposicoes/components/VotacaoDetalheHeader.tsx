import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import type { VotacaoDetalhe, VotacaoResultado } from "../types";

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

interface VotacaoDetalheHeaderProps {
  votacao: VotacaoDetalhe;
}

export function VotacaoDetalheHeader({ votacao }: VotacaoDetalheHeaderProps) {
  return (
    <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {votacao.titulo}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(votacao.ocorridaEm)}
          </p>
        </div>
        <Badge variant={RESULTADO_VARIANT[votacao.resultado]}>
          {RESULTADO_LABEL[votacao.resultado]}
        </Badge>
      </div>

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

      {votacao.detalhesAdicionais ? (
        <p className="text-sm leading-relaxed text-slate-700">
          {votacao.detalhesAdicionais}
        </p>
      ) : null}
    </header>
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
    <div className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2">
      <dt className="text-xs uppercase tracking-wide text-slate-500">
        {label}
      </dt>
      <dd className="mt-0.5 text-base font-semibold text-slate-900">
        {value ?? "—"}
      </dd>
    </div>
  );
}
