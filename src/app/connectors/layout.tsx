import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CX Connectors",
  description: "CX Connectors — The ones who make things happen",
};

export default function ConnectorsLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0B0B0C" }}>{children}</body>
    </html>
  );
}
