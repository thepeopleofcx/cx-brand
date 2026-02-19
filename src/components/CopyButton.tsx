"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
      className="ml-2 inline-flex items-center rounded border border-gray-300 px-1.5 py-0.5 text-[10px] uppercase tracking-wider text-gray-400 transition hover:border-[var(--cx-pink)] hover:text-[var(--cx-pink)]"
      title={`Copy: ${text}`}
    >
      {copied ? "✓" : "Copy"}
    </button>
  );
}
