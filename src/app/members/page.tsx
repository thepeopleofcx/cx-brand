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
   CX MEMBERS PAGE
   ═══════════════════════════════════════════════════ */
export default function MembersPage() {
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
        ::selection { background:${C.pink}40; color:${C.paper}; }
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
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .glass-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .glass-card:hover { transform: translateY(-6px); }
        .step-card { transition: all 0.3s ease; }
        .step-card:hover { background: ${C.pink}12 !important; border-color: ${C.pink}40 !important; }
        .feature-card { transition: all 0.3s ease; }
        .feature-card:hover { background: ${C.pink}10 !important; border-color: ${C.pink}30 !important; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.pink}, ${C.purple}, ${C.orange})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}08 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Floating gradient orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}12, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "0%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "0%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}0a, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
        </div>

        {/* Subtle rotating ring */}
        <div style={{ position: "absolute", width: 600, height: 600, animation: "rotateSlow 120s linear infinite", opacity: 0.04 }}>
          <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }}>
            <circle cx="300" cy="300" r="280" fill="none" stroke={C.paper} strokeWidth="0.5" strokeDasharray="8 12" />
          </svg>
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 1000, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.pink}90`, marginBottom: 32 }}>Membership</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX Members
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.pink}50, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}60`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto 40px" }}>
            Your invitation to infinite connection
          </p>
          <p style={{ fontSize: 16, color: `${C.paper}70`, lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
            CX isn&apos;t a club. It&apos;s not a membership program. It&apos;s a private network of people who believe that the right room, with the right people, at the right time, can change everything. Membership is how you enter.
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
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.pink}80`, marginBottom: 20 }}>What Membership Means</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            This isn&apos;t about exclusivity.<br />It&apos;s about curation.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 40 }}>
            Every member changes the energy of the room. That&apos;s why we&apos;re intentional about who&apos;s in it. This isn&apos;t exclusivity for its own sake — it&apos;s about making sure every person who walks through the door adds something irreplaceable.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 48 }}>
            Membership means you&apos;re part of the infinite loop — Space and People, meeting through Connection. You&apos;re not a spectator. You&apos;re not a customer. You&apos;re a participant in something that gets richer every time someone new walks in.
          </p>
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={300}>
          <div style={{ position: "relative", padding: "48px 56px", background: `linear-gradient(135deg, ${C.pink}0a 0%, ${C.bg} 50%, ${C.pink}06 100%)`, border: `1px solid ${C.pink}25`, borderRadius: 16, marginBottom: 40, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.pink}40, transparent)` }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}15, transparent)`, filter: "blur(60px)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: `${C.paper}cc`, lineHeight: 1.25, position: "relative", zIndex: 1 }}>
              &ldquo;You&apos;re not buying access.<br />You&apos;re joining a{" "}
              <span style={{ fontWeight: 600, background: `linear-gradient(90deg, ${C.paper}, ${C.pink}, ${C.paper}, ${C.pink})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 6s linear infinite" }}>story</span>.&rdquo;
            </p>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "40px 0 0" }} />
      </section>


      {/* ═══════════ THE THREE LEVELS ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.pink}80`, marginBottom: 20 }}>The Three Levels</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            An ascending journey<br />of belonging
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            Every member finds their level. Each one deepens the relationship between you and the CX world.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {/* Level 1: Individual Member */}
          <Reveal delay={150}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.pink}25`, borderRadius: 16, background: `linear-gradient(180deg, ${C.pink}08 0%, transparent 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.pink}40, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.pink}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.pink, fontFamily: "'Cormorant Garamond', serif" }}>1</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Member</h3>
                  <p style={{ fontSize: 11, color: `${C.pink}90`, letterSpacing: "0.1em" }}>Monthly</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.pink, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;Step into the room&rdquo;</p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What you get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                XX event credits per month, access to CX Tribeca programming, Cleo (AI concierge) access, member directory, priority booking.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Best for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                Curious individuals, creatives, professionals who want to be in rooms where things happen.
              </p>

              <div style={{ marginTop: 24, padding: "16px 0 0", borderTop: `1px solid ${C.pink}15` }}>
                <p style={{ fontSize: 13, color: `${C.paper}60`, lineHeight: 1.7 }}>
                  The entry point. You&apos;ve heard about CX. You&apos;ve been invited. Now you&apos;re in.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Level 2: Individual Patron */}
          <Reveal delay={300}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.pink}30`, borderRadius: 16, background: `linear-gradient(180deg, ${C.pink}0c 0%, transparent 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.pink}60, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.pink}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.pink, fontFamily: "'Cormorant Garamond', serif" }}>2</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Patron</h3>
                  <p style={{ fontSize: 11, color: `${C.pink}90`, letterSpacing: "0.1em" }}>Annual</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.pink, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;Commit to the journey&rdquo;</p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What you get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                XX credits annually, access to all CX locations, priority for special events, patron-only programming, deeper Cleo integration, guest privileges.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Best for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                People who don&apos;t just want to attend — they want to belong. Regulars. The ones who make a room feel like home.
              </p>

              <div style={{ marginTop: 24, padding: "16px 0 0", borderTop: `1px solid ${C.pink}15` }}>
                <p style={{ fontSize: 13, color: `${C.paper}60`, lineHeight: 1.7 }}>
                  An annual commitment with expanded access. You&apos;re not visiting anymore — you&apos;re part of the fabric.
                </p>
              </div>
            </div>
          </Reveal>

          {/* Level 3: Individual Partner */}
          <Reveal delay={450}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.pink}40`, borderRadius: 16, background: `linear-gradient(180deg, ${C.pink}10 0%, ${C.pink}04 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.pink}80, transparent)` }} />
              <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}10, transparent)`, filter: "blur(40px)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.pink}80`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.pink, fontFamily: "'Cormorant Garamond', serif" }}>3</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Partner</h3>
                  <p style={{ fontSize: 11, color: `${C.pink}90`, letterSpacing: "0.1em" }}>LTI — Long-Term Individual</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.pink, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;Shape the future&rdquo;</p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What you get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                XX credits, Founders Table access, all-location access, private event hosting, early access to new CX ventures, direct line to CX leadership.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Best for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                People who see CX as more than a membership — as a movement. Builders. Believers. The ones who&apos;ll still be here in 10 years.
              </p>

              <div style={{ marginTop: 24, padding: "16px 0 0", borderTop: `1px solid ${C.pink}15` }}>
                <p style={{ fontSize: 13, color: `${C.paper}60`, lineHeight: 1.7 }}>
                  A deep, long-term relationship with CX. You&apos;re not just a member — you&apos;re shaping what comes next.
                </p>
              </div>
            </div>
          </Reveal>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ WHAT MEMBERSHIP INCLUDES ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.pink}80`, marginBottom: 20 }}>What&apos;s Included</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            The membership<br />experience
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { icon: "◎", title: "Cleo", desc: "Your AI concierge, always on" },
            { icon: "◈", title: "CX Tribeca", desc: "Programming Tuesday through Sunday" },
            { icon: "∞", title: "The Network", desc: "Curated community of extraordinary people" },
            { icon: "✦", title: "Events", desc: "From intimate salons to full productions" },
            { icon: "⚡", title: "Priority", desc: "First access to everything" },
            { icon: "✧", title: "Guest Privileges", desc: "Bring someone who belongs (tier dependent)" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div className="feature-card" style={{ padding: "32px 24px", border: `1px solid ${C.pink}15`, borderRadius: 12, background: `${C.pink}04`, textAlign: "center" }}>
                <p style={{ fontSize: 28, color: C.pink, marginBottom: 16 }}>{item.icon}</p>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.paper, marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}80`, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ THE MEMBER JOURNEY ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.pink}80`, marginBottom: 20 }}>The Member Journey</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            By invitation,<br />not by application
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            CX is referral-first. There&apos;s no form. No algorithm. Just the oldest network protocol: someone who knows you, telling us you belong.
          </p>
        </Reveal>

        {/* Steps */}
        <div style={{ position: "relative", paddingLeft: 40 }}>
          <div style={{ position: "absolute", left: 15, top: 20, bottom: 20, width: 1, background: `linear-gradient(to bottom, ${C.pink}50, ${C.pink}10)` }} />

          {[
            { step: "01", title: "An invitation or introduction", desc: "CX is referral-first. Someone in the network sees something in you — and opens the door." },
            { step: "02", title: "A conversation", desc: "We want to know who you are, not what you do. No pitch decks. No résumés. Just frequencies aligning." },
            { step: "03", title: "Your first night", desc: "Experience the energy. Walk through a CX event not as a guest — as someone who might belong." },
            { step: "04", title: "Membership begins", desc: "You\u2019re part of the network. Your chapter in the CX story starts here." },
            { step: "05", title: "The journey deepens", desc: "Events, connections, Cleo, community — the longer you stay, the richer it gets." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="step-card" style={{ position: "relative", marginBottom: i < 4 ? 32 : 0, padding: "20px 20px 20px 48px", border: `1px solid ${C.pink}15`, borderRadius: 12, background: `${C.pink}05`, cursor: "default" }}>
                <div style={{ position: "absolute", left: -40, top: 20, width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${C.pink}50`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.pink, fontWeight: 600, zIndex: 1 }}>{item.step}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.paper, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}80`, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ WHO BELONGS ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.pink}80`, marginBottom: 20 }}>Who Belongs at CX</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            The kind of people<br />who change a room
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 64 }}>
          {[
            "The founder who\u2019s tired of networking events",
            "The artist who wants an audience that actually listens",
            "The chef who wants to cook for people who care",
            "The writer looking for their next muse",
            "The person who\u2019s been everywhere but hasn\u2019t found their place",
            "The one who walks into a room and makes it better",
          ].map((archetype, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "20px 24px", borderLeft: `2px solid ${C.pink}40`, background: `${C.pink}04`, borderRadius: "0 8px 8px 0" }}>
                <p style={{ fontSize: 15, color: `${C.paper}cc`, lineHeight: 1.6, fontStyle: "italic" }}>{archetype}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={500}>
          <div style={{ textAlign: "center", padding: "40px 0" }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 3vw, 30px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}70`, lineHeight: 1.5, maxWidth: 700, margin: "0 auto" }}>
              &ldquo;If you&apos;ve been looking for a room that feels like it was built for you — this might be it.&rdquo;
            </p>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "40px 0 0" }} />
      </section>


      {/* ═══════════ CTA ═══════════ */}
      <section style={{ padding: "80px 8% 160px", maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
        <Reveal>
          <div style={{ position: "relative", padding: "80px 40px", overflow: "hidden" }}>
            <div style={{ position: "absolute", top: -100, left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}10, transparent)`, filter: "blur(80px)" }} />
            <div style={{ position: "absolute", bottom: -100, right: "20%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}08, transparent)`, filter: "blur(60px)" }} />

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.3, position: "relative", zIndex: 1, marginBottom: 48 }}>
              &ldquo;The most powerful network<br />isn&apos;t the biggest.<br />
              <span style={{ fontWeight: 600, fontStyle: "normal", color: C.paper }}>It&apos;s the most connected.</span>&rdquo;
            </p>

            <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${C.pink}40, transparent)`, margin: "0 auto 48px" }} />

            <Reveal delay={200}>
              <p style={{ fontSize: 18, color: `${C.paper}90`, marginBottom: 32, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                Ready to join? Start with a conversation.
              </p>
              <a href="mailto:members@cx.club" style={{ display: "inline-block", padding: "14px 40px", border: `1px solid ${C.pink}50`, borderRadius: 40, color: C.paper, fontSize: 14, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.3s", background: `${C.pink}10` }}>
                members@cx.club
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
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.6} fill={C.pink} opacity={0.3 + (i % 4) * 0.1}>
              {i % 5 === 0 && <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}
