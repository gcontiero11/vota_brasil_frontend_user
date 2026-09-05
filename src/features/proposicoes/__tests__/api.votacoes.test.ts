import { beforeAll, describe, expect, it } from "vitest";

// Habilita o toggle de mocks ANTES de importar `api.ts` para que o módulo
// avalie `process.env.NEXT_PUBLIC_USE_MOCKS` com o valor correto.
beforeAll(() => {
  process.env.NEXT_PUBLIC_USE_MOCKS = "true";
});

const apiPromise = import("../api");

describe("getVotacaoById (mocks)", () => {
  it("retorna null para votacaoId inexistente", async () => {
    const { getVotacaoById } = await apiPromise;
    const result = await getVotacaoById(999_999);
    expect(result).toBeNull();
  });

  it("retorna o detalhe completo com lista de votos hidratados", async () => {
    const { getVotacaoById } = await apiPromise;
    const result = await getVotacaoById(1001);

    expect(result).not.toBeNull();
    expect(result?.votacao.id).toBe(1001);
    expect(result?.votos.length).toBeGreaterThan(0);
    expect(result?.votos[0]).toMatchObject({
      votoRaw: expect.any(String),
      deputado: expect.objectContaining({
        nome: expect.any(String),
        siglaPartido: expect.any(String),
        siglaUf: expect.any(String),
      }),
    });
  });

  it("aplica filtro por partido preservando os demais campos", async () => {
    const { getVotacaoById } = await apiPromise;
    const todos = await getVotacaoById(1001);
    const filtrado = await getVotacaoById(1001, { partido: "PFAM" });

    expect(filtrado).not.toBeNull();
    expect(filtrado?.votacao.descricao).toBe(todos?.votacao.descricao);
    expect(filtrado?.votos.length).toBeGreaterThan(0);
    expect(filtrado?.votos.length).toBeLessThan(todos!.votos.length);
    expect(
      filtrado?.votos.every((v) => v.deputado?.siglaPartido === "PFAM"),
    ).toBe(true);
  });

  it("normaliza o filtro de partido para maiúsculas e ignora espaços", async () => {
    const { getVotacaoById } = await apiPromise;
    const a = await getVotacaoById(1001, { partido: "  pfam  " });
    const b = await getVotacaoById(1001, { partido: "PFAM" });
    expect(a?.votos.map((v) => v.id)).toEqual(b?.votos.map((v) => v.id));
  });

  it("retorna lista vazia quando a votação não tem votos registrados", async () => {
    const { getVotacaoById } = await apiPromise;
    const result = await getVotacaoById(7002);
    expect(result).not.toBeNull();
    expect(result?.votos).toEqual([]);
  });
});
