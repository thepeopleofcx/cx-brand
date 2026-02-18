import { TokenSwatch } from "@/components/TokenSwatch";

const CORE = [
  { name: "Ink (Background)", value: "--cx-bg", label: "#0B0B0C" },
  { name: "Paper (Foreground)", value: "--cx-fg", label: "#F2F2F2" },
  { name: "Muted", value: "--cx-muted", label: "#B8B8B8" },
  { name: "Border", value: "--cx-border", label: "mix" },
];

const ACCENTS = [
  { name: "Pink Noise", var: "--cx-accent-pink-noise", hex: "#F525A3" },
  { name: "Ethernet Sky", var: "--cx-accent-ethernet-sky", hex: "#1D90BF" },
  { name: "Cherry Collapse", var: "--cx-accent-cherry-collapse", hex: "#FE4247" },
  { name: "Tangerine Tantrum", var: "--cx-accent-tangerine-tantrum", hex: "#FD7E01" },
  { name: "Slime Blessing", var: "--cx-accent-slime-blessing", hex: "#08F22F" },
  { name: "Flashbulb Memory", var: "--cx-accent-flashbulb-memory", hex: "#E8E200" },
  { name: "Dream Bruise", var: "--cx-accent-dream-bruise", hex: "#9750CD" },
  { name: "Coolant Crush", var: "--cx-accent-coolant-crush", hex: "#05AEC6" },
];

export default function ColorPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Color</h1>
        <p className="mt-4 text-[var(--cx-muted)]">
          Default is near-black + off-white. Accent is a scalpel: <span className="text-[var(--cx-fg)]">one signal color</span>, used
          sparingly.
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Core</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CORE.map((t) => (
              <TokenSwatch key={t.value} name={t.name} value={t.label} previewVar={t.value} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Accent signals</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Rule: if you add accent, remove something else. Never more than one accent per composition.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ACCENTS.map((a) => (
              <TokenSwatch key={a.var} name={a.name} value={a.hex} previewVar={a.var} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-5">
          <h2 className="text-lg font-medium">Usage ratios</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>
              Default distribution: <span className="text-[var(--cx-fg)]">80% Ink</span> / 15% Paper / 5% Accent (optional)
            </li>
            <li>Accent should never be the default background unless concept demands it.</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
