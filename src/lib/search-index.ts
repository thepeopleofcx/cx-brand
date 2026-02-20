/** Lightweight client-side search index — maps keywords → page hrefs */

export type SearchEntry = {
  title: string;
  subtitle: string;
  href: string;
  keywords: string[];
};

export const SEARCH_INDEX: SearchEntry[] = [
  { title: "Quickstart", subtitle: "Brand in 60 seconds", href: "/quickstart", keywords: ["quickstart", "one-pager", "summary", "overview", "cheat sheet", "start"] },
  { title: "Guidelines", subtitle: "Principles & Ethics", href: "/guidelines", keywords: ["guidelines", "principles", "ethics", "pillars", "tagline", "this way in", "north star", "rules", "do", "don't"] },
  { title: "Voice & Copy", subtitle: "Tone Framework", href: "/voice", keywords: ["voice", "copy", "tone", "writing", "language", "content pillars", "signature"] },
  { title: "Logo", subtitle: "Mark & Clearspace", href: "/logo", keywords: ["logo", "mark", "clearspace", "lockup", "monogram", "badge", "wordmark"] },
  { title: "Color", subtitle: "Palette System", href: "/color", keywords: ["color", "palette", "pink", "black", "white", "accent", "hex", "tokens", "swatch"] },
  { title: "Typography", subtitle: "Type Scale", href: "/typography", keywords: ["typography", "type", "font", "caslon", "proxima", "heading", "body", "scale", "weight"] },
  { title: "Imagery", subtitle: "Photography", href: "/imagery", keywords: ["imagery", "photography", "photo", "cinematic", "visual", "image"] },
  { title: "Layout", subtitle: "Spacing & Grid", href: "/layout", keywords: ["layout", "grid", "spacing", "margin", "padding", "responsive", "breakpoint"] },
  { title: "Components", subtitle: "UI Library", href: "/components", keywords: ["components", "ui", "button", "card", "input", "library", "element"] },
  { title: "Applications", subtitle: "Examples", href: "/applications", keywords: ["applications", "examples", "mockup", "template", "deck", "slide", "social"] },
  { title: "Assets", subtitle: "Downloads", href: "/assets", keywords: ["assets", "download", "file", "svg", "png", "export"] },
];

export function search(query: string): SearchEntry[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return SEARCH_INDEX.filter(
    (entry) =>
      entry.title.toLowerCase().includes(q) ||
      entry.subtitle.toLowerCase().includes(q) ||
      entry.keywords.some((kw) => kw.includes(q))
  );
}
