export const metadata = {
  title: "CX Tribeca — The First Room",
  description: "The flagship CX venue in Tribeca, New York City. Where Space met People and Connection was born.",
};

export default function TribecaLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#0B0B0C", minHeight: "100vh" }}>
      {children}
    </div>
  );
}
