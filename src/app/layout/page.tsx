export default function LayoutPage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">III — SYSTEM</div>
        <h1 className="mega mt-4">Layout</h1>
        <p className="mt-6 text-lg text-gray-500">
          Grid-first. Big margins. High contrast. One idea per slide. Space is not empty — space is the brand.
        </p>

        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Margin discipline</h2>
          <p className="mt-2 text-sm text-gray-500">
            Default rule: margins are always <span className="font-medium text-black">10–20%</span> of the canvas.
            (Most work lands best around 12–15%.)
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Pick a margin once per format and keep it consistent.</li>
            <li>Alignment matters more than decoration.</li>
            <li>If you add an accent, you owe us more whitespace.</li>
          </ul>
        </section>

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

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Spacing rhythm</h2>
          <p className="mt-2 text-sm text-gray-500">
            Internal gaps should feel related: equal to the margin, or a simple ratio (1× / 2× / 4×). Avoid random spacing.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="mono text-xs uppercase text-gray-400">Small</div>
              <div className="mt-2 text-sm text-black">8–12</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="mono text-xs uppercase text-gray-400">Medium</div>
              <div className="mt-2 text-sm text-black">16–24</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-4">
              <div className="mono text-xs uppercase text-gray-400">Large</div>
              <div className="mt-2 text-sm text-black">32–48</div>
            </div>
          </div>
          <p className="mt-4 text-xs text-gray-400">
            Numbers are guidelines; the real rule is consistency and breathing room.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Templates to build (deck primitives)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-500">
            <li>Cover: ink field, CX mark, one-line hook.</li>
            <li>Divider: one word / short phrase, massive whitespace.</li>
            <li>Big statement: H1 only.</li>
            <li>Big number: one stat + one line of meaning.</li>
            <li>Two-column: claim left, proof right.</li>
            <li>Quote: quote + attribution.</li>
            <li>Image + caption: evidence, not decoration.</li>
            <li>Closing / CTA: precise ask, one step.</li>
          </ol>
        </section>
      </div>
    </div>
  );
}
