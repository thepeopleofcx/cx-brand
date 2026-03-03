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
  violet: "#A78BFA",
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
   CX TRIBECA — THE FIRST ROOM
   ═══════════════════════════════════════════════════ */
export default function TribecaPage() {
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
        ::selection { background:${C.violet}40; color:${C.paper}; }
        body::before {
          content:''; position:fixed; inset:0; z-index:9999; pointer-events:none; opacity:0.03;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
          background-repeat: repeat; background-size: 180px;
        }
        @keyframes float1 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(80px,-60px) scale(1.1)} 66%{transform:translate(-40px,40px) scale(0.95)} }
        @keyframes float2 { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-60px,80px) scale(0.9)} 66%{transform:translate(60px,-30px) scale(1.15)} }
        @keyframes float3 { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(40px,60px) scale(1.05)} }
        @keyframes pulse { 0%,100%{opacity:0.5} 50%{opacity:1} }
        @keyframes heroGlow { 0%,100%{text-shadow:0 0 80px ${C.violet}10} 50%{text-shadow:0 0 140px ${C.violet}20} }
        @keyframes lineGrow { from{width:0} to{width:160px} }
        @keyframes rotateSlow { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes breathe { 0%,100%{opacity:0.15;transform:scale(1)} 50%{opacity:0.25;transform:scale(1.02)} }
        @keyframes shimmer { 0%{background-position:-200% center} 100%{background-position:200% center} }
        .glass-card { transition: all 0.4s cubic-bezier(0.23,1,0.32,1); }
        .glass-card:hover { transform: translateY(-6px); }
        .feature-card { transition: all 0.3s ease; }
        .feature-card:hover { background: ${C.violet}12 !important; border-color: ${C.violet}40 !important; }
        .cta-btn { transition: all 0.3s ease; }
        .cta-btn:hover { background: ${C.violet}25 !important; border-color: ${C.violet}80 !important; }
      `}</style>

      {/* Progress bar */}
      <div style={{ position: "fixed", top: 0, left: 0, height: 2, zIndex: 100, width: `${progress * 100}%`, background: `linear-gradient(90deg, ${C.violet}, ${C.purple}, ${C.pink})`, transition: "width 0.15s" }} />

      {/* Cursor glow */}
      <div style={{ position: "fixed", left: mousePos.x - 200, top: mousePos.y - 200, width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.violet}08 0%, transparent 70%)`, pointerEvents: "none", zIndex: 50, transition: "left 0.15s, top 0.15s" }} />


      {/* ═══════════ HERO ═══════════ */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", overflow: "hidden" }}>
        {/* Floating gradient orbs */}
        <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
          <div style={{ position: "absolute", top: "10%", left: "5%", width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.violet}12, transparent 70%)`, animation: "float1 24s ease-in-out infinite", filter: "blur(100px)" }} />
          <div style={{ position: "absolute", top: "40%", right: "0%", width: 700, height: 700, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}0a, transparent 70%)`, animation: "float2 30s ease-in-out infinite", filter: "blur(120px)" }} />
          <div style={{ position: "absolute", bottom: "0%", left: "30%", width: 500, height: 500, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}0a, transparent 70%)`, animation: "float3 22s ease-in-out infinite", filter: "blur(80px)" }} />
        </div>

        {/* Subtle rotating ring */}
        <div style={{ position: "absolute", width: 600, height: 600, animation: "rotateSlow 120s linear infinite", opacity: 0.04 }}>
          <svg viewBox="0 0 600 600" style={{ width: "100%", height: "100%" }}>
            <circle cx="300" cy="300" r="280" fill="none" stroke={C.paper} strokeWidth="0.5" strokeDasharray="8 12" />
          </svg>
        </div>

        <div style={{ position: "absolute", inset: 0, background: `radial-gradient(ellipse at center, transparent 0%, ${C.bg} 75%)` }} />

        <div style={{ position: "relative", zIndex: 2, textAlign: "center", maxWidth: 1000, padding: "0 24px" }}>
          <p style={{ fontSize: 11, letterSpacing: "0.5em", textTransform: "uppercase", color: `${C.violet}90`, marginBottom: 32 }}>The Flagship Venue</p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(52px, 9vw, 120px)", fontWeight: 300, lineHeight: 1, color: C.paper, animation: "heroGlow 8s ease-in-out infinite", marginBottom: 24 }}>
            CX Tribeca
          </h1>
          <div style={{ width: 160, height: 1, background: `linear-gradient(90deg, transparent, ${C.violet}50, transparent)`, margin: "0 auto 28px", animation: "lineGrow 2.5s ease forwards" }} />
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(17px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}60`, lineHeight: 1.5, maxWidth: 600, margin: "0 auto 40px" }}>
            The first room
          </p>
          <p style={{ fontSize: 16, color: `${C.paper}70`, lineHeight: 1.8, maxWidth: 640, margin: "0 auto" }}>
            Every story needs a beginning. CX Tribeca is where the infinite loop first turned — where Space met People and Connection was born. This is the flagship. The origin. The room where it all started.
          </p>
        </div>

        <div style={{ position: "absolute", bottom: 48, zIndex: 2, textAlign: "center", animation: "pulse 3s ease-in-out infinite" }}>
          <p style={{ fontSize: 10, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.muted}60` }}>Scroll to enter</p>
          <div style={{ width: 1, height: 36, background: `linear-gradient(to bottom, ${C.muted}40, transparent)`, margin: "10px auto 0" }} />
        </div>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: 160, background: `linear-gradient(to top, ${C.bg}, transparent)` }} />
      </section>


      {/* ═══════════ THE SPACE — PHILOSOPHY ═══════════ */}
      <section style={{ padding: "140px 8%", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.violet}80`, marginBottom: 20 }}>The Space</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            Tribeca isn&apos;t just a venue.<br />It&apos;s the vessel.
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 40 }}>
            The physical design is intentional: every corner, every light, every texture is curated to create connection. This is not decoration — it&apos;s architecture with purpose. The space doesn&apos;t just hold events. It shapes them.
          </p>
        </Reveal>
        <Reveal delay={200}>
          <p style={{ fontSize: 17, lineHeight: 1.85, color: `${C.paper}bb`, maxWidth: 800, marginBottom: 48 }}>
            This is where the Heroine&apos;s Journey lives — Cleo guides you through it, the space holds you in it. Every element conspires to make the stranger next to you feel like someone you were meant to meet.
          </p>
        </Reveal>

        {/* Pull quote */}
        <Reveal delay={300}>
          <div style={{ position: "relative", padding: "48px 56px", background: `linear-gradient(135deg, ${C.violet}0a 0%, ${C.bg} 50%, ${C.violet}06 100%)`, border: `1px solid ${C.violet}25`, borderRadius: 16, marginBottom: 40, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.violet}40, transparent)` }} />
            <div style={{ position: "absolute", top: -80, right: -80, width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.violet}15, transparent)`, filter: "blur(60px)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 300, color: `${C.paper}cc`, lineHeight: 1.25, position: "relative", zIndex: 1 }}>
              &ldquo;Space is not a backdrop.<br />It&apos;s a{" "}
              <span style={{ fontWeight: 600, background: `linear-gradient(90deg, ${C.paper}, ${C.violet}, ${C.paper}, ${C.violet})`, backgroundSize: "200% auto", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", animation: "shimmer 6s linear infinite" }}>character</span>{" "}
              in the story.&rdquo;
            </p>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}15, transparent)`, margin: "40px 0 0" }} />
      </section>


      {/* ═══════════ THE EXPERIENCE ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.violet}80`, marginBottom: 20 }}>The Experience</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            What happens here
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 16, color: `${C.paper}70`, maxWidth: 600, lineHeight: 1.7, marginBottom: 64 }}>
            Programming runs Tuesday through Sunday — six nights a week. Each night is different. No two CX nights are the same.
          </p>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24, marginBottom: 48 }}>
          {[
            { name: "New Member Nights", day: "Tuesdays", desc: "First taste of CX for new members. The door opens, and the journey begins.", icon: "◎" },
            { name: "Salon Nights", day: "Rotating", desc: "Intimate conversations, curated guests. The kind of evening that changes how you think.", icon: "✧" },
            { name: "Live Performances", day: "Rotating", desc: "Music, spoken word, cultural activations. Art that happens with you, not at you.", icon: "♪" },
            { name: "Private Events", day: "By invitation", desc: "Founders Table dinners, special occasions. The inner circle, the sacred evenings.", icon: "◈" },
            { name: "Partner Events", day: "Rotating", desc: "Co-produced with Connectors and Brands. Where worlds collide and new ones are born.", icon: "⚡" },
            { name: "The Unexpected", day: "Always", desc: "The night you didn\u2019t plan for. The conversation you didn\u2019t expect. The connection you\u2019ll never forget.", icon: "∞" },
          ].map((event, i) => (
            <Reveal key={i} delay={150 + i * 100}>
              <div className="glass-card" style={{ padding: "32px 24px", border: `1px solid ${C.violet}20`, borderRadius: 16, background: `linear-gradient(180deg, ${C.violet}06 0%, transparent 100%)`, height: "100%", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.violet}30, transparent)` }} />
                <p style={{ fontSize: 24, color: C.violet, marginBottom: 12 }}>{event.icon}</p>
                <h3 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: C.paper, marginBottom: 4 }}>{event.name}</h3>
                <p style={{ fontSize: 12, color: `${C.violet}bb`, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 16 }}>{event.day}</p>
                <p style={{ fontSize: 14, color: `${C.paper}90`, lineHeight: 1.7 }}>{event.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Quote */}
        <Reveal delay={400}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 24 }}>
            <div style={{ padding: "32px 40px", border: `1px solid ${C.violet}20`, borderRadius: 12, background: `${C.violet}06`, textAlign: "center" }}>
              <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(20px, 2.5vw, 28px)", fontStyle: "italic", color: `${C.paper}90`, lineHeight: 1.5 }}>
                &ldquo;You don&apos;t come to CX Tribeca to see a show. You come to be part of one.&rdquo;
              </p>
            </div>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ VENUE FEATURES ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.violet}80`, marginBottom: 20 }}>The Details</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 64 }}>
            Every detail,<br />intentional
          </h2>
        </Reveal>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { name: "Founders Table", desc: "Circular booth, the heart of the room. Where strangers become collaborators and conversations become movements.", icon: "◎" },
            { name: "Lower Level", desc: "Private events, buy-outs, intimate gatherings. A room within a room, for the moments that need walls.", icon: "◌" },
            { name: "Sound System", desc: "Fully removable, designed for the moment. Present but never intrusive — the soundtrack to connection.", icon: "♪" },
            { name: "Lighting", desc: "Atmospheric, never harsh, always intentional. The warm glow that makes everyone look their best and feel at ease.", icon: "✦" },
            { name: "Décor", desc: "Dried and permanent flowers, curated art, living design. The space breathes. It evolves. It remembers.", icon: "✧" },
            { name: "Cleo", desc: "AI concierge present throughout, guiding connections. She knows your name, your story, and who you should meet next.", icon: "⚡" },
          ].map((feature, i) => (
            <Reveal key={i} delay={i * 100}>
              <div className="feature-card" style={{ padding: "28px 24px", border: `1px solid ${C.violet}15`, borderRadius: 12, background: `${C.violet}04`, height: "100%" }}>
                <p style={{ fontSize: 20, color: C.violet, marginBottom: 12 }}>{feature.icon}</p>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 400, color: C.paper, marginBottom: 8 }}>{feature.name}</h4>
                <p style={{ fontSize: 14, color: `${C.paper}80`, lineHeight: 1.7 }}>{feature.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "80px 0 0" }} />
      </section>


      {/* ═══════════ THE LOCATION ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.violet}80`, marginBottom: 20 }}>The Location</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 40 }}>
            Tribeca, New York City
          </h2>
        </Reveal>

        <Reveal delay={150}>
          <div style={{ position: "relative", padding: "48px 56px", background: `linear-gradient(135deg, ${C.violet}08 0%, ${C.bg} 50%, ${C.orange}04 100%)`, border: `1px solid ${C.violet}20`, borderRadius: 16, marginBottom: 40, overflow: "hidden" }}>
            <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, transparent, ${C.violet}30, transparent)` }} />
            <div style={{ position: "absolute", bottom: -60, right: -60, width: 250, height: 250, borderRadius: "50%", background: `radial-gradient(circle, ${C.orange}08, transparent)`, filter: "blur(50px)" }} />
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}90`, lineHeight: 1.4, position: "relative", zIndex: 1, marginBottom: 32 }}>
              &ldquo;In the heart of Tribeca, where the cobblestones remember and the future is being written.&rdquo;
            </p>
            <p style={{ fontSize: 16, color: `${C.paper}70`, lineHeight: 1.8, position: "relative", zIndex: 1 }}>
              Art, film, food, culture — they all converge here. Tribeca has always been a neighborhood of reinvention, where the creative class builds the future in old brick buildings. CX lives in that energy. The neighborhood is the first impression; the room is the revelation.
            </p>
          </div>
        </Reveal>

        <div style={{ height: 1, background: `linear-gradient(90deg, transparent, ${C.paper}10, transparent)`, margin: "40px 0 0" }} />
      </section>


      {/* ═══════════ A NIGHT AT CX TRIBECA ═══════════ */}
      <section style={{ padding: "80px 8% 140px", maxWidth: 1300, margin: "0 auto" }}>
        <Reveal>
          <p style={{ fontSize: 11, letterSpacing: "0.35em", textTransform: "uppercase", color: `${C.violet}80`, marginBottom: 20 }}>A Night at CX Tribeca</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(36px, 5vw, 68px)", fontWeight: 300, lineHeight: 1.08, color: C.paper, marginBottom: 20 }}>
            What it feels like
          </h2>
        </Reveal>
        <Reveal delay={120}>
          <p style={{ fontSize: 14, color: `${C.violet}90`, fontStyle: "italic", letterSpacing: "0.05em", marginBottom: 64 }}>A film treatment in six acts</p>
        </Reveal>

        {/* Narrative timeline */}
        <div style={{ position: "relative", paddingLeft: 40 }}>
          {/* Vertical line */}
          <div style={{ position: "absolute", left: 15, top: 20, bottom: 20, width: 1, background: `linear-gradient(to bottom, ${C.violet}50, ${C.violet}10)` }} />

          {[
            { time: "I", title: "Arrival", text: "You arrive. The light is warm — amber, not white. The door closes behind you and the city disappears. You\u2019re not outside anymore. You\u2019re somewhere." },
            { time: "II", title: "Recognition", text: "Cleo knows your name. Not because she was told — because she remembers. A quiet notification on the host\u2019s device. Your drink preference, your last conversation, who you should meet tonight." },
            { time: "III", title: "The Sound", text: "The sound is perfect — present but never intrusive. It fills the room the way candlelight fills a corner. You notice it because it\u2019s exactly right, not because it\u2019s loud." },
            { time: "IV", title: "The Table", text: "Someone at the Founders Table waves you over. You\u2019ve never met, but you will. The circular booth does what no straight line can — it makes everyone equal. There is no head of this table." },
            { time: "V", title: "The Shift", text: "By midnight, you\u2019ve had three conversations that changed how you think. About art. About business. About what you\u2019re doing with your one wild life. This is not small talk. This is the opposite." },
            { time: "VI", title: "The Return", text: "You leave knowing you\u2019ll be back Tuesday. Not because of the drinks or the music or the lighting — although all of those were perfect. Because of the feeling. The feeling that you were exactly where you were supposed to be." },
          ].map((act, i) => (
            <Reveal key={i} delay={i * 120}>
              <div style={{ position: "relative", marginBottom: i < 5 ? 32 : 0, padding: "24px 24px 24px 48px", border: `1px solid ${C.violet}15`, borderRadius: 12, background: `${C.violet}05` }}>
                <div style={{ position: "absolute", left: -40, top: 24, width: 30, height: 30, borderRadius: "50%", border: `1.5px solid ${C.violet}50`, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, color: C.violet, fontFamily: "'Cormorant Garamond', serif", fontWeight: 600, zIndex: 1 }}>{act.time}</div>
                <h4 style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 24, fontWeight: 400, color: C.paper, marginBottom: 8 }}>{act.title}</h4>
                <p style={{ fontSize: 15, color: `${C.paper}90`, lineHeight: 1.8, fontFamily: "'Cormorant Garamond', serif", fontWeight: 300 }}>{act.text}</p>
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
            <div style={{ position: "absolute", top: -100, left: "20%", width: 400, height: 400, borderRadius: "50%", background: `radial-gradient(circle, ${C.violet}10, transparent)`, filter: "blur(80px)" }} />
            <div style={{ position: "absolute", bottom: -100, right: "20%", width: 300, height: 300, borderRadius: "50%", background: `radial-gradient(circle, ${C.purple}08, transparent)`, filter: "blur(60px)" }} />

            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "clamp(32px, 5vw, 64px)", fontWeight: 300, fontStyle: "italic", color: `${C.paper}80`, lineHeight: 1.3, position: "relative", zIndex: 1, marginBottom: 48 }}>
              &ldquo;The best rooms don&apos;t<br />just hold people.<br />
              <span style={{ fontWeight: 600, fontStyle: "normal", color: C.paper }}>They hold possibility.</span>&rdquo;
            </p>

            <div style={{ width: 80, height: 1, background: `linear-gradient(90deg, transparent, ${C.violet}40, transparent)`, margin: "0 auto 48px" }} />

            <Reveal delay={200}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
                <Link href="/members" className="cta-btn" style={{ display: "inline-block", padding: "14px 40px", border: `1px solid ${C.violet}50`, borderRadius: 40, color: C.paper, fontSize: 14, letterSpacing: "0.1em", textDecoration: "none", textTransform: "uppercase", background: `${C.violet}10` }}>
                  Experience CX Tribeca
                </Link>
                <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
                  <Link href="/calendar" style={{ fontSize: 13, color: `${C.violet}90`, textDecoration: "none", borderBottom: `1px solid ${C.violet}30`, transition: "color 0.3s" }}>
                    View Calendar
                  </Link>
                  <Link href="/source" style={{ fontSize: 13, color: `${C.muted}80`, textDecoration: "none", borderBottom: `1px solid ${C.muted}30`, transition: "color 0.3s" }}>
                    ← Source of Truth
                  </Link>
                </div>
              </div>
            </Reveal>
          </div>
        </Reveal>
      </section>

      {/* Star dust footer decoration */}
      <div style={{ position: "relative", height: 120, overflow: "hidden" }}>
        <svg viewBox="0 0 960 120" style={{ width: "100%", height: "100%", opacity: 0.3 }}>
          {[[80,20],[160,60],[240,30],[320,80],[400,15],[480,55],[560,25],[640,70],[720,35],[800,65],[880,45],[120,90],[200,50],[360,45],[520,85],[680,40],[760,95],[840,20]].map(([x,y], i) => (
            <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 1.2 : 0.6} fill={C.violet} opacity={0.3 + (i % 4) * 0.1}>
              {i % 5 === 0 && <animate attributeName="opacity" values="0.2;0.6;0.2" dur={`${3 + (i % 3)}s`} repeatCount="indefinite" />}
            </circle>
          ))}
        </svg>
      </div>
    </div>
  );
}
