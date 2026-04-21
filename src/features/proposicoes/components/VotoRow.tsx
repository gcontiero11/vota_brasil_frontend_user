import type { VotoIndividual } from "../types";
import { VotoResultadoBadge } from "./VotoResultadoBadge";

interface VotoRowProps {
  voto: VotoIndividual;
}

export function VotoRow({ voto }: VotoRowProps) {
  return (
    <tr className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
      <td className="px-4 py-3 text-sm font-medium text-slate-900">
        {voto.deputado}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
        {voto.partido}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
        {voto.uf}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm">
        <VotoResultadoBadge resultado={voto.resultado} />
      </td>
    </tr>
  );
}
