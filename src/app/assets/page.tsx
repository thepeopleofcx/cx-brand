import Image from "next/image";
import Link from "next/link";

type Logo = {
  name: string;
  filename: string;
  note: string;
  primary?: boolean;
};

const LOGOS: Logo[] = [
  {
    name: "CX-Logo-Thin_white.png",
    filename: "/assets/logos/CX-Logo-Thin_white.png",
    note: "Primary lockup. Best on dark backgrounds (default).",
    primary: true,
  },
  {
    name: "CX-Logo-Thin_black.png",
    filename: "/assets/logos/CX-Logo-Thin_black.png",
    note: "Alternate for light backgrounds.",
  },
  {
    name: "CX-Logo-Thin_white-on-black.png",
    filename: "/assets/logos/CX-Logo-Thin_white-on-black.png",
    note: "Safe-for-anywhere version (includes its own dark field).",
  },
  {
    name: "CX-Script_black.png",
    filename: "/assets/logos/CX-Script_black.png",
    note: "Variant mark. Use sparingly; treat as expressive, not default.",
  },
  {
    name: "CX-Script_white-on-black.png",
    filename: "/assets/logos/CX-Script_white-on-black.png",
    note: "Variant mark (with field). Useful for quick placement.",
  },
];

export default function AssetsPage() {
  return (
    <div className="px-5 py-8 md:px-12 md:py-16">
      <div className="max-w-4xl">
        <div className="mono text-xs text-gray-400">III — SYSTEM</div>
        <h1 className="mega mt-4">Assets</h1>
        <p className="mt-6 text-lg text-gray-500">
          Downloadables for the team. Keep the mark respected: no effects, no distortion, generous space.
        </p>

        <section className="mt-12 border-t-2 pt-6" style={{ borderColor: "var(--cx-pink)" }}>
          <h2 className="text-xl font-bold uppercase tracking-tight">Logo pack</h2>
          <p className="mt-2 text-sm text-gray-500">
            Default application: <span className="font-medium text-black">white mark on ink</span>. Use black mark only when the
            background demands it.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-gray-500">
            <li>Never add shadow/glow/blur/outline to the mark.</li>
            <li>Never stretch, skew, rotate, or warp.</li>
            <li>Don&rsquo;t place over busy imagery unless you add a solid field.</li>
          </ul>
        </section>

        <section className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-xl font-bold uppercase tracking-tight">Files</h2>
            <span className="mono text-xs uppercase text-gray-400">PNG</span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {LOGOS.map((l) => (
              <div
                key={l.name}
                className="rounded-lg border border-gray-200 p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium tracking-tight text-black">
                      {l.primary ? (
                        <span className="mono mr-2 rounded bg-black px-2 py-0.5 text-xs font-semibold text-white">
                          PRIMARY
                        </span>
                      ) : null}
                      {l.name}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">{l.note}</p>
                  </div>
                  <Link
                    href={l.filename}
                    download
                    className="rounded-md border border-gray-300 px-3 py-2 text-xs text-black transition hover:border-[var(--cx-pink)] hover:text-[var(--cx-pink)]"
                  >
                    Download
                  </Link>
                </div>

                {/* Dark container for logo previews */}
                <div className="mt-4 rounded-lg bg-[#0b0b0c] p-4">
                  <div className="relative h-20 w-full">
                    <Image
                      src={l.filename}
                      alt={l.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority={l.primary}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-lg border border-gray-200 p-6">
          <h2 className="text-xl font-bold uppercase tracking-tight">Naming + versioning</h2>
          <p className="mt-2 text-sm text-gray-500">
            Keep filenames stable and explicit. If you revise an asset, append a version.
          </p>
          <div className="mt-4 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <code className="mono text-xs text-gray-600">
              CX-Logo-Thin_white_v01.png
              <br />
              CX-Logo-Thin_white_v02.png
            </code>
          </div>
        </section>
      </div>
    </div>
  );
}
