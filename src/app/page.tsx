import Link from "next/link";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <div className="max-w-2xl">
        <p className="text-xs uppercase tracking-[0.18em] text-white/60">CX Living Brand System</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight">Brand guidelines, as a product.</h1>
        <p className="mt-4 text-white/70">
          A living system for ruthless minimalism with edge. Built for reuse, not just review.
        </p>
        <div className="mt-8 flex gap-3">
          <Link className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black" href="/guidelines">
            Enter guidelines
          </Link>
          <Link className="rounded-md border border-white/15 px-4 py-2 text-sm text-white/80" href="/logo">
            Logo
          </Link>
        </div>
      </div>
    </main>
  );
}
