import { Badge } from "@/components/ui/Badge";
import type { BadgeVariant } from "@/components/ui/Badge";
import type { VotoResultado } from "../types";

const RESULTADO_LABEL: Record<VotoResultado, string> = {
  sim: "Sim",
  nao: "Não",
  abstencao: "Abstenção",
  ausente: "Ausente",
  obstrucao: "Obstrução",
};

const RESULTADO_VARIANT: Record<VotoResultado, BadgeVariant> = {
  sim: "success",
  nao: "danger",
  abstencao: "warning",
  ausente: "neutral",
  obstrucao: "info",
};

interface VotoResultadoBadgeProps {
  resultado: VotoResultado;
}

export function VotoResultadoBadge({ resultado }: VotoResultadoBadgeProps) {
  return (
    <Badge variant={RESULTADO_VARIANT[resultado]}>
      {RESULTADO_LABEL[resultado]}
    </Badge>
  );
}

export const __private = { RESULTADO_LABEL, RESULTADO_VARIANT };
