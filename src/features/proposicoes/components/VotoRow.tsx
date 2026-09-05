import type { VotoNominal } from "../types";
import { VotoResultadoBadge } from "./VotoResultadoBadge";

interface VotoRowProps {
  voto: VotoNominal;
}

export function VotoRow({ voto }: VotoRowProps) {
  const nome = voto.deputado?.nome ?? `Deputado #${voto.deputadoId}`;
  const partido = voto.deputado?.siglaPartido ?? "—";
  const uf = voto.deputado?.siglaUf ?? "—";

  return (
    <tr className="border-b border-slate-200 last:border-b-0 hover:bg-slate-50">
      <td className="px-4 py-3 text-sm font-medium text-slate-900">{nome}</td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
        {partido}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm text-slate-700">
        {uf}
      </td>
      <td className="whitespace-nowrap px-4 py-3 text-sm">
        <VotoResultadoBadge votoRaw={voto.votoRaw} />
      </td>
    </tr>
  );
}
