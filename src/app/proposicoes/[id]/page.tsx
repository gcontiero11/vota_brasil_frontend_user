import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProposicaoById } from "@/features/proposicoes/api";
import { DescricaoIA } from "@/features/proposicoes/components/DescricaoIA";
import { ProposicaoHeader } from "@/features/proposicoes/components/ProposicaoHeader";
import { TramitacoesList } from "@/features/proposicoes/components/TramitacoesList";
import { formatProposicaoIdentifier } from "@/lib/format";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const proposicao = await getProposicaoById(id);
  if (!proposicao) return { title: "Proposição não encontrada" };
  return { title: formatProposicaoIdentifier(proposicao) };
}

export default async function ProposicaoDetalhePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const proposicao = await getProposicaoById(id);
  if (!proposicao) notFound();

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

      <ProposicaoHeader proposicao={proposicao} />

      <Section
        title="Descrição (IA)"
        description="Resumo explicativo gerado por IA a partir do conteúdo oficial."
      >
        <DescricaoIA texto={proposicao.descricaoIA} />
      </Section>

      <Section
        title="Linha do tempo"
        description="Movimentações da proposição em ordem cronológica decrescente, incluindo votações."
      >
        <TramitacoesList tramitacoes={proposicao.tramitacoes} />
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
