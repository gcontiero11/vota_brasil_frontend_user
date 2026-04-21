import { describe, expect, it } from "vitest";
import {
  formatDate,
  formatProposicaoIdentifier,
  formatRelativeDate,
  formatTipoLabel,
} from "../format";

describe("formatProposicaoIdentifier", () => {
  it("formata um PL com número e ano", () => {
    expect(
      formatProposicaoIdentifier({ tipo: "PL", numero: 2345, ano: 2024 }),
    ).toBe("PL 2345/2024");
  });

  it("formata uma PEC", () => {
    expect(
      formatProposicaoIdentifier({ tipo: "PEC", numero: 9, ano: 2025 }),
    ).toBe("PEC 9/2025");
  });
});

describe("formatDate", () => {
  it("formata ISO em dd/mm/aaaa", () => {
    expect(formatDate("2024-04-15T12:00:00.000Z")).toMatch(
      /^\d{2}\/\d{2}\/\d{4}$/,
    );
  });

  it("retorna string vazia para data inválida", () => {
    expect(formatDate("não é data")).toBe("");
  });
});

describe("formatRelativeDate", () => {
  const now = new Date("2025-01-15T12:00:00.000Z");

  it("retorna 'agora' para diferenças em segundos", () => {
    const iso = new Date(now.getTime() - 10_000).toISOString();
    expect(formatRelativeDate(iso, now)).toBe("agora");
  });

  it("retorna minutos", () => {
    const iso = new Date(now.getTime() - 5 * 60_000).toISOString();
    expect(formatRelativeDate(iso, now)).toBe("há 5 min");
  });

  it("retorna horas", () => {
    const iso = new Date(now.getTime() - 2 * 60 * 60_000).toISOString();
    expect(formatRelativeDate(iso, now)).toBe("há 2h");
  });

  it("retorna singular para 1 dia", () => {
    const iso = new Date(now.getTime() - 24 * 60 * 60_000).toISOString();
    expect(formatRelativeDate(iso, now)).toBe("há 1 dia");
  });

  it("retorna plural para múltiplos dias", () => {
    const iso = new Date(now.getTime() - 3 * 24 * 60 * 60_000).toISOString();
    expect(formatRelativeDate(iso, now)).toBe("há 3 dias");
  });

  it("retorna meses quando passa de 30 dias", () => {
    const iso = new Date(
      now.getTime() - 65 * 24 * 60 * 60_000,
    ).toISOString();
    expect(formatRelativeDate(iso, now)).toBe("há 2 meses");
  });

  it("retorna 'em instantes' para datas no futuro", () => {
    const iso = new Date(now.getTime() + 60_000).toISOString();
    expect(formatRelativeDate(iso, now)).toBe("em instantes");
  });
});

describe("formatTipoLabel", () => {
  it("mapeia cada tipo para seu rótulo expandido", () => {
    expect(formatTipoLabel("PL")).toBe("Projeto de Lei");
    expect(formatTipoLabel("PEC")).toBe(
      "Proposta de Emenda à Constituição",
    );
    expect(formatTipoLabel("MPV")).toBe("Medida Provisória");
    expect(formatTipoLabel("PLP")).toBe("Projeto de Lei Complementar");
    expect(formatTipoLabel("PDL")).toBe("Projeto de Decreto Legislativo");
  });
});
