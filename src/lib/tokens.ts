export type Mode = "book1" | "book2" | "book3";

export const MODES: { id: Mode; label: string; description: string }[] = [
  { id: "book1", label: "Book 1", description: "Closest / disciplined" },
  { id: "book2", label: "Book 2", description: "Adventurous / cultured" },
  { id: "book3", label: "Book 3", description: "Wild / slightly dangerous" },
];

// CSS variables live in globals.css; these are the canonical token names.
export const TOKEN_KEYS = {
  bg: "--cx-bg",
  fg: "--cx-fg",
  muted: "--cx-muted",
  border: "--cx-border",
  accent: "--cx-accent",
  radius: "--cx-radius",
  // typography
  fontSans: "--cx-font-sans",
  fontDisplay: "--cx-font-display",
} as const;
