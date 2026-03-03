"use client";

import React, { useEffect, useRef, useState, ReactNode } from "react";

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
  green: "#08F22F",
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
export default function TeamPage() {
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

  /* ─── Team data ─── */
  const humanTeam = [
    {
      name: "William Etundi Jr.",
      role: "Founder",
      color: C.purple,
      icon: "✦",
      description: "The architect of the CX universe — vision, strategy, and the relentless pursuit of meaningful connection.",
    },
    {
      name: "Christine Hauer",
      role: "Head of Operations",
      color: C.orange,
      icon: "◎",
      description: "The operational heartbeat — systems, processes, and the rhythm that keeps the organism alive.",
    },
    {
      name: "Mabel",
      role: "Community Manager",
      color: C.pink,
      icon: "◌",
      description: "The connective tissue — nurturing relationships, onboarding members, and cultivating the community pulse.",
    },
    {
      name: "Rose",
      role: "Curation & Host Program Lead",
      color: C.cyan,
      icon: "◈",
      description: "The tastemaker — curating experiences, developing hosts, and shaping the energy of every gathering.",
    },
  ];

  const robotTeam = [
    {
      name: "Cleo",
      role: "AI Concierge",
      color: C.purple,
      icon: "⚡",
      description: "The constant companion — guiding members through the CX journey, answering questions, making introductions.",
      status: "Future",
    },
    {
      name: "CX Designer",
      role: "Design & Brand AI",
      color: C.blue,
      icon: "◆",
      description: "The visual architect — building landing pages, maintaining the brand system, and bringing the CX aesthetic to life.",
      status: "Active",
    },
  ];

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
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
        @keyframes statusPulse { 0%,100%{opacity:0.6} 50%{opacity:1} }
        .team-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); cursor:default; }
        .team-card:hover { transform: translateY(-6px); }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.pink}, ${C.purple}, ${C.cyan})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}06 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />

      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "15%", left: "10%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.pink}0e, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "5%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "10%", left: "35%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.cyan}08, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 1000, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.muted}80`, marginBottom: 32 }}>Heart · Our Support System</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX Team / Tools
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}30, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}50`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto" }}>
            Humans and machines, building together
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 48, zIndex: 2, textAlign: "center", animation: "pulse 3s ease-in-out infinite" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}60` }}>Scroll to enter</p>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.muted}40, transparent)`, margin: "10px auto 0" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to top, ${C.bg}, transparent)` }} />
      </section>


      {/* ═══════════ HUMAN TEAM ═══════════ */}
      <section style={{ padding: "140px 8%", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.orange}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.orange, fontWeight: 300 }}>1</span>
            </div>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper }}>Human Team</h2>
              <p style={{ fontSize: 13, color: `${C.orange}bb`, fontStyle: "italic", letterSpacing: "0.05em" }}>The people behind the people</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}50`, marginLeft: 60, marginBottom: 64 }}>&ldquo;Small team. Deep trust. No middle.&rdquo;</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 40 }}>
          {humanTeam.map((person, i) => (
            <Reveal key={i} delay={i * 120}>
              <div className="team-card" style={{ padding: "36px 32px", border: `1px solid ${person.color}20`, borderRadius: 12, background: `linear-gradient(170deg, ${person.color}06 0%, transparent 60%)`, height: "100%", position: "relative", overflow: "hidden" }}>
                {/* Large faded initial */}
                <div style={{ position: "absolute", top: -20, right: -10, fontFamily: "'Cormorant Garamond', serif", fontSize: 200, fontWeight: 300, color: `${person.color}06`, lineHeight: 1, pointerEvents: "none" }}>{person.name[0]}</div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", border: `1.5px solid ${person.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: person.color, background: `${person.color}10` }}>{person.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: C.paper }}>{person.name}</h3>
                      <p style={{ fontSize: 12, color: person.color, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{person.role}</p>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7 }}>{person.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "80px 0" }} />


        {/* ═══════════ ROBOT TEAM ═══════════ */}
        <Reveal>
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", border: `1.5px solid ${C.cyan}50`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, color: C.cyan, fontWeight: 300 }}>2</span>
            </div>
            <div>
              <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper }}>Robot Team</h2>
              <p style={{ fontSize: 13, color: `${C.cyan}bb`, fontStyle: "italic", letterSpacing: "0.05em" }}>The machines that amplify us</p>
            </div>
          </div>
        </Reveal>
        <Reveal delay={50}>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontStyle: "italic", color: `${C.paper}50`, marginLeft: 60, marginBottom: 64 }}>&ldquo;Not replacing humans — extending what&apos;s possible&rdquo;</p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24, marginBottom: 40 }}>
          {robotTeam.map((agent, i) => (
            <Reveal key={i} delay={i * 150}>
              <div className="team-card" style={{ padding: "36px 32px", border: `1px solid ${agent.color}20`, borderRadius: 12, background: `linear-gradient(170deg, ${agent.color}06 0%, transparent 60%)`, height: "100%", position: "relative", overflow: "hidden" }}>
                {/* Large faded initial */}
                <div style={{ position: "absolute", top: -20, right: -10, fontFamily: "'Cormorant Garamond', serif", fontSize: 200, fontWeight: 300, color: `${agent.color}06`, lineHeight: 1, pointerEvents: "none" }}>{agent.name[0]}</div>

                <div style={{ position: "relative", zIndex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, borderRadius: "50%", border: `1.5px solid ${agent.color}40`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, color: agent.color, background: `${agent.color}10` }}>{agent.icon}</div>
                    <div>
                      <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 400, color: C.paper }}>{agent.name}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                        <p style={{ fontSize: 12, color: agent.color, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 500 }}>{agent.role}</p>
                        <span style={{ fontSize: 10, padding: "2px 10px", borderRadius: 20, background: agent.status === "Active" ? `${C.green}15` : `${C.muted}10`, color: agent.status === "Active" ? C.green : `${C.muted}80`, letterSpacing: "0.08em", animation: agent.status === "Active" ? "statusPulse 3s ease-in-out infinite" : "none" }}>{agent.status}</span>
                      </div>
                    </div>
                  </div>
                  <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7 }}>{agent.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>


      {/* ═══════════ CLOSING ═══════════ */}
      <section style={{ padding: "40px 8% 60px", maxWidth: 1300, margin: "0 auto" }}>
        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "0 0 80px" }} />
        <Reveal>
          <div style={{ position: "relative", padding: "48px 40px", background: `linear-gradient(135deg, ${C.pink}08 0%, ${C.purple}05 100%)`, borderRadius: 16, border: `1px solid ${C.pink}15`, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${C.orange}40, ${C.pink}40, ${C.cyan}40)` }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.8vw, 30px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.5 }}>
              &ldquo;A small team with deep conviction will always outperform a large team with shallow commitment.&rdquo;
            </p>
          </div>
        </Reveal>
      </section>


      {/* ═══════════ FOOTER ═══════════ */}
      <footer style={{ textAlign: "center", padding: "120px 8% 80px", position: "relative" }}>
        <div style={{ position: "absolute", top: 0, left: "20%", right: "20%", height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)` }} />
        <Reveal>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: `${C.paper}30`, marginBottom: 16 }}>CX Team / Tools</p>
          <p style={{ fontSize: 11, letterSpacing: "0.25em", textTransform: "uppercase", color: `${C.muted}40` }}>Heart · Our Support System · 2026</p>
        </Reveal>
      </footer>
    </div>
  );
}
