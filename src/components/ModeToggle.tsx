"use client";

import { useEffect, useState } from "react";
import { MODES, Mode } from "@/lib/tokens";
import { applyModeToDocument, getStoredMode, storeMode } from "@/lib/mode";

export function ModeToggle() {
  const [mode, setMode] = useState<Mode>("book1");

  useEffect(() => {
    const stored = getStoredMode();
    const initial = stored ?? "book1";
    setMode(initial);
    applyModeToDocument(initial);
  }, []);

  function onChange(next: Mode) {
    setMode(next);
    storeMode(next);
    applyModeToDocument(next);
  }

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs uppercase tracking-[0.18em] text-white/50">Mode</span>
      <div className="flex rounded-md border border-white/10 bg-white/5 p-1">
        {MODES.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={
                "rounded px-2 py-1 text-xs transition " +
                (active ? "bg-white text-black" : "text-white/70 hover:text-white")
              }
              title={m.description}
            >
              {m.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
