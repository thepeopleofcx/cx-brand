import Image from "next/image";

const PRIMARY = {
  name: "CX-Logo-Thin_white.png",
  src: "/assets/logos/CX-Logo-Thin_white.png",
};

const ALT = [
  { name: "CX-Logo-Thin_black.png", src: "/assets/logos/CX-Logo-Thin_black.png" },
  { name: "CX-Logo-Thin_white-on-black.png", src: "/assets/logos/CX-Logo-Thin_white-on-black.png" },
  { name: "CX-Script_black.png", src: "/assets/logos/CX-Script_black.png" },
  { name: "CX-Script_white-on-black.png", src: "/assets/logos/CX-Script_white-on-black.png" },
];

export default function LogoPage() {
  return (
    <main className="px-6 py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">Logo</h1>
        <p className="mt-4 text-[var(--cx-muted)]">
          The CX mark is handwritten — not as style, as intent. The system is disciplined; the mark stays human.
        </p>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-lg font-medium">Primary lockup</h2>
            <span className="rounded bg-white px-2 py-0.5 text-xs font-semibold text-black">PRIMARY</span>
          </div>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Default application: <span className="text-[var(--cx-fg)]">white mark on ink</span>. This is the “always right” choice
            for dark backgrounds.
          </p>

          <div className="mt-4 rounded-lg border border-[var(--cx-border)] bg-[var(--cx-bg)] p-5">
            <div className="relative h-24 w-full">
              <Image
                src={PRIMARY.src}
                alt={PRIMARY.name}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 100vw, 70vw"
                priority
              />
            </div>
          </div>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Clear space</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Keep a generous exclusion zone around the mark. Rule of thumb: no text or objects within a distance equal to the height
            of the “C” stroke.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-[var(--cx-border)] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--cx-muted)]">Do</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
                <li>Give it air. Let the black do the work.</li>
                <li>Place on a solid field when the background is busy.</li>
                <li>Use one accent as signal, not palette.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-[var(--cx-border)] p-6">
              <div className="text-xs uppercase tracking-[0.18em] text-[var(--cx-muted)]">Don’t</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
                <li>Don’t crowd it with type.</li>
                <li>Don’t place over noisy imagery without a field.</li>
                <li>Don’t turn it into a pattern wallpaper.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Minimum size</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Use the thin mark for large-scale, cinematic negative space. If the mark must be tiny (social icon / favicon-like),
            consider a thicker variant or give it its own field.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>
              On dark backgrounds: <span className="text-[var(--cx-fg)]">thin</span> is preferred when there’s space.
            </li>
            <li>
              For small placements: choose the most legible variant, then increase clear space.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Never</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>Add drop shadows, glows, bevels, blur, or outlines.</li>
            <li>Stretch, skew, rotate, or warp the mark.</li>
            <li>Use low-contrast placement (gray-on-black). This brand is high contrast.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-lg font-medium">Variants</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Variants are valid — as long as they remain hand-made and expressive — but they’re not the default.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {ALT.map((a) => (
              <div key={a.name} className="rounded-lg border border-[var(--cx-border)] p-5">
                <div className="text-sm font-medium tracking-tight">{a.name}</div>
                <div className="mt-3 rounded-lg border border-[var(--cx-border)] bg-[var(--cx-bg)] p-4">
                  <div className="relative h-16 w-full">
                    <Image src={a.src} alt={a.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Event reinterpretations</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            The mark may be re-drawn for event-specific moments (still handwritten) as long as it remains recognizably “CX” and
            preserves the ritual of the hand.
          </p>
        </section>
      </div>
    </main>
  );
}
