import { AISummaryPlaceholder } from "./AISummaryPlaceholder";

interface DescricaoIAProps {
  texto: string | null;
}

export function DescricaoIA({ texto }: DescricaoIAProps) {
  if (!texto) {
    return (
      <AISummaryPlaceholder message="Ainda não há resumo por IA disponível para esta proposição." />
    );
  }

  return (
    <div className="rounded-md border border-slate-200 bg-white p-4">
      <div className="mb-2 flex items-center gap-2">
        <span className="inline-flex items-center rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 ring-1 ring-inset ring-brand-200">
          Resumo gerado por IA
        </span>
        <span className="text-xs text-slate-500">
          pode conter imprecisões
        </span>
      </div>
      <p className="text-sm leading-relaxed text-slate-700">{texto}</p>
    </div>
  );
}
