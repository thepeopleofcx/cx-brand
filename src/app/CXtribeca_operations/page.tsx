"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

/* ─── data ─── */
const COLORS = {
  bg: "#0B0B0C",
  paper: "#F2F2F2",
  muted: "#B8B8B8",
  orange: "#FD7E01",
  blue: "#1D90BF",
  purple: "#9750CD",
  pink: "#F525A3",
};

const LEGEND = [
  { label: "CX Owner", color: COLORS.orange },
  { label: "Lumo Ombro Owner", color: COLORS.blue },
  { label: "Both Parties", color: COLORS.purple },
  { label: "Split", color: COLORS.pink },
  { label: "No Action Required", color: COLORS.muted },
];

interface Row { name: string; sub?: string; subItalic?: boolean; cx: string; lo: string; note?: string }

const SECTIONS: { id: string; num: string; title: string; rows: Row[] }[] = [
  {
    id: "big-picture", num: "01", title: "Big Picture",
    rows: [
      { name: "Organization / Inventory & Event Operation", cx: "Lower Level", lo: "Lower Level Bar / Top 2 Floors" },
      { name: "Marketing & PR", cx: "Lumo Ombro mentions must be approved", lo: "CX mentions must be approved" },
      { name: "Buy-Out or Private Event", sub: "All Private Events in Lower Level to be planned/discussed together", subItalic: true, cx: "First Right of Refusal / Lower Level", lo: "First Right of Refusal / Top 2 Floors" },
      { name: "Programming / Every Saturday March 14 – April 18", cx: "Owner", lo: "No action required" },
      { name: "Programming / Friday April 24 w/ Anderson Paak", cx: "Owner", lo: "No action required" },
      { name: "Private Dinners / Only on Top Two Floors", cx: "No action required", lo: "Owner" },
      { name: "Bar Management", cx: "No action required", lo: "Owner" },
      { name: "Bathroom", cx: "No action required", lo: "Owner" },
      { name: "Bussing", cx: "No action required", lo: "Owner" },
      { name: "Cleaning", cx: "No action required", lo: "Owner" },
    ],
  },
  {
    id: "operations", num: "02", title: "Operations",
    rows: [
      { name: "Onsite Venue Lead (Rose / Seth / Mabel)", cx: "Owner", lo: "No action required", note: "GM starting in May 2026 will be split 50/50" },
      { name: "Coat Check", cx: "Owner", lo: "No action required" },
      { name: "CX Host / Checkin", cx: "Owner", lo: "No action required" },
      { name: "Independent Liability Insurance", cx: "Owner", lo: "Owner" },
      { name: "Independent Legal Counsel", cx: "Owner", lo: "Owner" },
    ],
  },
  {
    id: "decor", num: "03", title: "Décor",
    rows: [
      { name: "Lights", cx: "Custom System", lo: "House System" },
      { name: "Sound", cx: "Custom System", lo: "House System" },
      { name: "AV System Setup", cx: "Owner of Custom", lo: "Owner of House" },
      { name: "Menu Printing", cx: "No action required", lo: "Owner" },
      { name: "DJ Booth / Scaffold", cx: "Owner", lo: "No action required" },
      { name: "Dried / Permanent Flowers", sub: "Lumo Ombro can add to floral design as marketing with design approved by CX", subItalic: true, cx: "Owner", lo: "No action required" },
      { name: "Soundproof Curtains", cx: "Owner", lo: "No action required" },
      { name: "Candles", cx: "Owner", lo: "No action required" },
      { name: "Carpets", cx: "Owner", lo: "No action required" },
      { name: "Entrance Light Install", cx: "Owner", lo: "No action required" },
      { name: "Furniture", cx: "Owner", lo: "No action required" },
    ],
  },
  {
    id: "infrastructure", num: "04", title: "TI / Infrastructure",
    rows: [
      { name: "Equity", cx: "$50,000 in CX Equity to Manena Frazier for her past work supporting the foundational development of CX", lo: "$150,000 in Equity to CX for TI Improvements and build out of 78 Leonard" },
      { name: "Elevator Fix / Mgmt", cx: "No action required", lo: "Owner" },
      { name: "Back of House / Soundproof Curtains", cx: "Owner", lo: "No action required" },
      { name: "Removal of Wood Platform", sub: "Hire Jason/team for demo and removal of wood platform by April 1", subItalic: true, cx: "Owner", lo: "No action required" },
      { name: "Circular Stage", cx: "Owner", lo: "No action required" },
      { name: '"Founders Table" Booth Corner', sub: 'Circular Booth Chairs and Table', subItalic: true, cx: "Split", lo: "Split" },
    ],
  },
];

const NAV_LINKS = [
  { label: "Overview", href: "#overview" },
  { label: "Big Picture", href: "#big-picture" },
  { label: "Operations", href: "#operations" },
  { label: "Décor", href: "#decor" },
  { label: "Infrastructure", href: "#infrastructure" },
];

/* ─── RevealOnScroll ─── */
function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ─── Badge logic ─── */
function Badge({ cx, lo }: { cx: string; lo: string }) {
  const cxLow = cx.toLowerCase();
  const loLow = lo.toLowerCase();
  const isOwner = (v: string) => v === "owner";
  const isNone = (v: string) => v === "no action required";
  const isSplit = (v: string) => v === "split";

  if (isOwner(cxLow) && isOwner(loLow)) {
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Pill color={COLORS.purple} label="Both Parties" />
      </div>
    );
  }
  if (isSplit(cxLow) && isSplit(loLow)) {
    return (
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
        <Pill color={COLORS.pink} label="Split" />
      </div>
    );
  }

  return (
    <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
      <BadgeItem label="CX" value={cx} color={COLORS.orange} />
      <BadgeItem label="LO" value={lo} color={COLORS.blue} />
    </div>
  );
}

function BadgeItem({ label, value, color }: { label: string; value: string; color: string }) {
  const low = value.toLowerCase();
  if (low === "owner") return <Pill color={color} label={`${label}: Owner`} />;
  if (low === "no action required") return <Pill color={COLORS.muted} label={`${label}: No action`} muted />;
  // descriptive text
  return (
    <span style={{ borderLeft: `2px solid ${color}`, paddingLeft: 10, fontSize: 13, color: COLORS.paper, fontFamily: "Inter, sans-serif", lineHeight: 1.5 }}>
      <span style={{ color: COLORS.muted, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em" }}>{label}</span>
      <br />{value}
    </span>
  );
}

function Pill({ color, label, muted }: { color: string; label: string; muted?: boolean }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 14px",
        borderRadius: 999,
        fontSize: 12,
        fontFamily: "Inter, sans-serif",
        fontWeight: 500,
        letterSpacing: "0.04em",
        background: muted ? "transparent" : `${color}20`,
        border: `1px solid ${muted ? COLORS.muted + "40" : color}`,
        color: muted ? COLORS.muted : color,
      }}
    >
      {label}
    </span>
  );
}

/* ─── Divider ─── */
function Divider() {
  return <div style={{ height: 1, background: "linear-gradient(90deg, transparent, #F2F2F230, transparent)", margin: "60px 0" }} />;
}

/* ─── Main Page ─── */
export default function OperationsPage() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const [activeSection, setActiveSection] = useState("");
  const [navVisible, setNavVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const onScroll = () => {
      setScrollY(window.scrollY);
      setMaxScroll(document.documentElement.scrollHeight - window.innerHeight);
      setNavVisible(window.scrollY > window.innerHeight * 0.8);

      // active section
      const ids = ["overview", "big-picture", "operations", "decor", "infrastructure"];
      let current = "";
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top < 200) current = id;
      }
      setActiveSection(current);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  const progress = maxScroll > 0 ? scrollY / maxScroll : 0;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background:${COLORS.bg}; color:${COLORS.paper}; font-family:'Inter',sans-serif; overflow-x:hidden; }
        ::selection { background:${COLORS.purple}40; color:${COLORS.paper}; }
        /* grain */
        body::before {
          content:''; position:fixed; inset:0; z-index:9999; pointer-events:none;
          opacity:0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,-60px) scale(1.1)} 66%{transform:translate(-40px,40px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-60px,80px) scale(0.9)} 66%{transform:translate(60px,-30px) scale(1.15)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,60px) scale(1.05)} }
        @keyframes pulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${COLORS.orange}, ${COLORS.pink}, ${COLORS.purple}, ${COLORS.blue})`, transition: "width 0.1s" }} />

      {/* Cursor glow */}
      <div
        style={{
          position: "fixed", left: mousePos.x - 150, top: mousePos.y - 150,
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${COLORS.purple}08 0%, transparent 70%)`,
          pointerEvents: "none", zIndex: 50, transition: "left 0.1s, top 0.1s",
        }}
      />

      {/* Nav */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 90,
          padding: "16px 6%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          background: navVisible ? `${COLORS.bg}ee` : "transparent",
          backdropFilter: navVisible ? "blur(12px)" : "none",
          borderBottom: navVisible ? `1px solid ${COLORS.paper}10` : "none",
          opacity: navVisible ? 1 : 0,
          transform: navVisible ? "translateY(0)" : "translateY(-20px)",
          transition: "all 0.4s ease",
          pointerEvents: navVisible ? "auto" : "none",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: COLORS.paper }}>CX</span>
        <div style={{ display: "flex", gap: 28 }}>
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                color: activeSection === l.href.slice(1) ? COLORS.paper : COLORS.muted,
                borderBottom: activeSection === l.href.slice(1) ? `1px solid ${COLORS.orange}` : "1px solid transparent",
                paddingBottom: 2, transition: "all 0.3s",
              }}
            >
              {l.label}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* blobs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "20%", left: "15%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.orange}18, transparent 70%)`, animation: "float1 20s ease-in-out infinite", filter: "blur(60px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "10%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.purple}15, transparent 70%)`, animation: "float2 25s ease-in-out infinite", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "40%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${COLORS.blue}12, transparent 70%)`, animation: "float3 18s ease-in-out infinite", filter: "blur(70px)" }} />
        </div>

        <div style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, letterSpacing: "0.15em", marginBottom: 8, color: COLORS.paper }}>CX</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(40px, 7vw, 90px)", fontWeight: 300, lineHeight: 1.1, marginBottom: 16, color: COLORS.paper }}>
            × Lumo Ombro
          </h1>
          <p style={{ fontSize: 16, fontWeight: 300, letterSpacing: "0.2em", textTransform: "uppercase", color: COLORS.muted, marginBottom: 32 }}>
            Operating Agreement
          </p>
          <span style={{ display: "inline-block", padding: "8px 24px", border: `1px solid ${COLORS.paper}20`, borderRadius: 999, fontSize: 13, color: COLORS.muted, letterSpacing: "0.1em" }}>
            Now — May 1, 2026
          </span>
        </div>

        <div style={{ position: "absolute", bottom: 40, zIndex: 2, textAlign: "center", animation: "pulse 3s ease-in-out infinite" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.muted }}>Scroll to enter</p>
          <div style={{ width: 1, height: 30, background: `linear-gradient(to bottom, ${COLORS.muted}, transparent)`, margin: "8px auto 0" }} />
        </div>
      </section>

      {/* Legend / Overview */}
      <section id="overview" style={{ padding: "120px 8%", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.muted, marginBottom: 24 }}>00 — Overview</p>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 24, color: COLORS.paper }}>
            Overview
          </h2>
        </Reveal>
        <Reveal delay={50}>
          <div style={{ fontSize: 17, lineHeight: 1.8, color: `${COLORS.paper}CC`, maxWidth: 720, marginBottom: 48 }}>
            <p style={{ marginBottom: 20 }}>
              CX is thrilled to partner with Lumo Ombro to bring a one-of-a-kind experience to 78 Leonard, transforming the Lower Level into a sanctuary for meaningful connection. With our shared vision in mind, we have drafted the following Phase 1 Operating Agreement to define our collective ownership and responsibilities across venue operations, infrastructure, and programming.
            </p>
            <p style={{ marginBottom: 20 }}>
              As we both navigate this transitional season, this initial plan covers March through April 2026, culminating in our highly anticipated Anderson .Paak collaboration launch on April 24. Looking ahead, we propose a transition to &ldquo;Phase 2&rdquo; beginning May 1, which will see us shift to a robust six-night-a-week programming schedule and a more defined thematic calendar. This evolution will involve the introduction of a shared Lower Level General Manager and a unified POS tracking system. We suggest meeting early April to formalize these Phase 2 details. In this Phase 1 interim, we will support introductions to any investors who seem a fit for Lumo Ombro&apos;s mission; we will combine efforts for late-night shifts to the top two floors if it fits schedules/goals; and we will support additional private event bookings to maximize the venue&apos;s potential.
            </p>
            <p style={{ marginBottom: 12, fontWeight: 500, color: `${COLORS.paper}DD` }}>
              Quick flags based on our conversation about contractor work —
            </p>
            <ul style={{ paddingLeft: 24, marginBottom: 20, listStyleType: 'disc' }}>
              <li style={{ marginBottom: 10 }}>We are prepared to hire Jason to take out the wooden platform for you and then do a shared 50/50 payment split for a built out booth/table in that corner. We&apos;d like to have this built before April 24&apos;s Event.</li>
              <li style={{ marginBottom: 10 }}>We are going to use Soundproof Curtains to build a &ldquo;Back of House&rdquo; changing room by the bar versus constructing a wall. Any additional TI build out here is up to your discretion.</li>
              <li style={{ marginBottom: 10 }}>We are going to build out a custom sound and lighting system that we will pay for, own, operate (and which will be fully removable, if needed). Any house sound or house lighting you&apos;d like to add is up to your discretion.</li>
            </ul>
            <p style={{ fontStyle: 'italic', color: `${COLORS.paper}BB` }}>
              We look forward to your thoughts!
            </p>
          </div>
        </Reveal>
        <Reveal delay={75}>
          <div style={{ marginBottom: 48 }}>
            <a href="https://www.canva.com/design/DAHCXZLdsIA/VVgD9st7LUg6CVfpjdnxSQ/edit" target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 10, padding: "14px 24px", border: `1px solid ${COLORS.orange}30`, borderRadius: 8, color: COLORS.orange, textDecoration: "none", fontSize: 14, letterSpacing: "0.03em", transition: "border-color 0.3s, background 0.3s" }} onMouseOver={(e) => { e.currentTarget.style.borderColor = `${COLORS.orange}60`; e.currentTarget.style.background = `${COLORS.orange}08`; }} onMouseOut={(e) => { e.currentTarget.style.borderColor = `${COLORS.orange}30`; e.currentTarget.style.background = "transparent"; }}>
              <span style={{ fontSize: 16 }}>◎</span> View Venue Map →
            </a>
          </div>
        </Reveal>
        <Reveal delay={100}>
          <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 300, color: COLORS.paper, marginBottom: 24 }}>
            Responsibility Legend
          </h3>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
            {LEGEND.map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 20px", border: `1px solid ${COLORS.paper}10`, borderRadius: 8 }}>
                <div style={{ width: 10, height: 10, borderRadius: "50%", background: l.color }} />
                <span style={{ fontSize: 14, color: COLORS.paper }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Reveal>
        <Divider />
      </section>

      {/* Data sections */}
      {SECTIONS.map((section) => (
        <section key={section.id} id={section.id} style={{ padding: "60px 8% 120px", maxWidth: 1200, margin: "0 auto" }}>
          <Reveal>
            <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: COLORS.muted, marginBottom: 24 }}>
              {section.num} — {section.title}
            </p>
            <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.2, marginBottom: 48, color: COLORS.paper }}>
              {section.title}
            </h2>
          </Reveal>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {section.rows.map((row, i) => (
              <Reveal key={i} delay={i * 50}>
                <div
                  style={{
                    padding: "24px 28px",
                    border: `1px solid ${COLORS.paper}10`,
                    borderRadius: 8,
                    transition: "border-color 0.3s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${COLORS.paper}25`)}
                  onMouseLeave={(e) => (e.currentTarget.style.borderColor = `${COLORS.paper}10`)}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: 16 }}>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 400, color: COLORS.paper, flex: "1 1 280px" }}>
                      {row.name}
                      {row.sub && <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, fontWeight: 400, color: `${COLORS.paper}88`, marginTop: 4, fontStyle: row.subItalic ? 'italic' : 'normal' }}>{row.sub}</div>}
                    </h3>
                    <Badge cx={row.cx} lo={row.lo} />
                  </div>
                  {row.note && (
                    <p style={{ marginTop: 12, fontSize: 13, fontStyle: "italic", color: COLORS.muted, borderTop: `1px solid ${COLORS.paper}08`, paddingTop: 10 }}>
                      {row.note}
                    </p>
                  )}
                </div>
              </Reveal>
            ))}
          </div>

          <Divider />
        </section>
      ))}

      {/* Footer */}
      <footer style={{ textAlign: "center", padding: "60px 8% 100px" }}>
        <Reveal>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 300, color: COLORS.paper, marginBottom: 12 }}>CX × Lumo Ombro</p>
          <p style={{ fontSize: 12, color: COLORS.muted, letterSpacing: "0.2em" }}>Operating Agreement — Now through April 30, 2026</p>
        </Reveal>
      </footer>
    </>
  );
}
