import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Logo — CX Brand System",
  description: "Logo lockups, clear space, usage rules, and downloadable assets.",
};

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
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-4xl">
        <div className="mono text-xs text-gray-400">I — CORE</div>
        <h1 className="mega mt-4">Logo</h1>
        <p className="mt-6 text-lg text-gray-500">
          The CX mark is handwritten — not as style, as intent. The system is disciplined; the mark stays human.
        </p>

        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <div className="flex flex-wrap items-baseline justify-between gap-4">
            <h2 className="text-xl font-bold uppercase tracking-tight">Primary lockup</h2>
            <span className="mono rounded bg-black px-2 py-0.5 text-xs font-semibold text-white">PRIMARY</span>
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Default application: <span className="font-medium text-black">white mark on ink</span>. This is the "always right" choice
            for dark backgrounds.
          </p>

          {/* Dark container for white logo */}
          <div className="mt-4 rounded-lg bg-[#0b0b0c] p-8">
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
          <h2 className="text-xl font-bold uppercase tracking-tight">Clear space</h2>
          <p className="mt-2 text-sm text-gray-500">
            Keep a generous exclusion zone around the mark. Rule of thumb: no text or objects within a distance equal to the height
            of the "C" stroke.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mono text-xs uppercase text-gray-400">Do</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
                <li>Give it air. Let the black do the work.</li>
                <li>Place on a solid field when the background is busy.</li>
                <li>Use one accent as signal, not palette.</li>
              </ul>
            </div>
            <div className="rounded-lg border border-gray-200 p-6">
              <div className="mono text-xs uppercase text-gray-400">Don&rsquo;t</div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
                <li>Don&rsquo;t crowd it with type.</li>
                <li>Don&rsquo;t place over noisy imagery without a field.</li>
                <li>Don&rsquo;t turn it into a pattern wallpaper.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Minimum size</h2>
          <p className="mt-2 text-sm text-gray-500">
            Use the thin mark for large-scale, cinematic negative space. If the mark must be tiny (social icon / favicon-like),
            consider a thicker variant or give it its own field.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>
              On dark backgrounds: <span className="font-medium text-black">thin</span> is preferred when there&rsquo;s space.
            </li>
            <li>
              For small placements: choose the most legible variant, then increase clear space.
            </li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Never</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Add drop shadows, glows, bevels, blur, or outlines.</li>
            <li>Stretch, skew, rotate, or warp the mark.</li>
            <li>Use low-contrast placement (gray-on-black). This brand is high contrast.</li>
          </ul>
        </section>

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Variants</h2>
          <p className="mt-2 text-sm text-gray-500">
            Variants are valid — as long as they remain hand-made and expressive — but they&rsquo;re not the default.
          </p>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {ALT.map((a) => (
              <div key={a.name} className="rounded-lg border border-gray-200 p-5">
                <div className="text-sm font-medium tracking-tight text-black">{a.name}</div>
                {/* Dark container for logo visibility */}
                <div className="mt-3 rounded-lg bg-[#0b0b0c] p-4">
                  <div className="relative h-16 w-full">
                    <Image src={a.src} alt={a.name} fill className="object-contain" sizes="(max-width: 768px) 100vw, 50vw" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Event reinterpretations</h2>
          <p className="mt-2 text-sm text-gray-500">
            The mark may be re-drawn for event-specific moments (still handwritten) as long as it remains recognizably &ldquo;CX&rdquo; and
            preserves the ritual of the hand.
          </p>
        </section>
      </div>
    </div>
  );
}
