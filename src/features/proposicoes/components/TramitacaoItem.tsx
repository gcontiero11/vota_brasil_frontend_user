import { ExpandablePanel } from "@/components/ui/ExpandablePanel";
import { formatDate } from "@/lib/format";
import type { Tramitacao } from "../types";
import { AISummaryPlaceholder } from "./AISummaryPlaceholder";

interface TramitacaoItemProps {
  tramitacao: Tramitacao;
}

export function TramitacaoItem({ tramitacao }: TramitacaoItemProps) {
  return (
    <ExpandablePanel
      ariaLabel={`Detalhes da tramitação: ${tramitacao.descricao}`}
      header={
        <div className="flex flex-col gap-0.5">
          <p className="text-sm font-medium text-slate-900">
            {tramitacao.descricao}
          </p>
          <p className="text-xs text-slate-500">
            {tramitacao.orgao} · {formatDate(tramitacao.ocorridaEm)}
          </p>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        {tramitacao.detalhesAdicionais ? (
          <p className="text-sm leading-relaxed text-slate-700">
            {tramitacao.detalhesAdicionais}
          </p>
        ) : (
          <p className="text-sm italic text-slate-500">
            Sem detalhes adicionais registrados.
          </p>
        )}
        <AISummaryPlaceholder message="Ainda não há resumo por IA disponível para esta tramitação." />
      </div>
    </ExpandablePanel>
  );
}
