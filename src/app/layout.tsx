import type { Metadata } from "next";
import { SidebarNav } from "@/components/SidebarNav";
import "./globals.css";

export const metadata: Metadata = {
  title: "CX Living Brand System",
  description: "Living brand guidelines for CX",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-cx-mode="book1">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Libre+Caslon+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <div className="flex min-h-dvh flex-col md:flex-row">
          <SidebarNav />
          <main
            className="flex-1 md:ml-[45vw]"
            style={{
              background: "var(--cx-content-bg)",
              color: "var(--cx-content-fg)",
            }}
          >
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
