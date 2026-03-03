export type NavItem = {
  title: string;
  subtitle: string;
  href: string;
  section: "core" | "visuals" | "system" | "operations" | "calendar";
};

export const NAV: NavItem[] = [
  { title: "Quickstart", subtitle: "Brand in 60s", href: "/quickstart", section: "core" },
  { title: "Guidelines", subtitle: "Principles & Ethics", href: "/guidelines", section: "core" },
  { title: "Voice & Copy", subtitle: "Tone Framework", href: "/voice", section: "core" },
  { title: "Logo", subtitle: "Mark & Clearspace", href: "/logo", section: "core" },
  { title: "Color", subtitle: "Palette System", href: "/color", section: "visuals" },
  { title: "Typography", subtitle: "Type Scale", href: "/typography", section: "visuals" },
  { title: "Imagery", subtitle: "Photography", href: "/imagery", section: "visuals" },
  { title: "Layout", subtitle: "Spacing", href: "/layout", section: "system" },
  { title: "Components", subtitle: "UI Library", href: "/components", section: "system" },
  { title: "Applications", subtitle: "Examples", href: "/applications", section: "system" },
  { title: "Assets", subtitle: "Downloads", href: "/assets", section: "system" },
  { title: "Operations", subtitle: "CX × Lumo Ombro", href: "/CXtribeca_operations", section: "operations" },
  { title: "Calendar", subtitle: "Master Calendar 2026", href: "/calendar", section: "calendar" },
];

export const SECTIONS = [
  { id: "core" as const, label: "I — Core" },
  { id: "visuals" as const, label: "II — Visuals" },
  { id: "system" as const, label: "III — System" },
  { id: "operations" as const, label: "IV — Operations" },
  { id: "calendar" as const, label: "V — Calendar" },
];
