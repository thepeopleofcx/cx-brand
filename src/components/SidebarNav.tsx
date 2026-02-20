"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { NAV, SECTIONS } from "@/lib/nav";
import { ModeToggle } from "./ModeToggle";
import { SearchOverlay } from "./SearchOverlay";
import { useState, useCallback } from "react";

export function SidebarNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const toggleSearch = useCallback(() => setSearchOpen((v) => !v), []);

  return (
    <aside
      className="flex flex-col bg-[var(--cx-bg)] text-white md:fixed md:inset-y-0 md:left-0 md:w-[45vw]"
      style={{ minHeight: "100dvh" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b px-6 py-5 md:px-8 md:py-6" style={{ borderColor: "var(--cx-border)" }}>
        <Link href="/" className="block">
          <div className="flex items-center gap-3">
            <h1 className="text-lg font-bold uppercase tracking-tighter text-white">
              CX — Brand Guidelines
            </h1>
            <span className="mono inline-block rounded bg-white px-2 py-0.5 text-[10px] font-medium text-black">
              Sys. 2.0
            </span>
          </div>
        </Link>
        <button
          className="text-white md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {mobileOpen ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Nav Grid */}
      <nav className={`flex-1 overflow-y-auto px-6 py-6 md:px-8 md:py-8 ${mobileOpen ? "block" : "hidden md:block"}`}>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {SECTIONS.map((section) => {
            const items = NAV.filter((n) => n.section === section.id);
            return (
              <div key={section.id}>
                <div className="mono mb-4 text-[11px] uppercase text-[var(--cx-muted)]">
                  {section.label}
                </div>
                <ul className="space-y-1">
                  {items.map((item) => {
                    const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
                    return (
                      <li key={item.href}>
                        <Link
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className={`block rounded px-3 py-2.5 transition-colors ${
                            active
                              ? "bg-white text-black"
                              : "text-white hover:bg-white hover:text-black"
                          }`}
                        >
                          <div className="text-[13px] font-bold uppercase tracking-tight">
                            {item.title}
                          </div>
                          <div className="mono mt-0.5 text-[10px]" style={{ opacity: active ? 0.6 : 0.4 }}>
                            {item.subtitle}
                          </div>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t px-6 py-4 md:px-8" style={{ borderColor: "var(--cx-border)" }}>
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSearch}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="mono text-[11px] text-[var(--cx-muted)]">Search</span>
            <span className="mono rounded border border-gray-600 px-1.5 py-0.5 text-[9px] text-gray-500">⌘K</span>
            <span className="inline-block h-2 w-2 rounded-sm" style={{ background: "var(--cx-pink)" }} />
          </button>
          <ModeToggle />
        </div>
      </div>
      <SearchOverlay open={searchOpen} onClose={toggleSearch} />
    </aside>
  );
}
