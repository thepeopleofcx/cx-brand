import type { Metadata } from "next";
import { TokenSwatch } from "@/components/TokenSwatch";
import { TokensBlock } from "@/components/TokensBlock";

export const metadata: Metadata = {
  title: "Color — CX Brand System",
  description: "Signal colors, token swatches, and the full CX palette with copy-ready values.",
};

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

        {/* ── Core Palette ── */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Core</h2>
          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {CORE.map((t) => (
              <TokenSwatch key={t.value} name={t.name} value={t.label} previewVar={t.value} />
            ))}
          </div>
        </section>

        {/* ── Accent Signals ── */}
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

        {/* ── Usage Ratios ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Usage ratios</h2>
          <p className="mt-2 text-sm text-gray-500">
            Default distribution: <span className="font-medium text-black">80% Ink</span> / 15% Paper / 5% Accent (optional).
          </p>

          {/* Visual ratio bar */}
          <div className="mt-4 flex h-10 overflow-hidden rounded-lg">
            <div className="flex items-center justify-center text-[10px] font-medium text-white" style={{ width: "80%", background: "#0B0B0C" }}>
              80% Ink
            </div>
            <div className="flex items-center justify-center text-[10px] font-medium text-gray-800" style={{ width: "15%", background: "#F2F2F2" }}>
              15%
            </div>
            <div className="flex items-center justify-center text-[10px] font-medium text-white" style={{ width: "5%", background: "#F525A3" }}>
            </div>
          </div>
          <div className="mt-1 flex text-[10px] text-gray-400">
            <span style={{ width: "80%" }}>Background</span>
            <span style={{ width: "15%" }}>Text</span>
            <span style={{ width: "5%" }}>Accent</span>
          </div>
        </section>

        {/* ── Contrast & Accessibility ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Contrast guidance</h2>
          <p className="mt-2 text-sm text-gray-500">
            All text must meet WCAG AA minimum. The core palette is designed for this out of the box.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg p-4" style={{ background: "#0B0B0C" }}>
              <span className="text-sm font-medium" style={{ color: "#F2F2F2" }}>Paper on Ink</span>
              <span className="ml-auto rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-medium text-white">AAA ✓</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4" style={{ background: "#FFFFFF" }}>
              <span className="text-sm font-medium" style={{ color: "#0B0B0C" }}>Ink on White</span>
              <span className="ml-auto rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-medium text-white">AAA ✓</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg p-4" style={{ background: "#0B0B0C" }}>
              <span className="text-sm font-medium" style={{ color: "#F525A3" }}>Pink on Ink</span>
              <span className="ml-auto rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-medium text-white">AA ✓</span>
            </div>
            <div className="flex items-center gap-3 rounded-lg p-4" style={{ background: "#0B0B0C" }}>
              <span className="text-sm font-medium" style={{ color: "#B8B8B8" }}>Muted on Ink</span>
              <span className="ml-auto rounded-full bg-green-600 px-2 py-0.5 text-[10px] font-medium text-white">AA ✓</span>
            </div>
          </div>
        </section>

        {/* ── Do / Don't ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Do / Don&rsquo;t</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-2 border-green-500 p-5">
              <div className="mono mb-3 text-[10px] uppercase text-green-600">Do</div>
              <div className="flex h-20 items-center justify-center rounded" style={{ background: "#0B0B0C" }}>
                <span className="text-lg font-bold" style={{ color: "#F525A3" }}>One accent.</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">Single accent color on ink background. Clean.</p>
            </div>

            <div className="rounded-lg border-2 border-red-400 p-5">
              <div className="mono mb-3 text-[10px] uppercase text-red-500">Don&rsquo;t</div>
              <div className="flex h-20 items-center justify-center gap-2 rounded" style={{ background: "#0B0B0C" }}>
                <span className="text-lg font-bold" style={{ color: "#F525A3" }}>Multiple</span>
                <span className="text-lg font-bold" style={{ color: "#08F22F" }}>accent</span>
                <span className="text-lg font-bold" style={{ color: "#FD7E01" }}>colors.</span>
              </div>
              <p className="mt-2 text-xs text-gray-500">Competing signals. Chaotic. Never.</p>
            </div>
          </div>
        </section>

        {/* ── Mode Variations ── */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Mode variations</h2>
          <p className="mt-2 text-sm text-gray-500">
            The theme toggle shifts token values per mode. Core colors adjust subtly; accent shifts in intensity.
          </p>

          <div className="mt-4 rounded-lg border border-gray-200 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono text-[10px] uppercase text-gray-400">
                  <th className="pb-2 text-left font-medium">Token</th>
                  <th className="pb-2 text-left font-medium">Book 1</th>
                  <th className="pb-2 text-left font-medium">Book 2</th>
                  <th className="pb-2 text-left font-medium">Book 3</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">--cx-bg</td>
                  <td className="py-1.5">#0B0B0C</td>
                  <td className="py-1.5">#050505</td>
                  <td className="py-1.5">#000000</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">--cx-pink</td>
                  <td className="py-1.5">#F525A3</td>
                  <td className="py-1.5">#E040A0</td>
                  <td className="py-1.5">#FF00AA</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">--cx-radius</td>
                  <td className="py-1.5">10px</td>
                  <td className="py-1.5">12px</td>
                  <td className="py-1.5">6px</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Use the mode toggle in the sidebar to preview each variation live.
          </p>
        </section>

        {/* ── Design Tokens Block ── */}
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
