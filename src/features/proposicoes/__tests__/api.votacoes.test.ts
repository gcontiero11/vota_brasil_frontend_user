import { describe, expect, it } from "vitest";
import { getVotacaoById } from "../api";

describe("getVotacaoById", () => {
  it("retorna null para votacaoId inexistente", async () => {
    const result = await getVotacaoById("nao-existe");
    expect(result).toBeNull();
  });

  it("retorna o detalhe completo com lista de votos", async () => {
    const result = await getVotacaoById("v-001-01");
    expect(result).not.toBeNull();
    expect(result?.id).toBe("v-001-01");
    expect(result?.votos.length).toBeGreaterThan(0);
    expect(result?.votos[0]).toMatchObject({
      deputado: expect.any(String),
      partido: expect.any(String),
      uf: expect.any(String),
      resultado: expect.any(String),
    });
  });

  it("aplica filtro por partido preservando os demais campos", async () => {
    const todos = await getVotacaoById("v-001-01");
    const filtrado = await getVotacaoById("v-001-01", { partido: "PFAM" });

    expect(filtrado).not.toBeNull();
    expect(filtrado?.titulo).toBe(todos?.titulo);
    expect(filtrado?.votos.length).toBeGreaterThan(0);
    expect(filtrado?.votos.length).toBeLessThan(todos!.votos.length);
    expect(filtrado?.votos.every((v) => v.partido === "PFAM")).toBe(true);
  });

  it("normaliza o filtro de partido para maiúsculas e ignora espaços", async () => {
    const a = await getVotacaoById("v-001-01", { partido: "  pfam  " });
    const b = await getVotacaoById("v-001-01", { partido: "PFAM" });
    expect(a?.votos.map((v) => v.id)).toEqual(b?.votos.map((v) => v.id));
  });

  it("retorna lista vazia quando a votação não tem votos registrados", async () => {
    const result = await getVotacaoById("v-007-02");
    expect(result).not.toBeNull();
    expect(result?.votos).toEqual([]);
  });
});
