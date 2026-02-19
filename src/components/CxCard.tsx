type Props = {
  title: string;
  kicker?: string;
  children?: React.ReactNode;
};

export function CxCard({ title, kicker, children }: Props) {
  return (
    <section className="rounded-lg border border-gray-200 p-6">
      {kicker ? (
        <div className="mono text-xs uppercase text-gray-400">{kicker}</div>
      ) : null}
      <h3 className="mt-2 text-sm font-medium tracking-tight text-black">{title}</h3>
      {children ? <div className="mt-3 text-sm text-gray-500">{children}</div> : null}
    </section>
  );
}
