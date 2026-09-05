import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getVotacaoById } from "@/features/proposicoes/api";
import { VotacaoDetalheHeader } from "@/features/proposicoes/components/VotacaoDetalheHeader";
import { VotosFilters } from "@/features/proposicoes/components/VotosFilters";
import { VotosTable } from "@/features/proposicoes/components/VotosTable";

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; votacaoId: string }>;
}): Promise<Metadata> {
  const { votacaoId } = await params;
  const numericId = parseId(votacaoId);
  if (numericId === null) return { title: "Votação não encontrada" };

  const detalhe = await getVotacaoById(numericId);
  if (!detalhe) return { title: "Votação não encontrada" };
  return { title: detalhe.votacao.descricao ?? "Votação" };
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

  const numericId = parseId(votacaoId);
  if (numericId === null) notFound();

  const detalhe = await getVotacaoById(numericId);
  if (!detalhe) notFound();

  const partidosDisponiveis = Array.from(
    new Set(
      detalhe.votos
        .map((v) => v.deputado?.siglaPartido)
        .filter((p): p is string => Boolean(p)),
    ),
  ).sort();

  const partidoSelecionado =
    partidoRaw && partidosDisponiveis.includes(partidoRaw.toUpperCase())
      ? partidoRaw.toUpperCase()
      : null;

  const votosExibidos = partidoSelecionado
    ? detalhe.votos.filter(
        (v) => v.deputado?.siglaPartido === partidoSelecionado,
      )
    : detalhe.votos;

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

      <VotacaoDetalheHeader votacao={detalhe.votacao} />

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
