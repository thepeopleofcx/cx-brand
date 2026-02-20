import Link from "next/link";

export default function Home() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      {/* Mono label */}
      <div className="mono text-xs text-gray-400">NR. 1 / 2026</div>

      {/* Mega headline */}
      <h1 className="mega mt-6">
        Focus.<br />The Identity.
      </h1>

      {/* Two-column intro */}
      <div className="mt-12 grid gap-8 border-t-2 pt-8 md:grid-cols-2" style={{ borderColor: "var(--cx-pink)" }}>
        <p className="text-lg font-bold leading-snug">
          A living system for ruthless minimalism with edge. Built for reuse, not just review.
        </p>
        <p className="mono text-sm leading-relaxed text-gray-500">
          CX is a next-level social club created by artists, writers, and musicians who craft unique, immersive
          experiences. One membership unlocks an unlimited world of experiences.
        </p>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex gap-3">
        <Link
          className="rounded-md bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
          href="/guidelines"
        >
          Enter guidelines
        </Link>
        <Link
          className="rounded-md border border-gray-300 px-5 py-2.5 text-sm font-medium text-black transition hover:border-[var(--cx-pink)] hover:text-[var(--cx-pink)]"
          href="/logo"
        >
          Logo
        </Link>
      </div>

      {/* Latest Updates */}
      <section className="mt-16">
        <h2 className="mono text-xs uppercase text-gray-400">Latest Updates</h2>
        <div className="mt-4 space-y-0 divide-y divide-gray-200">
          {[
            { label: "Voice & Copy framework added", href: "/voice" },
            { label: "Full color token system", href: "/color" },
            { label: "Application mock-ups live", href: "/applications" },
            { label: "Asset downloads available", href: "/assets" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="block py-3 text-sm font-medium transition-colors hover:text-[var(--cx-pink)]"
            >
              {item.label} →
            </Link>
          ))}
        </div>
      </section>

      {/* Brand Quickstart */}
      <section id="quickstart" className="mt-16">
        <h2 className="text-2xl font-bold uppercase tracking-tight">Brand quickstart</h2>
        <p className="mono mt-2 text-sm text-gray-500">One-screen cheat sheet. Everything you need to start building on-brand.</p>

        <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-gray-200 bg-gray-200 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { label: "Background", value: "Near-black (#0B0B0C). Let the darkness do the work." },
            { label: "Type", value: "Big Caslon for headlines. Proxima Nova (Inter) for body. Nothing else." },
            { label: "Color", value: "Black + white + one accent max. Accent is a scalpel, not a bucket." },
            { label: "Logo", value: "White mark on ink. Generous clear space. Never add effects." },
            { label: "Layout", value: "Grid-first. 10–20% margins. One idea per surface." },
            { label: "Voice", value: "Confident. Mythic. Precise. Never cheesy." },
          ].map((item) => (
            <div key={item.label} className="bg-white p-5">
              <h3 className="mono text-xs font-medium uppercase text-gray-400">{item.label}</h3>
              <p className="mt-2 text-sm text-black">{item.value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="mono text-xs font-medium uppercase text-gray-400">Do</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-500">
              <li>Let the black work</li>
              <li>Use accent as a scalpel</li>
              <li>Keep copy short</li>
              <li>One idea per surface</li>
            </ul>
          </div>
          <div className="rounded-lg border border-gray-200 p-5">
            <h3 className="mono text-xs font-medium uppercase text-gray-400">Don&rsquo;t</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-500">
              <li>Multiple accents in one composition</li>
              <li>Effects on the logo</li>
              <li>Corporate foam (&ldquo;leverage&rdquo;, &ldquo;synergy&rdquo;)</li>
              <li>Clutter or decoration for its own sake</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Asset Preview Boxes */}
      <section className="mt-16">
        <h2 className="mono text-xs uppercase text-gray-400">Asset Previews</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { label: "Logo Pack", href: "/assets" },
            { label: "Color Tokens", href: "/color" },
            { label: "Components", href: "/components" },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex aspect-[4/3] items-center justify-center rounded-lg border-2 border-gray-200 text-sm font-bold uppercase tracking-tight transition-colors hover:border-[var(--cx-pink)] hover:text-[var(--cx-pink)]"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
