import { Badge } from "@/components/ui/Badge";
import { formatDate } from "@/lib/format";
import {
  categorizeVotacaoResultado,
  votacaoResultadoVariant,
} from "../normalize";
import type { Votacao } from "../types";

interface VotacaoDetalheHeaderProps {
  votacao: Votacao;
}

const CATEGORIA_LABEL: Record<
  ReturnType<typeof categorizeVotacaoResultado>,
  string
> = {
  aprovada: "Aprovada",
  rejeitada: "Rejeitada",
  pendente: "Pendente",
};

export function VotacaoDetalheHeader({ votacao }: VotacaoDetalheHeaderProps) {
  const resultadoLabel =
    votacao.resultado ?? CATEGORIA_LABEL[categorizeVotacaoResultado(null)];

  return (
    <header className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
            {votacao.descricao ?? "Votação"}
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            {formatDate(votacao.dataHora)}
            {votacao.tipoRaw ? ` · ${votacao.tipoRaw}` : ""}
          </p>
        </div>
        <Badge variant={votacaoResultadoVariant(votacao.resultado)}>
          {resultadoLabel}
        </Badge>
      </div>
    </header>
  );
}
