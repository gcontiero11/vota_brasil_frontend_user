export default function ProposicoesLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex flex-col gap-6"
    >
      <span className="sr-only">Carregando proposições…</span>

      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
          Proposições
        </h1>
        <div className="mt-2 h-4 w-40 animate-pulse rounded bg-slate-200" />
      </div>

      <FiltersSkeleton />

      <TableSkeleton />
    </div>
  );
}

function FiltersSkeleton() {
  return (
    <section
      aria-hidden="true"
      className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
    >
      <div className="flex flex-col gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-full animate-pulse rounded-md bg-slate-100" />
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-12 animate-pulse rounded bg-slate-200" />
        <div className="flex flex-wrap gap-2">
          {[56, 48, 52, 56, 52, 52].map((w, i) => (
            <div
              key={i}
              style={{ width: w }}
              className="h-8 animate-pulse rounded-full bg-slate-100"
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
        <div className="h-10 w-full animate-pulse rounded-md bg-slate-100" />
      </div>
    </section>
  );
}

function TableSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-soft"
    >
      <div className="border-b border-slate-200 bg-slate-50 px-4 py-3">
        <div className="h-3 w-24 animate-pulse rounded bg-slate-200" />
      </div>
      <ul className="divide-y divide-slate-200">
        {Array.from({ length: 6 }).map((_, i) => (
          <li key={i} className="flex items-center gap-4 px-4 py-4">
            <div className="h-4 w-24 shrink-0 animate-pulse rounded bg-slate-200" />
            <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
            <div className="hidden h-4 w-36 animate-pulse rounded bg-slate-100 md:block" />
            <div className="h-6 w-20 shrink-0 animate-pulse rounded-full bg-slate-200" />
            <div className="hidden h-4 w-16 animate-pulse rounded bg-slate-100 md:block" />
            <div className="h-4 w-14 shrink-0 animate-pulse rounded bg-slate-100" />
          </li>
        ))}
      </ul>
    </div>
  );
}
