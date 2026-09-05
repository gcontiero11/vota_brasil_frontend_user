import { Badge } from "@/components/ui/Badge";
import { votoVariant } from "../normalize";

interface VotoResultadoBadgeProps {
  votoRaw: string;
}

export function VotoResultadoBadge({ votoRaw }: VotoResultadoBadgeProps) {
  return <Badge variant={votoVariant(votoRaw)}>{votoRaw}</Badge>;
}
