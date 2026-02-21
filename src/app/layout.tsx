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
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Libre+Caslon+Display&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[999] focus:rounded focus:bg-black focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to content
        </a>
        <div className="flex min-h-dvh flex-col md:flex-row">
          <SidebarNav />
          <main
            id="main-content"
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
