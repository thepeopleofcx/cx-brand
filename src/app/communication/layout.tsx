import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CX Communication",
  description: "CX Communication — Mind · How we view the world",
};

export default function CommunicationLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0B0B0C" }}>{children}</body>
    </html>
  );
}
