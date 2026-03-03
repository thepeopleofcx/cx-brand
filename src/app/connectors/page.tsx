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
   CX CONNECTORS PAGE
   ═══════════════════════════════════════════════════ */
export default function ConnectorsPage() {
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
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .glass-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .glass-card:hover { transform: translateY(-6px); }
        .step-card { transition: all 0.3s ease; }
        .step-card:hover { background: ${C.purple}12 !important; border-color: ${C.purple}40 !important; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.purple}, ${C.pink}, ${C.orange})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}08 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Floating gradient orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}12, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
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
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.purple}90`, marginBottom: 32 }}>The Cultural Catalysts</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX Connectors
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.purple}50, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}60`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto 40px" }}>
            The ones who make things happen
          </p>
          <p style={{ fontSize: 16, color: `${C.paper}70`, lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
            Connectors are the cultural catalysts of CX. They don&apos;t just attend — they activate. They bring the energy, the people, the moments that transform a space into a story.
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
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.purple}80`, marginBottom: 20 }}>Why Connectors Matter</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            We pay people to connect.<br />That&apos;s radical.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 40 }}>
            Most companies pay for marketing. They pay for ads, for reach, for impressions. CX pays for something different: the irreplaceable human ability to walk into a room and make it come alive. Connectors are the bridge between CX&apos;s spaces and the world&apos;s most interesting people.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 48 }}>
            They&apos;re not influencers in the Instagram sense — they&apos;re cultural architects. They don&apos;t post about experiences. They create them. They don&apos;t broadcast to audiences. They curate rooms.
          </p>
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={300}>
          <div style={{ position: "relative", padding: "48px 56px", background: `linear-gradient(135deg, ${C.purple}0a 0%, ${C.bg} 50%, ${C.purple}06 100%)`, border: `1px solid ${C.purple}25`, borderRadius: 16, marginBottom: 40, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.purple}40, transparent)` }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}15, transparent)`, filter: "blur(60px)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: `${C.paper}cc`, lineHeight: 1.25, position: "relative", zIndex: 1 }}>
              &ldquo;We don&apos;t want followers.<br />We want{" "}
              <span style={{ fontWeight: 600, background: `linear-gradient(90deg, ${C.paper}, ${C.purple}, ${C.paper}, ${C.purple})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 6s linear infinite" }}>leaders</span>.&rdquo;
            </p>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "40px 0 0" }} />
      </section>


      {/* ═══════════ THE THREE LEVELS ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.purple}80`, marginBottom: 20 }}>The Three Levels</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            An ascending hierarchy<br />of connection
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            Every Connector finds their level. Each one deepens the relationship between CX and the cultural world.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {/* Level 1: Personality */}
          <Reveal delay={150}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.purple}25`, borderRadius: 16, background: `linear-gradient(180deg, ${C.purple}08 0%, transparent 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.purple}40, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.purple}50`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.purple, fontFamily: "'Cormorant Garamond', serif" }}>1</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Personality</h3>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.purple, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;Paid to super connect&rdquo;</p>
              
              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Who they are</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                The natural connectors. People who walk into a room and the energy shifts. They know everyone, and everyone wants to know them.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What they do</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Bring people together at CX events, introduce members to each other, create spontaneous moments of connection.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What they get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Paid per event/engagement, access to all CX programming, featured in CX communications.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Who this is for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                Social architects, cultural figures, community leaders, scene-makers.
              </p>
            </div>
          </Reveal>

          {/* Level 2: Curator */}
          <Reveal delay={300}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.purple}30`, borderRadius: 16, background: `linear-gradient(180deg, ${C.purple}0c 0%, transparent 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.purple}60, transparent)` }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.purple}60`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.purple, fontFamily: "'Cormorant Garamond', serif" }}>2</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Curator</h3>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.purple, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;Paid to program personalities&rdquo;</p>
              
              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Who they are</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                The tastemakers. They don&apos;t just connect people — they design the <em>who</em> of an event. They curate the guest list, the vibe, the cultural mix.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What they do</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Program specific events or series, select and invite personalities, shape the cultural narrative of CX nights.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What they get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Programming fees, creative control over their events, brand partnership opportunities.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Who this is for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                Event producers, cultural directors, talent scouts, A&R, gallery owners, salon hosts.
              </p>
            </div>
          </Reveal>

          {/* Level 3: Partner */}
          <Reveal delay={450}>
            <div className="glass-card" style={{ padding: "36px 28px", border: `1px solid ${C.purple}40`, borderRadius: 16, background: `linear-gradient(180deg, ${C.purple}10 0%, ${C.purple}04 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.purple}80, transparent)` }} />
              <div style={{ position: "absolute", top: -60, right: -60, width: 200, height: 200, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}10, transparent)`, filter: "blur(40px)" }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", border: `1.5px solid ${C.purple}80`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: C.purple, fontFamily: "'Cormorant Garamond', serif" }}>3</div>
                <div>
                  <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, fontWeight: 400, color: C.paper }}>Partner</h3>
                  <p style={{ fontSize: 11, color: `${C.purple}90`, letterSpacing: "0.1em" }}>LTC — Long-Term Connector</p>
                </div>
              </div>
              <p style={{ fontSize: 13, color: C.purple, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 20 }}>&ldquo;The co-creators&rdquo;</p>
              
              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Who they are</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                The names. Anderson .Paak. Douglas Rushkoff. Cultural icons who don&apos;t just show up — they co-create with CX.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What they do</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Headline or co-produce signature CX events, bring their audience and brand to CX, create exclusive ongoing programming.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>What they get</p>
              <p style={{ fontSize: 14, color: `${C.paper}bb`, lineHeight: 1.7, marginBottom: 20 }}>
                Revenue share, co-branding, long-term creative partnership, equity-level involvement.
              </p>

              <p style={{ fontSize: 12, letterSpacing: "0.2em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 8 }}>Who this is for</p>
              <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, fontStyle: "italic" }}>
                Artists, musicians, authors, thought leaders, brands with cultural weight.
              </p>
            </div>
          </Reveal>
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ NOT A TYPICAL INFLUENCER ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.purple}80`, marginBottom: 20 }}>What Makes a CX Connector</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            Not a typical &ldquo;influencer&rdquo;
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, marginBottom: 64 }}>
          <Reveal delay={150}>
            <div>
              <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: `${C.muted}60`, marginBottom: 24 }}>Traditional Influencer</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Counts followers", "Promotes products", "Broadcasts to audiences", "Values reach", "Posts about experiences"].map((item, i) => (
                  <p key={i} style={{ fontSize: 15, color: `${C.paper}40`, lineHeight: 1.6, paddingLeft: 20, borderLeft: `2px solid ${C.muted}20` }}>{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal delay={250}>
            <div>
              <p style={{ fontSize: 12, letterSpacing: "0.3em", textTransform: "uppercase", color: C.purple, marginBottom: 24 }}>CX Connector</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {["Counts connections", "Participates authentically", "Curates rooms", "Values resonance", "Creates experiences"].map((item, i) => (
                  <p key={i} style={{ fontSize: 15, color: `${C.paper}cc`, lineHeight: 1.6, paddingLeft: 20, borderLeft: `2px solid ${C.purple}60` }}>{item}</p>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Three contrast quotes */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {[
            "We don\u2019t count followers. We count connections.",
            "A Connector doesn\u2019t promote \u2014 they participate.",
            "The value isn\u2019t reach. It\u2019s resonance.",
          ].map((quote, i) => (
            <Reveal key={i} delay={350 + i * 100}>
              <div style={{ padding: "32px 24px", border: `1px solid ${C.purple}20`, borderRadius: 12, background: `${C.purple}06`, textAlign: "center" }}>
                <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 20, fontStyle: "italic", color: `${C.paper}90`, lineHeight: 1.5 }}>
                  &ldquo;{quote}&rdquo;
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ THE CONNECTOR JOURNEY ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.purple}80`, marginBottom: 20 }}>The Connector Journey</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            By relationship,<br />not by application
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            There&apos;s no form to fill out. No algorithm to game. This is how real connections begin.
          </p>
        </Reveal>

        {/* Steps */}
        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 15, top: 20, bottom: 20, width: 1, background: `linear-gradient(to bottom, ${C.purple}50, ${C.purple}10)` }} />

          {[
            { step: "01", title: "You\u2019re identified or you reach out", desc: "Someone in the CX world notices your energy. Or you find us and something clicks." },
            { step: "02", title: "A conversation \u2014 not an application", desc: "We talk. We listen. We see if the frequencies align. No pitch decks. No follower counts." },
            { step: "03", title: "A first event \u2014 show us your energy", desc: "You come to a CX event. Not as a guest \u2014 as a catalyst. We watch how you move through a room." },
            { step: "04", title: "If the connection is real, we formalize it", desc: "The relationship becomes official. You become part of the architecture of CX." },
            { step: "05", title: "You\u2019re part of the CX story", desc: "Your chapter in the CX narrative begins. Where it goes from here is up to us \u2014 together." },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="step-card" style={{ position: "relative", marginBottom: i < 4 ? 32 : 0, paddingLeft: 32, padding: "20px 20px 20px 48px", border: `1px solid ${C.purple}15`, borderRadius: 12, background: `${C.purple}05`, cursor: "default" }}>
                <div style={{ position: "absolute", left: -40, top: 20, width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${C.purple}50`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: C.purple, fontWeight: 600, zIndex: 1 }}>{item.step}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.paper, marginBottom: 6 }}>{item.title}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}80`, lineHeight: 1.7 }}>{item.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ SOCIAL PROOF ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.purple}80`, marginBottom: 20 }}>Who Connects With CX</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            The kind of people<br />you&apos;d want in a room
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
          {[
            { icon: "♪", label: "Grammy-winning musicians" },
            { icon: "✎", label: "Bestselling authors" },
            { icon: "◈", label: "Gallery owners & art dealers" },
            { icon: "✦", label: "Fashion designers" },
            { icon: "⚡", label: "Tech founders who actually build" },
            { icon: "◎", label: "Chefs & restaurateurs" },
            { icon: "✧", label: "The person who always knows the next thing" },
            { icon: "∞", label: "And the ones you haven\u2019t met yet" },
          ].map((item, i) => (
            <Reveal key={i} delay={i * 80}>
              <div style={{ padding: "24px 20px", border: `1px solid ${C.purple}15`, borderRadius: 12, background: `${C.purple}04`, textAlign: "center" }}>
                <p style={{ fontSize: 24, color: C.purple, marginBottom: 12 }}>{item.icon}</p>
                <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.5 }}>{item.label}</p>
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
            <div style={{ position: "absolute", top: -100, left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}10, transparent)`, filter: "blur(80px)" }} />
            <div style={{ position: "absolute", bottom: -100, right: "20%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}08, transparent)`, filter: "blur(60px)" }} />

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.3, position: "relative", zIndex: 1, marginBottom: 48 }}>
              &ldquo;The most powerful network<br />isn&apos;t the biggest.<br />
              <span style={{ fontWeight: 600, fontStyle: "normal", color: C.paper }}>It&apos;s the most connected.</span>&rdquo;
            </p>

            <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${C.purple}40, transparent)`, margin: "0 auto 48px" }} />

            <Reveal delay={200}>
              <p style={{ fontSize: 18, color: `${C.paper}90`, marginBottom: 32, fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic" }}>
                If this resonates, we should talk.
              </p>
              <a href="mailto:connect@cx.club" style={{ display: "inline-block", padding: "14px 40px", border: `1px solid ${C.purple}50`, borderRadius: 40, color: C.paper, fontSize: 14, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", transition: "all 0.3s", background: `${C.purple}10` }}>
                connect@cx.club
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
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.6} fill={C.purple} opacity={0.3 + (i % 4) * 0.1}>
              {i % 5 === 0 && <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}
