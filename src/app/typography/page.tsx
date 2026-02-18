export default function TypographyPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Typography</h1>
        <p className="mt-4 text-[var(--cx-muted)]">
          Typography is the primary visual system. Images are optional; hierarchy is not.
        </p>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-5">
          <h2 className="text-lg font-medium">Default pair</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>
              Headings: <span className="text-[var(--cx-fg)]">Big Caslon</span> (editorial gravitas)
            </li>
            <li>
              Body/UI: <span className="text-[var(--cx-fg)]">Proxima Nova</span> (modern clarity)
            </li>
            <li>Rule: max 2 typefaces per asset.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Scale (16:9 deck default)</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-lg border border-[var(--cx-border)] p-5">
              <div className="text-4xl font-semibold tracking-tight">H1 — 54–76 pt</div>
              <div className="mt-2 text-sm text-[var(--cx-muted)]">Short phrasing. No full stop.</div>
            </div>
            <div className="rounded-lg border border-[var(--cx-border)] p-5">
              <div className="text-2xl font-semibold tracking-tight">H2 — 28–40 pt</div>
              <div className="mt-2 text-sm text-[var(--cx-muted)]">Subheads or section labels.</div>
            </div>
            <div className="rounded-lg border border-[var(--cx-border)] p-5">
              <div className="text-base">Body — 18–24 pt</div>
              <div className="mt-2 text-sm text-[var(--cx-muted)]">Short lines. Generous leading.</div>
            </div>
            <div className="rounded-lg border border-[var(--cx-border)] p-5">
              <div className="text-xs uppercase tracking-[0.18em]">Micro label — 10–12 pt + tracking</div>
              <div className="mt-2 text-sm text-[var(--cx-muted)]">All caps labels; use sparingly.</div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-5">
          <h2 className="text-lg font-medium">Copy discipline</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>One idea per slide.</li>
            <li>Titles: 3–7 words whenever possible.</li>
            <li>Replace adjectives with specifics (numbers, places, names, constraints).</li>
            <li>Avoid corporate foam (“leveraging”, “best-in-class”, “authentically”…).</li>
          </ul>

          <div className="mt-5 border-t border-[var(--cx-border)] pt-5">
            <h3 className="text-sm font-medium">Casing + punctuation</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
              <li>
                Use <span className="text-[var(--cx-fg)]">sentence case</span> or <span className="text-[var(--cx-fg)]">uppercase</span>.
                Avoid Title Case except proper names.
              </li>
              <li>Headlines: avoid full stops; questions are fine.</li>
              <li>Body copy: full punctuation.</li>
              <li>Bullets: no full stops unless they’re full sentences.</li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  );
}
