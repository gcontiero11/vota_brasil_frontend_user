# CLAUDE.md — Frontend Público (Vota Brasil)
 
Este arquivo guia decisões técnicas no repositório do **frontend público** do Vota Brasil. Ele complementa o `CLAUDE.md` geral do projeto. Em caso de conflito, o `CLAUDE.md` geral prevalece para decisões de domínio; este prevalece para decisões de frontend.
 
## Contexto
Frontend público voltado a eleitores e cidadãos para consulta de proposições, tramitações e votações da Câmara dos Deputados. Interface separada do painel administrativo. Prioriza clareza, leitura e confiabilidade da informação.
 
Este frontend é **consumidor** do Backend API (Go) descrito no C4 do projeto. Por ora, o backend pode não estar disponível — a camada de dados deve ser mockada mas estruturada como se consumisse uma API real.
 
## Stack
- **Next.js** (App Router) + React
- **TypeScript** em modo estrito
- **Tailwind CSS** para estilização
- **ESLint + Prettier** para lint e formatação
- **Vitest + React Testing Library** para testes unitários
- **Husky + lint-staged** (opcional) para garantir lint/format no commit
Evitar adicionar bibliotecas pesadas sem justificativa. Preferir soluções da própria plataforma (Next, React, Web APIs).
 
## Princípios de arquitetura frontend
- **Package by feature**, não por camada técnica. Cada feature tem seus próprios componentes, hooks, tipos, API client e testes.
- **Server Components por padrão.** Usar `"use client"` apenas onde houver interatividade, estado local ou hooks de cliente.
- **Handlers/páginas finos.** Páginas do App Router coordenam dados e layout; a lógica de apresentação vive em componentes de feature.
- **Camada de dados isolada.** Nenhum componente chama `fetch` direto. Tudo passa por um cliente HTTP centralizado e por funções de API por feature.
- **Tipos como contrato.** Toda entidade do domínio tem tipo explícito em `types.ts` da feature. Nada de `any`.
- **Sem estado global prematuro.** URL, server state e React local state primeiro. Só introduzir Zustand/Redux/etc. se houver problema concreto.
## Estrutura de pastas
```
src/
  app/                      # Rotas (App Router)
    layout.tsx              # Layout raiz (sidebar + conteúdo)
    page.tsx                # Redireciona para /proposicoes
    proposicoes/
      page.tsx              # Lista de proposições
      [id]/
        page.tsx            # Detalhe da proposição
  components/
    layout/                 # Sidebar, TopBar, Shell
    ui/                     # Primitivos reutilizáveis (Badge, Button, Input, etc.)
  features/
    proposicoes/
      api.ts                # Funções: listProposicoes, getProposicaoById, etc.
      types.ts              # Tipos do domínio
      mocks.ts              # Dados mockados (enquanto não há backend)
      components/           # Componentes específicos da feature
      __tests__/            # Testes da feature
  lib/
    http.ts                 # Cliente HTTP centralizado
    format.ts               # Helpers de formatação (datas, siglas, etc.)
  styles/
    globals.css
```
 
## Regras de componentes
- Componentes **sem** estado devem ser Server Components.
- Componentes **com** estado, efeitos ou listeners devem ser Client Components e começar com `"use client"`.
- Props tipadas explicitamente. Evitar `React.FC`.
- Nomes em inglês para código; textos de UI em **português do Brasil**.
- Componentes de UI primitivos (botão, badge, input) ficam em `components/ui` e são agnósticos ao domínio.
- Componentes específicos do domínio (ex.: `ProposicaoRow`, `TramitacaoItem`) vivem dentro da feature.
## Regras de dados
- Toda chamada de dados passa por `features/<feature>/api.ts`.
- Enquanto não há backend, `api.ts` retorna dados de `mocks.ts` com a mesma assinatura assíncrona (`async`) que a versão real terá.
- O cliente HTTP em `lib/http.ts` centraliza base URL, headers, tratamento de erro e timeouts. Mesmo mockado, deixar a infraestrutura pronta.
- Nunca misturar formato cru de API externa dentro de componentes. Sempre normalizar antes.
## Regras de estilização
- Tailwind utilitário direto no JSX é o padrão.
- Classes longas: extrair para variável local ou componente quando repetidas 3+ vezes.
- Cores e espaçamentos consistentes: usar tokens do Tailwind (ou extensões definidas em `tailwind.config.ts`) em vez de valores arbitrários.
- Status e prioridade devem ter cores estáveis e documentadas (badge verde = aprovada, âmbar = pronta para pauta, azul = em tramitação, etc.).
- Acessibilidade: contraste adequado, `aria-*` em elementos interativos, foco visível.
## Regras de testes
- Cada componente com lógica não trivial tem ao menos um teste.
- Testes unitários com Vitest + React Testing Library.
- Foco em **comportamento** observável pelo usuário, não em detalhes de implementação.
- Usar `data-testid` com moderação; preferir seletores por papel (`getByRole`) e texto.
- Testes de utilitários puros (format, parsers) são obrigatórios.
## Regras de lint e formatação
- ESLint com config estrita (`next/core-web-vitals`, `@typescript-eslint/recommended`).
- Prettier para formatação; conflitos entre Prettier e ESLint resolvidos via `eslint-config-prettier`.
- CI deve rodar `lint`, `typecheck`, `test` e `build`.
## Fluxo de trabalho para mudanças
Para tarefas não triviais, seguir:
1. Entender o objetivo
2. Declarar suposições
3. Identificar trade-offs
4. Propor a solução mais simples viável
5. Só então gerar código
Ao propor mudanças, sempre incluir: caminho do arquivo, propósito, explicação das escolhas, como testar.
 
## O que evitar
- Estado global sem problema concreto resolvido
- Bibliotecas de UI pesadas (MUI, Ant Design) — Tailwind + primitivos próprios bastam
- Lógica de negócio em componentes de página
- `any` e `as unknown as X`
- Mock direto em JSX — sempre passar por `api.ts`
- Rotas ou features novas sem reflexo nos mocks e nos testes
## Estilo de resposta neste repositório
- Responder em **português do Brasil**
- Ser direto, técnico e pragmático
- Distinguir fato, suposição e recomendação
- Quando incerto, dizer exatamente o que precisa validar
