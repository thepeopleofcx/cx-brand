import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Typography — CX Brand System",
  description: "Type scale, font stacks, and typographic rules for the CX identity system.",
};

export default function TypographyPage() {
  const scale = [
    { name: "Mega", css: "mega", sample: "Focus.", note: "Page heroes. clamp(2.5rem, 8vw, 7.5rem). Uppercase, tight leading." },
    { name: "H1", size: "text-5xl", weight: "font-bold", tracking: "tracking-tight", sample: "The Identity", note: "54–76 pt equivalent. Short phrasing, no full stop." },
    { name: "H2", size: "text-2xl", weight: "font-bold", tracking: "tracking-tight", sample: "Section heading", note: "28–40 pt. Subheads or section labels." },
    { name: "H3", size: "text-xl", weight: "font-bold", tracking: "tracking-tight", sample: "Sub-section", note: "20–24 pt. Uppercase optional." },
    { name: "Body", size: "text-base", weight: "", tracking: "", sample: "One membership unlocks an unlimited world of experiences.", note: "16–18 px. Inter. Generous leading (1.6–1.75)." },
    { name: "Small", size: "text-sm", weight: "", tracking: "", sample: "Supporting detail or metadata.", note: "14 px. Secondary information." },
    { name: "Micro", size: "text-xs", weight: "font-medium", tracking: "tracking-[0.18em] uppercase", sample: "NR. 1 / 2026", note: "10–12 px + wide tracking. Mono caps labels.", mono: true },
  ];

  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">II — VISUALS</div>
        <h1 className="mega mt-4">Typo&shy;graphy</h1>
        <p className="mt-6 text-lg text-gray-500">
          Typography is the primary visual system. Images are optional; hierarchy is not.
        </p>

        {/* ── Font Pairing ── */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Font pairing</h2>
          <p className="mt-2 text-sm text-gray-500">Max 2 typefaces per asset. No exceptions.</p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mono mb-3 text-[10px] uppercase text-gray-400">Display</div>
              <div className="text-3xl leading-tight" style={{ fontFamily: "var(--cx-font-display)" }}>
                Libre Caslon Display
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Editorial gravitas. Use for hero headlines, pull quotes, and high-impact moments.
                Fallback chain: Big Caslon → Book Antiqua → Georgia.
              </p>
              <div className="mt-3 rounded bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600">
                var(--cx-font-display)
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mono mb-3 text-[10px] uppercase text-gray-400">Sans / UI</div>
              <div className="text-3xl leading-tight" style={{ fontFamily: "var(--cx-font-sans)" }}>
                Inter
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Modern clarity. Body copy, UI elements, navigation, data.
                Fallback chain: Helvetica Neue → Helvetica → Arial.
              </p>
              <div className="mt-3 rounded bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600">
                var(--cx-font-sans)
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 p-6 md:col-span-2">
              <div className="mono mb-3 text-[10px] uppercase text-gray-400">Mono</div>
              <div className="text-2xl leading-tight" style={{ fontFamily: "var(--cx-font-mono)" }}>
                Courier New
              </div>
              <p className="mt-3 text-sm text-gray-500">
                Kickers, labels, code snippets, metadata. Always small (10–12 px), usually uppercase with wide tracking.
              </p>
              <div className="mt-3 rounded bg-gray-50 px-3 py-2 font-mono text-xs text-gray-600">
                var(--cx-font-mono)
              </div>
            </div>
          </div>
        </section>

        {/* ── Live Type Scale ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Type scale</h2>
          <p className="mt-2 text-sm text-gray-500">
            Live rendered specimens at each level. What you see is what ships.
          </p>

          <div className="mt-6 space-y-0 divide-y divide-gray-200">
            {scale.map((level) => (
              <div key={level.name} className="py-5">
                <div className="mono mb-2 text-[10px] uppercase text-gray-400">{level.name}</div>
                {level.css === "mega" ? (
                  <div className="mega" style={{ fontSize: "clamp(2rem, 6vw, 4.5rem)" }}>{level.sample}</div>
                ) : (
                  <div
                    className={[level.size, level.weight, level.tracking, level.mono ? "mono" : ""].filter(Boolean).join(" ")}
                    style={level.mono ? { fontFamily: "var(--cx-font-mono)" } : undefined}
                  >
                    {level.sample}
                  </div>
                )}
                <p className="mt-2 text-sm text-gray-500">{level.note}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Display Font Specimen ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Display specimen</h2>
          <div
            className="mt-4 rounded-lg border border-gray-200 p-8 text-center"
            style={{ fontFamily: "var(--cx-font-display)" }}
          >
            <div className="text-6xl leading-[0.9] tracking-tight md:text-7xl">
              Aa Bb Cc
            </div>
            <div className="mt-4 text-3xl leading-tight tracking-tight">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ
            </div>
            <div className="mt-2 text-2xl leading-tight">
              abcdefghijklmnopqrstuvwxyz
            </div>
            <div className="mt-2 text-xl text-gray-500">
              0123456789 &amp; . , ; : ! ? — " "
            </div>
          </div>
        </section>

        {/* ── Pairing in Action ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Pairing in action</h2>
          <p className="mt-2 text-sm text-gray-500">
            Display + sans working together. The contrast creates hierarchy without size alone.
          </p>

          <div className="mt-4 rounded-lg border-2 p-8" style={{ borderColor: "var(--cx-pink)" }}>
            <div className="mono text-[10px] uppercase text-gray-400">Featured event</div>
            <h3
              className="mt-3 text-4xl leading-[1.05] tracking-tight md:text-5xl"
              style={{ fontFamily: "var(--cx-font-display)" }}
            >
              The Grand Opening
            </h3>
            <p className="mt-4 text-base leading-relaxed text-gray-600" style={{ fontFamily: "var(--cx-font-sans)" }}>
              An exclusive evening of art, music, and conversation. One night only.
              March 15, 2026 — Brooklyn, NY.
            </p>
          </div>
        </section>

        {/* ── Copy Discipline ── */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
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

        {/* ── Tokens Reference ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Tokens</h2>
          <div className="mt-4 rounded-lg border border-gray-200 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono text-[10px] uppercase text-gray-400">
                  <th className="pb-2 text-left font-medium">Token</th>
                  <th className="pb-2 text-left font-medium">Value</th>
                  <th className="pb-2 text-left font-medium">Use</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">--cx-font-display</td>
                  <td className="py-1.5">Libre Caslon Display</td>
                  <td className="py-1.5">Heroes, pull quotes</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">--cx-font-sans</td>
                  <td className="py-1.5">Inter</td>
                  <td className="py-1.5">Body, UI, nav</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">--cx-font-mono</td>
                  <td className="py-1.5">Courier New</td>
                  <td className="py-1.5">Labels, kickers, code</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
