"use client";

import { CopyButton } from "./CopyButton";

const TOKENS = `:root {
  --cx-bg: #0b0b0c;
  --cx-fg: #f2f2f2;
  --cx-muted: #b8b8b8;
  --cx-border: color-mix(in oklab, var(--cx-fg), transparent 88%);
  --cx-accent: #f2f2f2;
  --cx-radius: 10px;

  --cx-accent-pink-noise: #f525a3;
  --cx-accent-ethernet-sky: #1d90bf;
  --cx-accent-cherry-collapse: #fe4247;
  --cx-accent-tangerine-tantrum: #fd7e01;
  --cx-accent-slime-blessing: #08f22f;
  --cx-accent-flashbulb-memory: #e8e200;
  --cx-accent-dream-bruise: #9750cd;
  --cx-accent-coolant-crush: #05aec6;

  --cx-font-sans: "Helvetica Neue", Helvetica, Arial, sans-serif;
  --cx-font-display: "Libre Caslon Display", "Big Caslon", Georgia, serif;
  --cx-font-mono: "Courier New", Courier, monospace;

  --cx-page-pad: 48px;
}`;

export function TokensBlock() {
  return (
    <div className="relative">
      <div className="absolute top-3 right-3">
        <CopyButton text={TOKENS} />
      </div>
      <pre className="overflow-x-auto rounded-lg border border-gray-200 bg-gray-50 p-5 text-xs leading-relaxed text-gray-600">
        <code>{TOKENS}</code>
      </pre>
    </div>
  );
}
