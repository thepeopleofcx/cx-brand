type Props = {
  name: string;
  value: string;
  previewVar?: string;
};

export function TokenSwatch({ name, value, previewVar }: Props) {
  return (
    <div className="rounded-lg border border-[var(--cx-border)] bg-white/0 p-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-sm font-medium tracking-tight">{name}</div>
          <div className="mt-1 font-mono text-xs text-[var(--cx-muted)]">{value}</div>
        </div>
        <div
          className="h-10 w-10 rounded-md border border-[var(--cx-border)]"
          style={{ background: previewVar ? `var(${previewVar})` : value }}
          aria-label={`${name} swatch`}
        />
      </div>
    </div>
  );
}
