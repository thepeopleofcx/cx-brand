"use client";

import React, { useEffect, useRef, useState, useCallback, ReactNode } from "react";

/* ─── Colors ─── */
const C = {
  bg: "#0B0B0C",
  surface: "#141416",
  border: "rgba(242,242,242,0.08)",
  borderHover: "rgba(242,242,242,0.15)",
  paper: "#F2F2F2",
  paper10: "rgba(242,242,242,0.10)",
  paper15: "rgba(242,242,242,0.15)",
  paper05: "rgba(242,242,242,0.05)",
  muted: "#B8B8B8",
  mutedDim: "#888",
  orange: "#FD7E01",
  blue: "#1D90BF",
  purple: "#9750CD",
  pink: "#F525A3",
  cyan: "#05AEC6",
  green: "#08F22F",
  red: "#FE4247",
  gold: "#E8E200",
};

const serif = "'Cormorant Garamond', 'Georgia', serif";
const sans = "'Inter', sans-serif";

/* ─── Reveal on Scroll ─── */
function Reveal({ children, delay = 0 }: { children: ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setV(true); obs.disconnect(); } }, { threshold: 0.08 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `opacity .8s cubic-bezier(.16,1,.3,1) ${delay}ms, transform .8s cubic-bezier(.16,1,.3,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ─── Helpers ─── */
function daysUntil(dateStr: string) {
  const now = new Date();
  const target = new Date(dateStr);
  return Math.max(0, Math.ceil((target.getTime() - now.getTime()) / 86400000));
}

function SectionLabel({ text }: { text: string }) {
  return (
    <div style={{ fontSize: 11, fontFamily: sans, fontWeight: 500, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: C.muted, marginBottom: 16 }}>
      {text}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper15}, transparent)`, margin: "0 0 48px" }} />;
}

function StatusDot({ color, size = 8 }: { color: string; size?: number }) {
  return <span style={{ display: "inline-block", width: size, height: size, borderRadius: "50%", background: color, flexShrink: 0 }} />;
}

/* ─── Data ─── */
const workstreams = [
  { id: "WS-001", name: "Core Landing Pages", owner: "Christine", due: "Before March 2", dueDate: "2026-03-01", status: "IN PROGRESS", severity: "red", priority: "P0", nextAction: "Finalize hero copy + deploy staging" },
  { id: "WS-002", name: "Mabel Onboarding", owner: "Christine", due: "March 2", dueDate: "2026-03-02", status: "AT RISK", severity: "red", priority: "P0", nextAction: "Complete onboarding doc + access setup" },
  { id: "WS-003", name: "Investor Outreach & Financing Close", owner: "Christine + William", due: "Before April 24", dueDate: "2026-04-23", status: "NEEDS STRUCTURE", severity: "yellow", priority: "P0", nextAction: "Define investor pipeline + deck review" },
  { id: "WS-004", name: "Venue Contracts & Operating Agreements", owner: "Christine + William", due: "Before April 24", dueDate: "2026-04-23", status: "IN PROGRESS", severity: "yellow", priority: "P0", nextAction: "Legal review of Tribeca terms" },
  { id: "WS-005", name: "Membership Campaign Launch", owner: "Mabel + Christine", due: "March 14", dueDate: "2026-03-14", status: "NEEDS PLANNING", severity: "yellow", priority: "P0", nextAction: "Draft campaign strategy + asset list" },
  { id: "WS-006", name: "CX Communication Plan", owner: "Christine + Mabel + PR partner", due: "Ongoing, ramp by March 14", dueDate: "2026-03-14", status: "NEEDS STRATEGY", severity: "yellow", priority: "P1", nextAction: "Identify PR partner + draft comms calendar" },
];

const risks = [
  { id: "RISK-001", name: "Mabel Onboarding Unready", impact: "HIGH", prob: "HIGH", score: 9, severity: "red", owner: "Christine", mitigation: "Prepare onboarding packet by Feb 28. Set up all tool access. Schedule Day 1 orientation with William.", nextReview: "March 1, 2026" },
  { id: "RISK-002", name: "Financing Gap Before April 24", impact: "CRITICAL", prob: "MEDIUM", score: 9, severity: "red", owner: "William + Christine", mitigation: "Accelerate investor conversations. Prepare bridge financing options. Weekly pipeline review.", nextReview: "March 7, 2026" },
  { id: "RISK-003", name: "Tribeca Infrastructure Behind Schedule", impact: "HIGH", prob: "MEDIUM", score: 6, severity: "yellow", owner: "William", mitigation: "Get contractor timeline locked. Weekly site visits. Identify backup vendors.", nextReview: "March 10, 2026" },
  { id: "RISK-004", name: "Chelsea Operating Agreement Delayed", impact: "MEDIUM", prob: "MEDIUM", score: 4, severity: "yellow", owner: "William + Christine", mitigation: "Push legal for draft by March 7. Escalate blockers weekly.", nextReview: "March 7, 2026" },
  { id: "RISK-005", name: "Membership Campaign Launch Rushed", impact: "MEDIUM", prob: "MEDIUM", score: 4, severity: "yellow", owner: "Mabel + Christine", mitigation: "Start asset creation immediately. Define campaign milestones. Pre-launch teaser by March 7.", nextReview: "March 5, 2026" },
  { id: "RISK-006", name: "PR Strategy Undefined", impact: "MEDIUM", prob: "HIGH", score: 6, severity: "yellow", owner: "Christine", mitigation: "Shortlist PR partners by March 3. Define narrative pillars. Align with membership launch.", nextReview: "March 3, 2026" },
  { id: "RISK-007", name: "Mary & Marisa Start Dates TBD", impact: "LOW", prob: "MEDIUM", score: 2, severity: "green", owner: "William", mitigation: "Confirm timelines by end of March. Plan async onboarding. No critical dependency until Q3.", nextReview: "March 15, 2026" },
];

const calendar = [
  { date: "Mar 2", label: "Mabel's 1st Day", type: "milestone" as const, hot: 1 },
  { date: "Mar 3", label: "Full Moon · Member Email · Carousel", type: "celestial" as const, hot: 0 },
  { date: "Mar 10", label: "Private: Harvard · CX Tribeca (New Members)", type: "event" as const, hot: 0 },
  { date: "Mar 14", label: "CX Tribeca · Membership Campaign Launch", type: "milestone" as const, hot: 1 },
  { date: "Mar 18", label: "New Moon", type: "celestial" as const, hot: 0 },
  { date: "Mar 20", label: "Easter · Spring Equinox · Theme: Dirt/Soil", type: "event" as const, hot: 0 },
  { date: "Apr 24", label: "Anderson .Paak Event + CX Tribeca Launch", type: "milestone" as const, hot: 2 },
  { date: "May 1", label: "Phase 2 CX Tribeca", type: "milestone" as const, hot: 0 },
];

const typeColors: Record<string, string> = { milestone: C.orange, event: C.purple, comms: C.blue, celestial: C.gold };

const team = [
  { name: "William Etundi Jr.", role: "CEO / Founder", status: "Active", color: C.purple },
  { name: "Christine Hauer", role: "Head of Operations (COO)", status: "Active", color: C.orange },
  { name: "Mabel", role: "Community Manager", status: "Starts March 2", color: C.pink },
  { name: "Rose", role: "Curation & Host Program Lead", status: "Active (Contractor)", color: C.cyan },
  { name: "Mary", role: "CTO", status: "Future", color: C.mutedDim },
  { name: "Marisa", role: "CGO", status: "Future", color: C.mutedDim },
];

const sevColor = (s: string) => s === "red" ? C.red : s === "yellow" ? C.orange : C.green;

const NAV = [
  { label: "Stats", href: "#stats" },
  { label: "Workstreams", href: "#workstreams" },
  { label: "Risks", href: "#risks" },
  { label: "Calendar", href: "#calendar" },
  { label: "Team", href: "#team" },
];

/* ─── Page ─── */
export default function OpsPage() {
  const [wsFilter, setWsFilter] = useState("all");
  const [riskFilter, setRiskFilter] = useState("all");
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 80);
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(h > 0 ? window.scrollY / h : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const onMouseMove = useCallback((e: React.MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  const filteredWS = workstreams.filter(w => {
    if (wsFilter === "all") return true;
    return w.severity === wsFilter;
  });

  const filteredRisks = risks.filter(r => {
    if (riskFilter === "all") return true;
    return r.severity === riskFilter;
  });

  const onTrack = workstreams.filter(w => w.severity !== "red").length;
  const healthScore = Math.round((onTrack / workstreams.length) * 100);

  const card: React.CSSProperties = {
    background: "rgba(242,242,242,0.03)",
    border: `1px solid ${C.border}`,
    borderRadius: 12,
    padding: "28px 24px",
    transition: "transform .3s ease, border-color .3s ease, box-shadow .3s ease",
  };

  const filterBtn = (color: string, active: boolean): React.CSSProperties => ({
    background: active ? `${color}15` : "transparent",
    border: `1px solid ${active ? color : C.border}`,
    color: active ? color : C.muted,
    borderRadius: 20,
    padding: "7px 18px",
    fontSize: 11,
    fontFamily: sans,
    cursor: "pointer",
    transition: "all .25s ease",
    fontWeight: 500,
    letterSpacing: "0.05em",
    textTransform: "uppercase" as const,
  });

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: sans, color: C.paper }} onMouseMove={onMouseMove}>

      {/* Scroll progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, width: `${scrollProgress * 100}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.pink})`, zIndex: 100, transition: "width .1s linear" }} />

      {/* Grain overlay */}
      <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.03, backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")", backgroundRepeat: "repeat", backgroundSize: 256 }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, rgba(253,126,1,0.06) 0%, transparent 70%)`, pointerEvents: "none", zIndex: 1, transition: "left .15s ease-out, top .15s ease-out" }} />

      {/* ── Hero ── */}
      <section style={{ position: "relative", height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Gradient orbs */}
        <div style={{ position: "absolute", top: "15%", left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}25, transparent 70%)`, filter: "blur(80px)", animation: "float1 12s ease-in-out infinite alternate", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "20%", right: "15%", width: 350, height: 350, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}20, transparent 70%)`, filter: "blur(80px)", animation: "float2 10s ease-in-out infinite alternate", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: "50%", left: "60%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}15, transparent 70%)`, filter: "blur(80px)", animation: "float3 14s ease-in-out infinite alternate", pointerEvents: "none" }} />

        <div style={{ textAlign: "center", position: "relative", zIndex: 2 }}>
          <div style={{ fontSize: 11, fontFamily: sans, fontWeight: 500, letterSpacing: "0.4em", textTransform: "uppercase", color: C.muted, marginBottom: 32 }}>
            CX · Operations
          </div>
          <h1 style={{ fontFamily: serif, fontSize: "clamp(48px, 8vw, 96px)", fontWeight: 300, margin: 0, lineHeight: 1.05, color: C.paper }}>
            CX Operations
          </h1>
          <p style={{ fontFamily: serif, fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 300, fontStyle: "italic", color: C.muted, marginTop: 16, letterSpacing: "0.02em" }}>
            The nervous system
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 48, textAlign: "center", zIndex: 2 }}>
          <div style={{ fontSize: 11, fontFamily: sans, letterSpacing: "0.3em", textTransform: "uppercase", color: C.mutedDim, animation: "pulse 2.5s ease-in-out infinite" }}>
            Scroll to enter
          </div>
          <div style={{ width: 1, height: 32, background: `linear-gradient(to bottom, ${C.mutedDim}, transparent)`, margin: "12px auto 0" }} />
        </div>

        <style>{`
          @keyframes float1 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(40px, -30px) scale(1.15); } }
          @keyframes float2 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(-30px, 20px) scale(1.1); } }
          @keyframes float3 { 0% { transform: translate(0, 0) scale(1); } 100% { transform: translate(20px, 40px) scale(1.2); } }
          @keyframes pulse { 0%, 100% { opacity: 0.4; } 50% { opacity: 1; } }
        `}</style>
      </section>

      {/* ── Sticky Nav ── */}
      <nav style={{
        position: "sticky", top: 0, zIndex: 50,
        background: scrolled ? "rgba(11,11,12,0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? `1px solid ${C.border}` : "1px solid transparent",
        padding: "16px 0",
        display: "flex", justifyContent: "center", gap: 32, alignItems: "center",
        transition: "all .4s ease",
      }}>
        {NAV.map(n => (
          <a key={n.href} href={n.href} style={{
            color: C.muted, textDecoration: "none", fontSize: 12, fontFamily: sans,
            letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 400,
            transition: "color .25s ease", padding: "4px 0",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = C.paper)}
            onMouseLeave={e => (e.currentTarget.style.color = C.muted)}
          >{n.label}</a>
        ))}
      </nav>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 8% 120px", position: "relative", zIndex: 2 }}>

        {/* ── 1. Quick Stats ── */}
        <section id="stats" style={{ scrollMarginTop: 80, paddingTop: 140 }}>
          <Reveal>
            <SectionLabel text="01 — Pulse" />
            <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 300, margin: "0 0 16px", color: C.paper }}>Quick Stats</h2>
            <Divider />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {[
              { label: "Days to Mabel Start", value: daysUntil("2026-03-02"), color: C.pink },
              { label: "Days to Membership Launch", value: daysUntil("2026-03-14"), color: C.orange },
              { label: "Days to Tribeca Launch", value: daysUntil("2026-04-24"), color: C.purple },
              { label: "Active Workstreams", value: 6, color: C.blue },
              { label: "Critical Risks", value: 3, color: C.red },
              { label: "Health Score", value: `${healthScore}%`, color: healthScore >= 70 ? C.green : healthScore >= 40 ? C.orange : C.red },
            ].map((s, i) => (
              <Reveal key={s.label} delay={i * 80}>
                <div
                  style={{ ...card, textAlign: "center" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.borderHover; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; }}
                >
                  <div style={{ fontSize: 52, fontWeight: 300, fontFamily: serif, color: s.color, lineHeight: 1 }}>{s.value}</div>
                  <div style={{ fontSize: 10, color: C.muted, marginTop: 16, textTransform: "uppercase", letterSpacing: "0.25em", fontWeight: 500 }}>{s.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 2. Workstreams ── */}
        <section id="workstreams" style={{ scrollMarginTop: 80, paddingTop: 160 }}>
          <Reveal>
            <SectionLabel text="02 — Threads" />
            <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 300, margin: "0 0 16px", color: C.paper }}>Workstreams</h2>
            <Divider />
          </Reveal>
          <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
            {[
              { key: "all", label: "All", color: C.paper },
              { key: "red", label: "At Risk", color: C.red },
              { key: "yellow", label: "Needs Attention", color: C.orange },
              { key: "green", label: "On Track", color: C.green },
            ].map(f => (
              <button key={f.key} onClick={() => setWsFilter(f.key)} style={filterBtn(f.color, wsFilter === f.key)}>{f.label}</button>
            ))}
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
            {filteredWS.map((w, i) => (
              <Reveal key={w.id} delay={i * 60}>
                <div
                  style={{ ...card, display: "flex", flexDirection: "column", gap: 16 }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.borderHover; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <StatusDot color={sevColor(w.severity)} />
                      <span style={{ fontSize: 10, color: C.mutedDim, letterSpacing: "0.1em" }}>{w.id}</span>
                    </div>
                    <span style={{ fontSize: 10, color: C.mutedDim, letterSpacing: "0.1em", fontWeight: 500 }}>{w.priority}</span>
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 400, lineHeight: 1.3 }}>{w.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.7 }}>
                    {w.owner} · {w.due}
                  </div>
                  <div style={{ fontSize: 12, color: C.mutedDim, lineHeight: 1.6 }}>
                    {w.nextAction}
                  </div>
                  <div style={{ marginTop: "auto", paddingTop: 12 }}>
                    <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper10}, transparent)`, marginBottom: 12 }} />
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <StatusDot color={sevColor(w.severity)} size={6} />
                      <span style={{ fontSize: 10, color: C.muted, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" }}>{w.status}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── 3. Risk Register ── */}
        <section id="risks" style={{ scrollMarginTop: 80, paddingTop: 160 }}>
          <Reveal>
            <SectionLabel text="03 — Exposure" />
            <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 300, margin: "0 0 16px", color: C.paper }}>Risk Register</h2>
            <Divider />
          </Reveal>
          <div style={{ display: "flex", gap: 10, marginBottom: 40, flexWrap: "wrap" }}>
            {[
              { key: "all", label: "All", color: C.paper },
              { key: "red", label: "Critical", color: C.red },
              { key: "yellow", label: "Medium", color: C.orange },
              { key: "green", label: "Low", color: C.green },
            ].map(f => (
              <button key={f.key} onClick={() => setRiskFilter(f.key)} style={filterBtn(f.color, riskFilter === f.key)}>{f.label}</button>
            ))}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {filteredRisks.map((r, i) => {
              const expanded = expandedRisk === r.id;
              return (
                <Reveal key={r.id} delay={i * 50}>
                  <div
                    style={{ ...card, cursor: "pointer", transition: "all .3s ease" }}
                    onClick={() => setExpandedRisk(expanded ? null : r.id)}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHover; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 12, flex: 1, minWidth: 200 }}>
                        <StatusDot color={sevColor(r.severity)} />
                        <span style={{ fontSize: 10, color: C.mutedDim, letterSpacing: "0.1em" }}>{r.id}</span>
                        <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 400 }}>{r.name}</span>
                      </div>
                      <div style={{ display: "flex", gap: 20, fontSize: 11, color: C.muted, alignItems: "center" }}>
                        <span>{r.impact} · {r.prob}</span>
                        <span style={{ fontFamily: serif, fontSize: 20, fontWeight: 400, color: sevColor(r.severity) }}>{r.score}</span>
                        <span style={{ color: C.mutedDim, fontSize: 14, transition: "transform .3s ease", transform: expanded ? "rotate(180deg)" : "rotate(0)" }}>▾</span>
                      </div>
                    </div>
                    <div style={{
                      maxHeight: expanded ? 300 : 0,
                      overflow: "hidden",
                      transition: "max-height .4s cubic-bezier(.16,1,.3,1), opacity .3s ease",
                      opacity: expanded ? 1 : 0,
                    }}>
                      <div style={{ paddingTop: 20, display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))" }}>
                        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                          <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8, fontWeight: 500 }}>Mitigation</div>
                          <div style={{ fontSize: 13, lineHeight: 1.7, color: C.paper }}>{r.mitigation}</div>
                        </div>
                        <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: 16 }}>
                          <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8, fontWeight: 500 }}>Owner</div>
                          <div style={{ fontSize: 13, color: C.paper }}>{r.owner}</div>
                          <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: "0.2em", marginBottom: 8, marginTop: 16, fontWeight: 500 }}>Next Review</div>
                          <div style={{ fontSize: 13, color: C.paper }}>{r.nextReview}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </section>

        {/* ── 4. Calendar ── */}
        <section id="calendar" style={{ scrollMarginTop: 80, paddingTop: 160 }}>
          <Reveal>
            <SectionLabel text="04 — Horizons" />
            <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 300, margin: "0 0 16px", color: C.paper }}>Calendar — Next 60 Days</h2>
            <Divider />
          </Reveal>
          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {calendar.map((ev, i) => (
              <Reveal key={i} delay={i * 40}>
                <div
                  style={{ ...card, display: "flex", alignItems: "center", gap: 20, borderRadius: 10, padding: "20px 24px" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = C.borderHover; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; }}
                >
                  <div style={{ minWidth: 80, fontFamily: serif, fontSize: 20, fontWeight: 400, color: C.paper }}>{ev.date}</div>
                  <StatusDot color={typeColors[ev.type]} size={6} />
                  <div style={{ flex: 1, fontSize: 14, color: C.muted, fontWeight: 400 }}>{ev.label}</div>
                  {ev.hot > 0 && <span style={{ fontSize: 14 }}>{ev.hot >= 2 ? "🔥🔥" : "🔥"}</span>}
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 24, flexWrap: "wrap" }}>
            {Object.entries(typeColors).map(([type, color]) => (
              <div key={type} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 10, color: C.muted, letterSpacing: "0.15em", textTransform: "uppercase" }}>
                <StatusDot color={color} size={6} />
                {type}
              </div>
            ))}
          </div>
        </section>

        {/* ── 5. Team ── */}
        <section id="team" style={{ scrollMarginTop: 80, paddingTop: 160 }}>
          <Reveal>
            <SectionLabel text="05 — People" />
            <h2 style={{ fontFamily: serif, fontSize: 48, fontWeight: 300, margin: "0 0 16px", color: C.paper }}>Team</h2>
            <Divider />
          </Reveal>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
            {team.map((t, i) => (
              <Reveal key={t.name} delay={i * 60}>
                <div
                  style={{ ...card, textAlign: "center", padding: "40px 24px" }}
                  onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.borderColor = C.borderHover; }}
                  onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.borderColor = C.border; }}
                >
                  <div style={{
                    width: 64, height: 64, borderRadius: "50%",
                    background: `${t.color}10`,
                    border: `1px solid ${t.color}40`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 26, fontFamily: serif, fontWeight: 300, color: t.color,
                  }}>
                    {t.name[0]}
                  </div>
                  <div style={{ fontFamily: serif, fontSize: 22, fontWeight: 400 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: C.muted, marginTop: 8 }}>{t.role}</div>
                  <div style={{ marginTop: 16 }}>
                    <span style={{
                      fontSize: 10,
                      padding: "4px 14px",
                      borderRadius: 20,
                      fontWeight: 500,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: `1px solid ${t.status === "Active" || t.status === "Active (Contractor)" ? C.green + "40" : t.status === "Future" ? C.mutedDim + "40" : t.color + "40"}`,
                      color: t.status === "Active" || t.status === "Active (Contractor)" ? C.green : t.status === "Future" ? C.mutedDim : t.color,
                      background: "transparent",
                    }}>{t.status}</span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Footer */}
        <Reveal>
          <div style={{ marginTop: 160, textAlign: "center", paddingTop: 48 }}>
            <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper15}, transparent)`, marginBottom: 48 }} />
            <div style={{ fontFamily: serif, fontSize: 20, fontWeight: 300, fontStyle: "italic", color: C.mutedDim, marginBottom: 12 }}>
              A living document.
            </div>
            <div style={{ fontSize: 11, color: C.mutedDim, letterSpacing: "0.2em", textTransform: "uppercase" }}>
              CX Operations · Last updated Feb 27, 2026
            </div>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
