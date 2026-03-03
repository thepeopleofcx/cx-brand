import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Quickstart — CX Brand System",
  description: "Get up to speed with the CX brand in 60 seconds.",
};

export default function QuickstartPage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">QUICKSTART</div>
        <h1 className="mega mt-4">Brand in 60 Seconds</h1>
        <p className="mt-6 text-lg text-gray-500">
          Everything you need to create on-brand CX materials — one page, no fluff.
        </p>

        {/* Identity */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Who We Are</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            CX is a next-level social club — ClassPass for culture. One membership, unlimited
            experiences crafted by artists, writers, and musicians. We forge real connections in
            an era of isolation.
          </p>
          <p
            className="mt-4 text-2xl font-medium tracking-tight"
            style={{ fontFamily: "var(--cx-font-display)" }}
          >
            &ldquo;This way in.&rdquo;
          </p>
        </section>

        {/* Visual DNA */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Visual DNA</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <h3 className="mono text-[11px] uppercase text-gray-400">Background</h3>
              <div className="mt-2 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded"
                  style={{ background: "var(--cx-black, #0a0a0a)", border: "1px solid #333" }}
                />
                <span className="text-sm text-gray-500">
                  Near-black by default —{" "}
                  <span className="font-mono text-xs text-gray-400">#0A0A0A</span>
                </span>
              </div>
            </div>
            <div>
              <h3 className="mono text-[11px] uppercase text-gray-400">Accent</h3>
              <div className="mt-2 flex items-center gap-3">
                <div
                  className="h-10 w-10 rounded"
                  style={{ background: "var(--cx-pink, #FF2D78)" }}
                />
                <span className="text-sm text-gray-500">
                  CX Pink — one accent max, used as signal
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Typography</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="mono text-[11px] uppercase text-gray-400">Headlines</div>
              <p
                className="mt-2 text-3xl tracking-tight"
                style={{ fontFamily: "var(--cx-font-display)" }}
              >
                Big Caslon
              </p>
              <p className="mt-1 text-xs text-gray-400">Authority, elegance, editorial weight</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="mono text-[11px] uppercase text-gray-400">Body &amp; UI</div>
              <p className="mt-2 text-3xl tracking-tight" style={{ fontFamily: "var(--cx-font-body, sans-serif)" }}>
                Proxima Nova
              </p>
              <p className="mt-1 text-xs text-gray-400">Clarity, modern, clean readability</p>
            </div>
          </div>
        </section>

        {/* Layout Rules */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Layout Rules</h2>
          <ul className="mt-3 space-y-2 text-sm text-gray-500">
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--cx-pink)" }}>→</span>
              Grid-first. Big margins (10–20%). High contrast.
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--cx-pink)" }}>→</span>
              One idea per slide / section.
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--cx-pink)" }}>→</span>
              Black does the heavy lifting. Color is a scalpel.
            </li>
            <li className="flex items-start gap-2">
              <span style={{ color: "var(--cx-pink)" }}>→</span>
              Typography-first. Images optional, cinematic when used.
            </li>
          </ul>
        </section>

        {/* Decision Checklist */}
        <section className="mt-10 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Before You Ship</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-500">
            <li>Does it read in 2 seconds?</li>
            <li>Is the hierarchy obvious?</li>
            <li>Can I delete 30% and improve it?</li>
            <li>Is the black doing the heavy lifting?</li>
            <li>Is the mark respected and un-fussy?</li>
            <li>If I added color, can I justify it as signal?</li>
          </ol>
        </section>

        {/* Brand Pillars */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Brand Pillars</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Experimental", "Provocative", "Fusion", "Pulse"].map((p) => (
              <span
                key={p}
                className="rounded-full border border-gray-300 px-4 py-1.5 text-xs font-bold uppercase tracking-wider"
              >
                {p}
              </span>
            ))}
          </div>
        </section>

        {/* Quick Do / Don't */}
        <section className="mt-10">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mono text-xs font-medium uppercase text-gray-400">Do</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-500">
                <li>Near-black backgrounds</li>
                <li>Big Caslon for authority</li>
                <li>One accent color max</li>
                <li>10–20% margin discipline</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mono text-xs font-medium uppercase text-gray-400">Don&rsquo;t</h3>
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-gray-500">
                <li>Effects on the mark (shadow/glow/blur)</li>
                <li>Multiple accent colors</li>
                <li>Busy patterns or clutter</li>
                <li>Low-contrast thin text on dark</li>
              </ul>
            </div>
          </div>
        </section>

        {/* North Star */}
        <section className="mt-10 rounded-lg p-6" style={{ background: "var(--cx-black, #0a0a0a)" }}>
          <p className="text-center text-lg font-medium tracking-tight text-white">
            Elegant minimalism with an underground edge.
            <br />
            <span className="text-sm" style={{ color: "var(--cx-pink)" }}>
              Structure + Spontaneity
            </span>
          </p>
        </section>

        <p className="mono mt-10 text-center text-xs text-gray-400">
          For deep dives, explore the full sections →{" "}
          <a href="/guidelines" className="underline">Guidelines</a>,{" "}
          <a href="/color" className="underline">Color</a>,{" "}
          <a href="/typography" className="underline">Typography</a>,{" "}
          <a href="/logo" className="underline">Logo</a>
        </p>
      </div>
    </div>
  );
}
