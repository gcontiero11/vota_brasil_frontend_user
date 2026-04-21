import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export default function ProposicaoNotFound() {
  return (
    <EmptyState
      title="Proposição não encontrada"
      description="Verifique o identificador ou volte para a lista para explorar as proposições disponíveis."
      action={
        <Link
          href="/proposicoes"
          className="rounded-md bg-brand-600 px-4 py-2 text-sm font-medium text-white hover:bg-brand-700"
        >
          Voltar para a lista
        </Link>
      }
    />
  );
}
