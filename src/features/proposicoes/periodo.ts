/**
 * Helpers para o filtro de período no formato yyyy-MM.
 *
 * O backend espera RFC3339 em `data_inicio`/`data_fim`. Convertemos o mês
 * selecionado para o intervalo `[1º dia 00:00:00 UTC, último dia 23:59:59 UTC]`.
 */

const PATTERN = /^(\d{4})-(0[1-9]|1[0-2])$/;

export function isValidYearMonth(value: string): boolean {
  return PATTERN.test(value);
}

export function yearMonthToRange(
  yyyymm: string,
): { dataInicio: string; dataFim: string } | null {
  const m = yyyymm.match(PATTERN);
  if (!m) return null;
  const ano = Number(m[1]);
  const mes = Number(m[2]);

  // Último dia do mês: dia 0 do mês seguinte.
  const ultimoDia = new Date(Date.UTC(ano, mes, 0)).getUTCDate();

  const dataInicio = new Date(Date.UTC(ano, mes - 1, 1, 0, 0, 0)).toISOString();
  const dataFim = new Date(
    Date.UTC(ano, mes - 1, ultimoDia, 23, 59, 59),
  ).toISOString();

  return { dataInicio, dataFim };
}
