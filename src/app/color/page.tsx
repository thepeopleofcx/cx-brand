import { TokenSwatch } from "@/components/TokenSwatch";
import { TokensBlock } from "@/components/TokensBlock";

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
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">II — VISUALS</div>
        <h1 className="mega mt-4">Color</h1>
        <p className="mt-6 text-lg text-gray-500">
          Default is near-black + off-white. Accent is a scalpel: <span className="font-medium text-black">one signal color</span>, used
          sparingly.
        </p>

        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Core</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CORE.map((t) => (
              <TokenSwatch key={t.value} name={t.name} value={t.label} previewVar={t.value} />
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Accent signals</h2>
          <p className="mt-2 text-sm text-gray-500">
            Rule: if you add accent, remove something else. Never more than one accent per composition.
          </p>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ACCENTS.map((a) => (
              <TokenSwatch key={a.var} name={a.name} value={a.hex} previewVar={a.var} />
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-5">
          <h2 className="text-xl font-bold uppercase tracking-tight">Usage ratios</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>
              Default distribution: <span className="font-medium text-black">80% Ink</span> / 15% Paper / 5% Accent (optional)
            </li>
            <li>Accent should never be the default background unless concept demands it.</li>
          </ul>
        </section>
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Design tokens</h2>
          <p className="mt-2 mb-4 text-sm text-gray-500">
            Complete CSS custom properties block — copy and paste into any project.
          </p>
          <TokensBlock />
        </section>
      </div>
    </div>
  );
}
