import { CxButton } from "@/components/CxButton";
import { CxCard } from "@/components/CxCard";

export default function ComponentsPage() {
  return (
    <div className="px-8 py-12 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">III — SYSTEM</div>
        <h1 className="mega mt-4">Compo&shy;nents</h1>
        <p className="mt-6 text-lg text-gray-500">
          Minimal, reusable building blocks. If it doesn&rsquo;t add meaning, delete it.
        </p>

        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Buttons</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <CxButton>Primary</CxButton>
            <CxButton variant="ghost">Ghost</CxButton>
            <CxButton href="/guidelines" variant="ghost">
              Link button
            </CxButton>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Rule: button hierarchy comes from contrast + spacing, not gradients or effects.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Cards</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <CxCard kicker="Rule" title="One idea per surface">
              A card is a single concept container. If it needs a paragraph, it&rsquo;s two cards.
            </CxCard>
            <CxCard kicker="Rule" title="Borders are structural">
              Use borders to organize information, not to decorate.
            </CxCard>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Anti-patterns</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Multiple accents in one composition.</li>
            <li>Random icons, stickers, dividers that don&rsquo;t clarify content.</li>
            <li>Low-contrast UI chrome.</li>
            <li>Over-rounding everything (keep radius intentional).</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
