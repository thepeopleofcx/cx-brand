import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CX People — The Energy",
  description: "CX People — The Energy that flows through the vessel",
};

export default function PeopleLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0B0B0C" }}>{children}</body>
    </html>
  );
}
