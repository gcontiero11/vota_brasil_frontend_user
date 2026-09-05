import type { BadgeVariant } from "@/components/ui/Badge";

/**
 * Heurísticas locais para colorir badges a partir das strings livres do
 * backend. Mantemos o texto bruto na UI; o enum interno serve só como
 * mapa para a `BadgeVariant`.
 */

export type StatusCategoria =
  | "aprovada"
  | "rejeitada"
  | "arquivada"
  | "pronta_para_pauta"
  | "em_tramitacao"
  | "outro";

export function categorizeStatus(status: string | null): StatusCategoria {
  if (!status) return "outro";
  const s = status.toLowerCase();
  if (s.includes("aprovad") || s.includes("transformada em lei"))
    return "aprovada";
  if (s.includes("rejeit") || s.includes("vetad")) return "rejeitada";
  if (s.includes("arquivad")) return "arquivada";
  if (s.includes("pronta para pauta") || s.includes("pronta p/ pauta"))
    return "pronta_para_pauta";
  if (s.includes("tramita")) return "em_tramitacao";
  return "outro";
}

export function statusVariant(status: string | null): BadgeVariant {
  switch (categorizeStatus(status)) {
    case "aprovada":
      return "success";
    case "rejeitada":
      return "danger";
    case "arquivada":
      return "neutral";
    case "pronta_para_pauta":
      return "warning";
    case "em_tramitacao":
      return "info";
    default:
      return "neutral";
  }
}

export type VotacaoCategoria = "aprovada" | "rejeitada" | "pendente";

export function categorizeVotacaoResultado(
  resultado: string | null,
): VotacaoCategoria {
  if (!resultado) return "pendente";
  const r = resultado.toLowerCase();
  if (r.includes("aprov")) return "aprovada";
  if (r.includes("rejeit")) return "rejeitada";
  return "pendente";
}

export function votacaoResultadoVariant(
  resultado: string | null,
): BadgeVariant {
  switch (categorizeVotacaoResultado(resultado)) {
    case "aprovada":
      return "success";
    case "rejeitada":
      return "danger";
    case "pendente":
      return "warning";
  }
}

export type VotoCategoria =
  | "sim"
  | "nao"
  | "abstencao"
  | "ausente"
  | "obstrucao"
  | "outro";

export function categorizeVoto(votoRaw: string): VotoCategoria {
  const v = votoRaw.toLowerCase().trim();
  if (v === "sim" || v.startsWith("sim")) return "sim";
  if (v === "não" || v === "nao" || v.startsWith("não") || v.startsWith("nao"))
    return "nao";
  if (v.startsWith("abstenç") || v.startsWith("abstenc")) return "abstencao";
  if (v.startsWith("ausent")) return "ausente";
  if (v.startsWith("obstru")) return "obstrucao";
  return "outro";
}

export function votoVariant(votoRaw: string): BadgeVariant {
  switch (categorizeVoto(votoRaw)) {
    case "sim":
      return "success";
    case "nao":
      return "danger";
    case "abstencao":
      return "warning";
    case "ausente":
      return "neutral";
    case "obstrucao":
      return "info";
    default:
      return "neutral";
  }
}
