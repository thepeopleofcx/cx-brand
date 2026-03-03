import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CX Team / Tools",
  description: "CX Team / Tools — Heart · Our support system",
};

export default function TeamLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0B0B0C" }}>{children}</body>
    </html>
  );
}
