import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CX Onboarding",
  description: "CX Onboarding — Welcome to the Constellation",
};

export default function OnboardingLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, padding: 0, background: "#0B0B0C" }}>{children}</body>
    </html>
  );
}
