import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Imagery — CX Brand System",
  description: "Photography direction, treatment styles, and image guidelines.",
};

export default function ImageryPage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">II — VISUALS</div>
        <h1 className="mega mt-4">Imagery</h1>
        <p className="mt-6 text-lg text-gray-500">
          Photography and texture guidelines for the CX visual world.
        </p>

        {/* ── Photography Rules ── */}
        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Photography rules</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li><span className="font-medium text-black">High contrast</span> — deep blacks, bright highlights, minimal mid-tones.</li>
            <li><span className="font-medium text-black">Cinematic</span> — every frame could be a film still.</li>
            <li><span className="font-medium text-black">Dark / moody</span> — available light preferred, never overlit.</li>
            <li><span className="font-medium text-black">Candid over posed</span> — catch people in motion, mid-gesture, unaware.</li>
            <li><span className="font-medium text-black">B&amp;W or desaturated</span> preferred. Color only when it earns its place.</li>
            <li><span className="font-medium text-black">Editorial composition</span> — asymmetry, negative space, tension in the frame.</li>
          </ul>
        </section>

        {/* ── Image Treatment ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Image treatment</h2>
          <p className="mt-2 text-sm text-gray-500">
            Every image should pass through the CX filter before use. This isn&rsquo;t a preset — it&rsquo;s a discipline.
          </p>

          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Step 1</div>
              <h3 className="text-sm font-medium text-black">Desaturate</h3>
              <p className="mt-1 text-xs text-gray-500">Convert to B&W or pull saturation to 15–30%. Color is earned, not default.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Step 2</div>
              <h3 className="text-sm font-medium text-black">Crush the blacks</h3>
              <p className="mt-1 text-xs text-gray-500">Push shadows toward true black. Lift highlights slightly. The curve should be steep.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Step 3</div>
              <h3 className="text-sm font-medium text-black">Add grain</h3>
              <p className="mt-1 text-xs text-gray-500">Subtle film grain (2–5%). Analog texture, not noise. It should feel found, not filtered.</p>
            </div>
            <div className="rounded-lg border border-gray-200 p-5">
              <div className="mono mb-2 text-[10px] uppercase text-gray-400">Step 4</div>
              <h3 className="text-sm font-medium text-black">Crop with intent</h3>
              <p className="mt-1 text-xs text-gray-500">Off-center subjects. Cut into people. Leave negative space where the eye should rest.</p>
            </div>
          </div>
        </section>

        {/* ── Do / Don't ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">Do / Don&rsquo;t</h2>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border-2 border-green-500 p-5">
              <div className="mono mb-3 text-[10px] uppercase text-green-600">Do</div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-500">
                <li>Dark, moody, high-contrast shots</li>
                <li>Candid moments, mid-motion</li>
                <li>B&W or heavily desaturated</li>
                <li>Asymmetric crops with negative space</li>
                <li>Grain and analog texture</li>
                <li>One image per surface</li>
              </ul>
            </div>

            <div className="rounded-lg border-2 border-red-400 p-5">
              <div className="mono mb-3 text-[10px] uppercase text-red-500">Don&rsquo;t</div>
              <ul className="list-disc space-y-1.5 pl-5 text-sm text-gray-500">
                <li>Bright, flat, evenly-lit stock photos</li>
                <li>Staged smiles or corporate poses</li>
                <li>Saturated / HDR / over-processed</li>
                <li>Centered, symmetrical, safe framing</li>
                <li>Instagram filters or color overlays</li>
                <li>Collages or image grids (one idea per surface)</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ── Texture ── */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Texture</h2>
          <p className="mt-3 text-sm text-gray-500">
            Raw grain, brushstrokes, paper creases. The &ldquo;Blkmarket / Copyscan&rdquo; aesthetic — photocopy artifacts,
            risograph bleed, analog imperfection on digital precision.
          </p>
          <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4">
            <code className="mono text-xs text-gray-600">
              mix-blend-mode: exclusion; /* overlay texture layer */
            </code>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            Apply texture overlays with <span className="font-medium text-black">Exclusion</span> blend mode for that
            distressed-but-intentional look.
          </p>
        </section>

        {/* ── CX Image Feels Like ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">CX image feels like…</h2>
          <div className="mt-4 grid gap-3">
            {[
              "The back room of a gallery opening",
              "A Polaroid from a party you weren't supposed to be at",
              "The last frame of a Kubrick film",
              "A contact sheet from a 3 AM shoot",
              "Something beautiful that doesn't care if you noticed",
            ].map((feel) => (
              <div key={feel} className="rounded-lg border border-gray-200 p-5">
                <p className="text-sm italic text-gray-500">&ldquo;{feel}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Motifs ── */}
        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Motifs</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li><span className="font-medium text-black">Thin white lines</span> — for structure only, never decorative.</li>
            <li>No decorative patterns, no gradients, no drop shadows.</li>
            <li>Lines create grids, borders, and spatial rhythm — nothing more.</li>
          </ul>
        </section>

        {/* ── File Specs ── */}
        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">File specs</h2>
          <div className="mt-4 rounded-lg border border-gray-200 p-4">
            <table className="w-full text-sm">
              <thead>
                <tr className="mono text-[10px] uppercase text-gray-400">
                  <th className="pb-2 text-left font-medium">Context</th>
                  <th className="pb-2 text-left font-medium">Format</th>
                  <th className="pb-2 text-left font-medium">Min resolution</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                <tr className="border-t border-gray-100">
                  <td className="py-1.5">Web hero</td>
                  <td className="py-1.5">WebP / AVIF</td>
                  <td className="py-1.5">2400 × 1600</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5">Social / card</td>
                  <td className="py-1.5">PNG / WebP</td>
                  <td className="py-1.5">1200 × 630</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5">Print</td>
                  <td className="py-1.5">TIFF / PSD</td>
                  <td className="py-1.5">300 DPI at output size</td>
                </tr>
                <tr className="border-t border-gray-100">
                  <td className="py-1.5">Texture overlay</td>
                  <td className="py-1.5">PNG (transparent)</td>
                  <td className="py-1.5">Match canvas size</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
