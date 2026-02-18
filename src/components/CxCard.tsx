type Props = {
  title: string;
  kicker?: string;
  children?: React.ReactNode;
};

export function CxCard({ title, kicker, children }: Props) {
  return (
    <section className="rounded-lg border border-[var(--cx-border)] p-6">
      {kicker ? (
        <div className="text-xs uppercase tracking-[0.18em] text-[var(--cx-muted)]">{kicker}</div>
      ) : null}
      <h3 className="mt-2 text-sm font-medium tracking-tight">{title}</h3>
      {children ? <div className="mt-3 text-sm text-[var(--cx-muted)]">{children}</div> : null}
    </section>
  );
}
