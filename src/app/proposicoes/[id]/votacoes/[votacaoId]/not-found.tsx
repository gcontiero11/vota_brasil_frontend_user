import Link from "next/link";
import { EmptyState } from "@/components/ui/EmptyState";

export default function VotacaoNotFound() {
  return (
    <EmptyState
      title="Votação não encontrada"
      description="Verifique o identificador ou volte para a lista de proposições."
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
