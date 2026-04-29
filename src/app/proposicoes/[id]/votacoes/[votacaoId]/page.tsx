import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVotacaoById } from "@/features/proposicoes/api";
import { VotacaoDetalheHeader } from "@/features/proposicoes/components/VotacaoDetalheHeader";
import { VotosFilters } from "@/features/proposicoes/components/VotosFilters";
import { VotosTable } from "@/features/proposicoes/components/VotosTable";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; votacaoId: string }>;
}): Promise<Metadata> {
  const { votacaoId } = await params;
  const votacao = await getVotacaoById(votacaoId);
  if (!votacao) return { title: "Votação não encontrada" };
  return { title: votacao.titulo };
}

export default async function VotacaoDetalhePage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string; votacaoId: string }>;
  searchParams: Promise<{ partido?: string }>;
}) {
  const { id: proposicaoId, votacaoId } = await params;
  const { partido: partidoRaw } = await searchParams;

  const votacao = await getVotacaoById(votacaoId);
  if (!votacao) notFound();

  const partidosDisponiveis = Array.from(
    new Set(votacao.votos.map((v) => v.partido)),
  ).sort();

  const partidoSelecionado =
    partidoRaw && partidosDisponiveis.includes(partidoRaw.toUpperCase())
      ? partidoRaw.toUpperCase()
      : null;

  const votosExibidos = partidoSelecionado
    ? votacao.votos.filter((v) => v.partido === partidoSelecionado)
    : votacao.votos;

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Voltar">
        <Link
          href={`/proposicoes/${proposicaoId}`}
          className="text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
        >
          ← Voltar para a proposição
        </Link>
      </nav>

      <VotacaoDetalheHeader votacao={votacao} />

      <section className="flex flex-col gap-3">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">Votos</h2>
          <p className="text-sm text-slate-600">
            {votosExibidos.length === 1
              ? "1 voto"
              : `${votosExibidos.length} votos`}
            {partidoSelecionado ? ` do ${partidoSelecionado}` : ""}
          </p>
        </div>

        <VotosFilters
          partidos={partidosDisponiveis}
          selected={partidoSelecionado}
        />

        <VotosTable votos={votosExibidos} />
      </section>
    </div>
  );
}
