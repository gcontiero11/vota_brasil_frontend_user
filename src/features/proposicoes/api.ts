import {
  getAllProposicoesMock,
  getProposicaoDetalheMock,
  getVotacaoDetalheMock,
} from "./mocks";
import type {
  ListProposicoesParams,
  ListVotosParams,
  Proposicao,
  ProposicaoDetalhe,
  VotacaoDetalhe,
} from "./types";

/**
 * A camada de API por enquanto lê dos mocks locais. A assinatura é assíncrona
 * de propósito — quando o backend real existir, trocaremos apenas a
 * implementação, mantendo o contrato.
 */

const FAKE_LATENCY_MS = 50;

function simulateLatency(): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, FAKE_LATENCY_MS));
}

export async function listProposicoes(
  params: ListProposicoesParams = {},
): Promise<Proposicao[]> {
  await simulateLatency();

  const { query, tipo, periodoDias } = params;
  let result = getAllProposicoesMock();

  if (tipo && tipo !== "TODOS") {
    result = result.filter((p) => p.tipo === tipo);
  }

  if (query && query.trim().length > 0) {
    const q = query.trim().toLowerCase();
    result = result.filter((p) => {
      const identifier = `${p.tipo} ${p.numero}/${p.ano}`.toLowerCase();
      return (
        identifier.includes(q) ||
        p.ementa.toLowerCase().includes(q) ||
        String(p.numero).includes(q)
      );
    });
  }

  if (periodoDias && periodoDias !== "TUDO") {
    const cutoff = Date.now() - periodoDias * 24 * 60 * 60 * 1000;
    result = result.filter(
      (p) => new Date(p.ultimaMovimentacaoAt).getTime() >= cutoff,
    );
  }

  return result.sort(
    (a, b) =>
      new Date(b.ultimaMovimentacaoAt).getTime() -
      new Date(a.ultimaMovimentacaoAt).getTime(),
  );
}

export async function getProposicaoById(
  id: string,
): Promise<ProposicaoDetalhe | null> {
  await simulateLatency();
  return getProposicaoDetalheMock(id);
}

export async function getVotacaoById(
  votacaoId: string,
  params: ListVotosParams = {},
): Promise<VotacaoDetalhe | null> {
  await simulateLatency();

  const detalhe = getVotacaoDetalheMock(votacaoId);
  if (!detalhe) return null;

  const partido = params.partido?.trim().toUpperCase();
  if (!partido) return detalhe;

  return {
    ...detalhe,
    votos: detalhe.votos.filter((v) => v.partido === partido),
  };
}
