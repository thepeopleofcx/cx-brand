import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Voice — CX Brand System",
  description: "Tone of voice, copy principles, and writing guidelines.",
};

export default function VoicePage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">I — CORE</div>
        <h1 className="mega mt-4">Voice &amp; Copy</h1>
        <p className="mt-6 text-lg text-gray-500">
          CX is the new Studio 54 — without having to say it.
        </p>

        <section className="mt-12">
          <h2 className="text-xl font-bold uppercase tracking-tight">Voice principles</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { name: "Confident", desc: "We don't hedge. We declare." },
              { name: "Mythic", desc: "Everything hints at a larger story. We write lore, not copy." },
              { name: "Precise", desc: "Every word earns its place. If it doesn't cut, it goes." },
              { name: "Sensual-but-controlled", desc: "Texture without excess. Allure without try-hard." },
              { name: "Never cheesy", desc: "No puns, no wordplay for its own sake, no forced cleverness." },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-gray-200 p-5">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black">{p.name}</h3>
                <p className="mt-2 text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Tone rules</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Declarative. Short phrasing.</li>
            <li>
              <span className="font-medium text-black">ALL-CAPS</span> for headlines.
            </li>
            <li>Sentence case or uppercase only — <span className="font-medium text-black">never Title Case</span>.</li>
            <li>Fragments are fine. Periods are punctuation and rhythm.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Example rewrites</h2>
          <div className="mt-4 space-y-4">
            {[
              { context: "Event invite", line: "You're not on the list. You are the list." },
              { context: "Membership welcome", line: "This way in. The rest is up to you." },
              { context: "Short about", line: "A signal from the underground." },
              { context: "Customer service", line: "Direct, warm, zero corporate foam." },
            ].map((ex) => (
              <div key={ex.context} className="rounded-lg border border-gray-200 p-5">
                <div className="mono text-xs uppercase text-gray-400">{ex.context}</div>
                <p className="mt-2 text-lg font-medium tracking-tight" style={{ fontFamily: "var(--cx-font-display)" }}>
                  &ldquo;{ex.line}&rdquo;
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Content pillars</h2>
          <p className="mt-3 text-sm text-gray-500">
            All brand communications orbit these six pillars. Every post, email, or caption should map to at least one.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              { name: "Artist Interviews", desc: "Conversations with creators — raw, unpolished, first-person." },
              { name: "Curated Playlists", desc: "Sonic mood boards. The soundtrack to the world we're building." },
              { name: "Dinner & Wine", desc: "Invitations, menus, pairings. Hospitality as performance." },
              { name: "Event Recaps", desc: "After-the-fact lore. Not summaries — artifacts." },
              { name: "Guest Profiles", desc: "Who was there. Why it mattered. Faces over facts." },
              { name: "What's Hot", desc: "The CX radar. Venues, shows, drops, openings. Signal, not noise." },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-gray-200 p-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-black">{p.name}</h3>
                <p className="mt-1.5 text-sm text-gray-500">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Tagline &amp; signature lines</h2>
          <div className="mt-4 space-y-3">
            {[
              { label: "Primary tagline", line: "This way in." },
              { label: "Positioning", line: "A signal from the underground." },
              { label: "Investor shorthand", line: "The future of connection." },
              { label: "Cultural frame", line: "Like ClassPass for culture." },
            ].map((t) => (
              <div key={t.label} className="flex items-baseline gap-4">
                <span className="mono shrink-0 text-[10px] uppercase text-gray-400 w-36">{t.label}</span>
                <span className="text-lg font-medium tracking-tight" style={{ fontFamily: "var(--cx-font-display)" }}>
                  &ldquo;{t.line}&rdquo;
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Do / Don&rsquo;t</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mono text-xs font-medium uppercase text-gray-400">Do</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
                <li>Write like you&rsquo;re leaving a note on someone&rsquo;s door at 2 AM.</li>
                <li>Use fragments and single-sentence paragraphs.</li>
                <li>Let silence (whitespace) do the talking.</li>
                <li>Sound like you know something they don&rsquo;t.</li>
                <li>Keep it short enough to fit on a match-book.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <h3 className="mono text-xs font-medium uppercase text-gray-400">Don&rsquo;t</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
                <li>Don&rsquo;t use Title Case for headlines (ALL-CAPS or sentence case).</li>
                <li>Don&rsquo;t use exclamation marks unless something is literally on fire.</li>
                <li>Don&rsquo;t use corporate foam: &ldquo;leverage&rdquo;, &ldquo;synergy&rdquo;, &ldquo;curated experience&rdquo;.</li>
                <li>Don&rsquo;t explain the joke. Don&rsquo;t over-describe.</li>
                <li>Don&rsquo;t use emojis in formal brand communications.</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
