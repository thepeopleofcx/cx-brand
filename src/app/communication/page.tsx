"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

/* ─── palette ─── */
const C = {
  bg: "#0B0B0C",
  paper: "#F2F2F2",
  muted: "#B8B8B8",
  blue: "#1D90BF",
  orange: "#FD7E01",
  purple: "#9750CD",
  pink: "#F525A3",
  cyan: "#05AEC6",
};

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

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function CommunicationPage() {
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
        ::selection { background:${C.blue}40; color:${C.paper}; }
        body::before {
          content:''; position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,-60px) scale(1.1)} 66%{transform:translate(-40px,40px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-60px,80px) scale(0.9)} 66%{transform:translate(60px,-30px) scale(1.15)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,60px) scale(1.05)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes heroGlow { 0%,100%{text-shadow:0 0 80px ${C.blue}10} 50%{text-shadow:0 0 140px ${C.blue}20} }
        @keyframes lineGrow { from{width:0} to{width:160px} }
        @keyframes breathe { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.25;transform:scale(1.02)} }
        .pillar-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); cursor:default; }
        .pillar-card:hover { transform: translateY(-6px); border-color: ${C.blue}50 !important; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.blue}, ${C.cyan}, ${C.blue})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}06 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Floating gradient orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "10%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.blue}0e, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "50%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.cyan}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "40%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}08, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 1000, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 32 }}>Mind · How we view the world</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX Communication
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}30, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}50`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto" }}>
            The voice, the lens, the signal in the noise
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 48, zIndex: 2, textAlign: "center", animation: "pulse 3s ease-in-out infinite" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}60` }}>Scroll to enter</p>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.muted}40, transparent)`, margin: "10px auto 0" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to top, ${C.bg}, transparent)` }} />
      </section>


      {/* ═══════════ OVERVIEW ═══════════ */}
      <section style={{ padding: "140px 8%", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 20 }}>The Framework</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            Three pillars.<br />One voice.
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 80 }}>
            CX Communication is how we project our world outward — through the content we create, the stories the press tells about us, and the reputation we cultivate in every interaction. Each pillar serves the same mission: make the invisible visible without losing the mystery.
          </p>
        </Reveal>

        {/* Three pillars */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 80 }}>
          {[
            {
              icon: "◎",
              name: "CX Media",
              subtitle: "Content & Storytelling",
              color: C.blue,
              description: "The content arm — social, editorial, visual storytelling. How we speak to the world on our own terms.",
              items: ["Social Media Strategy", "Editorial Content", "Visual Identity", "Newsletter / CRM", "Photography & Video"],
            },
            {
              icon: "◌",
              name: "CX PR",
              subtitle: "Press & Narrative",
              color: C.cyan,
              description: "The press narrative — earned media, thought leadership, strategic placements. How the world speaks about us.",
              items: ["Press Strategy", "Thought Leadership", "Media Relationships", "Event Press", "Crisis Communication"],
            },
            {
              icon: "✦",
              name: "CX Reputation",
              subtitle: "Trust & Perception",
              color: C.purple,
              description: "The lived experience — word of mouth, member sentiment, brand perception. How the world feels about us.",
              items: ["Member Experience", "Word of Mouth", "Community Sentiment", "Brand Perception", "Partnership Trust"],
            },
          ].map((pillar, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="pillar-card" style={{ padding: "36px 28px", border: `1px solid ${pillar.color}20`, borderRadius: 12, background: `linear-gradient(170deg, ${pillar.color}06 0%, transparent 60%)`, height: "100%", display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${pillar.color}15`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, color: pillar.color }}>{pillar.icon}</div>
                  <div>
                    <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: C.paper }}>{pillar.name}</h3>
                    <p style={{ fontSize: 11, fontStyle: "italic", color: `${pillar.color}cc`, letterSpacing: "0.05em" }}>{pillar.subtitle}</p>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7, marginBottom: 24 }}>{pillar.description}</p>
                <div style={{ display: "flex", flexDirection: "column", gap: 10, paddingLeft: 16, borderLeft: `1px solid ${pillar.color}20`, marginTop: "auto" }}>
                  {pillar.items.map((item, j) => (
                    <p key={j} style={{ fontSize: 13, color: `${C.paper}70` }}>{item}</p>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "0 0 80px" }} />


        {/* ═══════════ CX MEDIA ═══════════ */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.blue}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.blue, fontWeight: 300 }}>1</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: C.paper }}>CX Media</h3>
              <p style={{ fontSize: 13, color: `${C.blue}bb`, fontStyle: "italic", letterSpacing: "0.05em" }}>Content & Storytelling</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}50`, marginLeft: 60, marginBottom: 40 }}>&ldquo;How we speak to the world on our own terms&rdquo;</p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginLeft: 60, marginBottom: 48, maxWidth: 700 }}>
            <p style={{ fontSize: 15, color: `${C.paper}90`, lineHeight: 1.8, marginBottom: 24 }}>
              CX Media is the content engine — every post, every image, every story we tell. It&apos;s not marketing; it&apos;s worldbuilding. We don&apos;t sell a product, we invite people into a narrative.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Social Channels", detail: "Instagram, TikTok, X, LinkedIn" },
                { label: "Editorial", detail: "Long-form stories, member spotlights" },
                { label: "Visual", detail: "Photography, video, design assets" },
                { label: "CRM", detail: "Newsletter, email sequences, SMS" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "16px 20px", background: `${C.paper}05`, borderRadius: 8, border: `1px solid ${C.paper}08` }}>
                  <p style={{ fontSize: 13, color: C.blue, fontWeight: 500, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: `${C.muted}90` }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "64px 0" }} />


        {/* ═══════════ CX PR ═══════════ */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.cyan}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.cyan, fontWeight: 300 }}>2</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: C.paper }}>CX PR</h3>
              <p style={{ fontSize: 13, color: `${C.cyan}bb`, fontStyle: "italic", letterSpacing: "0.05em" }}>Press & Narrative</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}50`, marginLeft: 60, marginBottom: 40 }}>&ldquo;How the world speaks about us&rdquo;</p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginLeft: 60, marginBottom: 48, maxWidth: 700 }}>
            <p style={{ fontSize: 15, color: `${C.paper}90`, lineHeight: 1.8, marginBottom: 24 }}>
              CX PR shapes the external narrative — strategic press placements, thought leadership, and the careful cultivation of how journalists and cultural tastemakers understand what we are (and what we aren&apos;t).
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Press Strategy", detail: "Targeted placements, embargoes, exclusives" },
                { label: "Thought Leadership", detail: "Op-eds, panels, speaking engagements" },
                { label: "Media Relations", detail: "Journalist relationships, press lists" },
                { label: "Crisis Comms", detail: "Response protocols, holding statements" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "16px 20px", background: `${C.paper}05`, borderRadius: 8, border: `1px solid ${C.paper}08` }}>
                  <p style={{ fontSize: 13, color: C.cyan, fontWeight: 500, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: `${C.muted}90` }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "64px 0" }} />


        {/* ═══════════ CX REPUTATION ═══════════ */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.purple}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.purple, fontWeight: 300 }}>3</span>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 300, color: C.paper }}>CX Reputation</h3>
              <p style={{ fontSize: 13, color: `${C.purple}bb`, fontStyle: "italic", letterSpacing: "0.05em" }}>Trust & Perception</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}50`, marginLeft: 60, marginBottom: 40 }}>&ldquo;How the world feels about us&rdquo;</p>
        </Reveal>

        <Reveal delay={100}>
          <div style={{ marginLeft: 60, marginBottom: 48, maxWidth: 700 }}>
            <p style={{ fontSize: 15, color: `${C.paper}90`, lineHeight: 1.8, marginBottom: 24 }}>
              CX Reputation is the hardest to build and the easiest to lose. It lives in every interaction — how a member feels after a night at Tribeca, what a brand partner says behind closed doors, the stories people tell when we&apos;re not in the room.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              {[
                { label: "Member Experience", detail: "Onboarding, touchpoints, feedback loops" },
                { label: "Word of Mouth", detail: "The most powerful channel we have" },
                { label: "Community Sentiment", detail: "Pulse checks, listening, responding" },
                { label: "Partnership Trust", detail: "Venue owners, brands, collaborators" },
              ].map((item, i) => (
                <div key={i} style={{ padding: "16px 20px", background: `${C.paper}05`, borderRadius: 8, border: `1px solid ${C.paper}08` }}>
                  <p style={{ fontSize: 13, color: C.purple, fontWeight: 500, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ fontSize: 12, color: `${C.muted}90` }}>{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </section>


      {/* ═══════════ CLOSING QUOTE ═══════════ */}
      <section style={{ padding: "80px 8% 60px", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "0 0 80px" }} />
        <Reveal>
          <div style={{ position: "relative", padding: "48px 40px", background: `linear-gradient(135deg, ${C.blue}08 0%, ${C.cyan}05 100%)`, borderRadius: 16, border: `1px solid ${C.blue}15`, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.blue}40, ${C.cyan}40, ${C.blue}40)` }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.5 }}>
              &ldquo;We don&apos;t chase attention. We create gravity.&rdquo;
            </p>
          </div>
        </Reveal>
      </section>


      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ textAlign: "center", padding: "120px 8% 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)` }} />
        <Reveal>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: `${C.paper}30`, marginBottom: 16 }}>CX Communication</p>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: `${C.muted}40` }}>Mind · How We View the World · 2026</p>
        </Reveal>
      </footer>
    </div>
  );
}
