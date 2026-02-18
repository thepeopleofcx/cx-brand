import { Mode } from "@/lib/tokens";

const KEY = "cx_mode";

export function getStoredMode(): Mode | null {
  if (typeof window === "undefined") return null;
  const v = window.localStorage.getItem(KEY);
  if (v === "book1" || v === "book2" || v === "book3") return v;
  return null;
}

export function storeMode(mode: Mode) {
  window.localStorage.setItem(KEY, mode);
}

export function applyModeToDocument(mode: Mode) {
  document.documentElement.dataset.cxMode = mode;
}
