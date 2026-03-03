"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LABELS: Record<string, string> = {
  guidelines: "Guidelines",
  logo: "Logo",
  color: "Color",
  typography: "Typography",
  layout: "Layout",
  components: "Components",
  imagery: "Imagery",
  voice: "Voice",
  applications: "Applications",
  assets: "Assets",
  quickstart: "Quickstart",
};

export function Breadcrumb() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="Breadcrumb"
      className="mono mb-6 flex items-center gap-1.5 text-[11px] text-gray-400"
    >
      <Link href="/" className="transition hover:text-gray-700">
        Home
      </Link>
      {segments.map((seg, i) => {
        const href = "/" + segments.slice(0, i + 1).join("/");
        const isLast = i === segments.length - 1;
        const label = LABELS[seg] || seg;

        return (
          <span key={href} className="flex items-center gap-1.5">
            <span className="opacity-40">/</span>
            {isLast ? (
              <span className="text-gray-600 font-medium">{label}</span>
            ) : (
              <Link href={href} className="transition hover:text-gray-700">
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}
