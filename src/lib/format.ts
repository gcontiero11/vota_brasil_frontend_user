/**
 * Formata o identificador canônico de uma proposição: "PL 2345/2024".
 */
export function formatProposicaoIdentifier(input: {
  tipo: string;
  numero: number;
  ano: number;
}): string {
  return `${input.tipo} ${input.numero}/${input.ano}`;
}

/**
 * Formata uma data ISO para o padrão dd/mm/aaaa em pt-BR.
 */
export function formatDate(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

/**
 * Formata data + hora ISO → "dd/mm/aaaa HH:mm".
 */
export function formatDateTime(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/**
 * Formata uma data ISO como distância relativa ao presente.
 * Ex.: "agora", "há 5 min", "há 2h", "há 3 dias", "há 2 meses".
 *
 * O parâmetro `now` existe para permitir testes determinísticos.
 */
export function formatRelativeDate(
  iso: string | null | undefined,
  now: Date = new Date(),
): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";

  const diffMs = now.getTime() - d.getTime();
  if (diffMs < 0) return "em instantes";

  const seconds = Math.floor(diffMs / 1000);
  if (seconds < 60) return "agora";

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `há ${minutes} min`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `há ${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 30) return days === 1 ? "há 1 dia" : `há ${days} dias`;

  const months = Math.floor(days / 30);
  if (months < 12) return months === 1 ? "há 1 mês" : `há ${months} meses`;

  const years = Math.floor(days / 365);
  return years === 1 ? "há 1 ano" : `há ${years} anos`;
}

/**
 * Rótulo humano para os tipos de proposição mais comuns. Tipos não mapeados
 * caem no próprio código (ex.: "REQ" → "REQ").
 */
export function formatTipoLabel(tipo: string): string {
  const labels: Record<string, string> = {
    PL: "Projeto de Lei",
    PEC: "Proposta de Emenda à Constituição",
    MPV: "Medida Provisória",
    PLP: "Projeto de Lei Complementar",
    PDL: "Projeto de Decreto Legislativo",
    PRC: "Projeto de Resolução",
    REQ: "Requerimento",
  };
  return labels[tipo] ?? tipo;
}
