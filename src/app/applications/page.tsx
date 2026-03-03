import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Applications — CX Brand System",
  description: "Real-world brand applications and mockups.",
};

export default function ApplicationsPage() {
  const mark = (
    <div className="text-xs uppercase tracking-[0.25em] text-white/90">CX</div>
  );

  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-4xl">
        <div className="mono text-xs text-gray-400">III — SYSTEM</div>
        <h1 className="mega mt-4">Appli&shy;cations</h1>
        <p className="mt-6 text-lg text-gray-500">
          Real mock-ups built with CX design tokens. These are shippable, not hypothetical.
        </p>

        {/* Event Poster */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Event poster / invite</h2>
          <div
            className="relative flex aspect-[3/4] max-w-sm flex-col justify-between overflow-hidden rounded-lg p-8"
            style={{ background: "#0b0b0c" }}
          >
            <div>{mark}</div>
            <div>
              <div className="mb-1 h-px w-12 bg-[var(--cx-accent-cherry-collapse)]" />
              <h3
                className="text-2xl font-medium uppercase tracking-tight text-white"
                style={{ fontFamily: "var(--cx-font-display)" }}
              >
                AFTER DARK
              </h3>
              <p className="mt-2 text-xs uppercase tracking-widest text-white/50">
                March 14, 2026 — 10 PM
              </p>
              <p className="text-xs uppercase tracking-widest text-white/50">
                The Vault, Downtown LA
              </p>
            </div>
          </div>
        </section>

        {/* IG Story */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">IG Story (9:16)</h2>
          <div
            className="relative flex aspect-[9/16] max-w-[240px] flex-col justify-end overflow-hidden rounded-lg p-6"
            style={{ background: "#0b0b0c" }}
          >
            <div className="absolute top-5 left-5">{mark}</div>
            <div>
              <p
                className="text-xl font-medium uppercase leading-tight tracking-tight text-white"
                style={{ fontFamily: "var(--cx-font-display)" }}
              >
                YOU&rsquo;RE NOT<br />ON THE LIST.
              </p>
              <p
                className="mt-1 text-xl font-medium uppercase leading-tight tracking-tight"
                style={{ fontFamily: "var(--cx-font-display)", color: "var(--cx-pink)" }}
              >
                YOU ARE<br />THE LIST.
              </p>
              <p className="mt-4 text-[10px] uppercase tracking-widest text-white/40">
                This way in →
              </p>
            </div>
          </div>
        </section>

        {/* IG Post */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">IG Post (1:1)</h2>
          <div
            className="relative flex aspect-square max-w-sm flex-col justify-center items-center overflow-hidden rounded-lg p-8"
            style={{ background: "#0b0b0c" }}
          >
            <div className="absolute top-5 left-5">{mark}</div>
            <p
              className="text-center text-2xl font-medium uppercase leading-snug tracking-tight text-white"
              style={{ fontFamily: "var(--cx-font-display)" }}
            >
              A SIGNAL<br />FROM THE<br />UNDERGROUND
            </p>
            <div className="mt-4 h-px w-16 bg-[var(--cx-accent-ethernet-sky)]" />
          </div>
        </section>

        {/* Member Card */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Member card / credential</h2>
          <div
            className="relative flex aspect-[1.6/1] max-w-sm flex-col justify-between overflow-hidden rounded-lg p-6"
            style={{ background: "#0b0b0c" }}
          >
            <div className="flex items-start justify-between">
              {mark}
              <div className="text-[10px] uppercase tracking-widest text-white/30">Member</div>
            </div>
            <div>
              <p className="text-lg font-medium tracking-tight text-white">Alex Rivera</p>
              <p className="text-[10px] uppercase tracking-widest text-white/40">Since 2024</p>
              <div className="mt-3 h-px w-full bg-white/10" />
              <p className="mt-2 text-[9px] uppercase tracking-widest text-white/25">
                CX — This way in.
              </p>
            </div>
          </div>
        </section>

        {/* Email Header */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Email header</h2>
          <div
            className="flex max-w-lg items-center justify-between overflow-hidden rounded-lg px-6 py-4"
            style={{ background: "#0b0b0c" }}
          >
            {mark}
            <p className="text-[10px] uppercase tracking-widest text-white/40">This way in.</p>
          </div>
        </section>

        {/* Signage */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Signage tile</h2>
          <div
            className="relative flex aspect-square max-w-[200px] flex-col items-center justify-center overflow-hidden rounded-lg"
            style={{ background: "#0b0b0c" }}
          >
            <div className="text-2xl uppercase tracking-[0.35em] text-white/90">CX</div>
            <div className="mt-2 h-px w-8 bg-[var(--cx-accent-dream-bruise)]" />
          </div>
        </section>
      </div>
    </div>
  );
}
