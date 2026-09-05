import { describe, expect, it } from "vitest";
import { isValidYearMonth, yearMonthToRange } from "../periodo";

describe("isValidYearMonth", () => {
  it.each(["2026-01", "2026-12", "1999-06"])("aceita %s", (v) => {
    expect(isValidYearMonth(v)).toBe(true);
  });

  it.each(["2026-13", "2026-00", "26-01", "2026-1", "abril/2026", ""])(
    "rejeita %s",
    (v) => {
      expect(isValidYearMonth(v)).toBe(false);
    },
  );
});

describe("yearMonthToRange", () => {
  it("converte mês de 31 dias para intervalo completo em UTC", () => {
    expect(yearMonthToRange("2026-03")).toEqual({
      dataInicio: "2026-03-01T00:00:00.000Z",
      dataFim: "2026-03-31T23:59:59.000Z",
    });
  });

  it("converte fevereiro de ano comum (28 dias)", () => {
    expect(yearMonthToRange("2026-02")).toEqual({
      dataInicio: "2026-02-01T00:00:00.000Z",
      dataFim: "2026-02-28T23:59:59.000Z",
    });
  });

  it("converte fevereiro de ano bissexto (29 dias)", () => {
    expect(yearMonthToRange("2024-02")).toEqual({
      dataInicio: "2024-02-01T00:00:00.000Z",
      dataFim: "2024-02-29T23:59:59.000Z",
    });
  });

  it("retorna null para entrada inválida", () => {
    expect(yearMonthToRange("invalido")).toBeNull();
  });
});
