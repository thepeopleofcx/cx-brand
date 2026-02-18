import { CxButton } from "@/components/CxButton";
import { CxCard } from "@/components/CxCard";

export default function ComponentsPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="mt-4 text-[var(--cx-muted)]">
          Minimal, reusable building blocks. If it doesn’t add meaning, delete it.
        </p>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Buttons</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <CxButton>Primary</CxButton>
            <CxButton variant="ghost">Ghost</CxButton>
            <CxButton href="/guidelines" variant="ghost">
              Link button
            </CxButton>
          </div>
          <p className="mt-3 text-sm text-[var(--cx-muted)]">
            Rule: button hierarchy comes from contrast + spacing, not gradients or effects.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Cards</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <CxCard kicker="Rule" title="One idea per surface">
              A card is a single concept container. If it needs a paragraph, it’s two cards.
            </CxCard>
            <CxCard kicker="Rule" title="Borders are structural">
              Use borders to organize information, not to decorate.
            </CxCard>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Anti-patterns</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>Multiple accents in one composition.</li>
            <li>Random icons, stickers, dividers that don’t clarify content.</li>
            <li>Low-contrast UI chrome.</li>
            <li>Over-rounding everything (keep radius intentional).</li>
          </ul>
        </section>
      </div>
    </main>
  );
}
