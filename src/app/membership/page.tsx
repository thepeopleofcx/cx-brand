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
  cyan: "#05AEC6",
  gold: "#E8D5B7",
};

/* ─── tier config ─── */
const TIERS = [
  {
    name: "Member",
    credits: 50,
    color: C.paper,
    accent: C.cyan,
    symbol: "✦",
    tagline: "Enter the constellation",
    benefits: [
      "Access to CX Tribeca events",
      "Weekly member nights",
      "Community directory",
      "Digital membership card",
      "Credit-based event access",
    ],
  },
  {
    name: "Patron",
    credits: 75,
    color: C.orange,
    accent: C.orange,
    symbol: "✦✦",
    tagline: "Shape the experience",
    benefits: [
      "Everything in Member",
      "Priority reservations",
      "Founders Table access",
      "Exclusive patron events",
      "Enhanced credit allocation",
      "Early access to programming",
    ],
  },
  {
    name: "Lifetime",
    credits: 100,
    color: C.gold,
    accent: C.gold,
    symbol: "✦✦✦",
    tagline: "Become the constellation",
    benefits: [
      "Everything in Patron",
      "Lifetime membership",
      "Unlimited priority access",
      "Private event hosting credits",
      "Advisory circle invitation",
      "Legacy recognition",
      "Maximum credit allocation",
    ],
  },
];

/* ─── Reveal ─── */
function Reveal({ children, delay = 0, style }: { children: ReactNode; delay?: number; style?: React.CSSProperties }) {
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
    <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(40px)", transition: `opacity 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms, transform 0.9s cubic-bezier(0.23,1,0.32,1) ${delay}ms`, ...style }}>
      {children}
    </div>
  );
}

/* ─── Constellation Background ─── */
function ConstellationBg() {
  const stars = useRef<{ x: number; y: number; r: number; o: number; speed: number }[]>([]);
  if (stars.current.length === 0) {
    for (let i = 0; i < 120; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random() * 0.5 + 0.1,
        speed: Math.random() * 4 + 2,
      });
    }
  }
  return (
    <svg style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 0 }} viewBox="0 0 100 100" preserveAspectRatio="none">
      {stars.current.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r * 0.15} fill={C.paper} opacity={s.o}>
          <animate attributeName="opacity" values={`${s.o};${s.o * 0.3};${s.o}`} dur={`${s.speed}s`} repeatCount="indefinite" />
        </circle>
      ))}
    </svg>
  );
}

/* ─── Credit Orb visualization ─── */
function CreditOrb({ credits, color, size = 140 }: { credits: number; color: string; size?: number }) {
  const filled = credits / 100;
  const r = size / 2 - 4;
  const circumference = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block", margin: "0 auto" }}>
      {/* outer ring track */}
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={`${color}15`} strokeWidth={2} />
      {/* filled arc */}
      <circle
        cx={size/2} cy={size/2} r={r}
        fill="none" stroke={color} strokeWidth={2}
        strokeDasharray={`${circumference * filled} ${circumference * (1 - filled)}`}
        strokeDashoffset={circumference * 0.25}
        strokeLinecap="round"
        opacity={0.6}
      >
        <animate attributeName="stroke-dashoffset" from={`${circumference}`} to={`${circumference * 0.25}`} dur="1.5s" fill="freeze" />
      </circle>
      {/* glow */}
      <circle cx={size/2} cy={size/2} r={r * 0.55} fill={`${color}08`} />
      <circle cx={size/2} cy={size/2} r={r * 0.3} fill={`${color}05`} />
      {/* number */}
      <text x={size/2} y={size/2 - 6} textAnchor="middle" dominantBaseline="central" fill={color} fontSize={size * 0.28} fontFamily="'Cormorant Garamond', serif" fontWeight={300}>
        {credits}
      </text>
      <text x={size/2} y={size/2 + 18} textAnchor="middle" dominantBaseline="central" fill={`${color}80`} fontSize={9} fontFamily="'Inter', sans-serif" letterSpacing="0.15em">
        CREDITS
      </text>
    </svg>
  );
}

/* ─── Tier Card ─── */
function TierCard({ tier, index }: { tier: typeof TIERS[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={index * 200} style={{ flex: "1 1 320px", maxWidth: 400 }}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? `${tier.accent}08` : `${C.paper}04`,
          border: `1px solid ${hovered ? `${tier.accent}40` : `${C.paper}10`}`,
          borderRadius: 16,
          padding: "48px 36px 40px",
          transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
          position: "relative",
          overflow: "hidden",
          cursor: "default",
        }}
      >
        {/* top glow */}
        <div style={{
          position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)",
          width: 200, height: 120, borderRadius: "50%",
          background: `radial-gradient(ellipse, ${tier.accent}15, transparent 70%)`,
          opacity: hovered ? 1 : 0, transition: "opacity 0.5s",
          pointerEvents: "none",
        }} />

        {/* symbol */}
        <div style={{ textAlign: "center", fontSize: 20, color: tier.accent, letterSpacing: "0.3em", marginBottom: 24, opacity: 0.7 }}>
          {tier.symbol}
        </div>

        {/* credit orb */}
        <CreditOrb credits={tier.credits} color={tier.accent} />

        {/* name */}
        <h3 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: 32, fontWeight: 300, color: tier.color,
          textAlign: "center", margin: "28px 0 8px",
          letterSpacing: "0.08em",
        }}>
          {tier.name}
        </h3>

        {/* tagline */}
        <p style={{
          fontFamily: "'Inter', sans-serif",
          fontSize: 12, color: `${tier.accent}80`,
          textAlign: "center", letterSpacing: "0.12em",
          textTransform: "uppercase", margin: "0 0 32px",
        }}>
          {tier.tagline}
        </p>

        {/* divider */}
        <div style={{ width: 40, height: 1, background: `${tier.accent}30`, margin: "0 auto 28px" }} />

        {/* benefits */}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {tier.benefits.map((b, i) => (
            <li key={i} style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 13, color: `${C.paper}90`,
              padding: "8px 0",
              borderBottom: i < tier.benefits.length - 1 ? `1px solid ${C.paper}08` : "none",
              display: "flex", alignItems: "center", gap: 10,
            }}>
              <span style={{ color: tier.accent, fontSize: 8, opacity: 0.6 }}>●</span>
              {b}
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function MembershipPage() {
  const [mousePos, setMousePos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", color: C.paper, position: "relative", overflow: "hidden" }}>
      {/* Google Fonts */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Inter:wght@300;400;500&display=swap');`}</style>

      {/* grain overlay */}
      <div style={{
        position: "fixed", top: 0, left: 0, width: "100%", height: "100%", pointerEvents: "none", zIndex: 9999, opacity: 0.03, mixBlendMode: "overlay",
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
      }} />

      {/* cursor glow */}
      <div style={{
        position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200,
        width: 400, height: 400, borderRadius: "50%",
        background: `radial-gradient(circle, ${C.orange}08, transparent 70%)`,
        pointerEvents: "none", zIndex: 1, transition: "left 0.1s, top 0.1s",
      }} />

      <ConstellationBg />

      {/* ─── content ─── */}
      <div style={{ position: "relative", zIndex: 2, maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

        {/* back link */}
        <div style={{ padding: "32px 0 0" }}>
          <Link href="/source" style={{ color: `${C.muted}60`, textDecoration: "none", fontSize: 12, fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em" }}>
            ← SOURCE OF TRUTH
          </Link>
        </div>

        {/* ─── Hero ─── */}
        <section style={{ textAlign: "center", padding: "100px 0 80px" }}>
          <Reveal>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.25em",
              color: `${C.muted}60`, textTransform: "uppercase", marginBottom: 24,
            }}>
              JOIN THE CONSTELLATION
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(48px, 8vw, 88px)",
              fontWeight: 300, lineHeight: 1.05,
              margin: "0 0 24px",
              background: `linear-gradient(135deg, ${C.paper}, ${C.gold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}>
              Membership
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, fontWeight: 300, fontStyle: "italic",
              color: `${C.muted}80`, maxWidth: 500, margin: "0 auto",
              lineHeight: 1.6,
            }}>
              Every connection begins with a single point of light
            </p>
          </Reveal>
        </section>

        {/* ─── How Credits Work ─── */}
        <Reveal>
          <section style={{ textAlign: "center", maxWidth: 600, margin: "0 auto 80px", padding: "40px 0" }}>
            <h2 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 28, fontWeight: 300, color: C.paper,
              marginBottom: 16, letterSpacing: "0.04em",
            }}>
              The Credit System
            </h2>
            <div style={{ width: 40, height: 1, background: `${C.orange}40`, margin: "0 auto 24px" }} />
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 14, color: `${C.muted}90`, lineHeight: 1.8,
            }}>
              Credits are the currency of connection. Each tier unlocks a different allocation — 
              use them to access events, reserve spaces, and shape your CX experience.
              Your credits reflect your commitment to the constellation.
            </p>
          </section>
        </Reveal>

        {/* ─── Tier Cards ─── */}
        <section style={{
          display: "flex", gap: 24, justifyContent: "center",
          flexWrap: "wrap", padding: "0 0 100px",
        }}>
          {TIERS.map((tier, i) => (
            <TierCard key={tier.name} tier={tier} index={i} />
          ))}
        </section>

        {/* ─── Sacred Geometry tie-in ─── */}
        <Reveal>
          <section style={{ textAlign: "center", padding: "60px 0 120px", maxWidth: 500, margin: "0 auto" }}>
            <div style={{ fontSize: 32, color: `${C.orange}30`, marginBottom: 24 }}>∞</div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18, fontWeight: 300, fontStyle: "italic",
              color: `${C.muted}50`, lineHeight: 1.7,
            }}>
              Network → Brand → Individual → Connector
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 12, color: `${C.muted}30`, marginTop: 16,
              letterSpacing: "0.08em",
            }}>
              Every member is a star. Together, we form the constellation.
            </p>
          </section>
        </Reveal>

      </div>
    </div>
  );
}
