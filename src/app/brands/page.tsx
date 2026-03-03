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
   CX BRANDS PAGE
   ═══════════════════════════════════════════════════ */
export default function BrandsPage() {
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
        ::selection { background:${C.orange}40; color:${C.paper}; }
        body::before {
          content:''; position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,-60px) scale(1.1)} 66%{transform:translate(-40px,40px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-60px,80px) scale(0.9)} 66%{transform:translate(60px,-30px) scale(1.15)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,60px) scale(1.05)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes heroGlow { 0%,100%{text-shadow:0 0 80px ${C.orange}10} 50%{text-shadow:0 0 140px ${C.orange}20} }
        @keyframes lineGrow { from{width:0} to{width:160px} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes breathe { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.25;transform:scale(1.02)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .glass-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .glass-card:hover { transform: translateY(-6px); }
        .step-card { transition: all 0.3s ease; }
        .step-card:hover { background: ${C.orange}12 !important; border-color: ${C.orange}40 !important; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.orange}, ${C.pink}, ${C.purple})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}08 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Floating gradient orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}12, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "0%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "0%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}0a, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
        </div>

        {/* Subtle rotating ring */}
        <div style={{ position: "absolute", width: 600, height: 600, animation: "rotateSlow 120s linear infinite", opacity: 0.04 }}>
          <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }}>
            <circle cx="300" cy="300" r="280" fill="none" stroke={C.paper} strokeWidth="0.5" strokeDasharray="8 12" />
          </svg>
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 1000, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.orange}90`, marginBottom: 32 }}>Aligned Partnerships</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX Brands
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.orange}50, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}60`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto 40px" }}>
            Aligned partnerships, not sponsorships
          </p>
          <p style={{ fontSize: 16, color: `${C.paper}70`, lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
            CX doesn&apos;t do sponsorships. We do alignment. When a brand partners with CX, they don&apos;t buy a logo placement — they become part of a living cultural ecosystem. The right brands don&apos;t advertise to our community. They join it.
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
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.orange}80`, marginBottom: 20 }}>Why We&apos;re Different</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            This isn&apos;t B2B.<br />This is culture-to-culture.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 40 }}>
            CX is a private network — brands can&apos;t buy their way in. Partnership is about cultural alignment, not budget size. Brands at CX become part of the experience, not interruptions to it.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 48 }}>
            We work with brands that understand that the most valuable thing they can do is show up authentically — not with a banner, but with a point of view. Not with a campaign, but with a commitment.
          </p>
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={300}>
          <div style={{ position: "relative", padding: "48px 56px", background: `linear-gradient(135deg, ${C.orange}0a 0%, ${C.bg} 50%, ${C.orange}06 100%)`, border: `1px solid ${C.orange}25`, borderRadius: 16, marginBottom: 40, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.orange}40, transparent)` }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}15, transparent)`, filter: "blur(60px)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: `${C.paper}cc`, lineHeight: 1.25, position: "relative", zIndex: 1 }}>
              &ldquo;We don&apos;t want your logo.<br />We want your{" "}
              <span style={{ fontWeight: 600, background: `linear-gradient(90deg, ${C.paper}, ${C.orange}, ${C.paper}, ${C.orange})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 6s linear infinite" }}>story</span>.&rdquo;
            </p>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "40px 0 0" }} />
      </section>


      {/* ═══════════ THE THREE LEVELS ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.orange}80`, marginBottom: 20 }}>The Three Levels</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            From a seat at the table<br />to co-authoring culture
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            Every brand partnership at CX has a different shape. But they all start from the same place: alignment.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {/* Level 1: Brand Member */}
          <Reveal delay={150}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.orange}25`, borderRadius: 16, background: `linear-gradient(180deg, ${C.orange}08 0%, transparent 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.orange}40, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.orange}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.orange, fontFamily: "'Cormorant Garamond', serif" }}>1</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Brand Member</h3>
                  <p style={{ fontSize: 11, color: `${C.orange}90`, letterSpacing: "0.1em" }}>Monthly</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.orange, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;A seat at the table&rdquo;</p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What it is</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Monthly access to CX programming and community. A soft entry point for brands that want to be in the room before they&apos;re on the stage.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What you get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Event credits, member access, community integration, soft presence at events.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Best for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                Emerging brands, startups with cultural DNA, local businesses that get it. Think: a craft spirits brand that wants its bottles on the right tables. A fashion label that wants to dress the right people.
              </p>
            </div>
          </Reveal>

          {/* Level 2: Brand Patron */}
          <Reveal delay={300}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.orange}30`, borderRadius: 16, background: `linear-gradient(180deg, ${C.orange}0c 0%, transparent 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.orange}60, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.orange}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.orange, fontFamily: "'Cormorant Garamond', serif" }}>2</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Brand Patron</h3>
                  <p style={{ fontSize: 11, color: `${C.orange}90`, letterSpacing: "0.1em" }}>Annual</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.orange, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;Part of the story&rdquo;</p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What it is</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                An annual commitment with deeper integration. Your brand becomes woven into the CX narrative — not as a sponsor, but as a character.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What you get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Event credits, placement opportunities, co-branded content, featured in CX communications, priority for special events.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Best for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                Established brands seeking authentic cultural credibility. Think: a hotel group that wants to host CX members. A tech company that wants to sponsor a salon series.
              </p>
            </div>
          </Reveal>

          {/* Level 3: Partner (LTB) */}
          <Reveal delay={450}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.orange}40`, borderRadius: 16, background: `linear-gradient(180deg, ${C.orange}10 0%, ${C.orange}04 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.orange}80, transparent)` }} />
              <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}10, transparent)`, filter: "blur(40px)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.orange}80`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.orange, fontFamily: "'Cormorant Garamond', serif" }}>3</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Partner</h3>
                  <p style={{ fontSize: 11, color: `${C.orange}90`, letterSpacing: "0.1em" }}>LTB — Long-Term Brand</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.orange, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;Co-authors of culture&rdquo;</p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What it is</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Deep, long-term creative partnership. This isn&apos;t a sponsorship tier — it&apos;s a co-creation agreement. Your brand and CX build together.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What you get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Co-produced events, sponsor integration across programming, co-branding, revenue share opportunities, early access to CX expansion.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Best for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                Major brands ready to invest in culture, not just marketing. Think: a luxury automotive brand co-producing a CX Chelsea opening night. A media company co-creating a content series.
              </p>
            </div>
          </Reveal>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ WHAT THIS IS NOT ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.orange}80`, marginBottom: 20 }}>What This Is Not</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            Let&apos;s be clear
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 64 }}>
          <Reveal delay={150}>
            <div>
              <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: `${C.muted}60`, marginBottom: 24 }}>CX Brand Partnership Is Not</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["A logo wall at an event", "An influencer deal with metrics", "A one-night sponsorship", "Transactional", "Impressions-based"].map((item, i) => (
                  <p key={i} style={{ fontSize: 15, color: `${C.paper}40`, lineHeight: 1.6, paddingLeft: 20, borderLeft: `2px solid ${C.muted}20` }}>{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div>
              <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: C.orange, marginBottom: 24 }}>CX Brand Partnership Is</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Cultural alignment", "Authentic integration", "Long-term relationship", "Experience-driven", "Impact-based"].map((item, i) => (
                  <p key={i} style={{ fontSize: 15, color: `${C.paper}cc`, lineHeight: 1.6, paddingLeft: 20, borderLeft: `2px solid ${C.orange}60` }}>{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Quote */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
          <Reveal delay={350}>
            <div style={{ padding: "32px 24px", border: `1px solid ${C.orange}20`, borderRadius: 12, background: `${C.orange}06`, textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}90`, lineHeight: 1.5 }}>
                &ldquo;If you&apos;re looking for impressions, you&apos;re in the wrong room.<br />If you&apos;re looking for impact, let&apos;s talk.&rdquo;
              </p>
            </div>
          </Reveal>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ THE PARTNERSHIP JOURNEY ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.orange}80`, marginBottom: 20 }}>How It Works</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            The partnership<br />journey
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            There&apos;s no media kit. No rate card. This is how real partnerships begin.
          </p>
        </Reveal>

        {/* Steps */}
        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 15, top: 20, bottom: 20, width: 1, background: `linear-gradient(to bottom, ${C.orange}50, ${C.orange}10)` }} />

          {[
            { step: "01", title: "Alignment check", desc: "Do we share values? Does your brand belong in the room? This isn\u2019t about budget \u2014 it\u2019s about fit." },
            { step: "02", title: "Conversation", desc: "Not a pitch deck. A real conversation about what we could create together. We listen more than we talk." },
            { step: "03", title: "Integration design", desc: "We design how your brand lives within CX. Not bolted on \u2014 woven in. Every partnership looks different." },
            { step: "04", title: "Activation", desc: "Your first CX moment. The room meets your brand \u2014 not through a logo, but through an experience." },
            { step: "05", title: "Evolution", desc: "The partnership grows as CX grows. New spaces, new cities, new chapters \u2014 and you\u2019re part of all of it." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="step-card" style={{ position: "relative", marginBottom: i < 4 ? 32 : 0, paddingLeft: 32, padding: "20px 20px 20px 48px", border: `1px solid ${C.orange}15`, borderRadius: 12, background: `${C.orange}05`, cursor: "default" }}>
                <div style={{ position: "absolute", left: -40, top: 20, width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${C.orange}50`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.orange, fontWeight: 600, zIndex: 1 }}>{item.step}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.paper, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}80`, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ BRAND UNIVERSE ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.orange}80`, marginBottom: 20 }}>The CX Brand Universe</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            What kinds of<br />brands fit
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { icon: "◆", label: "Hospitality brands that understand experience" },
            { icon: "✦", label: "Fashion houses that value curation over mass market" },
            { icon: "◎", label: "Spirits and wine brands with a story to tell" },
            { icon: "⚡", label: "Technology companies building for creators" },
            { icon: "✧", label: "Media brands that want to be where culture happens" },
            { icon: "∞", label: "Wellness and lifestyle brands that get intimacy over scale" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "28px 24px", border: `1px solid ${C.orange}15`, borderRadius: 12, background: `${C.orange}04`, textAlign: "center" }}>
                <p style={{ fontSize: 24, color: C.orange, marginBottom: 12 }}>{item.icon}</p>
                <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.6 }}>{item.label}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding: "80px 8% 160px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ position: "relative", padding: "80px 40px", overflow: "hidden" }}>
            {/* Background orbs */}
            <div style={{ position: "absolute", top: -100, left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}10, transparent)`, filter: "blur(80px)" }} />
            <div style={{ position: "absolute", bottom: -100, right: "20%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}08, transparent)`, filter: "blur(60px)" }} />

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.3, position: "relative", zIndex: 1, marginBottom: 48 }}>
              &ldquo;The brands that last<br />aren&apos;t the loudest.<br />
              <span style={{ fontWeight: 600, fontStyle: "normal", color: C.paper }}>They&apos;re the most meaningful.</span>&rdquo;
            </p>

            <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${C.orange}40, transparent)`, margin: "0 auto 48px" }} />

            <Reveal delay={200}>
              <p style={{ fontSize: 18, color: `${C.paper}90`, marginBottom: 32, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                If your brand has a story worth telling, we should talk.
              </p>
              <a href="mailto:brands@cx.club" style={{ display: "inline-block", padding: "14px 40px", border: `1px solid ${C.orange}50`, borderRadius: 40, color: C.paper, fontSize: 14, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.3s", background: `${C.orange}10` }}>
                brands@cx.club
              </a>
            </Reveal>

            <Reveal delay={400}>
              <div style={{ marginTop: 48 }}>
                <Link href="/source" style={{ fontSize: 13, color: `${C.muted}80`, textDecoration: "none", borderBottom: `1px solid ${C.muted}30`, transition: "color 0.3s" }}>
                  ← Back to Source of Truth
                </Link>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* Star dust footer decoration */}
      <div style={{ position: "relative", height: 120, overflow: "hidden" }}>
        <svg viewBox="0 0 960 120" style={{ width: "100%", height: "100%", opacity: 0.3 }}>
          {[[80,20],[160,60],[240,30],[320,80],[400,15],[480,55],[560,25],[640,70],[720,35],[800,65],[880,45],[120,90],[200,50],[360,45],[520,85],[680,40],[760,95],[840,20]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.6} fill={C.orange} opacity={0.3 + (i % 4) * 0.1}>
              {i % 5 === 0 && <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}
