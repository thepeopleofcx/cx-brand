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
    <main className="px-6 py-12">
      <div className="max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight">Assets</h1>
        <p className="mt-4 text-[var(--cx-muted)]">
          Downloadables for the team. Keep the mark respected: no effects, no distortion, generous space.
        </p>

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Logo pack</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Default application: <span className="text-[var(--cx-fg)]">white mark on ink</span>. Use black mark only when the
            background demands it.
          </p>
          <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-[var(--cx-muted)]">
            <li>Never add shadow/glow/blur/outline to the mark.</li>
            <li>Never stretch, skew, rotate, or warp.</li>
            <li>Don’t place over busy imagery unless you add a solid field.</li>
          </ul>
        </section>

        <section className="mt-10">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="text-lg font-medium">Files</h2>
            <span className="text-xs uppercase tracking-[0.18em] text-[var(--cx-muted)]">PNG</span>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {LOGOS.map((l) => (
              <div
                key={l.name}
                className="rounded-lg border border-[var(--cx-border)] p-5"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-medium tracking-tight">
                      {l.primary ? (
                        <span className="mr-2 rounded bg-white px-2 py-0.5 text-xs font-semibold text-black">
                          PRIMARY
                        </span>
                      ) : null}
                      {l.name}
                    </div>
                    <p className="mt-2 text-sm text-[var(--cx-muted)]">{l.note}</p>
                  </div>
                  <Link
                    href={l.filename}
                    download
                    className="rounded-md border border-[var(--cx-border)] px-3 py-2 text-xs text-[var(--cx-fg)] hover:bg-white/5"
                  >
                    Download
                  </Link>
                </div>

                <div className="mt-4 rounded-lg border border-[var(--cx-border)] bg-[var(--cx-bg)] p-4">
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

        <section className="mt-10 rounded-lg border border-[var(--cx-border)] p-6">
          <h2 className="text-lg font-medium">Naming + versioning</h2>
          <p className="mt-2 text-sm text-[var(--cx-muted)]">
            Keep filenames stable and explicit. If you revise an asset, append a version.
          </p>
          <div className="mt-4 rounded-lg border border-[var(--cx-border)] p-4">
            <code className="text-xs text-[var(--cx-muted)]">
              CX-Logo-Thin_white_v01.png
              <br />
              CX-Logo-Thin_white_v02.png
            </code>
          </div>
        </section>
      </div>
    </main>
  );
}
