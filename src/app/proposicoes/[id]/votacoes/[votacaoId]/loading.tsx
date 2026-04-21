export default function VotacaoLoading() {
  return (
    <div
      role="status"
      aria-live="polite"
      aria-busy="true"
      className="flex flex-col gap-6"
    >
      <span className="sr-only">Carregando votação…</span>

      <div className="h-4 w-40 animate-pulse rounded bg-slate-200" />

      <HeaderSkeleton />
      <FiltersSkeleton />
      <TableSkeleton />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-4 rounded-lg border border-slate-200 bg-white p-6 shadow-soft"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-6 w-72 animate-pulse rounded bg-slate-200" />
          <div className="h-3 w-28 animate-pulse rounded bg-slate-100" />
        </div>
        <div className="h-6 w-20 animate-pulse rounded-full bg-slate-200" />
      </div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="h-14 animate-pulse rounded-md bg-slate-100"
          />
        ))}
      </div>
    </div>
  );
}

function FiltersSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col gap-2 rounded-lg border border-slate-200 bg-white p-4 shadow-soft"
    >
      <div className="h-4 w-16 animate-pulse rounded bg-slate-200" />
      <div className="flex flex-wrap gap-2">
        {[56, 52, 52, 52, 52, 52, 52, 52].map((w, i) => (
          <div
            key={i}
            style={{ width: w }}
            className="h-8 animate-pulse rounded-full bg-slate-100"
          />
        ))}
      </div>
    </div>
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
        {Array.from({ length: 8 }).map((_, i) => (
          <li key={i} className="flex items-center gap-4 px-4 py-4">
            <div className="h-4 flex-1 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-14 shrink-0 animate-pulse rounded bg-slate-100" />
            <div className="h-4 w-10 shrink-0 animate-pulse rounded bg-slate-100" />
            <div className="h-6 w-20 shrink-0 animate-pulse rounded-full bg-slate-200" />
          </li>
        ))}
      </ul>
    </div>
  );
}
