"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";

/* ─── palette ─── */
const C = {
  bg: "#0B0B0C",
  paper: "#E8E4D9",
  muted: "#8A8A8A",
  orange: "#FD7E01",
  pink: "#FF00B4",
  purple: "#9750CD",
  cyan: "#00D4AA",
  red: "#FF3B30",
  blue: "#1D90BF",
};

/* ─── Reveal ─── */
function Reveal({ children, className = "", delay = 0, style }: { children: ReactNode; className?: string; delay?: number; style?: React.CSSProperties }) {
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
    <div ref={ref} className={className} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   CX PEOPLE PAGE
   ═══════════════════════════════════════════════════ */
export default function PeoplePage() {
  const [scrollY, setScrollY] = useState(0);
  const [maxScroll, setMaxScroll] = useState(1);
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const onScroll = () => { setScrollY(window.scrollY); setMaxScroll(document.documentElement.scrollHeight - window.innerHeight); };
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
    <div style={{ background: "#0B0B0C", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Inter:wght@300;400;500;600&display=swap');
        *, *::before, *::after { margin:0; padding:0; box-sizing:border-box; }
        html { scroll-behavior: smooth; }
        body { background:${C.bg}; color:${C.paper}; font-family:'Inter',sans-serif; overflow-x:hidden; }
        ::selection { background:${C.purple}40; color:${C.paper}; }
        body::before {
          content:''; position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,-60px) scale(1.1)} 66%{transform:translate(-40px,40px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-60px,80px) scale(0.9)} 66%{transform:translate(60px,-30px) scale(1.15)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,60px) scale(1.05)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes heroGlow { 0%,100%{text-shadow:0 0 80px ${C.pink}10} 50%{text-shadow:0 0 140px ${C.pink}20} }
        @keyframes lineGrow { from{width:0} to{width:160px} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes breathe { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.25;transform:scale(1.02)} }
        @keyframes infiniteShimmer { 0% { background-position: -200% center; } 100% { background-position: 200% center; } }
        .glass-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); cursor:default; }
        .glass-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,0,0,0.3); }
        .tier-row { transition: background 0.3s; }
        .tier-row:hover { background: ${C.paper}0a !important; }
        .pillar-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .pillar-card:hover { transform: translateY(-4px); border-color: ${C.paper}25 !important; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.pink}, ${C.purple}, ${C.orange})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}06 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />


      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Floating gradient orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}0e, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "0%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "0%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}0a, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
          <div style={{ position: "absolute", top: "20%", right: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}08, transparent 70%)`, animation: "float1 28s ease-in-out infinite reverse", filter: "blur(90px)" }} />
        </div>

        {/* Subtle rotating ring */}
        <div style={{ position: "absolute", width: 600, height: 600, animation: "rotateSlow 120s linear infinite", opacity: 0.04 }}>
          <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }}>
            <circle cx="300" cy="300" r="280" fill="none" stroke={C.paper} strokeWidth="0.5" strokeDasharray="8 12" />
          </svg>
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 1000, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 32 }}>The Energy</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX People
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}30, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}50`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto" }}>
            The right loop of the{" "}
            <span style={{ fontWeight: 600, fontStyle: "normal", color: C.paper, background: `linear-gradient(180deg, ${C.paper}, ${C.pink}cc)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>infinite</span>
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 48, zIndex: 2, textAlign: "center", animation: "pulse 3s ease-in-out infinite" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}60` }}>Scroll to enter</p>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.muted}40, transparent)`, margin: "10px auto 0" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to top, ${C.bg}, transparent)` }} />
      </section>


      {/* ═══════════ PHILOSOPHY ═══════════ */}
      <section style={{ padding: "140px 8%", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>Philosophy</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            People are the energy<br />that flows through the vessel.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.5vw, 28px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}50`, lineHeight: 1.6, maxWidth: 700, marginBottom: 64 }}>
            Without them, space is just geometry.<br />
            Without space, they are just strangers passing through time.
          </p>
        </Reveal>

        <Reveal delay={250}>
          <div style={{ padding: "60px 56px", background: `linear-gradient(135deg, ${C.pink}0a 0%, ${C.bg} 50%, ${C.purple}06 100%)`, border: `1px solid ${C.pink}20`, borderRadius: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}12, transparent)`, filter: "blur(60px)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.pink}40, ${C.purple}30, transparent)` }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 3vw, 36px)", fontWeight: 300, color: `${C.paper}cc`, lineHeight: 1.4, position: "relative", zIndex: 1 }}>
              CX exists at the intersection of space and soul. The people are not guests — they are the living pulse. Every member, every host, every curator is a note in the symphony. Together, they compose{" "}
              <span style={{
                fontWeight: 600,
                background: `linear-gradient(90deg, ${C.paper}, ${C.pink}, ${C.paper}, ${C.pink})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "infiniteShimmer 6s linear infinite",
              }}>connection</span>.
            </p>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ THE ATOM ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>The Atom</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            The X in C<span style={{ color: C.pink }}>X</span>
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 700, lineHeight: 1.7, marginBottom: 48 }}>
            In the CX infinity, People are the right loop — the X. They are the live events, the recurring Hero&apos;s Journey. Where Space is the vessel that holds, People are the energy that moves. They arrive as strangers and leave as constellations.
          </p>
        </Reveal>

        {/* Infinity visual — People side highlighted */}
        <Reveal delay={200}>
          <div style={{ position: "relative", width: "100%", maxWidth: 700, margin: "0 auto 80px", aspectRatio: "700/300" }}>
            <svg viewBox="0 0 700 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <defs>
                <radialGradient id="pLoopGlow" cx="525" cy="150" r="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={C.pink} stopOpacity="0.1" />
                  <stop offset="100%" stopColor={C.pink} stopOpacity="0" />
                </radialGradient>
                <radialGradient id="sLoopGlow" cx="175" cy="150" r="180" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={C.orange} stopOpacity="0.04" />
                  <stop offset="100%" stopColor={C.orange} stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Background glows */}
              <ellipse cx="175" cy="150" rx="170" ry="120" fill="url(#sLoopGlow)" />
              <ellipse cx="525" cy="150" rx="170" ry="120" fill="url(#pLoopGlow)" />

              {/* Infinity path — dim */}
              <path d="M 350,150 C 350,30 100,30 100,150 C 100,270 350,270 350,150 C 350,30 600,30 600,150 C 600,270 350,270 350,150" fill="none" stroke={C.paper} strokeOpacity="0.06" strokeWidth="20" />

              {/* Left loop — Space (subdued) */}
              <path d="M 350,150 C 350,30 100,30 100,150 C 100,270 350,270 350,150" fill="none" stroke={C.orange} strokeOpacity="0.15" strokeWidth="1" strokeDasharray="4 6">
                <animate attributeName="stroke-dashoffset" from="0" to="-60" dur="4s" repeatCount="indefinite" />
              </path>

              {/* Right loop — People (bright, highlighted) */}
              <path d="M 350,150 C 350,30 600,30 600,150 C 600,270 350,270 350,150" fill="none" stroke={C.pink} strokeOpacity="0.4" strokeWidth="1.5" strokeDasharray="4 6">
                <animate attributeName="stroke-dashoffset" from="0" to="-60" dur="3.5s" repeatCount="indefinite" />
              </path>

              {/* Labels */}
              <text x="175" y="145" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="18" fontWeight="300" fill={C.orange} opacity="0.3">Space</text>
              <text x="175" y="165" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="8" fill={C.paper} opacity="0.2" letterSpacing="2">THE VESSEL</text>

              <text x="525" y="145" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="22" fontWeight="400" fill={C.pink} opacity="0.7">People</text>
              <text x="525" y="165" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="8" fill={C.paper} opacity="0.4" letterSpacing="2">THE ENERGY</text>

              {/* Center — Connection */}
              <circle cx="350" cy="150" r="16" fill={C.purple} opacity="0.1" />
              <circle cx="350" cy="150" r="8" fill={C.purple} opacity="0.2">
                <animate attributeName="opacity" values="0.15;0.3;0.15" dur="3s" repeatCount="indefinite" />
              </circle>
              <text x="350" y="195" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="12" fontStyle="italic" fill={C.purple} opacity="0.5">Connection</text>

              {/* Traveling particle on People loop */}
              <circle r="3" fill={C.pink} opacity="0.6">
                <animateMotion path="M 350,150 C 350,30 600,30 600,150 C 600,270 350,270 350,150" dur="6s" repeatCount="indefinite" />
              </circle>
              <circle r="1.5" fill={C.pink} opacity="0.3">
                <animateMotion path="M 350,150 C 350,30 600,30 600,150 C 600,270 350,270 350,150" dur="6s" repeatCount="indefinite" begin="-0.5s" />
              </circle>
            </svg>
          </div>
        </Reveal>

        {/* Three key aspects */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 40 }}>
          {[
            { label: "The Hero\u2019s Journey", desc: "Every person who enters CX is on a journey. We don\u2019t lead them \u2014 we architect the narrative so connection becomes inevitable.", color: C.pink },
            { label: "The Recurring X", desc: "X is the live event. It recurs, it transforms, it pulls people back into the loop. Each event is a chapter in an infinite story.", color: C.orange },
            { label: "The Living Network", desc: "People are not a database. They are a living, breathing organism \u2014 nodes in a constellation that grows more luminous with every connection.", color: C.purple },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ padding: "32px 28px", border: `1px solid ${item.color}20`, borderRadius: 12, background: `linear-gradient(180deg, ${item.color}06 0%, transparent 100%)` }}>
                <div style={{ width: 32, height: 2, background: item.color, opacity: 0.5, marginBottom: 20, borderRadius: 1 }} />
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.paper, marginBottom: 12 }}>{item.label}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}80`, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "64px 0 0" }} />
      </section>


      {/* ═══════════ MEMBERSHIP TIERS ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>Membership</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            Four orbits of belonging
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}60`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            From the outer ring to the inner core — each orbit deepens the connection.
          </p>
        </Reveal>

        {/* Tier cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 20, marginBottom: 0 }}>
          {/* Network */}
          <Reveal delay={100}>
            <div className="glass-card" style={{ border: `1px solid ${C.paper}12`, borderRadius: 16, overflow: "hidden", background: `linear-gradient(180deg, ${C.paper}04 0%, transparent 100%)`, height: "100%" }}>
              <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${C.paper}08` }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.paper}30`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 16, color: `${C.paper}60` }}>◌</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper, marginBottom: 4 }}>Network</h3>
                <p style={{ fontSize: 12, color: `${C.muted}80`, fontStyle: "italic" }}>The outer ring</p>
              </div>
              <div style={{ padding: "20px 24px" }}>
                <p style={{ fontSize: 14, color: `${C.paper}70`, lineHeight: 1.7, marginBottom: 16 }}>
                  Can buy tickets. Is in the comms. The entry point into the CX universe.
                </p>
                <p style={{ fontSize: 12, color: `${C.muted}60` }}>Everyone starts here.</p>
              </div>
            </div>
          </Reveal>

          {/* Individual */}
          <Reveal delay={200}>
            <div className="glass-card" style={{ border: `1px solid ${C.pink}18`, borderRadius: 16, overflow: "hidden", background: `linear-gradient(180deg, ${C.pink}06 0%, transparent 100%)`, height: "100%" }}>
              <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${C.paper}08` }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.pink}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 16, color: C.pink }}>◎</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper, marginBottom: 4 }}>Individual</h3>
                <p style={{ fontSize: 12, color: `${C.pink}90`, fontStyle: "italic" }}>The seeker</p>
              </div>
              <div style={{ padding: "16px 24px" }}>
                {[
                  { name: "Member", detail: "Monthly" },
                  { name: "Patron", detail: "Annual" },
                  { name: "Partner (LTI)", detail: "Lifetime" },
                ].map((t, i) => (
                  <div key={i} className="tier-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.paper}06` : "none" }}>
                    <span style={{ fontSize: 14, color: C.paper, fontWeight: 500 }}>{t.name}</span>
                    <span style={{ fontSize: 11, color: `${C.muted}80` }}>{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Brand */}
          <Reveal delay={300}>
            <div className="glass-card" style={{ border: `1px solid ${C.orange}18`, borderRadius: 16, overflow: "hidden", background: `linear-gradient(180deg, ${C.orange}06 0%, transparent 100%)`, height: "100%" }}>
              <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${C.paper}08` }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.orange}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 16, color: C.orange }}>◉</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper, marginBottom: 4 }}>Brand</h3>
                <p style={{ fontSize: 12, color: `${C.orange}90`, fontStyle: "italic" }}>The amplifier</p>
              </div>
              <div style={{ padding: "16px 24px" }}>
                {[
                  { name: "Brand Member", detail: "Monthly" },
                  { name: "Brand Patron", detail: "Annual" },
                  { name: "Partner (LTB)", detail: "Annual" },
                ].map((t, i) => (
                  <div key={i} className="tier-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.paper}06` : "none" }}>
                    <span style={{ fontSize: 14, color: C.paper, fontWeight: 500 }}>{t.name}</span>
                    <span style={{ fontSize: 11, color: `${C.muted}80` }}>{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Connector */}
          <Reveal delay={400}>
            <div className="glass-card" style={{ border: `1px solid ${C.purple}18`, borderRadius: 16, overflow: "hidden", background: `linear-gradient(180deg, ${C.purple}06 0%, transparent 100%)`, height: "100%" }}>
              <div style={{ padding: "28px 24px 20px", borderBottom: `1px solid ${C.paper}08` }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1.5px solid ${C.purple}40`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                  <span style={{ fontSize: 16, color: C.purple }}>✦</span>
                </div>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper, marginBottom: 4 }}>Connector</h3>
                <p style={{ fontSize: 12, color: `${C.purple}90`, fontStyle: "italic" }}>The catalyst</p>
              </div>
              <div style={{ padding: "16px 24px" }}>
                {[
                  { name: "Personality", detail: "Paid to super connect" },
                  { name: "Curator", detail: "Paid to program" },
                  { name: "Partner (LTC)", detail: "Paak / Rushkoff" },
                ].map((t, i) => (
                  <div key={i} className="tier-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 2 ? `1px solid ${C.paper}06` : "none" }}>
                    <span style={{ fontSize: 14, color: C.paper, fontWeight: 500 }}>{t.name}</span>
                    <span style={{ fontSize: 11, color: `${C.muted}80` }}>{t.detail}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ COMMUNITY PILLARS ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>Ecosystem</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            The four pillars
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}60`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            Every person in the CX ecosystem plays a role. These are the four archetypes.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24 }}>
          {[
            {
              title: "Members",
              icon: "○",
              color: C.pink,
              desc: "The heartbeat. Individuals and brands who chose to belong — who show up, who invest in connection, who make the rooms come alive.",
            },
            {
              title: "Hosts",
              icon: "◐",
              color: C.orange,
              desc: "The warmth at the door. They set the tone, hold the energy, and ensure every person who enters feels the frequency shift.",
            },
            {
              title: "Curators",
              icon: "◑",
              color: C.purple,
              desc: "The programmers of experience. They select the personalities, design the collisions, compose the evening\u2019s narrative arc.",
            },
            {
              title: "Partners",
              icon: "●",
              color: C.cyan,
              desc: "The amplifiers. Cultural icons, thought leaders, and brands whose presence elevates the entire constellation. The gravity wells.",
            },
          ].map((pillar, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="pillar-card" style={{ padding: "36px 28px", border: `1px solid ${pillar.color}15`, borderRadius: 16, background: `linear-gradient(180deg, ${pillar.color}04 0%, transparent 100%)`, height: "100%" }}>
                <div style={{ fontSize: 28, color: pillar.color, marginBottom: 20, opacity: 0.7 }}>{pillar.icon}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: C.paper, marginBottom: 16 }}>{pillar.title}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}70`, lineHeight: 1.7 }}>{pillar.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ QUOTE ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1000, margin: "0 auto" }}>
        <Reveal>
          <div style={{ position: "relative", padding: "64px 48px", background: `linear-gradient(135deg, ${C.purple}08 0%, ${C.pink}05 50%, ${C.orange}04 100%)`, borderRadius: 20, border: `1px solid ${C.purple}18`, overflow: "hidden", textAlign: "center" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.pink}40, ${C.purple}40, ${C.orange}40)` }} />
            <div style={{ position: "absolute", top: -100, right: -100, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}10, transparent)`, filter: "blur(80px)" }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}08, transparent)`, filter: "blur(50px)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3.5vw, 40px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}90`, lineHeight: 1.4, position: "relative", zIndex: 1 }}>
              &ldquo;We do not lead the Hero,<br />we are the Architect of the narrative.&rdquo;
            </p>
          </div>
        </Reveal>
      </section>


      {/* ═══════════ CTA / LINKS ═══════════ */}
      <section style={{ padding: "0 8% 160px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 300, color: `${C.paper}40`, marginBottom: 40 }}>
            Continue the journey
          </p>
        </Reveal>
        <Reveal delay={100}>
          <div style={{ display: "flex", justifyContent: "center", gap: 32, flexWrap: "wrap" }}>
            <Link href="/source" style={{ color: C.orange, textDecoration: "none", borderBottom: `1px solid ${C.orange}30`, fontSize: 15, letterSpacing: "0.02em", padding: "8px 0", transition: "border-color 0.3s" }}>
              Source of Truth →
            </Link>
            <a href="https://cx-brand-book.vercel.app/" target="_blank" rel="noopener noreferrer" style={{ color: C.purple, textDecoration: "none", borderBottom: `1px solid ${C.purple}30`, fontSize: 15, letterSpacing: "0.02em", padding: "8px 0", transition: "border-color 0.3s" }}>
              Brand Book →
            </a>
            <Link href="/calendar" style={{ color: C.blue, textDecoration: "none", borderBottom: `1px solid ${C.blue}30`, fontSize: 15, letterSpacing: "0.02em", padding: "8px 0", transition: "border-color 0.3s" }}>
              Calendar →
            </Link>
          </div>
        </Reveal>

        {/* Subtle footer mark */}
        <Reveal delay={200}>
          <div style={{ marginTop: 80, opacity: 0.15 }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 14, color: C.paper, letterSpacing: "0.2em" }}>CX</p>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
