import type { Metadata } from "next";
import Link from "next/link";
import { NAV } from "@/lib/nav";
import "./globals.css";

export const metadata: Metadata = {
  title: "CX Living Brand System",
  description: "Living brand guidelines for CX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-black text-white antialiased">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 md:grid-cols-[260px_1fr]">
          <aside className="border-b border-white/10 md:min-h-dvh md:border-b-0 md:border-r">
            <div className="px-5 py-5">
              <Link href="/" className="block">
                <div className="text-xs uppercase tracking-[0.18em] text-white/60">CX</div>
                <div className="mt-1 text-sm font-medium tracking-tight">Living Brand System</div>
              </Link>
            </div>
            <nav className="px-2 pb-6">
              <ul className="space-y-1">
                {NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white"
                    >
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          <div className="min-h-dvh">
            <header className="sticky top-0 z-10 border-b border-white/10 bg-black/80 backdrop-blur">
              <div className="px-6 py-4">
                <div className="text-xs uppercase tracking-[0.18em] text-white/50">
                  Mode: Book 1 (default)
                </div>
              </div>
            </header>
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
