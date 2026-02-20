"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { search, type SearchEntry } from "@/lib/search-index";

export function SearchOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchEntry[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      setQuery("");
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  useEffect(() => {
    setResults(search(query));
  }, [query]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onClose(); // toggle
      }
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh]"
      style={{ background: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl border border-gray-700 bg-[#111] p-4 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search brand system…"
          className="w-full rounded-lg border border-gray-700 bg-black px-4 py-3 text-sm text-white placeholder-gray-500 outline-none focus:border-[var(--cx-pink)]"
        />
        {query.length > 0 && (
          <div className="mt-3 max-h-64 overflow-y-auto">
            {results.length === 0 ? (
              <p className="px-2 py-3 text-center text-xs text-gray-500">
                No results for &ldquo;{query}&rdquo;
              </p>
            ) : (
              <ul className="space-y-1">
                {results.map((r) => (
                  <li key={r.href}>
                    <Link
                      href={r.href}
                      onClick={onClose}
                      className="flex items-center justify-between rounded-lg px-3 py-2.5 text-white transition-colors hover:bg-white hover:text-black"
                    >
                      <div>
                        <div className="text-sm font-bold uppercase tracking-tight">
                          {r.title}
                        </div>
                        <div className="mono text-[10px] opacity-50">{r.subtitle}</div>
                      </div>
                      <span className="text-xs opacity-30">→</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
        <div className="mono mt-3 text-center text-[10px] text-gray-600">
          ⌘K to toggle · ESC to close
        </div>
      </div>
    </div>
  );
}
