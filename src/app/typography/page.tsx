export default function TypographyPage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">II — VISUALS</div>
        <h1 className="mega mt-4">Typo&shy;graphy</h1>
        <p className="mt-6 text-lg text-gray-500">
          Typography is the primary visual system. Images are optional; hierarchy is not.
        </p>

        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Default pair</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>
              Headings: <span className="font-medium text-black">Big Caslon</span> (editorial gravitas)
            </li>
            <li>
              Body/UI: <span className="font-medium text-black">Proxima Nova</span> (modern clarity)
            </li>
            <li>Rule: max 2 typefaces per asset.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Scale (16:9 deck default)</h2>
          <div className="mt-4 grid gap-3">
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="text-4xl font-bold tracking-tight text-black">H1 — 54–76 pt</div>
              <div className="mt-2 text-sm text-gray-500">Short phrasing. No full stop.</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="text-2xl font-bold tracking-tight text-black">H2 — 28–40 pt</div>
              <div className="mt-2 text-sm text-gray-500">Subheads or section labels.</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="text-base text-black">Body — 18–24 pt</div>
              <div className="mt-2 text-sm text-gray-500">Short lines. Generous leading.</div>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="mono text-xs uppercase tracking-[0.18em] text-black">Micro label — 10–12 pt + tracking</div>
              <div className="mt-2 text-sm text-gray-500">All caps labels; use sparingly.</div>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-5">
          <h2 className="text-xl font-bold uppercase tracking-tight">Copy discipline</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>One idea per slide.</li>
            <li>Titles: 3–7 words whenever possible.</li>
            <li>Replace adjectives with specifics (numbers, places, names, constraints).</li>
            <li>Avoid corporate foam (&ldquo;leveraging&rdquo;, &ldquo;best-in-class&rdquo;, &ldquo;authentically&rdquo;…).</li>
          </ul>

          <div className="mt-5 border-t border-gray-200 pt-5">
            <h3 className="text-sm font-bold uppercase tracking-wider text-black">Casing + punctuation</h3>
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-gray-500">
              <li>
                Use <span className="font-medium text-black">sentence case</span> or <span className="font-medium text-black">uppercase</span>.
                Avoid Title Case except proper names.
              </li>
              <li>Headlines: avoid full stops; questions are fine.</li>
              <li>Body copy: full punctuation.</li>
              <li>Bullets: no full stops unless they&rsquo;re full sentences.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
