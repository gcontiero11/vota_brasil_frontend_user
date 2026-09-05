import { Badge } from "@/components/ui/Badge";
import { statusVariant } from "../normalize";

interface StatusBadgeProps {
  status: string | null;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  if (!status) {
    return <Badge variant="neutral">Sem status</Badge>;
  }
  return <Badge variant={statusVariant(status)}>{status}</Badge>;
}
