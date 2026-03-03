import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CX Source of Truth",
  description: "CX Source of Truth — The Living Document",
};

export default function SourceLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0B0B0C" }}>{children}</body>
    </html>
  );
}
