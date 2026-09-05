# Vota Brasil API — Documentação para o Frontend

Guia para conectar o painel admin (e qualquer cliente) à API REST do backend.

---

## Quick start

```ts
const API_BASE = "http://localhost:8080";

const res = await fetch(`${API_BASE}/proposicoes?page=1&limit=20`);
const json = await res.json();
// json.data: Proposicao[]
// json.pagination: { page, limit, total }
```

- **Base URL**: `http://localhost:8080` em desenvolvimento
- **Content-Type**: todas as respostas são `application/json`
- **Auth**: nenhuma na V1 — proteger por rede / VPN
- **Sem prefixo `/api/v1`** — endpoints estão na raiz

---

## CORS

CORS está habilitado e configurável via env. Default permite `http://localhost:3000` (Next.js dev).

```bash
# default
CORS_ALLOWED_ORIGINS=http://localhost:3000

# múltiplas origens (CSV)
CORS_ALLOWED_ORIGINS=http://localhost:3000,https://staging.vota-brasil.com.br

# desenvolvimento livre (não usar em prod)
CORS_ALLOWED_ORIGINS=*
```

Métodos permitidos: `GET, POST, PUT, PATCH, DELETE, OPTIONS`. Headers permitidos: `Accept, Content-Type, Authorization, X-Requested-With`. Sem credentials.

---

## Convenções

### Paginação

Todos os endpoints de listagem aceitam:

| Param   | Default | Máximo | Descrição          |
| ------- | ------- | ------ | ------------------ |
| `page`  | `1`     | —      | Página (1-indexed) |
| `limit` | `20`    | `100`  | Itens por página   |

Resposta:

```ts
type Paginated<T> = {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
  };
};
```

### Erros

```ts
type ApiError = { error: string };
```

| Status | Quando                                                  |
| ------ | ------------------------------------------------------- |
| `400`  | Body inválido, ID inválido, validação falhou            |
| `404`  | Recurso não existe                                      |
| `405`  | Método não suportado (ex.: PUT em entidade imutável)    |
| `500`  | Erro interno (mensagem genérica; detalhes ficam no log) |

### Sucesso

| Status | Quando                          |
| ------ | ------------------------------- |
| `200`  | GET, PUT bem-sucedido           |
| `201`  | POST que criou recurso          |
| `204`  | DELETE bem-sucedido (sem corpo) |

### Entidades imutáveis

`tramitacoes`, `votos-nominais`, `orientacoes-bancada` são **registros históricos** — não aceitam `PUT`. Para corrigir um registro, faça `DELETE` + `POST`.

---

## Modelos (TypeScript)

> ⚠️ **Campos opcionais podem vir ausentes** (não como `null`). O backend usa `omitempty` no JSON: se um campo opcional é `null` no banco, ele **não aparece** no payload. Trate todos os campos com `string | null` abaixo como `string | null | undefined` na prática.

```ts
export type Proposicao = {
  id: number; // PK interno
  external_id: number; // ID na API da Câmara
  tipo: string; // "PL", "PEC", "MPV", "PLP", "REQ", "DOC", etc.
  numero: number;
  ano: number;
  ementa: string | null;
  status: string | null; // "Aguardando designação de Relator", etc.
  keywords: string | null;
  priority_level: number; // 1..5 (default 3)
  last_synced_at: string | null; // ISO 8601
  last_relevant_change_at: string | null; // data da tramitação mais recente — usada no filtro data_inicio/data_fim
  created_at: string;
  updated_at: string;
};

export type Tramitacao = {
  id: number;
  proposicao_id: number;
  external_id: number | null;
  sequencia: number; // ordem cronológica dentro da proposição
  data_hora: string; // ISO 8601
  sigla_orgao: string | null; // "MESA", "CCJC", "PLEN", etc.
  descricao_situacao: string | null;
  despacho: string | null;
  regime: string | null; // "Ordinário", "Urgência", etc.
  created_at: string;
};

export type Votacao = {
  id: number;
  external_id: string; // formato "{idProposicao}-{seq}"
  proposicao_principal_id: number | null;
  data_hora: string; // ISO 8601
  descricao: string | null;
  resultado: string | null; // "aprovado", "rejeitado", etc.
  tipo_raw: string | null; // valor bruto da Câmara — não usar para regras
  created_at: string;
};

export type DeputadoResumo = {
  id: number;
  nome: string;
  sigla_partido: string | null;
  sigla_uf: string | null;
};

export type VotoNominal = {
  id: number;
  votacao_id: number;
  deputado_id: number;
  voto_raw: string; // "Sim", "Não", "Abstenção", "Obstrução", "Art. 17", etc.
  created_at: string;
  deputado: DeputadoResumo | null; // hidratado por JOIN — sempre presente em produção
};

export type OrientacaoBancada = {
  id: number;
  votacao_id: number;
  sigla_bancada: string; // "PT", "PL", "Governo", "Oposição", etc.
  orientacao_raw: string; // "Sim", "Não", "Liberado", "Obstrução", etc.
  created_at: string;
};

export type Deputado = {
  id: number;
  external_id: number;
  nome: string;
  nome_civil: string | null;
  sigla_partido: string | null;
  sigla_uf: string | null; // 2 letras: "SP", "RJ", etc.
  legislatura: number | null;
  email: string | null;
  uri_foto: string | null;
  created_at: string;
  updated_at: string;
};
```

---

## Endpoints

### Health check

| Método | Rota      | Resposta                     |
| ------ | --------- | ---------------------------- |
| GET    | `/health` | `200 ok` se DB está saudável |

---

### Proposições

| Método | Rota                               | Descrição                                    |
| ------ | ---------------------------------- | -------------------------------------------- |
| GET    | `/proposicoes`                     | Lista com paginação e filtros                |
| POST   | `/proposicoes`                     | Cria                                         |
| GET    | `/proposicoes/{id}`                | Busca por ID                                 |
| PUT    | `/proposicoes/{id}`                | Atualiza campos mutáveis                     |
| DELETE | `/proposicoes/{id}`                | Remove                                       |
| GET    | `/proposicoes/{id}/tramitacoes`    | Lista tramitações da proposição              |
| GET    | `/proposicoes/{id}/votacoes`       | Lista votações vinculadas à proposição       |
| GET    | `/proposicoes/{id}/votos-nominais` | Lista votos nominais com `deputado` embutido |

**Filtros em `GET /proposicoes`:**

| Param         | Tipo    | Exemplo                | Descrição                               |
| ------------- | ------- | ---------------------- | --------------------------------------- |
| `tipo`        | string  | `PL`                   | Sigla do tipo                           |
| `status`      | string  | `Em tramitação`        | Status atual                            |
| `ano`         | int     | `2026`                 | Ano de apresentação                     |
| `data_inicio` | RFC3339 | `2026-03-01T00:00:00Z` | Filtra por `last_relevant_change_at >=` |
| `data_fim`    | RFC3339 | `2026-03-31T23:59:59Z` | Filtra por `last_relevant_change_at <=` |

`data_inicio` e `data_fim` são independentes (pode mandar só um) e combinam com os outros filtros via AND. `last_relevant_change_at` é a data da tramitação mais recente da proposição — atualizada automaticamente pela ingestão. Se `data_inicio > data_fim`, retorna `400`.

**Exemplo: proposições com movimentação em março/2026:**

```
GET /proposicoes?data_inicio=2026-03-01T00:00:00Z&data_fim=2026-03-31T23:59:59Z&page=1&limit=20
```

**Body de POST/PUT:**

```ts
type CreateProposicao = {
  external_id: number;
  tipo: string;
  numero: number;
  ano: number;
  ementa?: string;
  status?: string;
  keywords?: string;
};

// PUT: mesmo formato sem external_id
type UpdateProposicao = Omit<CreateProposicao, "external_id">;
```

---

### Votações

| Método | Rota                         | Descrição                               |
| ------ | ---------------------------- | --------------------------------------- |
| GET    | `/votacoes`                  | Lista com paginação                     |
| POST   | `/votacoes`                  | Cria                                    |
| GET    | `/votacoes/{id}`             | Busca por ID                            |
| PUT    | `/votacoes/{id}`             | Atualiza campos mutáveis                |
| DELETE | `/votacoes/{id}`             | Remove                                  |
| GET    | `/votacoes/{id}/votos`       | Lista votos da votação (com `deputado`) |
| GET    | `/votacoes/{id}/orientacoes` | Lista orientações de bancada da votação |

**Filtros em `GET /votacoes`:**

| Param                     | Tipo    | Exemplo                |
| ------------------------- | ------- | ---------------------- |
| `proposicao_principal_id` | int     | `42`                   |
| `data_inicio`             | RFC3339 | `2026-01-01T00:00:00Z` |
| `data_fim`                | RFC3339 | `2026-12-31T23:59:59Z` |

**Body de POST:**

```ts
type CreateVotacao = {
  external_id: string;
  proposicao_principal_id?: number;
  data_hora: string; // RFC3339
  descricao?: string;
  resultado?: string;
  tipo_raw?: string;
};

// PUT: external_id e data_hora são imutáveis
type UpdateVotacao = {
  proposicao_principal_id?: number;
  descricao?: string;
  resultado?: string;
  tipo_raw?: string;
};
```

---

### Tramitações (imutáveis)

| Método | Rota                | Descrição    |
| ------ | ------------------- | ------------ |
| POST   | `/tramitacoes`      | Cria         |
| GET    | `/tramitacoes/{id}` | Busca por ID |
| DELETE | `/tramitacoes/{id}` | Remove       |

> Listagem por proposição: `GET /proposicoes/{id}/tramitacoes`

```ts
type CreateTramitacao = {
  proposicao_id: number;
  external_id?: number;
  sequencia: number;
  data_hora: string; // RFC3339
  sigla_orgao?: string;
  descricao_situacao?: string;
  despacho?: string;
  regime?: string;
};
```

---

### Votos nominais (imutáveis)

| Método | Rota                   | Descrição    |
| ------ | ---------------------- | ------------ |
| POST   | `/votos-nominais`      | Cria         |
| GET    | `/votos-nominais/{id}` | Busca por ID |
| DELETE | `/votos-nominais/{id}` | Remove       |

> Listagem por proposição: `GET /proposicoes/{id}/votos-nominais`

```ts
type CreateVotoNominal = {
  votacao_id: number;
  deputado_id: number;
  voto_raw: string; // "Sim", "Não", "Abstenção", etc.
};
```

---

### Orientações de bancada (imutáveis)

| Método | Rota                        | Descrição    |
| ------ | --------------------------- | ------------ |
| POST   | `/orientacoes-bancada`      | Cria         |
| GET    | `/orientacoes-bancada/{id}` | Busca por ID |
| DELETE | `/orientacoes-bancada/{id}` | Remove       |

```ts
type CreateOrientacaoBancada = {
  votacao_id: number;
  sigla_bancada: string;
  orientacao_raw: string; // "Sim", "Não", "Liberado", etc.
};
```

---

### Deputados

| Método | Rota              | Descrição           |
| ------ | ----------------- | ------------------- |
| GET    | `/deputados`      | Lista com paginação |
| POST   | `/deputados`      | Cria                |
| GET    | `/deputados/{id}` | Busca por ID        |
| PUT    | `/deputados/{id}` | Atualiza            |
| DELETE | `/deputados/{id}` | Remove              |

**Filtros em `GET /deputados`:**

| Param           | Tipo   | Exemplo |
| --------------- | ------ | ------- |
| `sigla_partido` | string | `PT`    |
| `sigla_uf`      | string | `SP`    |
| `legislatura`   | int    | `57`    |

```ts
type CreateDeputado = {
  external_id: number;
  nome: string;
  nome_civil?: string;
  sigla_partido?: string;
  sigla_uf?: string;
  legislatura?: number;
  email?: string;
  uri_foto?: string;
};

// PUT: tudo opcional, exceto external_id (imutável)
```

---

## Notas operacionais

### Ingestão em background

A API roda um processo de ingestão automática no startup (configurável via env). Por default na V1, sincroniza **proposições com tramitação nos últimos 3 meses**. Enquanto a ingestão roda:

- A API continua respondendo normalmente (ingestão é goroutine separada)
- Dados aparecem **gradualmente** — o frontend deve estar preparado pra ver o `total` da paginação aumentar entre requisições
- Histórico de execuções fica em `ingestion_runs` (atualmente sem endpoint REST — será adicionado)

**Para desabilitar a ingestão automática** (útil em CI/dev):

```bash
INGESTION_AUTO_START=false go run ./cmd/api
```

### Performance esperada

- Lista paginada de proposições: < 50ms
- Lista de tramitações por proposição: < 30ms
- Detalhe de proposição: < 20ms

Sem cache — query direto no Postgres. Pra escalar mais, considerar Redis depois da V1.

---

## Helper TS sugerido para o frontend

```ts
// api/client.ts
const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8080";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(body.error ?? `HTTP ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

type ProposicaoListParams = {
  page?: number;
  limit?: number;
  tipo?: string;
  ano?: number;
  status?: string;
  data_inicio?: string; // RFC3339 — filtra por last_relevant_change_at >=
  data_fim?: string; // RFC3339 — filtra por last_relevant_change_at <=
};

type VotacaoListParams = {
  page?: number;
  limit?: number;
  proposicao_principal_id?: number;
  data_inicio?: string;
  data_fim?: string;
};

function qs(params: Record<string, unknown>): string {
  const filtered = Object.entries(params).filter(([, v]) => v !== undefined && v !== null);
  return filtered.length
    ? `?${new URLSearchParams(filtered as [string, string][]).toString()}`
    : "";
}

export const api = {
  proposicoes: {
    list: (params: ProposicaoListParams = {}) =>
      request<Paginated<Proposicao>>(`/proposicoes${qs(params)}`),
    get: (id: number) => request<Proposicao>(`/proposicoes/${id}`),
    tramitacoes: (id: number, params: { page?: number; limit?: number } = {}) =>
      request<Paginated<Tramitacao>>(`/proposicoes/${id}/tramitacoes${qs(params)}`),
    votacoes: (id: number, params: { page?: number; limit?: number } = {}) =>
      request<Paginated<Votacao>>(`/proposicoes/${id}/votacoes${qs(params)}`),
    votosNominais: (id: number, params: { page?: number; limit?: number } = {}) =>
      request<Paginated<VotoNominal>>(`/proposicoes/${id}/votos-nominais${qs(params)}`),
  },
  votacoes: {
    list: (params: VotacaoListParams = {}) => request<Paginated<Votacao>>(`/votacoes${qs(params)}`),
    get: (id: number) => request<Votacao>(`/votacoes/${id}`),
    votos: (id: number, params: { page?: number; limit?: number } = {}) =>
      request<Paginated<VotoNominal>>(`/votacoes/${id}/votos${qs(params)}`),
    orientacoes: (id: number, params: { page?: number; limit?: number } = {}) =>
      request<Paginated<OrientacaoBancada>>(`/votacoes/${id}/orientacoes${qs(params)}`),
  },
  deputados: {
    list: (
      params: {
        page?: number;
        limit?: number;
        sigla_partido?: string;
        sigla_uf?: string;
        legislatura?: number;
      } = {},
    ) => request<Paginated<Deputado>>(`/deputados${qs(params)}`),
    get: (id: number) => request<Deputado>(`/deputados/${id}`),
  },
};
```

---

## Estado dos dados

A ingestão automática V1 popula apenas **proposições, tramitações e votações** (sem votos nominais nem orientações de bancada — essas tabelas existem no schema e os endpoints respondem `data: []` até a próxima iteração de ingestão). Snapshot atual:

| Tabela              | Registros |
| ------------------- | --------- |
| proposicoes         | ~1700     |
| tramitacoes         | ~51.000   |
| votacoes            | ~1.500    |
| votos_nominais      | 0 (próx.) |
| orientacoes_bancada | 0 (próx.) |

## Roadmap próximo

Pendências que afetam o frontend (em ordem de prioridade):

1. ~~**CORS middleware**~~ ✅ Resolvido
2. ~~**Voto com deputado embutido**~~ ✅ Implementado em `/proposicoes/{id}/votos-nominais` e `/votacoes/{id}/votos`
3. ~~**Sub-rotas faltantes**~~ ✅ Implementadas: `/proposicoes/{id}/votacoes`, `/votacoes/{id}/votos`, `/votacoes/{id}/orientacoes`
4. ~~**Filtro de data em `/proposicoes`**~~ ✅ Implementado: `data_inicio` / `data_fim` sobre `last_relevant_change_at` (com backfill via migration 010)
5. **Ingestão de votos nominais e orientações** — habilitar populamento das tabelas `votos_nominais` e `orientacoes_bancada` na próxima iteração
6. **Endpoints de sync/admin** — `/sync/stats`, `/sync/runs` para o painel mostrar progresso da ingestão
7. **Filtro de busca textual** — `?q=` em `/proposicoes` (full-text na ementa)
8. **Versionamento `/api/v1`** — não é bloqueador, mas vamos querer antes de v1.0
