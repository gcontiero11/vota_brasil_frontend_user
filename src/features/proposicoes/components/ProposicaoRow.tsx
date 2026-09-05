import Link from "next/link";
import {
  formatProposicaoIdentifier,
  formatRelativeDate,
} from "@/lib/format";
import type { Proposicao } from "../types";
import { StatusBadge } from "./StatusBadge";

interface ProposicaoRowProps {
  proposicao: Proposicao;
}

export function ProposicaoRow({ proposicao }: ProposicaoRowProps) {
  const identifier = formatProposicaoIdentifier(proposicao);

  return (
    <tr className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
      <td className="whitespace-nowrap px-4 py-3 text-sm font-semibold text-slate-900">
        {identifier}
      </td>
      <td className="px-4 py-3 text-sm text-slate-700">
        <p className="line-clamp-2">{proposicao.ementa ?? "—"}</p>
      </td>
      <td className="px-4 py-3 text-sm">
        <StatusBadge status={proposicao.status} />
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-600">
        {proposicao.ultimaMovimentacaoAt
          ? formatRelativeDate(proposicao.ultimaMovimentacaoAt)
          : "—"}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm">
        <Link
          href={`/proposicoes/${proposicao.id}`}
          className="font-medium text-brand-700 hover:text-brand-800 hover:underline"
          aria-label={`Ver detalhes da proposição ${identifier}`}
        >
          Detalhes →
        </Link>
      </td>
    </tr>
  );
}
