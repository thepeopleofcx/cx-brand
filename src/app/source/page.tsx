"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";
import Link from "next/link";

/* ─── palette ─── */
const C = {
  bg: "#0B0B0C",
  paper: "#F2F2F2",
  muted: "#B8B8B8",
  orange: "#FD7E01",
  blue: "#1D90BF",
  purple: "#9750CD",
  pink: "#F525A3",
  green: "#08F22F",
  red: "#FE4247",
  yellow: "#E8E200",
  cyan: "#05AEC6",
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

/* ─── helpers ─── */
function ComingSoon() {
  return <span style={{ fontSize: 11, color: `${C.muted}50`, fontStyle: "italic", letterSpacing: "0.08em", background: `${C.paper}06`, padding: "2px 10px", borderRadius: 20 }}>coming soon</span>;
}

function InternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link href={href} style={{ color: C.orange, textDecoration: "none", borderBottom: `1px solid ${C.orange}30`, transition: "border-color 0.3s, color 0.3s", fontSize: 14, letterSpacing: "0.02em" }}>
      {children}
    </Link>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" style={{ color: C.purple, textDecoration: "none", borderBottom: `1px solid ${C.purple}30`, transition: "border-color 0.3s", fontSize: 14 }}>
      {children}
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function SourceOfTruthPage() {
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
        @keyframes heroGlow { 0%,100%{text-shadow:0 0 80px ${C.purple}10} 50%{text-shadow:0 0 140px ${C.purple}20} }
        @keyframes lineGrow { from{width:0} to{width:160px} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes breathe { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.25;transform:scale(1.02)} }
        @keyframes trianglePulse { 0%,100%{stroke-dashoffset:0;opacity:0.3} 50%{stroke-dashoffset:20;opacity:0.6} }
        @keyframes photoScrollLeft { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        @keyframes photoScrollRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0); } }
        .org-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); cursor:default; }
        .org-card:hover { transform: translateY(-6px); }
        .tier-row { transition: background 0.3s; }
        .tier-row:hover { background: ${C.paper}0a !important; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.pink}, ${C.purple}, ${C.blue})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}06 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Floating gradient orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}0e, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "0%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "0%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}0a, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
        </div>

        {/* Subtle rotating ring */}
        <div style={{ position: "absolute", width: 600, height: 600, animation: "rotateSlow 120s linear infinite", opacity: 0.04 }}>
          <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }}>
            <circle cx="300" cy="300" r="280" fill="none" stroke={C.paper} strokeWidth="0.5" strokeDasharray="8 12" />
          </svg>
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 1000, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 32 }}>The Living Document</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            Source of Truth
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}30, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}50`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto" }}>
            A private network of <span style={{ fontWeight: 600, fontStyle: "normal", color: C.paper, background: `linear-gradient(180deg, ${C.paper}, ${C.purple}cc)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>infinite</span> connection
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 48, zIndex: 2, textAlign: "center", animation: "pulse 3s ease-in-out infinite" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}60` }}>Scroll to enter</p>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.muted}40, transparent)`, margin: "10px auto 0" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to top, ${C.bg}, transparent)` }} />
      </section>


      {/* ═══════════ I. CX GENESIS ═══════════ */}
      <section style={{ padding: "140px 8%", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>I — CX Genesis</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 72px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            The world as it is.<br />The world as it should be.
          </h2>
        </Reveal>

        {/* Four beats as a horizontal journey / timeline */}
        <div style={{ position: "relative", marginBottom: 48 }}>
          {/* Connecting line */}
          <Reveal>
            <div style={{ position: "absolute", top: 20, left: "5%", right: "5%", height: 1, background: `linear-gradient(90deg, ${C.red}40, ${C.orange}40, ${C.green}40, ${C.purple}40)`, zIndex: 0 }} />
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, position: "relative", zIndex: 1 }}>
            {[
              { label: "Current World", color: C.red, text: "Disconnected from self and civilization", icon: "◌" },
              { label: "The Problem", color: C.orange, text: "Digital fatigue. Dating app demise. Loneliness epidemic. \"Community\" sold as commodity.", icon: "◉" },
              { label: "Ideal World", color: C.green, text: "A collective of edge seekers and intellectually curious people existing in a civilization building on meaningful connection.", icon: "◎" },
              { label: "The Solution", color: C.purple, text: "CX is a private network of infinite connection.", icon: "✦" },
            ].map((beat, i) => (
              <Reveal key={i} delay={i * 150} style={{ padding: "0 12px" }}>
                <div style={{ textAlign: "center", paddingTop: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", border: `1px solid ${beat.color}60`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px", background: C.bg, fontSize: 18, color: beat.color }}>
                    {beat.icon}
                  </div>
                  <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: beat.color, marginBottom: 10 }}>{beat.label}</p>
                  <p style={{ fontSize: 14, color: `${C.paper}aa`, lineHeight: 1.7 }}>{beat.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Solution amplified */}
        <style>{`
          @keyframes infiniteShimmer {
            0% { background-position: -200% center; }
            100% { background-position: 200% center; }
          }
          @keyframes solutionGlow {
            0%, 100% { box-shadow: 0 0 60px ${C.purple}08, inset 0 0 60px ${C.purple}05; }
            50% { box-shadow: 0 0 100px ${C.purple}12, inset 0 0 80px ${C.purple}08; }
          }
        `}</style>
        <Reveal delay={600}>
          <div style={{ marginTop: 64, padding: "60px 56px", background: `linear-gradient(135deg, ${C.purple}0a 0%, ${C.bg} 50%, ${C.purple}06 100%)`, border: `1px solid ${C.purple}25`, borderRadius: 16, position: "relative", overflow: "hidden", animation: "solutionGlow 6s ease-in-out infinite" }}>
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}15, transparent)`, filter: "blur(60px)" }} />
            <div style={{ position: "absolute", bottom: -60, left: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}08, transparent)`, filter: "blur(40px)" }} />
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.purple}40, ${C.orange}30, transparent)` }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4.5vw, 56px)", fontWeight: 300, color: `${C.paper}cc`, lineHeight: 1.25, position: "relative", zIndex: 1 }}>
              CX is a private network<br />of{" "}
              <span style={{
                fontWeight: 600,
                background: `linear-gradient(90deg, ${C.paper}, ${C.purple}, ${C.paper}, ${C.purple})`,
                backgroundSize: "200% auto",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                animation: "infiniteShimmer 6s linear infinite",
              }}>infinite</span>{" "}
              connection.
            </p>
          </div>
        </Reveal>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "40px 0 60px" }} />
      </section>

      {/* ═══════════ II. CX SACRED GEOMETRY ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>II — CX Sacred Geometry</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            The Infinite<br />Hero&apos;s Journey
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            Space and People — two forces in an endless loop. Where they meet, Connection is born. The journey never ends; it only deepens.
          </p>
        </Reveal>

        {/* ═══ THE ONE GRAPHIC — Space ∞ People, C ↔ X, CX at center ═══ */}
        <Reveal delay={200}>
          <div style={{ position: "relative", width: "100%", maxWidth: 960, margin: "0 auto 80px", aspectRatio: "960/580" }}>
            <svg viewBox="0 0 960 580" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "100%" }}>
              <defs>
                {/* Nebula glows for each infinity loop */}
                <radialGradient id="spaceLoop" cx="240" cy="280" r="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={C.orange} stopOpacity="0.08" />
                  <stop offset="50%" stopColor={C.orange} stopOpacity="0.03" />
                  <stop offset="100%" stopColor={C.orange} stopOpacity="0" />
                </radialGradient>
                <radialGradient id="peopleLoop" cx="720" cy="280" r="220" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={C.pink} stopOpacity="0.08" />
                  <stop offset="50%" stopColor={C.pink} stopOpacity="0.03" />
                  <stop offset="100%" stopColor={C.pink} stopOpacity="0" />
                </radialGradient>
                <radialGradient id="cxOrb" cx="480" cy="280" r="80" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor={C.purple} stopOpacity="0.2" />
                  <stop offset="60%" stopColor={C.purple} stopOpacity="0.06" />
                  <stop offset="100%" stopColor={C.purple} stopOpacity="0" />
                </radialGradient>
                <filter id="starGlow">
                  <feGaussianBlur stdDeviation="2.5" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="orbGlow">
                  <feGaussianBlur stdDeviation="8" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
                <filter id="orbInner">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* ═══ STAR DUST ═══ */}
              {[
                [45,55],[92,135],[38,315],[110,415],[70,485],[155,65],[220,45],[300,40],[340,95],
                [400,50],[460,35],[520,60],[580,43],[640,75],[700,37],[760,50],[830,65],[880,125],
                [900,235],[920,345],[870,415],[820,475],[750,495],[650,505],[550,485],[450,505],
                [350,495],[250,475],[150,495],[60,375],[30,195],[200,135],[310,165],[390,135],
                [500,125],[570,150],[660,135],[730,155],[810,195],[850,295],[810,375],[720,435],
                [600,445],[480,455],[360,435],[240,425],[130,355],[85,255],[290,375],[410,385],
                [530,375],[650,365],[770,335],[190,215],[330,235],[420,195],[560,215],[680,225],
              ].map(([x, y], i) => (
                <circle key={`dust-${i}`} cx={x} cy={y} r={i % 5 === 0 ? 1.2 : 0.6} fill={C.paper} opacity={0.07 + (i % 4) * 0.025}>
                  {i % 7 === 0 && <animate attributeName="opacity" values={`${0.05};${0.18};${0.05}`} dur={`${3 + (i % 5)}s`} repeatCount="indefinite" />}
                </circle>
              ))}

              {/* ═══ INFINITY LOOPS — Space (left) ∞ People (right) ═══ */}
              {/* Loop nebula fills */}
              <ellipse cx="240" cy="280" rx="220" ry="170" fill="url(#spaceLoop)" />
              <ellipse cx="720" cy="280" rx="220" ry="170" fill="url(#peopleLoop)" />

              {/* Infinity path — thick glow */}
              <path d="M 480,280 C 480,100 180,100 180,280 C 180,460 480,460 480,280 C 480,100 780,100 780,280 C 780,460 480,460 480,280" fill="none" stroke={C.purple} strokeOpacity="0.06" strokeWidth="28" />
              {/* Infinity path — fine animated trace */}
              <path d="M 480,280 C 480,100 180,100 180,280 C 180,460 480,460 480,280 C 480,100 780,100 780,280 C 780,460 480,460 480,280" fill="none" stroke={`${C.paper}10`} strokeWidth="1.2" strokeDasharray="8 5">
                <animate attributeName="stroke-dashoffset" from="0" to="-78" dur="4s" repeatCount="indefinite" />
              </path>

              {/* ═══ SPACE LOOP — constellation stars ═══ */}
              {/* Constellation lines */}
              <line x1="150" y1="210" x2="210" y2="260" stroke={C.orange} strokeOpacity="0.18" strokeWidth="0.6" />
              <line x1="210" y1="260" x2="170" y2="330" stroke={C.orange} strokeOpacity="0.18" strokeWidth="0.6" />
              <line x1="170" y1="330" x2="260" y2="340" stroke={C.orange} strokeOpacity="0.14" strokeWidth="0.5" />
              <line x1="210" y1="260" x2="290" y2="250" stroke={C.orange} strokeOpacity="0.14" strokeWidth="0.5" />
              <line x1="150" y1="210" x2="230" y2="190" stroke={C.orange} strokeOpacity="0.1" strokeWidth="0.4" />
              <line x1="230" y1="190" x2="290" y2="250" stroke={C.orange} strokeOpacity="0.1" strokeWidth="0.4" />
              <line x1="170" y1="330" x2="130" y2="375" stroke={C.orange} strokeOpacity="0.07" strokeWidth="0.4" />
              <line x1="260" y1="340" x2="300" y2="375" stroke={C.orange} strokeOpacity="0.07" strokeWidth="0.4" />
              {/* Stars */}
              <circle cx="210" cy="260" r="5" fill={C.orange} opacity="0.7" filter="url(#starGlow)" />
              <circle cx="170" cy="330" r="3.5" fill={C.orange} opacity="0.55" filter="url(#starGlow)" />
              <circle cx="260" cy="340" r="3" fill={C.orange} opacity="0.5" filter="url(#starGlow)" />
              <circle cx="290" cy="250" r="3" fill={C.orange} opacity="0.5" filter="url(#starGlow)" />
              <circle cx="150" cy="210" r="2.5" fill={C.orange} opacity="0.4" />
              <circle cx="230" cy="190" r="2" fill={C.orange} opacity="0.3" />
              <circle cx="130" cy="375" r="1.5" fill={C.orange} opacity="0.2" />
              <circle cx="300" cy="375" r="1.5" fill={C.orange} opacity="0.2" />
              {/* Twinkle */}
              <circle cx="210" cy="260" r="8" fill="none" stroke={C.orange} strokeWidth="0.3" opacity="0">
                <animate attributeName="opacity" values="0;0.25;0" dur="3s" repeatCount="indefinite" />
                <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* ═══ PEOPLE LOOP — constellation stars ═══ */}
              <line x1="810" y1="210" x2="750" y2="260" stroke={C.pink} strokeOpacity="0.18" strokeWidth="0.6" />
              <line x1="750" y1="260" x2="790" y2="330" stroke={C.pink} strokeOpacity="0.18" strokeWidth="0.6" />
              <line x1="790" y1="330" x2="700" y2="340" stroke={C.pink} strokeOpacity="0.14" strokeWidth="0.5" />
              <line x1="750" y1="260" x2="670" y2="250" stroke={C.pink} strokeOpacity="0.14" strokeWidth="0.5" />
              <line x1="810" y1="210" x2="730" y2="190" stroke={C.pink} strokeOpacity="0.1" strokeWidth="0.4" />
              <line x1="730" y1="190" x2="670" y2="250" stroke={C.pink} strokeOpacity="0.1" strokeWidth="0.4" />
              <line x1="790" y1="330" x2="830" y2="375" stroke={C.pink} strokeOpacity="0.07" strokeWidth="0.4" />
              <line x1="700" y1="340" x2="660" y2="375" stroke={C.pink} strokeOpacity="0.07" strokeWidth="0.4" />
              <circle cx="750" cy="260" r="5" fill={C.pink} opacity="0.7" filter="url(#starGlow)" />
              <circle cx="790" cy="330" r="3.5" fill={C.pink} opacity="0.55" filter="url(#starGlow)" />
              <circle cx="700" cy="340" r="3" fill={C.pink} opacity="0.5" filter="url(#starGlow)" />
              <circle cx="670" cy="250" r="3" fill={C.pink} opacity="0.5" filter="url(#starGlow)" />
              <circle cx="810" cy="210" r="2.5" fill={C.pink} opacity="0.4" />
              <circle cx="730" cy="190" r="2" fill={C.pink} opacity="0.3" />
              <circle cx="830" cy="375" r="1.5" fill={C.pink} opacity="0.2" />
              <circle cx="660" cy="375" r="1.5" fill={C.pink} opacity="0.2" />
              <circle cx="750" cy="260" r="8" fill="none" stroke={C.pink} strokeWidth="0.3" opacity="0">
                <animate attributeName="opacity" values="0;0.25;0" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="8;14;8" dur="3.5s" repeatCount="indefinite" />
              </circle>

              {/* ═══ LIGHT-TRAILS — flowing toward center ═══ */}
              <path d="M 290 240 C 340 250, 390 265, 430 275 S 460 280, 480 280" stroke={C.cyan} strokeOpacity="0.2" strokeWidth="0.7" fill="none" strokeDasharray="3 5">
                <animate attributeName="stroke-dashoffset" from="50" to="0" dur="4s" repeatCount="indefinite" />
              </path>
              <path d="M 670 240 C 620 250, 570 265, 530 275 S 500 280, 480 280" stroke={C.orange} strokeOpacity="0.2" strokeWidth="0.7" fill="none" strokeDasharray="3 5">
                <animate attributeName="stroke-dashoffset" from="50" to="0" dur="4s" repeatCount="indefinite" />
              </path>
              {/* Traveling particles */}
              <circle r="1.5" fill={C.cyan} opacity="0.5">
                <animateMotion path="M 290 240 C 340 250, 390 265, 430 275 S 460 280, 480 280" dur="5s" repeatCount="indefinite" />
              </circle>
              <circle r="1.5" fill={C.orange} opacity="0.5">
                <animateMotion path="M 670 240 C 620 250, 570 265, 530 275 S 500 280, 480 280" dur="5s" repeatCount="indefinite" />
              </circle>
              {/* Infinity traveling particle */}
              <circle r="2.5" fill={C.purple} opacity="0.4">
                <animateMotion path="M 480,280 C 480,100 180,100 180,280 C 180,460 480,460 480,280 C 480,100 780,100 780,280 C 780,460 480,460 480,280" dur="12s" repeatCount="indefinite" />
              </circle>

              {/* ═══ CX CENTER — The Atom of Connection ═══ */}
              {/* Outer energy field */}
              <circle cx="480" cy="280" r="70" stroke={C.purple} strokeOpacity="0.04" strokeWidth="0.3" fill="none">
                <animate attributeName="r" values="70;82;70" dur="6s" repeatCount="indefinite" />
                <animate attributeName="stroke-opacity" values="0.04;0.015;0.04" dur="6s" repeatCount="indefinite" />
              </circle>

              {/* Electron orbit 1 — tilted ellipse (C / Cleo) */}
              <ellipse cx="480" cy="280" rx="58" ry="28" transform="rotate(-30 480 280)" stroke={C.cyan} strokeOpacity="0.15" strokeWidth="0.6" fill="none" />
              {/* Electron orbit 2 — tilted opposite (X / Live Events) */}
              <ellipse cx="480" cy="280" rx="58" ry="28" transform="rotate(30 480 280)" stroke={C.orange} strokeOpacity="0.15" strokeWidth="0.6" fill="none" />
              {/* Electron orbit 3 — horizontal (Connection plane) */}
              <ellipse cx="480" cy="280" rx="58" ry="20" stroke={C.purple} strokeOpacity="0.08" strokeWidth="0.4" fill="none" />

              {/* C electron — orbiting */}
              <circle r="4" fill={C.cyan} opacity="0.8" filter="url(#starGlow)">
                <animateMotion path="M 0,-28 C 50.2,-14 50.2,14 0,28 C -50.2,14 -50.2,-14 0,-28" dur="4s" repeatCount="indefinite">
                  <mpath href="#cOrbitPath" />
                </animateMotion>
              </circle>
              {/* Define orbit paths for animateMotion */}
              <ellipse id="cOrbitPath" cx="480" cy="280" rx="58" ry="28" transform="rotate(-30 480 280)" fill="none" stroke="none" />
              <circle r="4" fill={C.cyan} opacity="0.8" filter="url(#starGlow)">
                <animateMotion dur="4s" repeatCount="indefinite">
                  <mpath xlinkHref="#cOrbitPath" />
                </animateMotion>
              </circle>

              {/* X electron — orbiting opposite */}
              <ellipse id="xOrbitPath" cx="480" cy="280" rx="58" ry="28" transform="rotate(30 480 280)" fill="none" stroke="none" />
              <circle r="4" fill={C.orange} opacity="0.8" filter="url(#starGlow)">
                <animateMotion dur="4.5s" repeatCount="indefinite">
                  <mpath xlinkHref="#xOrbitPath" />
                </animateMotion>
              </circle>

              {/* Connection electron — horizontal orbit */}
              <ellipse id="connOrbitPath" cx="480" cy="280" rx="58" ry="20" fill="none" stroke="none" />
              <circle r="2.5" fill={C.purple} opacity="0.6">
                <animateMotion dur="5s" repeatCount="indefinite">
                  <mpath xlinkHref="#connOrbitPath" />
                </animateMotion>
              </circle>

              {/* Electron trails — fading tails */}
              <circle r="2" fill={C.cyan} opacity="0.3">
                <animateMotion dur="4s" repeatCount="indefinite" begin="-0.3s">
                  <mpath xlinkHref="#cOrbitPath" />
                </animateMotion>
              </circle>
              <circle r="1" fill={C.cyan} opacity="0.15">
                <animateMotion dur="4s" repeatCount="indefinite" begin="-0.6s">
                  <mpath xlinkHref="#cOrbitPath" />
                </animateMotion>
              </circle>
              <circle r="2" fill={C.orange} opacity="0.3">
                <animateMotion dur="4.5s" repeatCount="indefinite" begin="-0.3s">
                  <mpath xlinkHref="#xOrbitPath" />
                </animateMotion>
              </circle>
              <circle r="1" fill={C.orange} opacity="0.15">
                <animateMotion dur="4.5s" repeatCount="indefinite" begin="-0.6s">
                  <mpath xlinkHref="#xOrbitPath" />
                </animateMotion>
              </circle>

              {/* Nucleus glow */}
              <circle cx="480" cy="280" r="20" fill={C.purple} opacity="0.06" filter="url(#orbGlow)" />
              <circle cx="480" cy="280" r="10" fill={C.purple} opacity="0.1" filter="url(#orbInner)">
                <animate attributeName="opacity" values="0.08;0.16;0.08" dur="3s" repeatCount="indefinite" />
              </circle>

              {/* CX Logo — the nucleus */}
              <image href="/logos/cx_logo_thick_white_transparent.png" x="440" y="240" width="80" height="80" opacity="0.9" />

              {/* Electron labels — C and X (static) */}
              <text x="430" y="248" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fontStyle="italic" fill={C.cyan} opacity="0.5">C</text>
              <text x="430" y="260" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="6.5" fill={C.paper} opacity="0.3">Cleo</text>
              <text x="530" y="248" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fontStyle="italic" fill={C.orange} opacity="0.5">X</text>
              <text x="530" y="260" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="6.5" fill={C.paper} opacity="0.3">Live Events</text>

              {/* ═══ LABELS ═══ */}
              {/* Loop labels — Space & People */}
              <text x="210" y="150" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="20" fontWeight="300" fill={C.orange} opacity="0.4">Space</text>
              <text x="210" y="167" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="8" fill={C.paper} opacity="0.25" letterSpacing="2">THE VESSEL</text>
              <text x="750" y="150" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="20" fontWeight="300" fill={C.pink} opacity="0.4">People</text>
              <text x="750" y="167" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="8" fill={C.paper} opacity="0.25" letterSpacing="2">THE ENERGY</text>

              {/* Space loop star labels */}
              <text x="210" y="285" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="12" fill={C.paper} opacity="0.65">Venues</text>
              <text x="290" y="242" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill={C.paper} opacity="0.5">Locations</text>
              <text x="170" y="355" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill={C.paper} opacity="0.5">Atmosphere</text>
              <text x="260" y="363" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill={C.paper} opacity="0.5">Design</text>

              {/* People loop star labels */}
              <text x="750" y="285" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="12" fill={C.paper} opacity="0.65">Community</text>
              <text x="670" y="242" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill={C.paper} opacity="0.5">Network</text>
              <text x="790" y="355" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill={C.paper} opacity="0.5">Members</text>
              <text x="700" y="363" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="10" fill={C.paper} opacity="0.5">Hosts</text>

              {/* Loop bottom labels */}
              <text x="210" y="460" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="7" letterSpacing="2" fill={C.orange} opacity="0.3">∞</text>
              <text x="750" y="460" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="7" letterSpacing="2" fill={C.pink} opacity="0.3">∞</text>

              {/* Atom labels — Heroine's / Hero's Journey */}
              <text x="480" y="365" textAnchor="middle" fontFamily="'Cormorant Garamond', serif" fontSize="22" fontStyle="italic" fill={C.purple} opacity="0.6">Connection</text>
              <text x="480" y="385" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="7.5" fill={C.paper} opacity="0.25" letterSpacing="1">C · HEROINE&apos;S JOURNEY · CLEO</text>
              <text x="480" y="400" textAnchor="middle" fontFamily="'Inter', sans-serif" fontSize="7.5" fill={C.paper} opacity="0.25" letterSpacing="1">X · HERO&apos;S JOURNEY · LIVE EVENTS</text>
            </svg>
          </div>
        </Reveal>

        {/* CX Mythos Quote */}
        <Reveal delay={250}>
          <div style={{ position: "relative", padding: "48px 40px", background: `linear-gradient(135deg, ${C.purple}08 0%, ${C.orange}05 100%)`, borderRadius: 16, border: `1px solid ${C.purple}15`, marginBottom: 80, overflow: "hidden", maxWidth: 800, margin: "0 auto 80px" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.purple}40, ${C.orange}40, ${C.purple}40)` }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.5, textAlign: "center" }}>
              &ldquo;We do not lead the Hero, we are the Architect of the narrative. The Hero finds the Connection; we simply make it inevitable.&rdquo;
            </p>
          </div>
        </Reveal>

        {/* ─── 1. THE SPACE (Vessel) ─── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.orange}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.orange, fontWeight: 300 }}>1</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: C.paper }}>The Space</h3>
              <p style={{ fontSize: 13, color: `${C.orange}bb`, fontStyle: "italic", letterSpacing: "0.05em" }}>Vessel</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}50`, marginLeft: 60, marginBottom: 40 }}>&ldquo;The physical home of connection&rdquo;</p>
        </Reveal>

        {/* Venue cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 40 }}>
          {[
            {
              name: "CX Tribeca", subtitle: "Member Homebase", color: C.orange,
              links: [
                { label: "Operating Agreement", href: "/CXtribeca_operations" },
                { label: "Calendar", href: "/calendar" },
                { label: "Venue Booklet", href: undefined },
              ],
              explore: { label: "Explore CX Tribeca →", href: "/tribeca", color: "#A78BFA" },
            },
            {
              name: "CX Chelsea", subtitle: "Tentpole Parties", color: C.pink,
              links: [
                { label: "Operating Agreement", href: undefined },
                { label: "Calendar", href: "/calendar" },
                { label: "Venue Booklet", href: undefined },
              ]
            },
            {
              name: "CX Rockefeller Center", subtitle: "Brand Activations", color: C.blue,
              links: [
                { label: "Operating Agreement", href: undefined },
                { label: "Calendar", href: "/calendar" },
                { label: "Venue Booklet", href: "https://www.hero-nyc.com/private-events" },
              ]
            },
          ].map((venue, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="org-card" style={{ padding: "28px 24px", border: `1px solid ${venue.color}20`, borderRadius: 12, background: `linear-gradient(180deg, ${venue.color}06 0%, transparent 100%)`, height: "100%", display: "flex", flexDirection: "column" }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: C.paper, marginBottom: 4 }}>{venue.name}</h4>
                <p style={{ fontSize: 12, color: `${venue.color}bb`, marginBottom: 20, fontStyle: "italic" }}>{venue.subtitle}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  {venue.links.map((l, j) => (
                    <div key={j} style={{ fontSize: 14 }}>
                      {l.href ? <InternalLink href={l.href}>{l.label} →</InternalLink> : <span style={{ color: `${C.muted}50` }}>{l.label} — <ComingSoon /></span>}
                    </div>
                  ))}
                </div>
                {"explore" in venue && venue.explore && (
                  <a href={venue.explore.href} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 16, padding: "12px 20px", background: `linear-gradient(135deg, ${venue.explore.color}15, ${venue.explore.color}08)`, color: venue.explore.color, fontSize: 13, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", letterSpacing: "0.05em", textDecoration: "none", borderRadius: 8, transition: "all 0.3s ease" }}>
                    {venue.explore.label}
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <blockquote style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2vw, 22px)", fontStyle: "italic", color: `${C.paper}50`, lineHeight: 1.6, borderLeft: `2px solid ${C.orange}30`, paddingLeft: 28, margin: "0 0 48px 0", maxWidth: 800 }}>
            CX creates high-touch, low-staff, consistent live events inside both spaces maintaining no lease while offering TI including decor, AV, programming, and the highest value asset = People.
          </blockquote>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "64px 0" }} />


        {/* ─── 2. THE PEOPLE (Energy) ─── */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.pink}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.pink, fontWeight: 300 }}>2</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: C.paper }}>The People</h3>
              <p style={{ fontSize: 13, color: `${C.pink}bb`, fontStyle: "italic", letterSpacing: "0.05em" }}>Energy</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}50`, marginLeft: 60, marginBottom: 40 }}>&ldquo;The individual, the brand, the artist/host seeking connection&rdquo;</p>
        </Reveal>

        {/* Membership tiers — three columns */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 0 }}>
          {/* Individual */}
          <Reveal delay={150}>
            <div style={{ border: `1px solid ${C.paper}10`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", background: `${C.pink}0a`, borderBottom: `1px solid ${C.paper}08` }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Individual</h4>
              </div>
              {[
                { name: "Member", detail: "Monthly // XX Event Credits" },
                { name: "Patron", detail: "Annual // XX Event Credits" },
                { name: "Partner (LTM)", detail: "Forever // XX Credits + Equity + Distributions" },
              ].map((t, i) => (
                <div key={i} className="tier-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: `1px solid ${C.paper}06` }}>
                  <span style={{ fontSize: 14, color: C.paper, fontWeight: 500 }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: `${C.muted}90`, textAlign: "right" }}>{t.detail}</span>
                </div>
              ))}
              <a href="/members" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 24px", background: `linear-gradient(135deg, ${C.pink}15, ${C.pink}08)`, color: C.pink, fontSize: 13, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", letterSpacing: "0.05em", textDecoration: "none", transition: "all 0.3s ease" }}>
                Explore Membership <span style={{ fontSize: 16, transition: "transform 0.3s ease" }}>→</span>
              </a>
            </div>
          </Reveal>

          {/* Brand */}
          <Reveal delay={250}>
            <div style={{ border: `1px solid ${C.paper}10`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", background: `${C.orange}0a`, borderBottom: `1px solid ${C.paper}08` }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Brand</h4>
              </div>
              {[
                { name: "Brand Member", detail: "Monthly // XX Event Credits" },
                { name: "Brand Patron", detail: "Annual // XX Credits + Placements" },
                { name: "Partner (LTB)", detail: "Annual // XX Credits + Sponsor Integration" },
              ].map((t, i) => (
                <div key={i} className="tier-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: i < 2 ? `1px solid ${C.paper}06` : "none" }}>
                  <span style={{ fontSize: 14, color: C.paper, fontWeight: 500 }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: `${C.muted}90`, textAlign: "right" }}>{t.detail}</span>
                </div>
              ))}
              <a href="/brands" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 24px", background: `linear-gradient(135deg, ${C.orange}15, ${C.orange}08)`, color: C.orange, fontSize: 13, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", letterSpacing: "0.05em", textDecoration: "none", transition: "all 0.3s ease" }}>
                Explore Brand Partnerships <span style={{ fontSize: 16, transition: "transform 0.3s ease" }}>→</span>
              </a>
            </div>
          </Reveal>

          {/* Connector */}
          <Reveal delay={350}>
            <div style={{ border: `1px solid ${C.paper}10`, borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "20px 24px", background: `${C.purple}0a`, borderBottom: `1px solid ${C.paper}08` }}>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Connector</h4>
              </div>
              {[
                { name: "Personality", detail: "Paid to super connect" },
                { name: "Curator", detail: "Paid to program personalities" },
                { name: "Partners (LTC)", detail: "Anderson Paak / Rushkoff" },
              ].map((t, i) => (
                <div key={i} className="tier-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 24px", borderBottom: `1px solid ${C.paper}06` }}>
                  <span style={{ fontSize: 14, color: C.paper, fontWeight: 500 }}>{t.name}</span>
                  <span style={{ fontSize: 12, color: `${C.muted}90`, textAlign: "right" }}>{t.detail}</span>
                </div>
              ))}
              <a href="/connectors" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "16px 24px", background: `linear-gradient(135deg, ${C.purple}15, ${C.purple}08)`, color: C.purple, fontSize: 13, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", letterSpacing: "0.05em", textDecoration: "none", transition: "all 0.3s ease" }}>
                Explore the Connector Program <span style={{ fontSize: 16, transition: "transform 0.3s ease" }}>→</span>
              </a>
            </div>
          </Reveal>
        </div>

        {/* Network — foundational base */}
        <Reveal delay={400}>
          <div style={{ position: "relative", marginTop: 0, padding: "20px 32px", background: `linear-gradient(90deg, ${C.pink}06, ${C.orange}04, ${C.purple}06)`, border: `1px solid ${C.paper}10`, borderTop: "none", borderRadius: "0 0 12px 12px", display: "flex", alignItems: "center", justifyContent: "center", gap: 16 }}>
            <div style={{ width: 1, height: 20, background: `linear-gradient(to bottom, ${C.paper}20, transparent)`, position: "absolute", top: -20, left: "16.6%" }} />
            <div style={{ width: 1, height: 20, background: `linear-gradient(to bottom, ${C.paper}20, transparent)`, position: "absolute", top: -20, left: "50%" }} />
            <div style={{ width: 1, height: 20, background: `linear-gradient(to bottom, ${C.paper}20, transparent)`, position: "absolute", top: -20, left: "83.3%" }} />
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: `${C.paper}30`, flexShrink: 0 }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 16, color: `${C.paper}80`, letterSpacing: "0.03em" }}>
              <strong style={{ color: C.paper, fontWeight: 500, fontSize: 28, letterSpacing: "0.04em" }}>Network</strong> — Can buy tickets / is in the comms
            </p>
            <span style={{ fontSize: 11, color: `${C.muted}50`, fontStyle: "italic" }}>The outer ring · The entry point</span>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "64px 0" }} />


        {/* IMPORTANT ASIDE — striking margin note */}
        <Reveal delay={300}>
          <div style={{ display: "flex", gap: 24, alignItems: "stretch", marginBottom: 40 }}>
            <div style={{ width: 4, background: `linear-gradient(to bottom, ${C.red}, ${C.orange})`, borderRadius: 4, flexShrink: 0 }} />
            <div style={{ padding: "28px 0" }}>
              <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: C.red, marginBottom: 12 }}>Important Aside</p>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 34px)", fontWeight: 400, color: C.paper, lineHeight: 1.35 }}>
                We are not a &lsquo;middle&rsquo; personality —<br />
                we have no middle men, no middle opinion,<br />
                no middle quality, no middle hotels.
              </p>
            </div>
          </div>
        </Reveal>
      </section>


      {/* ═══════════ III. CX AS A SOLUTION ═══════════ */}
      <section style={{ padding: "0 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>III — CX as a Solution</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            The living organism
          </h2>
        </Reveal>

        <Reveal delay={120}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 64 }}>
            CX combines underutilized spaces with edge seekers and intellectually curious people, brands, artists to form meaningful connections. We do not take on leases in exchange for bringing the people, and we bring the people through curated memberships and partnerships.
          </p>
        </Reveal>

        {/* Organism system — flowing connected list */}
        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Vertical connecting line */}
          <div style={{ position: "absolute", left: 15, top: 24, bottom: 24, width: 1, background: `linear-gradient(to bottom, ${C.purple}40, ${C.orange}40, ${C.blue}40, ${C.pink}40)` }} />

          {[
            {
              icon: "✦", name: "CX Brand", subtitle: "Soul · Who we are", color: C.purple,
              description: "The identity, the voice, the aesthetic — the person CX would be if it walked into a room.",
              link: { label: "View Brand Book →", href: "https://cx-brand-book.vercel.app/", external: true },
              children: [],
            },
            {
              icon: "◎", name: "CX Operation", subtitle: "Body · How we live", color: C.orange,
              description: "The functions that keep the organism alive — systems, processes, rhythm.",
              link: null,
              children: [
                { name: "CX Magnification", note: "Heart · Our big goals" },
                { name: "CX Calendar", note: "Heart · Our daily rhythm", link: { label: "View Calendar →", href: "/calendar" } },
              ],
            },
            {
              icon: "◌", name: "CX Communication", subtitle: "Mind · How we view the world", color: C.blue,
              description: "How we project our world outward — content, press, reputation.",
              link: { label: "View Communication →", href: "/communication" },
              children: [
                { name: "CX Media", note: "Content & Storytelling" },
                { name: "CX PR", note: "Press & Narrative" },
                { name: "CX Reputation", note: "Trust & Perception" },
              ],
            },
            {
              icon: "⚡", name: "CX Team / Tools", subtitle: "Heart · Our support system", color: C.pink,
              description: "The humans and machines that make it all possible.",
              link: { label: "View Team →", href: "/team" },
              children: [
                { name: "Human Team", note: "William, Christine, Mabel, Rose" },
                { name: "Robot Team", note: "Cleo, CX Designer" },
              ],
            },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ position: "relative", marginBottom: i < 3 ? 48 : 0, paddingLeft: 32 }}>
                {/* Node dot on the line */}
                <div style={{ position: "absolute", left: -40, top: 6, width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${item.color}50`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, color: item.color, zIndex: 1 }}>{item.icon}</div>

                {/* Title row */}
                <div style={{ marginBottom: 8 }}>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, color: C.paper, display: "inline" }}>{item.name}</h3>
                  <span style={{ fontSize: 12, fontStyle: "italic", color: `${item.color}bb`, marginLeft: 12, letterSpacing: "0.05em" }}>{item.subtitle}</span>
                </div>

                {/* Description */}
                <p style={{ fontSize: 15, color: `${C.paper}80`, lineHeight: 1.7, marginBottom: item.children.length > 0 || item.link ? 16 : 0, maxWidth: 700 }}>{item.description}</p>

                {/* Children as indented sub-lines */}
                {item.children.length > 0 && (
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 20, borderLeft: `1px solid ${item.color}15`, marginBottom: item.link ? 16 : 0 }}>
                    {item.children.map((child, j) => (
                      <div key={j} style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span style={{ fontSize: 13, color: `${C.paper}cc`, fontWeight: 500 }}>{child.name}</span>
                        <span style={{ fontSize: 12, color: `${C.muted}70`, fontStyle: "italic" }}>{child.note}</span>
                        {"link" in child && child.link && <InternalLink href={child.link.href}>{child.link.label}</InternalLink>}
                      </div>
                    ))}
                  </div>
                )}

                {/* Link */}
                {item.link && (
                  item.link.external
                    ? <ExternalLink href={item.link.href}>{item.link.label}</ExternalLink>
                    : <InternalLink href={item.link.href}>{item.link.label}</InternalLink>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "120px 0 0" }} />
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ textAlign: "center", padding: "120px 8% 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)` }} />
        <Reveal>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: `${C.paper}30`, marginBottom: 16 }}>CX — Source of Truth</p>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: `${C.muted}40` }}>The Living Document · 2026</p>
        </Reveal>
      </footer>
    </div>
  );
}
