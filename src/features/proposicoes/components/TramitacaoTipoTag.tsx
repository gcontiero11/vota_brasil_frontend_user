import type { TramitacaoTipo } from "../types";

const TIPO_LABEL: Record<TramitacaoTipo, string> = {
  DISTRIBUICAO: "Distribuição",
  RELATOR: "Relator",
  PARECER: "Parecer",
  VOTACAO: "Votação",
  ENCAMINHAMENTO: "Encaminhamento",
  FINALIZACAO: "Finalização",
  REATIVACAO: "Reativação",
};

const TIPO_CLASSES: Record<TramitacaoTipo, string> = {
  DISTRIBUICAO: "bg-blue-50 text-blue-700 ring-blue-200",
  RELATOR: "bg-purple-50 text-purple-700 ring-purple-200",
  PARECER: "bg-amber-50 text-amber-700 ring-amber-200",
  VOTACAO: "bg-brand-50 text-brand-700 ring-brand-200",
  ENCAMINHAMENTO: "bg-cyan-50 text-cyan-700 ring-cyan-200",
  FINALIZACAO: "bg-slate-100 text-slate-700 ring-slate-200",
  REATIVACAO: "bg-pink-50 text-pink-700 ring-pink-200",
};

interface TramitacaoTipoTagProps {
  tipo: TramitacaoTipo;
}

export function TramitacaoTipoTag({ tipo }: TramitacaoTipoTagProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide ring-1 ring-inset ${TIPO_CLASSES[tipo]}`}
    >
      {TIPO_LABEL[tipo]}
    </span>
  );
}

export const __private = { TIPO_LABEL, TIPO_CLASSES };
