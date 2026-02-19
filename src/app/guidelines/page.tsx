export default function GuidelinesPage() {
  return (
    <div className="px-8 py-12 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">I — CORE</div>
        <h1 className="mega mt-4">Guide&shy;lines</h1>
        <p className="mt-6 text-lg text-gray-500">
          A living ruleset for building decks + assets fast, consistently, and beautifully.
        </p>

        {/* Brand Essence */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">What CX is</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            CX is a next-level social club created by artists, writers, and musicians who craft unique, immersive
            experiences. In an era of increasing isolation, we forge meaningful connections between people, brands, and
            underutilized real-estate. Think ClassPass for culture — one membership unlocks an unlimited world of
            experiences.
          </p>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Tagline</h2>
          <p className="mt-3 text-2xl font-medium tracking-tight" style={{ fontFamily: "var(--cx-font-display)" }}>
            &ldquo;This way in.&rdquo;
          </p>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Not an instruction. A feeling. A flicker. A shift in energy that says you&rsquo;re in the right place at the
            exact wrong time.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Brand Pillars (Proxies)</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              {
                name: "Experimental",
                desc: "We don't replicate — we originate. Every experience is a prototype for the next evolution.",
              },
              {
                name: "Provocative",
                desc: "Not shock for shock's sake. Provocation as invitation — the raised eyebrow that draws you in.",
              },
              {
                name: "Fusion",
                desc: "Disciplines blur. Music bleeds into visual art, food becomes performance, strangers become collaborators.",
              },
              {
                name: "Pulse",
                desc: "Alive, rhythmic, time-sensitive. CX runs on cultural heartbeats — you feel it or you missed it.",
              },
            ].map((pillar) => (
              <div key={pillar.name} className="rounded-lg border border-gray-200 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black">{pillar.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{pillar.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Keywords</h2>
          <div className="mt-3 flex flex-wrap gap-2">
            {["elegant", "nocturnal", "curated", "cultural", "conspiratorial", "premium"].map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-gray-300 px-3 py-1 text-xs uppercase tracking-wider text-gray-500"
              >
                {kw}
              </span>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">North star</h2>
          <p className="mt-2 text-sm text-gray-500">
            <span className="font-medium text-black">Elegant minimalism</span> with an underground edge.
            <br />
            Core tension: <span className="font-medium text-black">structure + spontaneity</span>.
          </p>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">The one-page summary</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>
              Default background: <span className="font-medium text-black">near-black</span>.
            </li>
            <li>
              Default type: <span className="font-medium text-black">Big Caslon</span> (headlines) +{" "}
              <span className="font-medium text-black">Proxima Nova</span> (everything else).
            </li>
            <li>
              Default layout: <span className="font-medium text-black">grid-first</span>, big margins, high contrast, one
              idea per slide.
            </li>
            <li>
              Default color: black/white only. Add at most{" "}
              <span className="font-medium text-black">one</span> accent signal.
            </li>
            <li>Imagery: typography-first. Images are optional and must feel cinematic + intentional.</li>
          </ul>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Design decision ladder</h2>
          <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-gray-500">
            <li>Does it read in 2 seconds?</li>
            <li>Is the hierarchy obvious?</li>
            <li>Can I delete 30% and improve it?</li>
            <li>Is the black doing the heavy lifting?</li>
            <li>Is the mark respected and un-fussy?</li>
            <li>If I added color, can I justify it as signal?</li>
          </ol>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Hard rules (Do / Don&rsquo;t)</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mono text-xs font-medium uppercase text-gray-400">Do</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
                <li>Keep backgrounds near-black unless concept demands otherwise.</li>
                <li>Use Big Caslon for authority; Proxima Nova for clarity.</li>
                <li>Use one accent color as a scalpel (not a paint bucket).</li>
                <li>Maintain 10–20% margin discipline across formats.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mono text-xs font-medium uppercase text-gray-400">Don&rsquo;t</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
                <li>Don&rsquo;t add effects to the mark (shadow/glow/blur) or distort it.</li>
                <li>Don&rsquo;t use multiple accent colors in one composition.</li>
                <li>Don&rsquo;t create busy wallpaper patterns or template clutter.</li>
                <li>Don&rsquo;t use low-contrast thin text on dark fields.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
