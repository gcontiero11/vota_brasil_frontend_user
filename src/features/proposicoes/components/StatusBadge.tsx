import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { ProposicaoStatus } from "../types";

const STATUS_LABEL: Record<ProposicaoStatus, string> = {
  em_tramitacao: "Em tramitação",
  pronta_para_pauta: "Pronta para pauta",
  aprovada: "Aprovada",
  arquivada: "Arquivada",
  rejeitada: "Rejeitada",
};

const STATUS_VARIANT: Record<ProposicaoStatus, BadgeVariant> = {
  em_tramitacao: "info",
  pronta_para_pauta: "warning",
  aprovada: "success",
  arquivada: "neutral",
  rejeitada: "danger",
};

interface StatusBadgeProps {
  status: ProposicaoStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <Badge variant={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
  );
}

export const __private = { STATUS_LABEL, STATUS_VARIANT };
