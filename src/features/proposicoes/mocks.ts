import type {
  Proposicao,
  ProposicaoDetalhe,
  Tramitacao,
  Votacao,
  VotacaoDetalhe,
  VotoIndividual,
  VotoResultado,
} from "./types";

/**
 * Dados fictícios — nomes e propostas inventados, sem correspondência com
 * parlamentares ou proposições reais.
 */

const proposicoes: Proposicao[] = [
  {
    id: "p-001",
    tipo: "PL",
    numero: 2345,
    ano: 2024,
    ementa:
      "Institui o Programa Nacional de Incentivo à Leitura em escolas públicas de ensino fundamental.",
    autoria: { nome: "Dep. Ana Ribeiro", partido: "PFAM", uf: "SP" },
    status: "em_tramitacao",
    ultimaMovimentacaoAt: daysAgo(2),
  },
  {
    id: "p-002",
    tipo: "PEC",
    numero: 17,
    ano: 2024,
    ementa:
      "Altera o art. 208 da Constituição para ampliar o direito ao ensino médio em tempo integral.",
    autoria: { nome: "Dep. Bruno Teixeira", partido: "PPRO", uf: "MG" },
    status: "pronta_para_pauta",
    ultimaMovimentacaoAt: hoursAgo(5),
  },
  {
    id: "p-003",
    tipo: "MPV",
    numero: 1188,
    ano: 2025,
    ementa:
      "Dispõe sobre medidas emergenciais de apoio à agricultura familiar em regiões afetadas por estiagem.",
    autoria: { nome: "Poder Executivo" },
    status: "aprovada",
    ultimaMovimentacaoAt: daysAgo(9),
  },
  {
    id: "p-004",
    tipo: "PLP",
    numero: 42,
    ano: 2023,
    ementa:
      "Dispõe sobre normas gerais para a cobrança de tributos municipais sobre plataformas digitais de transporte.",
    autoria: { nome: "Dep. Clara Monteiro", partido: "PNOV", uf: "RS" },
    status: "arquivada",
    ultimaMovimentacaoAt: daysAgo(220),
  },
  {
    id: "p-005",
    tipo: "PDL",
    numero: 301,
    ano: 2024,
    ementa:
      "Susta os efeitos do Decreto nº 9.999/2024 que regulamenta a concessão de subsídios à aviação regional.",
    autoria: { nome: "Dep. Daniel Barros", partido: "PLIB", uf: "BA" },
    status: "rejeitada",
    ultimaMovimentacaoAt: daysAgo(45),
  },
  {
    id: "p-006",
    tipo: "PL",
    numero: 501,
    ano: 2025,
    ementa:
      "Cria a Política Nacional de Dados Abertos para Municípios e institui diretrizes para interoperabilidade.",
    autoria: { nome: "Dep. Eduarda Lima", partido: "PCID", uf: "PE" },
    status: "em_tramitacao",
    ultimaMovimentacaoAt: daysAgo(14),
  },
  {
    id: "p-007",
    tipo: "PL",
    numero: 8820,
    ano: 2023,
    ementa:
      "Regulamenta o trabalho por aplicativos e estabelece direitos mínimos para motoristas e entregadores.",
    autoria: { nome: "Dep. Felipe Araújo", partido: "PTRA", uf: "RJ" },
    status: "pronta_para_pauta",
    ultimaMovimentacaoAt: daysAgo(30),
  },
  {
    id: "p-008",
    tipo: "PEC",
    numero: 9,
    ano: 2025,
    ementa:
      "Inclui o saneamento básico universal como direito social no art. 6º da Constituição Federal.",
    autoria: { nome: "Dep. Giovana Souza", partido: "PDEM", uf: "CE" },
    status: "em_tramitacao",
    ultimaMovimentacaoAt: hoursAgo(18),
  },
];

const tramitacoesPorProposicao: Record<string, Tramitacao[]> = {
  "p-001": [
    {
      id: "t-001-01",
      proposicaoId: "p-001",
      descricao: "Apresentação do projeto em plenário.",
      orgao: "Plenário",
      ocorridaEm: daysAgo(120),
      detalhesAdicionais:
        "Apresentação formal do texto original e leitura da ementa.",
    },
    {
      id: "t-001-02",
      proposicaoId: "p-001",
      descricao: "Distribuição à Comissão de Educação.",
      orgao: "CEDUC",
      ocorridaEm: daysAgo(110),
    },
    {
      id: "t-001-03",
      proposicaoId: "p-001",
      descricao: "Designação do relator na Comissão de Educação.",
      orgao: "CEDUC",
      ocorridaEm: daysAgo(90),
      detalhesAdicionais:
        "Relatoria designada após acordo entre as lideranças partidárias.",
    },
    {
      id: "t-001-04",
      proposicaoId: "p-001",
      descricao: "Apresentação de parecer favorável com emendas.",
      orgao: "CEDUC",
      ocorridaEm: daysAgo(30),
    },
    {
      id: "t-001-05",
      proposicaoId: "p-001",
      descricao: "Requerimento de urgência em análise.",
      orgao: "Mesa Diretora",
      ocorridaEm: daysAgo(2),
    },
  ],
  "p-002": [
    {
      id: "t-002-01",
      proposicaoId: "p-002",
      descricao: "Protocolo da Proposta de Emenda à Constituição.",
      orgao: "Mesa Diretora",
      ocorridaEm: daysAgo(200),
    },
    {
      id: "t-002-02",
      proposicaoId: "p-002",
      descricao: "Admissibilidade aprovada pela CCJ.",
      orgao: "CCJ",
      ocorridaEm: daysAgo(150),
      detalhesAdicionais:
        "Admissibilidade aprovada por 40 votos a 18, sem declaração de voto em destaque.",
    },
    {
      id: "t-002-03",
      proposicaoId: "p-002",
      descricao: "Designação de Comissão Especial.",
      orgao: "Mesa Diretora",
      ocorridaEm: daysAgo(120),
    },
    {
      id: "t-002-04",
      proposicaoId: "p-002",
      descricao: "Aprovação do parecer do relator na Comissão Especial.",
      orgao: "Comissão Especial",
      ocorridaEm: daysAgo(20),
    },
  ],
  "p-003": [
    {
      id: "t-003-01",
      proposicaoId: "p-003",
      descricao: "Edição da Medida Provisória pelo Poder Executivo.",
      orgao: "Presidência da República",
      ocorridaEm: daysAgo(80),
    },
    {
      id: "t-003-02",
      proposicaoId: "p-003",
      descricao: "Instalação da comissão mista.",
      orgao: "Comissão Mista",
      ocorridaEm: daysAgo(60),
    },
    {
      id: "t-003-03",
      proposicaoId: "p-003",
      descricao: "Aprovação na Câmara dos Deputados.",
      orgao: "Plenário",
      ocorridaEm: daysAgo(20),
      detalhesAdicionais:
        "Aprovada com alterações no texto original, redação final publicada no DCD.",
    },
  ],
  // p-004 e p-005 propositalmente sem tramitações para exercitar empty state.
  "p-006": [
    {
      id: "t-006-01",
      proposicaoId: "p-006",
      descricao: "Apresentação em plenário.",
      orgao: "Plenário",
      ocorridaEm: daysAgo(60),
    },
    {
      id: "t-006-02",
      proposicaoId: "p-006",
      descricao: "Encaminhamento para CCTCI.",
      orgao: "CCTCI",
      ocorridaEm: daysAgo(14),
    },
  ],
  "p-007": [
    {
      id: "t-007-01",
      proposicaoId: "p-007",
      descricao: "Audiência pública realizada em comissão especial.",
      orgao: "Comissão Especial",
      ocorridaEm: daysAgo(60),
      detalhesAdicionais:
        "Audiência contou com representantes de entidades de trabalhadores e plataformas digitais.",
    },
    {
      id: "t-007-02",
      proposicaoId: "p-007",
      descricao: "Parecer do relator apresentado.",
      orgao: "Comissão Especial",
      ocorridaEm: daysAgo(45),
    },
    {
      id: "t-007-03",
      proposicaoId: "p-007",
      descricao: "Aguardando designação em plenário.",
      orgao: "Plenário",
      ocorridaEm: daysAgo(30),
    },
  ],
  "p-008": [
    {
      id: "t-008-01",
      proposicaoId: "p-008",
      descricao: "Apresentação da PEC.",
      orgao: "Mesa Diretora",
      ocorridaEm: hoursAgo(36),
    },
  ],
};

const votacoesPorProposicao: Record<string, Votacao[]> = {
  "p-001": [
    {
      id: "v-001-01",
      proposicaoId: "p-001",
      titulo: "Aprovação do parecer do relator",
      ocorridaEm: daysAgo(30),
      resultado: "aprovada",
      placar: { sim: 30, nao: 12, abstencao: 6, ausente: 2 },
      detalhesAdicionais:
        "Parecer aprovado com emendas substitutivas, sem obstrução em plenário.",
    },
  ],
  "p-002": [
    {
      id: "v-002-01",
      proposicaoId: "p-002",
      titulo: "Admissibilidade na CCJ",
      ocorridaEm: daysAgo(150),
      resultado: "aprovada",
      placar: { sim: 32, nao: 14, abstencao: 2, ausente: 2 },
    },
    {
      id: "v-002-02",
      proposicaoId: "p-002",
      titulo: "Aprovação de parecer — Comissão Especial",
      ocorridaEm: daysAgo(20),
      resultado: "aprovada",
      placar: { sim: 28, nao: 16, abstencao: 4, ausente: 2 },
    },
  ],
  "p-003": [
    {
      id: "v-003-01",
      proposicaoId: "p-003",
      titulo: "Aprovação em plenário",
      ocorridaEm: daysAgo(20),
      resultado: "aprovada",
      placar: { sim: 30, nao: 10, abstencao: 3, ausente: 7 },
    },
  ],
  "p-005": [
    {
      id: "v-005-01",
      proposicaoId: "p-005",
      titulo: "Votação nominal do PDL em plenário",
      ocorridaEm: daysAgo(45),
      resultado: "rejeitada",
      placar: { sim: 18, nao: 28, abstencao: 3, ausente: 1 },
    },
  ],
  "p-007": [
    {
      id: "v-007-01",
      proposicaoId: "p-007",
      titulo: "Aprovação de parecer na Comissão Especial",
      ocorridaEm: daysAgo(45),
      resultado: "aprovada",
      placar: { sim: 26, nao: 18, abstencao: 4, ausente: 2 },
    },
    {
      id: "v-007-02",
      proposicaoId: "p-007",
      titulo: "Urgência — votação pendente",
      ocorridaEm: daysAgo(30),
      resultado: "pendente",
    },
  ],
};

const descricoesIA: Record<string, string | null> = {
  "p-001":
    "O projeto propõe a criação de um programa federal permanente para estimular práticas de leitura em escolas de ensino fundamental, com previsão de repasses a bibliotecas escolares e formação de mediadores.",
  "p-002":
    "A PEC amplia o direito constitucional ao ensino médio em tempo integral, prevendo metas de expansão progressiva pelos entes federados e regra de transição em dez anos.",
  "p-003":
    "A Medida Provisória estabelece linhas de crédito emergenciais, renegociação de dívidas e assistência técnica a produtores familiares em áreas com situação reconhecida de emergência.",
  "p-004": null,
  "p-005":
    "O Decreto Legislativo buscava sustar regulamento que ampliava subsídios federais à aviação regional sob a justificativa de revisão fiscal. Foi rejeitado em plenário.",
  "p-006": null,
  "p-007":
    "O projeto regulamenta o trabalho mediado por plataformas digitais, definindo direitos mínimos, contribuição previdenciária e regras de transparência algorítmica para motoristas e entregadores.",
  "p-008":
    "A PEC inclui saneamento básico entre os direitos sociais previstos no art. 6º da Constituição, com impacto em políticas públicas de universalização do serviço.",
};

const DEPUTADOS_POOL: Array<{ deputado: string; partido: string; uf: string }> = [
  { deputado: "Ana Ribeiro", partido: "PFAM", uf: "SP" },
  { deputado: "Bruno Teixeira", partido: "PPRO", uf: "MG" },
  { deputado: "Clara Monteiro", partido: "PNOV", uf: "RS" },
  { deputado: "Daniel Barros", partido: "PLIB", uf: "BA" },
  { deputado: "Felipe Araújo", partido: "PTRA", uf: "RJ" },
  { deputado: "Giovana Souza", partido: "PDEM", uf: "CE" },
  { deputado: "Eduarda Lima", partido: "PCID", uf: "PE" },
  { deputado: "Helena Cardoso", partido: "PFAM", uf: "SC" },
  { deputado: "Igor Pimenta", partido: "PPRO", uf: "GO" },
  { deputado: "Juliana Freitas", partido: "PNOV", uf: "ES" },
  { deputado: "Karla Mendonça", partido: "PLIB", uf: "PA" },
  { deputado: "Marcos Vieira", partido: "PTRA", uf: "PR" },
  { deputado: "Nathalia Ramos", partido: "PDEM", uf: "MT" },
  { deputado: "Lucas Andrade", partido: "PCID", uf: "AM" },
  { deputado: "Otávio Correia", partido: "PFAM", uf: "DF" },
  { deputado: "Patrícia Moura", partido: "PPRO", uf: "AL" },
  { deputado: "Rafael Dias", partido: "PNOV", uf: "PB" },
  { deputado: "Sofia Nascimento", partido: "PLIB", uf: "MS" },
  { deputado: "Úrsula Pinto", partido: "PTRA", uf: "MA" },
  { deputado: "Vinicius Castro", partido: "PDEM", uf: "PI" },
  { deputado: "Tiago Batista", partido: "PCID", uf: "TO" },
  { deputado: "Wagner Siqueira", partido: "PFAM", uf: "SE" },
  { deputado: "Yasmin Rocha", partido: "PPRO", uf: "RN" },
  { deputado: "Zeca Nogueira", partido: "PNOV", uf: "AC" },
  { deputado: "Alice Farias", partido: "PLIB", uf: "RR" },
  { deputado: "Cíntia Brandão", partido: "PTRA", uf: "AP" },
  { deputado: "Diego Henriques", partido: "PDEM", uf: "RO" },
  { deputado: "Breno Tavares", partido: "PCID", uf: "SP" },
  { deputado: "Érica Pires", partido: "PFAM", uf: "MG" },
  { deputado: "Fábio Moura", partido: "PPRO", uf: "RJ" },
  { deputado: "Gabriela Ferraz", partido: "PNOV", uf: "BA" },
  { deputado: "Hugo Vasconcelos", partido: "PLIB", uf: "RS" },
  { deputado: "João Fontes", partido: "PTRA", uf: "PE" },
  { deputado: "Larissa Moraes", partido: "PDEM", uf: "CE" },
  { deputado: "Isabela Neves", partido: "PCID", uf: "PR" },
  { deputado: "Murilo Paiva", partido: "PFAM", uf: "GO" },
  { deputado: "Nina Guedes", partido: "PPRO", uf: "SC" },
  { deputado: "Orlando Sampaio", partido: "PNOV", uf: "ES" },
  { deputado: "Paula Azevedo", partido: "PLIB", uf: "PA" },
  { deputado: "Ricardo Tonelli", partido: "PTRA", uf: "DF" },
  { deputado: "Sabrina Lobo", partido: "PDEM", uf: "MT" },
  { deputado: "Quésia Ventura", partido: "PCID", uf: "AM" },
  { deputado: "Túlio Marinho", partido: "PFAM", uf: "AL" },
  { deputado: "Viviane Caldas", partido: "PPRO", uf: "PB" },
  { deputado: "Xavier Rezende", partido: "PNOV", uf: "MS" },
  { deputado: "Yuri Campelo", partido: "PLIB", uf: "MA" },
  { deputado: "Zélia Paz", partido: "PTRA", uf: "PI" },
  { deputado: "Antônio Cabral", partido: "PDEM", uf: "TO" },
  { deputado: "Beatriz Magalhães", partido: "PCID", uf: "SE" },
  { deputado: "Celso Furlan", partido: "PFAM", uf: "RN" },
];

const VOTO_ORDER: VotoResultado[] = [
  "sim",
  "nao",
  "abstencao",
  "ausente",
  "obstrucao",
];

function buildVotos(
  votacaoId: string,
  counts: Partial<Record<VotoResultado, number>>,
): VotoIndividual[] {
  const sequence: VotoResultado[] = [];
  for (const resultado of VOTO_ORDER) {
    const n = counts[resultado] ?? 0;
    for (let i = 0; i < n; i++) sequence.push(resultado);
  }
  if (sequence.length > DEPUTADOS_POOL.length) {
    throw new Error(
      `buildVotos: ${votacaoId} excede o pool de ${DEPUTADOS_POOL.length} deputados.`,
    );
  }
  return sequence.map((resultado, i) => {
    const dep = DEPUTADOS_POOL[i]!;
    return {
      id: `${votacaoId}-voto-${String(i + 1).padStart(2, "0")}`,
      deputado: dep.deputado,
      partido: dep.partido,
      uf: dep.uf,
      resultado,
    };
  });
}

const votosPorVotacao: Record<string, VotoIndividual[]> = {
  "v-001-01": buildVotos("v-001-01", { sim: 30, nao: 12, abstencao: 6, ausente: 2 }),
  "v-002-01": buildVotos("v-002-01", { sim: 32, nao: 14, abstencao: 2, ausente: 2 }),
  "v-002-02": buildVotos("v-002-02", { sim: 28, nao: 16, abstencao: 4, ausente: 2 }),
  "v-003-01": buildVotos("v-003-01", { sim: 30, nao: 10, abstencao: 3, ausente: 7 }),
  "v-005-01": buildVotos("v-005-01", { sim: 18, nao: 28, abstencao: 3, ausente: 1 }),
  "v-007-01": buildVotos("v-007-01", { sim: 26, nao: 18, abstencao: 4, ausente: 2 }),
  "v-007-02": [],
};

function findVotacaoById(
  votacaoId: string,
): { votacao: Votacao; proposicaoId: string } | null {
  for (const [proposicaoId, lista] of Object.entries(votacoesPorProposicao)) {
    const found = lista.find((v) => v.id === votacaoId);
    if (found) return { votacao: found, proposicaoId };
  }
  return null;
}

function daysAgo(days: number): string {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

function hoursAgo(hours: number): string {
  const d = new Date();
  d.setHours(d.getHours() - hours);
  return d.toISOString();
}

export function getAllProposicoesMock(): Proposicao[] {
  return [...proposicoes];
}

export function getProposicaoDetalheMock(
  id: string,
): ProposicaoDetalhe | null {
  const base = proposicoes.find((p) => p.id === id);
  if (!base) return null;
  return {
    ...base,
    tramitacoes: [...(tramitacoesPorProposicao[id] ?? [])],
    votacoes: [...(votacoesPorProposicao[id] ?? [])],
    descricaoIA: descricoesIA[id] ?? null,
  };
}

export function getVotacaoDetalheMock(
  votacaoId: string,
): VotacaoDetalhe | null {
  const hit = findVotacaoById(votacaoId);
  if (!hit) return null;
  return {
    ...hit.votacao,
    votos: [...(votosPorVotacao[votacaoId] ?? [])],
  };
}
