import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Components — CX Brand System",
  description: "Reusable UI components: buttons, cards, inputs, badges.",
};

import { CxButton } from "@/components/CxButton";
import { CxCard } from "@/components/CxCard";
import { CxBadge } from "@/components/CxBadge";
import { CxInput } from "@/components/CxInput";

export default function ComponentsPage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">III — SYSTEM</div>
        <h1 className="mega mt-4">Compo&shy;nents</h1>
        <p className="mt-6 text-lg text-gray-500">
          Minimal, reusable building blocks. If it doesn&rsquo;t add meaning, delete it.
        </p>

        {/* ── Buttons ── */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Buttons</h2>
          <p className="mt-2 text-sm text-gray-500">
            Hierarchy comes from contrast + spacing, not gradients or effects.
          </p>

          <div className="mt-6 space-y-6">
            <div>
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Primary</div>
              <div className="flex flex-wrap gap-3">
                <CxButton>Default</CxButton>
                <CxButton>Enter guidelines</CxButton>
              </div>
            </div>

            <div>
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Ghost</div>
              <div className="flex flex-wrap gap-3">
                <CxButton variant="ghost">Secondary action</CxButton>
                <CxButton href="/logo" variant="ghost">Link variant →</CxButton>
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-lg border border-gray-200 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono text-[10px] uppercase text-gray-400">
                  <th className="pb-2 text-left font-medium">Prop</th>
                  <th className="pb-2 text-left font-medium">Type</th>
                  <th className="pb-2 text-left font-medium">Default</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">variant</td>
                  <td className="py-1.5">&quot;primary&quot; | &quot;ghost&quot;</td>
                  <td className="py-1.5">&quot;primary&quot;</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">href</td>
                  <td className="py-1.5">string?</td>
                  <td className="py-1.5">—</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">children</td>
                  <td className="py-1.5">ReactNode</td>
                  <td className="py-1.5">—</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Badges ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Badges</h2>
          <p className="mt-2 text-sm text-gray-500">
            Status indicators and labels. Small, pill-shaped, no noise.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <CxBadge>Default</CxBadge>
            <CxBadge variant="accent">New</CxBadge>
            <CxBadge variant="muted">Archive</CxBadge>
          </div>

          <div className="mt-4 rounded-lg border border-gray-200 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono text-[10px] uppercase text-gray-400">
                  <th className="pb-2 text-left font-medium">Prop</th>
                  <th className="pb-2 text-left font-medium">Type</th>
                  <th className="pb-2 text-left font-medium">Default</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-gray-100">
                  <td className="py-1.5 font-mono text-xs">variant</td>
                  <td className="py-1.5">&quot;default&quot; | &quot;accent&quot; | &quot;muted&quot;</td>
                  <td className="py-1.5">&quot;default&quot;</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ── Cards ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Cards</h2>
          <p className="mt-2 text-sm text-gray-500">
            One idea per surface. If it needs a paragraph, it&rsquo;s two cards.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <CxCard kicker="Rule" title="One idea per surface">
              A card is a single concept container. If it needs a paragraph, it&rsquo;s two cards.
            </CxCard>
            <CxCard kicker="Rule" title="Borders are structural">
              Use borders to organize information, not to decorate.
            </CxCard>
            <CxCard kicker="Example" title="Event preview">
              Title + date + single accent stripe. Nothing else needed.
            </CxCard>
            <CxCard title="Minimal card">
              No kicker. Just title and content. Still works.
            </CxCard>
          </div>
        </section>

        {/* ── Inputs ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Inputs</h2>
          <p className="mt-2 text-sm text-gray-500">
            Clean form elements. Focus ring uses the accent color. Labels in mono caps.
          </p>

          <div className="mt-4 grid gap-4 max-w-sm">
            <CxInput label="Email" placeholder="you@cx.club" type="email" />
            <CxInput label="Full name" placeholder="First Last" />
          </div>
        </section>

        {/* ── Dividers & Spacing ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Dividers &amp; Spacing</h2>
          <p className="mt-2 text-sm text-gray-500">
            Horizontal rules use 2px weight with the pink accent for section breaks, or 1px gray for
            within-section separation.
          </p>

          <div className="mt-6 space-y-4">
            <div>
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Section divider (accent)</div>
              <hr className="border-t-2" style={{ borderColor: "var(--cx-pink)" }} />
            </div>
            <div>
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Content divider (neutral)</div>
              <hr className="border-t border-gray-200" />
            </div>
          </div>
        </section>

        {/* ── Mono Label ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Mono Labels</h2>
          <p className="mt-2 text-sm text-gray-500">
            Small uppercase monospaced labels used for kickers, section IDs, and metadata.
            Apply the <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">mono</code> class.
          </p>

          <div className="mt-4 space-y-2">
            <div className="mono text-xs text-gray-400">NR. 1 / 2026</div>
            <div className="mono text-xs text-gray-400">III — SYSTEM</div>
            <div className="mono text-[10px] uppercase text-gray-400">Category label</div>
          </div>
        </section>

        {/* ── Anti-patterns ── */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Anti-patterns</h2>
          <p className="mt-2 text-sm text-gray-500">
            Things that break the system. If you see these, something went wrong.
          </p>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Multiple accents in one composition.</li>
            <li>Random icons, stickers, dividers that don&rsquo;t clarify content.</li>
            <li>Low-contrast UI chrome (thin light-gray text on white).</li>
            <li>Over-rounding everything — keep <code className="rounded bg-gray-100 px-1 py-0.5 text-xs">--cx-radius</code> intentional.</li>
            <li>Buttons with both fill + border (pick one hierarchy signal).</li>
            <li>Cards with more than one idea crammed in.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
