export default function LayoutPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Layout / Grid</h1>
        <p className="mt-4 text-[var(--cx-muted)]">
          Grid-first. Big margins. High contrast. One idea per slide. Space is not empty — space is the brand.
        </p>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Margin discipline</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Default rule: margins are always <span className="text-[var(--cx-fg)]">10–20%</span> of the canvas.
            (Most work lands best around 12–15%.)
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>Pick a margin once per format and keep it consistent.</li>
            <li>Alignment matters more than decoration.</li>
            <li>If you add an accent, you owe us more whitespace.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Composition rules</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>
              <span className="text-[var(--cx-fg)]">One slide = one idea.</span> If it needs a paragraph, it’s probably two slides.
            </li>
            <li>Use repetition to create rhythm (same title position, same margins).</li>
            <li>Use weight/size/spacing for hierarchy — not color soup.</li>
            <li>Clean white lines are allowed only when they clarify structure.</li>
          </ul>
        </section>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Spacing rhythm</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Internal gaps should feel related: equal to the margin, or a simple ratio (1× / 2× / 4×). Avoid random spacing.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-[var(--cx-border)] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--cx-muted)]">Small</div>
              <div className="mt-2 text-sm">8–12</div>
            </div>
            <div className="rounded-lg border border-[var(--cx-border)] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--cx-muted)]">Medium</div>
              <div className="mt-2 text-sm">16–24</div>
            </div>
            <div className="rounded-lg border border-[var(--cx-border)] p-4">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--cx-muted)]">Large</div>
              <div className="mt-2 text-sm">32–48</div>
            </div>
          </div>
          <p className="mt-4 text-xs text-[var(--cx-muted)]">
            Numbers are guidelines; the real rule is consistency and breathing room.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Templates to build (deck primitives)</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
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
    </main>
  );
}
