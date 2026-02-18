export default function GuidelinesPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-3xl">
        <h1 className="text-3xl font-semibold tracking-tight">Guidelines</h1>
        <p className="mt-4 text-[var(--cx-muted)]">
          A living ruleset for building decks + assets fast, consistently, and beautifully.
        </p>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">North star</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            <span className="text-[var(--cx-fg)]">Elegant minimalism</span> with an underground edge.
            <br />
            Core tension: <span className="text-[var(--cx-fg)]">structure + spontaneity</span>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">The one-page summary</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>
              Default background: <span className="text-[var(--cx-fg)]">near-black</span>.
            </li>
            <li>
              Default type: <span className="text-[var(--cx-fg)]">Big Caslon</span> (headlines) +{" "}
              <span className="text-[var(--cx-fg)]">Proxima Nova</span> (everything else).
            </li>
            <li>
              Default layout: <span className="text-[var(--cx-fg)]">grid-first</span>, big margins, high contrast, one idea per slide.
            </li>
            <li>
              Default color: black/white only. Add at most <span className="text-[var(--cx-fg)]">one</span> accent signal.
            </li>
            <li>
              Imagery: typography-first. Images are optional and must feel cinematic + intentional.
            </li>
          </ul>
        </section>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Design decision ladder</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>Does it read in 2 seconds?</li>
            <li>Is the hierarchy obvious?</li>
            <li>Can I delete 30% and improve it?</li>
            <li>Is the black doing the heavy lifting?</li>
            <li>Is the mark respected and un-fussy?</li>
            <li>If I added color, can I justify it as signal?</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Hard rules (Do / Don’t)</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[var(--cx-border)] p-6">
              <h3 className="text-sm font-medium">Do</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
                <li>Keep backgrounds near-black unless concept demands otherwise.</li>
                <li>Use Big Caslon for authority; Proxima Nova for clarity.</li>
                <li>Use one accent color as a scalpel (not a paint bucket).</li>
                <li>Maintain 10–20% margin discipline across formats.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--cx-border)] p-6">
              <h3 className="text-sm font-medium">Don’t</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
                <li>Don’t add effects to the mark (shadow/glow/blur) or distort it.</li>
                <li>Don’t use multiple accent colors in one composition.</li>
                <li>Don’t create busy wallpaper patterns or template clutter.</li>
                <li>Don’t use low-contrast thin text on dark fields.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
