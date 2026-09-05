import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProposicaoById } from "@/features/proposicoes/api";
import { ProposicaoHeader } from "@/features/proposicoes/components/ProposicaoHeader";
import { TramitacoesList } from "@/features/proposicoes/components/TramitacoesList";
import { formatProposicaoIdentifier } from "@/lib/format";

function parseId(raw: string): number | null {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const numericId = parseId(id);
  if (numericId === null) return { title: "Proposição não encontrada" };

  const detalhe = await getProposicaoById(numericId);
  if (!detalhe) return { title: "Proposição não encontrada" };
  return { title: formatProposicaoIdentifier(detalhe.proposicao) };
}

export default async function ProposicaoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const numericId = parseId(id);
  if (numericId === null) notFound();

  const detalhe = await getProposicaoById(numericId);
  if (!detalhe) notFound();

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Voltar">
        <Link
          href="/proposicoes"
          className="text-sm font-medium text-brand-700 hover:text-brand-800 hover:underline"
        >
          ← Voltar para lista
        </Link>
      </nav>

      <ProposicaoHeader proposicao={detalhe.proposicao} />

      <Section
        title="Linha do tempo"
        description="Tramitações e votações da proposição em ordem cronológica decrescente."
      >
        <TramitacoesList
          proposicaoId={detalhe.proposicao.id}
          tramitacoes={detalhe.tramitacoes}
          votacoes={detalhe.votacoes}
        />
      </Section>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
      {children}
    </section>
  );
}
