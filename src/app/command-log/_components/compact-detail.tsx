type CompactDetailProps = {
  detail: string;
  source: string;
};

export function CompactDetail({ detail, source }: CompactDetailProps) {
  return (
    <div aria-label="Event detail" className="mt-3 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
        Detail
      </p>
      <p className="mt-1.5 text-sm leading-6 text-slate-700">{detail}</p>
      <p className="mt-2 text-xs text-slate-500">
        Source: <span className="font-medium text-slate-600">{source}</span>
      </p>
    </div>
  );
}
