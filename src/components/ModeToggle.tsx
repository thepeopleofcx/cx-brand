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
      <div className="flex rounded border p-0.5" style={{ borderColor: "var(--cx-border)", background: "rgba(255,255,255,0.05)" }}>
        {MODES.map((m) => {
          const active = m.id === mode;
          return (
            <button
              key={m.id}
              type="button"
              onClick={() => onChange(m.id)}
              className={
                "rounded px-2 py-1 text-[10px] font-medium transition " +
                (active ? "bg-white text-black" : "text-white/50 hover:text-white")
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
