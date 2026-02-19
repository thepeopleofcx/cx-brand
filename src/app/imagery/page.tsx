export default function ImageryPage() {
  return (
    <div className="px-8 py-12 md:px-12 md:py-16">
      <div className="max-w-3xl">
        <div className="mono text-xs text-gray-400">II — VISUALS</div>
        <h1 className="mega mt-4">Imagery</h1>
        <p className="mt-6 text-lg text-gray-500">
          Photography and texture guidelines for the CX visual world.
        </p>

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

        <section className="mt-10">
          <h2 className="text-xl font-bold uppercase tracking-tight">CX image feels like…</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-1">
            {[
              "The back room of a gallery opening",
              "A Polaroid from a party you weren't supposed to be at",
              "The last frame of a Kubrick film",
            ].map((feel) => (
              <div key={feel} className="rounded-lg border border-gray-200 p-5">
                <p className="text-sm italic text-gray-500">&ldquo;{feel}&rdquo;</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Motifs</h2>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li><span className="font-medium text-black">Thin white lines</span> — for structure only, never decorative.</li>
            <li>No decorative patterns, no gradients, no drop shadows.</li>
            <li>Lines create grids, borders, and spatial rhythm — nothing more.</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
