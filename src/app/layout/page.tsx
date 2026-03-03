import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Layout — CX Brand System",
  description: "Grid system, spacing scale, and layout patterns for CX.",
};

export default function LayoutPage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">III — SYSTEM</div>
        <h1 className="mega mt-4">Layout</h1>
        <p className="mt-6 text-lg text-gray-500">
          Grid-first. Big margins. High contrast. One idea per surface. Space is not empty — space is the brand.
        </p>

        {/* ── Grid System ── */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Grid system</h2>
          <p className="mt-2 text-sm text-gray-500">
            All layouts snap to a 12-column grid. Gutters stay consistent; content fills columns, never breaks them.
          </p>

          {/* Live 12-col demo */}
          <div className="mt-6">
            <div className="mono mb-2 text-[10px] uppercase text-gray-400">12-column grid</div>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex h-10 items-center justify-center rounded bg-gray-100 text-[10px] font-medium text-gray-400">
                  {i + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Common layouts */}
          <div className="mt-6 space-y-3">
            <div className="mono mb-2 text-[10px] uppercase text-gray-400">Common spans</div>

            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-12 flex h-8 items-center justify-center rounded text-[10px] font-medium text-white" style={{ background: "var(--cx-pink)" }}>
                12 — Full width
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-6 flex h-8 items-center justify-center rounded bg-black text-[10px] font-medium text-white">
                6
              </div>
              <div className="col-span-6 flex h-8 items-center justify-center rounded bg-black text-[10px] font-medium text-white">
                6
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-4 flex h-8 items-center justify-center rounded bg-gray-800 text-[10px] font-medium text-white">
                4
              </div>
              <div className="col-span-4 flex h-8 items-center justify-center rounded bg-gray-800 text-[10px] font-medium text-white">
                4
              </div>
              <div className="col-span-4 flex h-8 items-center justify-center rounded bg-gray-800 text-[10px] font-medium text-white">
                4
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-8 flex h-8 items-center justify-center rounded bg-gray-600 text-[10px] font-medium text-white">
                8 — Content
              </div>
              <div className="col-span-4 flex h-8 items-center justify-center rounded bg-gray-400 text-[10px] font-medium text-white">
                4 — Sidebar
              </div>
            </div>

            <div className="grid grid-cols-12 gap-1">
              <div className="col-span-3 flex h-8 items-center justify-center rounded bg-gray-300 text-[10px] font-medium text-gray-600">
                3
              </div>
              <div className="col-span-6 flex h-8 items-center justify-center rounded bg-gray-300 text-[10px] font-medium text-gray-600">
                6
              </div>
              <div className="col-span-3 flex h-8 items-center justify-center rounded bg-gray-300 text-[10px] font-medium text-gray-600">
                3
              </div>
            </div>
          </div>
        </section>

        {/* ── Margin Discipline ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Margin discipline</h2>
          <p className="mt-2 text-sm text-gray-500">
            Default rule: margins are always <span className="font-medium text-black">10–20%</span> of the canvas.
            Most work lands best around 12–15%.
          </p>

          {/* Visual margin demo */}
          <div className="mt-4 rounded-lg border border-gray-200 p-1">
            <div className="flex items-center justify-center bg-gray-50 py-8">
              <div className="relative w-48 h-32 border-2 border-black rounded">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-[70%] h-[65%] border border-dashed border-gray-400 flex items-center justify-center">
                    <span className="text-[10px] text-gray-500">content</span>
                  </div>
                </div>
                <span className="absolute top-1 left-1/2 -translate-x-1/2 text-[8px] text-gray-400">15%</span>
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[8px] text-gray-400">15%</span>
                <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] text-gray-400 -rotate-90">15%</span>
              </div>
            </div>
          </div>

          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Pick a margin once per format and keep it consistent.</li>
            <li>Alignment matters more than decoration.</li>
            <li>If you add an accent, you owe us more whitespace.</li>
          </ul>
        </section>

        {/* ── Responsive Breakpoints ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Responsive breakpoints</h2>
          <p className="mt-2 text-sm text-gray-500">
            The system uses three breakpoints. Content reflows; spacing adapts proportionally.
          </p>

          <div className="mt-4 rounded-lg border border-gray-200 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono text-[10px] uppercase text-gray-400">
                  <th className="pb-2 text-left font-medium">Name</th>
                  <th className="pb-2 text-left font-medium">Min width</th>
                  <th className="pb-2 text-left font-medium">Columns</th>
                  <th className="pb-2 text-left font-medium">Page pad</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-medium text-black">Mobile</td>
                  <td className="py-1.5">0</td>
                  <td className="py-1.5">4</td>
                  <td className="py-1.5">20px</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-medium text-black">Tablet</td>
                  <td className="py-1.5">768px</td>
                  <td className="py-1.5">8</td>
                  <td className="py-1.5">48px</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-medium text-black">Desktop</td>
                  <td className="py-1.5">1280px</td>
                  <td className="py-1.5">12</td>
                  <td className="py-1.5">48px</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Spacing Rhythm ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Spacing rhythm</h2>
          <p className="mt-2 text-sm text-gray-500">
            Internal gaps use a base-8 scale. Stay on the steps — no arbitrary pixel values.
          </p>

          <div className="mt-4 space-y-2">
            {[
              { name: "4", px: 4 },
              { name: "8", px: 8 },
              { name: "12", px: 12 },
              { name: "16", px: 16 },
              { name: "24", px: 24 },
              { name: "32", px: 32 },
              { name: "48", px: 48 },
              { name: "64", px: 64 },
            ].map((step) => (
              <div key={step.name} className="flex items-center gap-3">
                <div className="mono w-8 text-right text-[10px] text-gray-400">{step.px}</div>
                <div
                  className="h-3 rounded-sm bg-black"
                  style={{ width: `${Math.min(step.px * 3, 100)}%` }}
                />
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-gray-400">
            The real rule is consistency and breathing room. Numbers are guidelines.
          </p>
        </section>

        {/* ── Composition Rules ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Composition rules</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>
              <span className="font-medium text-black">One slide = one idea.</span> If it needs a paragraph, it&rsquo;s probably two slides.
            </li>
            <li>Use repetition to create rhythm (same title position, same margins).</li>
            <li>Use weight/size/spacing for hierarchy — not color soup.</li>
            <li>Clean white lines are allowed only when they clarify structure.</li>
          </ul>
        </section>

        {/* ── Deck Primitives ── */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Deck primitives</h2>
          <p className="mt-2 text-sm text-gray-500">
            Eight canonical slide types. Every deck is a sequence of these.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { name: "Cover", desc: "Ink field, CX mark, one-line hook" },
              { name: "Divider", desc: "One word / short phrase, massive whitespace" },
              { name: "Big statement", desc: "H1 only. Nothing else." },
              { name: "Big number", desc: "One stat + one line of meaning" },
              { name: "Two-column", desc: "Claim left, proof right" },
              { name: "Quote", desc: "Quote + attribution" },
              { name: "Image + caption", desc: "Evidence, not decoration" },
              { name: "Closing / CTA", desc: "Precise ask, one step" },
            ].map((t) => (
              <div key={t.name} className="rounded border border-gray-200 p-3">
                <div className="text-sm font-medium text-black">{t.name}</div>
                <div className="mt-1 text-xs text-gray-500">{t.desc}</div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
