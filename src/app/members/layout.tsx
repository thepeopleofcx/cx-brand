import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CX Members",
  description: "CX Members — Your invitation to infinite connection",
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0B0B0C" }}>{children}</body>
    </html>
  );
}
