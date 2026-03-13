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

/* ─── ConstellationBg ─── */
function ConstellationBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    let raf: number;
    const stars: { x: number; y: number; vx: number; vy: number; r: number; a: number }[] = [];
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 80; i++) {
      stars.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, vx: (Math.random() - 0.5) * 0.15, vy: (Math.random() - 0.5) * 0.15, r: Math.random() * 1.2 + 0.3, a: Math.random() * 0.4 + 0.1 });
    }
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of stars) {
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = canvas.width; if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(242,242,242,${s.a})`; ctx.fill();
      }
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < 120) {
            ctx.beginPath(); ctx.moveTo(stars[i].x, stars[i].y); ctx.lineTo(stars[j].x, stars[j].y);
            ctx.strokeStyle = `rgba(242,242,242,${0.03 * (1 - d / 120)})`; ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={canvasRef} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }} />;
}

/* ─── CreditOrb (Vercel-style with SVG ring) ─── */
function CreditOrb({ credits, color, size = 140 }: { credits: number; color: string; size?: number }) {
  const maxCredits = 44;
  const filled = Math.min(credits / maxCredits, 1);
  const r = size / 2 - 6;
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

/* ─── FAQ Item ─── */
function FAQItem({ q, a, color }: { q: string; a: string; color: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: `1px solid ${C.paper}10` }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: "100%", background: "none", border: "none", cursor: "pointer", padding: "22px 0",
          display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16,
          color: open ? color : `${C.paper}cc`, transition: "color 0.3s",
        }}
      >
        <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 400, textAlign: "left", lineHeight: 1.4 }}>{q}</span>
        <span style={{ fontSize: 22, fontWeight: 200, flexShrink: 0, transform: open ? "rotate(45deg)" : "rotate(0deg)", transition: "transform 0.35s cubic-bezier(0.23,1,0.32,1)", color: open ? color : `${C.paper}60` }}>+</span>
      </button>
      <div style={{ maxHeight: open ? 300 : 0, overflow: "hidden", transition: "max-height 0.5s cubic-bezier(0.23,1,0.32,1), opacity 0.4s", opacity: open ? 1 : 0 }}>
        <p style={{ fontSize: 15, color: `${C.paper}80`, lineHeight: 1.75, paddingBottom: 22, paddingRight: 40 }}>{a}</p>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   MEMBERSHIP PAGE
   ═══════════════════════════════════════════════════ */
export default function MembershipPage() {
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

  const tiers = [
    {
      name: "Member",
      credits: 22,
      price: "$100",
      period: "/month",
      color: C.blue,
      purchaseUrl: "https://mesh.tickets/scene/scn_3s9ay17hziqtxcwn02d9l/membership?cadence=monthly",
      tagline: "You want access but not commitment.",
      ideal: "Weekly CX Tribeca access and early booking access to TELL NO ONE",
      includes: [
        "22 credits monthly",
        "Book CX-Curated and Partner Events",
        "Add friends with +1 Credits",
        "Add credits with +$Discount Credits",
        "Recommend friends for +$Reward Credits",
        "Early access to General Admission CX Chelsea / TELL NO ONE (inc. Anderson.Paak on April 24)",
      ],
      also: [
        "Credits roll over month to month with renewal",
        "Cleo Concierge Special Access",
      ],
      value: "Up to $660–$792 in equivalent ticket value",
    },
    {
      name: "Patron",
      credits: 44,
      price: "$750",
      period: "/year",
      color: C.purple,
      purchaseUrl: "https://mesh.tickets/scene/scn_3s9ay17hziqtxcwn02d9l/membership?cadence=yearly",
      tagline: "You want depth and flexibility.",
      ideal: "Weekly CX Tribeca access, more +1 options, premium ticket access to TELL NO ONE",
      includes: [
        "44 credits monthly",
        "Book CX-Curated and Partner Events",
        "Add friends with +1 Credits",
        "Add credits with +$Discount Credits",
        "Recommend friends for +$Reward Credits",
        "Early access + Premium tickets to CX Chelsea / TELL NO ONE (inc. Anderson.Paak on April 24)",
      ],
      also: [
        "Credits roll over month to month AND year to year with renewal",
        "Cleo Concierge Special Access",
        "Single Print CX Collectible",
      ],
      value: "Up to $1,300–$1,500 in equivalent ticket value",
      popular: true,
    },
    {
      name: "Lifetime",
      credits: 44,
      price: "$2,500",
      period: " one-time",
      color: C.gold,
      purchaseUrl: "https://mesh.tickets/scene/scn_3s9ay17hziqtxcwn02d9l/membership?cadence=lifetime",
      tagline: "You are so into it you want equity.",
      ideal: "Inner circle access",
      includes: [
        "44 credits monthly",
        "Book CX-Curated and Partner Events",
        "Add friends with +1 Credits",
        "Add credits with +$Discount Credits",
        "Invite friends for +$Reward Credits",
        "Early access + Premium tickets to CX Chelsea / TELL NO ONE (inc. Anderson.Paak on April 24)",
      ],
      also: [
        "Credits roll over month to month / year to year / xLifetime",
        "Cleo Concierge Special Access",
        "Single Print CX Collectible",
        "Equity in CX",
        "Insider info / access to founders / whiteglove service",
      ],
      value: "Year over year value of $1,300–$1,500",
    },
  ];

  const faqs: { q: string; a: string }[] = [
    { q: "Where can I use my membership credits?", a: "CX-hosted events and select partner events worldwide, including Tribeca, Chelsea, Rockefeller Center, and future locations like Los Angeles." },
    { q: "How do I book an event?", a: "Log into your profile, browse the curated event calendar, and use credits to RSVP." },
    { q: "Can I bring friends?", a: "Yes! Use additional credits to add friends to your reservation. You must physically be present. You can also invite friends to apply for membership and earn reward credits." },
    { q: "What if I run out of credits?", a: "Add more anytime. +5 credits for $20 or +10 credits for $15 — the more you add, the better the deal." },
    { q: "What if I don't use all my credits?", a: "Credits roll over month to month. Annual members roll credits into the next year if renewed. Credits never expire while your membership is active." },
    { q: "What happens if I cancel?", a: "Monthly members can cancel anytime. Annual members can turn off auto-renew. Your credits remain available through the end of your active period." },
    { q: "What's the cancellation policy for booked events?", a: "Cancel 48+ hours before the event and your credits are returned. Within 48 hours, credits are forfeited." },
    { q: "What if I miss a reservation?", a: "Credits for missed reservations are forfeited." },
    { q: "Can I upgrade my membership?", a: "Yes, anytime. You'll receive additional credits based on your new plan." },
    { q: "Do credits expire?", a: "No, as long as your membership is active." },
    { q: "Can I use credits for premium tickets?", a: "Only Patron and Lifetime members have access to premium ticket tiers. Members can purchase premium tickets on the event website." },
    { q: "How many credits do events cost?", a: "Most events range from 1-6 credits. Weekly CX Tribeca: 1-2 credits. Talks, salons, performances: 2-4 credits. Premium events like TELL NO ONE: 4-6 credits." },
    { q: "What if an event sells out?", a: "We reserve a member-only allocation for most events. Members get priority booking before the general public." },
    { q: "Do I need a membership to attend?", a: "No — many CX events have general admission. Membership gives you early access, credit-based pricing, and exclusive allocations." },
    { q: "How many events per month?", a: "30-50 curated events across CX venues and partner locations." },
    { q: "Are there members-only events?", a: "Yes — select gatherings, salons, and cultural experiences are reserved exclusively for members." },
    { q: 'What does "equity" mean for Lifetime members?', a: "Lifetime members participate in a member ownership pool connected to CX's long-term growth. Details are shared privately with Lifetime members." },
    { q: "How many guests can I bring?", a: "You can reserve multiple seats using credits, subject to capacity. Some events may limit guest reservations." },
    { q: "Can I pause my membership?", a: "No. Memberships remain active until cancelled." },
    { q: "What makes CX different?", a: 'CX is not just an events platform. It is a curated cultural network. "We combine space with people to invite infinite possibilities for connection."' },
  ];

  const exampleWeeks = [
    { week: "Week 1", event: "CX Tribeca Wednesday", credits: 1 },
    { week: "Week 2", event: "CX Tribeca Wednesday + Saturday", credits: 4 },
    { week: "Week 3", event: "CX Tribeca Saturday +2 Friends", credits: 4 },
    { week: "Week 4", event: "CX Chelsea TELL NO ONE w/ Anderson.Paak", credits: 6 },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
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
        @keyframes orbFloat { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .tier-card { transition: all 0.5s cubic-bezier(0.23,1,0.32,1); }
        .tier-card:hover { transform: translateY(-8px) scale(1.01); }
        @media (max-width: 900px) {
          .tier-grid { grid-template-columns: 1fr !important; }
          .snapshot-grid { grid-template-columns: 1fr !important; }
          .benefits-grid { grid-template-columns: 1fr !important; }
          .how-grid { grid-template-columns: 1fr !important; }
          .where-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <ConstellationBg />

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.pink}, ${C.purple}, ${C.blue})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}06 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}0e, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "0%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.gold}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "0%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}0a, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
        </div>

        <div style={{ position: "absolute", width: 500, height: 500, animation: "rotateSlow 120s linear infinite", opacity: 0.04 }}>
          <svg viewBox="0 0 500 500" style={{ width: "100%", height: "100%" }}>
            <circle cx="250" cy="250" r="230" fill="none" stroke={C.paper} strokeWidth="0.5" strokeDasharray="8 12" />
            <circle cx="250" cy="250" r="180" fill="none" stroke={C.gold} strokeWidth="0.3" strokeDasharray="4 16" />
          </svg>
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 900, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 32 }}>Your Cultural Passport</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(48px, 8vw, 110px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX Membership
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}50, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 24px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}60`, lineHeight: 1.6, maxWidth: 620, margin: "0 auto 20px" }}>
            A culture-credit model designed to invite choice into infinite connections.
          </p>
          <p style={{ fontSize: 15, color: `${C.paper}45`, lineHeight: 1.7, maxWidth: 520, margin: "0 auto" }}>
            Think of it like a cultural passport — your credits act as tickets to meaningful connection.
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 48, zIndex: 2, textAlign: "center", animation: "pulse 3s ease-in-out infinite" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}60` }}>Explore tiers</p>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.muted}40, transparent)`, margin: "10px auto 0" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to top, ${C.bg}, transparent)` }} />
      </section>

      {/* ═══════════ TIER CARDS ═══════════ */}
      <section style={{ padding: "100px 6% 120px", maxWidth: 1400, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20, textAlign: "center" }}>Choose Your Path</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 64px)", fontWeight: 300, lineHeight: 1.1, color: C.paper, marginBottom: 64, textAlign: "center" }}>
            Three Tiers of Connection
          </h2>
        </Reveal>

        <div className="tier-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, alignItems: "start" }}>
          {tiers.map((tier, i) => (
            <Reveal key={tier.name} delay={i * 200}>
              <div className="tier-card" style={{
                position: "relative",
                background: tier.popular ? `${tier.color}08` : `${C.paper}04`,
                border: `1px solid ${tier.popular ? `${tier.color}40` : `${C.paper}10`}`,
                borderRadius: 16,
                padding: "48px 36px 40px",
                overflow: "hidden",
                cursor: "default",
                textAlign: "center",
              }}>
                {/* top glow line */}
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${tier.color}40, transparent)` }} />

                {/* hover glow */}
                <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 200, height: 120, borderRadius: "50%", background: `radial-gradient(ellipse, ${tier.color}15, transparent 70%)`, pointerEvents: "none" }} />

                {tier.popular && (
                  <div style={{ position: "absolute", top: 14, right: 14, fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", color: C.bg, background: tier.color, padding: "4px 12px", borderRadius: 20, fontWeight: 600 }}>
                    Most Popular
                  </div>
                )}

                {/* symbol */}
                <div style={{ fontSize: 20, color: tier.color, letterSpacing: "0.3em", marginBottom: 24, opacity: 0.7 }}>
                  {tier.name === "Member" ? "✦" : tier.name === "Patron" ? "✦✦" : "✦✦✦"}
                </div>

                {/* credit orb */}
                <CreditOrb credits={tier.credits} color={tier.color} />

                {/* name */}
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, fontWeight: 300, color: C.paper, letterSpacing: "0.08em", margin: "28px 0 8px" }}>
                  {tier.name}
                </h3>

                {/* price */}
                <div style={{ marginBottom: 12 }}>
                  <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 40, fontWeight: 600, color: tier.color }}>{tier.price}</span>
                  <span style={{ fontSize: 14, color: `${C.paper}60` }}>{tier.period}</span>
                </div>

                {/* tagline */}
                <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 12, color: `${tier.color}80`, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 24px" }}>
                  {tier.tagline}
                </p>

                {/* divider */}
                <div style={{ width: 40, height: 1, background: `${tier.color}30`, margin: "0 auto 24px" }} />

                {/* ideal for */}
                <p style={{ fontSize: 13, color: `${C.paper}60`, marginBottom: 20, lineHeight: 1.6, fontStyle: "italic" }}>
                  Ideal for: {tier.ideal}
                </p>

                {/* includes */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 20px", textAlign: "left" }}>
                  {tier.includes.map((item, j) => (
                    <li key={j} style={{ fontSize: 13, color: `${C.paper}90`, padding: "8px 0", borderBottom: j < tier.includes.length - 1 ? `1px solid ${C.paper}08` : "none", display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: tier.color, fontSize: 8, opacity: 0.6, marginTop: 5, flexShrink: 0 }}>●</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* also section */}
                <p style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: `${tier.color}80`, marginBottom: 10, textAlign: "left" }}>Also includes</p>
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 24px", textAlign: "left" }}>
                  {tier.also.map((item, j) => (
                    <li key={j} style={{ fontSize: 12, color: `${C.paper}70`, padding: "6px 0", display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <span style={{ color: `${tier.color}60`, fontSize: 7, marginTop: 5, flexShrink: 0 }}>◆</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* value estimate */}
                <div style={{ padding: "14px 16px", background: `${tier.color}08`, borderRadius: 12, border: `1px solid ${tier.color}12`, marginBottom: 24 }}>
                  <p style={{ fontSize: 10, color: `${C.paper}50`, marginBottom: 4, letterSpacing: "0.1em", textTransform: "uppercase" }}>Estimated Value</p>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: tier.color, fontWeight: 500 }}>{tier.value}</p>
                </div>

                {/* purchase button */}
                <a
                  href={tier.purchaseUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center", padding: "14px 24px",
                    background: `linear-gradient(135deg, ${tier.color}, ${tier.color}cc)`,
                    color: C.bg, fontFamily: "'Inter', sans-serif", fontSize: 13,
                    fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase",
                    textDecoration: "none", borderRadius: 10,
                    transition: "all 0.3s cubic-bezier(0.23,1,0.32,1)",
                    boxShadow: `0 4px 20px ${tier.color}30`,
                  }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 8px 30px ${tier.color}50`; }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 4px 20px ${tier.color}30`; }}
                >
                  Purchase Membership
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ HOW IT WORKS ═══════════ */}
      <section style={{ padding: "80px 8% 120px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>How It Works</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 300, lineHeight: 1.1, color: C.paper, marginBottom: 64 }}>
            Credits as Cultural Currency
          </h2>
        </Reveal>

        <div className="how-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "✦", title: "Book Events", desc: "Use credits to RSVP to CX-curated events and partner experiences." },
            { icon: "◎", title: "Premium Access", desc: "Spend more credits for VIP and premium ticket tiers." },
            { icon: "⊕", title: "Bring Friends", desc: "Add friends to your reservation using additional credits." },
            { icon: "↻", title: "Top Up Anytime", desc: "+5 credits for $20, or +10 for $15. Add more whenever you need." },
            { icon: "◈", title: "Track Everything", desc: "View upcoming events, credit balance, booking history in your dashboard." },
            { icon: "★", title: "Purchase Upgrades", desc: "Use credits to purchase upgrades & private experiences within our events." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ padding: "32px 24px", background: `${C.paper}04`, border: `1px solid ${C.paper}08`, borderRadius: 14, transition: "border-color 0.3s, background 0.3s" }}>
                <div style={{ fontSize: 22, color: C.purple, marginBottom: 16 }}>{item.icon}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontWeight: 500, color: C.paper, marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}70`, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ WHERE TO USE ═══════════ */}
      <section style={{ padding: "80px 8% 120px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>Where You Can Use Credits</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.1, color: C.paper, marginBottom: 48 }}>
            Your Cultural Map
          </h2>
        </Reveal>

        <div className="where-grid" style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {[
            { label: "CX Tribeca", sub: "Members homebase", color: C.orange },
            { label: "Pop-Up Events", sub: "Larger-scale events throughout NYC", color: C.pink },
            { label: "Partner Experiences", sub: "Curated calendar across all active locations", color: C.blue },
            { label: "Expanding Soon", sub: "Far beyond NYC — stay tuned", color: C.cyan },
          ].map((loc, i) => (
            <Reveal key={i} delay={i * 100}>
              <div style={{ padding: "28px 24px", background: `${loc.color}08`, border: `1px solid ${loc.color}18`, borderRadius: 14, display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: loc.color, flexShrink: 0, boxShadow: `0 0 12px ${loc.color}60` }} />
                <div>
                  <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, color: C.paper, fontWeight: 500 }}>{loc.label}</p>
                  <p style={{ fontSize: 13, color: `${C.paper}60` }}>{loc.sub}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ CORE BENEFITS ═══════════ */}
      <section style={{ padding: "80px 8% 120px", maxWidth: 1200, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20, textAlign: "center" }}>Why Join</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.1, color: C.paper, marginBottom: 56, textAlign: "center" }}>
            Core Membership Benefits
          </h2>
        </Reveal>

        <div className="benefits-grid" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 32 }}>
          {[
            { num: "01", title: "Access", desc: "Book tickets to CX and partner events worldwide.", color: C.orange },
            { num: "02", title: "Priority", desc: "Early access to tentpole events before the general public.", color: C.purple },
            { num: "03", title: "Flexibility", desc: "Credits roll over and can be added anytime.", color: C.cyan },
          ].map((b, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ textAlign: "center", padding: "40px 24px" }}>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 48, fontWeight: 300, color: `${b.color}30`, display: "block", marginBottom: 12 }}>{b.num}</span>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper, marginBottom: 12 }}>{b.title}</h4>
                <p style={{ fontSize: 15, color: `${C.paper}70`, lineHeight: 1.7 }}>{b.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ═══════════ EXAMPLE MONTH ═══════════ */}
      <section style={{ padding: "80px 8% 120px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>Example Month</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, lineHeight: 1.1, color: C.paper, marginBottom: 12 }}>
            A Month as a Member
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 14, color: `${C.paper}50`, marginBottom: 40 }}>22 credits, endless possibilities.</p>
        </Reveal>

        <div style={{ background: `${C.paper}04`, border: `1px solid ${C.paper}10`, borderRadius: 16, overflow: "hidden" }}>
          {exampleWeeks.map((w, i) => (
            <Reveal key={i} delay={160 + i * 80}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px", borderBottom: i < exampleWeeks.length - 1 ? `1px solid ${C.paper}08` : "none" }}>
                <div>
                  <span style={{ fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: `${C.blue}cc`, marginRight: 12 }}>{w.week}</span>
                  <span style={{ fontSize: 14, color: `${C.paper}90` }}>{w.event}</span>
                </div>
                <span style={{ fontSize: 14, color: C.blue, fontWeight: 500, whiteSpace: "nowrap" }}>{w.credits} {w.credits === 1 ? "credit" : "credits"}</span>
              </div>
            </Reveal>
          ))}
          <Reveal delay={500}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "18px 28px", borderTop: `1px solid ${C.blue}30`, background: `${C.blue}08` }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: `${C.paper}cc`, letterSpacing: "0.05em" }}>Total Used</span>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.blue, fontWeight: 600 }}>14 of 22 credits</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══════════ CREDIT COSTS ═══════════ */}
      <section style={{ padding: "80px 8% 100px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>Credit Guide</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 300, lineHeight: 1.1, color: C.paper, marginBottom: 40 }}>
            How Many Credits Do Events Cost?
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, marginBottom: 48 }}>
          {[
            { label: "Weekly CX Tribeca", range: "1–2 credits", color: C.blue },
            { label: "Talks, Salons, Artist Showcases", range: "1–4 credits", color: C.purple },
            { label: "Premium Events (i.e. Tell No One)", range: "5–9 credits", color: C.pink },
            { label: "Other Partner Events", range: "1 credit", color: C.orange },
          ].map((c, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "20px 24px", background: `${c.color}08`, border: `1px solid ${c.color}15`, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 14, color: `${C.paper}90` }}>{c.label}</span>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, color: c.color, fontWeight: 500 }}>{c.range}</span>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Add-ons */}
        <Reveal delay={400}>
          <div style={{ padding: "32px", background: `linear-gradient(135deg, ${C.orange}0a, ${C.bg}, ${C.gold}08)`, border: `1px solid ${C.orange}20`, borderRadius: 16, textAlign: "center" }}>
            <p style={{ fontSize: 10, letterSpacing: "0.25em", textTransform: "uppercase", color: `${C.orange}cc`, marginBottom: 16 }}>Credit Add-Ons</p>
            <div style={{ display: "flex", justifyContent: "center", gap: 40, flexWrap: "wrap" }}>
              <div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: C.paper, fontWeight: 500 }}>+5</span>
                <span style={{ fontSize: 14, color: `${C.paper}60`, marginLeft: 4 }}>credits</span>
                <p style={{ fontSize: 20, color: C.orange, fontWeight: 500, marginTop: 4 }}>$20</p>
              </div>
              <div style={{ width: 1, background: `${C.paper}15` }} />
              <div>
                <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 32, color: C.paper, fontWeight: 500 }}>+10</span>
                <span style={{ fontSize: 14, color: `${C.paper}60`, marginLeft: 4 }}>credits</span>
                <p style={{ fontSize: 20, color: C.orange, fontWeight: 500, marginTop: 4 }}>$15</p>
                <span style={{ fontSize: 10, color: C.gold, letterSpacing: "0.1em", textTransform: "uppercase" }}>Better deal</span>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section style={{ padding: "80px 8% 120px", maxWidth: 900, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>Questions</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, lineHeight: 1.1, color: C.paper, marginBottom: 48 }}>
            Frequently Asked
          </h2>
        </Reveal>

        <Reveal delay={140}>
          <div style={{ borderTop: `1px solid ${C.paper}10` }}>
            {faqs.map((faq, i) => (
              <FAQItem key={i} q={faq.q} a={faq.a} color={[C.orange, C.purple, C.blue, C.pink, C.cyan, C.gold][i % 6]} />
            ))}
          </div>
        </Reveal>
      </section>

      {/* ═══════════ CLOSING ═══════════ */}
      <section style={{ padding: "100px 8% 160px", maxWidth: 900, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ position: "relative", padding: "64px 48px", background: `linear-gradient(135deg, ${C.purple}0a, ${C.bg}, ${C.gold}06)`, border: `1px solid ${C.paper}10`, borderRadius: 20, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -60, left: "50%", transform: "translateX(-50%)", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}10, transparent)`, filter: "blur(80px)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}40, transparent)`, margin: "0 auto 32px" }} />
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.6, maxWidth: 640, margin: "0 auto" }}>
                &ldquo;CX isn&apos;t just an events platform. It is a curated cultural network where artists, thinkers, founders, and cultural leaders gather for conversations, performances, and experiences designed to spark meaningful connection.&rdquo;
              </p>
              <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${C.gold}40, transparent)`, margin: "32px auto 0" }} />
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
