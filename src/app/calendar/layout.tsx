export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ background: "#0B0B0C", color: "#F2F2F2", minHeight: "100dvh" }}>
      <style>{`
        body, html { background: #0B0B0C !important; }
        #main-content { background: #0B0B0C !important; color: #F2F2F2 !important; }
      `}</style>
      {children}
    </div>
  );
}
