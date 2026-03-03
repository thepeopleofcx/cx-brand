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
  green: "#08F22F",
  gold: "#E8D5B7",
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

/* ─── Constellation Background ─── */
function ConstellationBg() {
  const stars = useRef<{ x: number; y: number; r: number; o: number; speed: number }[]>([]);
  if (stars.current.length === 0) {
    for (let i = 0; i < 100; i++) {
      stars.current.push({
        x: Math.random() * 100,
        y: Math.random() * 100,
        r: Math.random() * 1.5 + 0.3,
        o: Math.random() * 0.4 + 0.1,
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

/* ─── Section Card ─── */
function SectionCard({ title, icon, color, children, delay = 0 }: { title: string; icon: string; color: string; children: ReactNode; delay?: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Reveal delay={delay}>
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          background: hovered ? `${color}08` : `${C.paper}04`,
          border: `1px solid ${hovered ? `${color}30` : `${C.paper}08`}`,
          borderRadius: 16,
          padding: "40px 36px",
          marginBottom: 20,
          transition: "all 0.5s cubic-bezier(0.23,1,0.32,1)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <span style={{ fontSize: 22, color, opacity: 0.7 }}>{icon}</span>
          <h3 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 24, fontWeight: 300, color: C.paper,
            margin: 0, letterSpacing: "0.04em",
          }}>
            {title}
          </h3>
        </div>
        <div style={{ fontFamily: "'Inter', sans-serif", fontSize: 14, color: `${C.paper}90`, lineHeight: 1.8 }}>
          {children}
        </div>
      </div>
    </Reveal>
  );
}

/* ─── Link Pill ─── */
function LinkPill({ href, label, color, external = false }: { href: string; label: string; color: string; external?: boolean }) {
  const [hovered, setHovered] = useState(false);
  const Tag = external ? "a" : Link;
  const props = external ? { href, target: "_blank", rel: "noopener noreferrer" } : { href };
  return (
    <Tag
      {...props as any}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        padding: "10px 20px", borderRadius: 100,
        background: hovered ? `${color}15` : `${color}08`,
        border: `1px solid ${hovered ? `${color}40` : `${color}20`}`,
        color: hovered ? color : `${color}CC`,
        fontFamily: "'Inter', sans-serif",
        fontSize: 13, fontWeight: 400, letterSpacing: "0.02em",
        textDecoration: "none",
        transition: "all 0.3s ease",
        cursor: "pointer",
      }}
    >
      {label}
      <span style={{ fontSize: 11, opacity: 0.5 }}>{external ? "↗" : "→"}</span>
    </Tag>
  );
}

/* ─── Checklist Item ─── */
function CheckItem({ children, color = C.paper }: { children: ReactNode; color?: string }) {
  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "8px 0" }}>
      <span style={{ color: `${color}50`, fontSize: 14, marginTop: 2, flexShrink: 0 }}>○</span>
      <span>{children}</span>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════════ */
export default function OnboardingPage() {
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
        background: `radial-gradient(circle, ${C.pink}08, transparent 70%)`,
        pointerEvents: "none", zIndex: 1, transition: "left 0.1s, top 0.1s",
      }} />

      <ConstellationBg />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 800, margin: "0 auto", padding: "0 24px" }}>

        {/* back link */}
        <div style={{ padding: "32px 0 0" }}>
          <Link href="/source" style={{ color: `${C.muted}60`, textDecoration: "none", fontSize: 12, fontFamily: "'Inter', sans-serif", letterSpacing: "0.08em" }}>
            ← SOURCE OF TRUTH
          </Link>
        </div>

        {/* ─── Hero ─── */}
        <section style={{ textAlign: "center", padding: "80px 0 60px" }}>
          <Reveal>
            <p style={{
              fontFamily: "'Inter', sans-serif", fontSize: 11, letterSpacing: "0.25em",
              color: `${C.pink}60`, textTransform: "uppercase", marginBottom: 24,
            }}>
              WELCOME TO CX
            </p>
          </Reveal>
          <Reveal delay={100}>
            <h1 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(40px, 7vw, 72px)",
              fontWeight: 300, lineHeight: 1.1,
              margin: "0 0 20px",
              color: C.paper,
            }}>
              Onboarding
            </h1>
          </Reveal>
          <Reveal delay={200}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 20, fontWeight: 300, fontStyle: "italic",
              color: `${C.muted}70`, maxWidth: 460, margin: "0 auto",
              lineHeight: 1.6,
            }}>
              Everything you need to find your orbit
            </p>
          </Reveal>
        </section>

        {/* ─── Welcome Message ─── */}
        <Reveal>
          <div style={{
            textAlign: "center", maxWidth: 560, margin: "0 auto 60px",
            padding: "40px 32px",
            background: `${C.pink}06`,
            border: `1px solid ${C.pink}15`,
            borderRadius: 16,
          }}>
            <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 300, color: C.paper, margin: "0 0 12px" }}>
              Welcome, Mabel ◌
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: `${C.muted}80`, lineHeight: 1.7, margin: 0 }}>
              Community Manager · Start Date: March 2, 2026
            </p>
            <div style={{ width: 40, height: 1, background: `${C.pink}30`, margin: "20px auto" }} />
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: 13, color: `${C.paper}70`, lineHeight: 1.8, margin: 0 }}>
              You are the connective tissue of CX — nurturing relationships, onboarding members and connectors, and cultivating the community pulse across all channels.
            </p>
          </div>
        </Reveal>

        {/* ─── Your Role ─── */}
        <SectionCard title="Your Role" icon="◌" color={C.pink} delay={0}>
          <p style={{ margin: "0 0 16px", color: `${C.paper}80` }}>
            As Community Manager, you are responsible for three core areas:
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginTop: 16 }}>
            <div style={{ padding: "20px", background: `${C.paper}04`, borderRadius: 12, border: `1px solid ${C.paper}06` }}>
              <div style={{ fontSize: 13, color: C.pink, fontWeight: 500, marginBottom: 8, letterSpacing: "0.04em" }}>Members & Connectors</div>
              <div style={{ fontSize: 12, color: `${C.paper}60`, lineHeight: 1.7 }}>
                Manage all membership tiers, onboard new members, support connectors, and maintain the community directory.
              </div>
            </div>
            <div style={{ padding: "20px", background: `${C.paper}04`, borderRadius: 12, border: `1px solid ${C.paper}06` }}>
              <div style={{ fontSize: 13, color: C.cyan, fontWeight: 500, marginBottom: 8, letterSpacing: "0.04em" }}>Social Media</div>
              <div style={{ fontSize: 12, color: `${C.paper}60`, lineHeight: 1.7 }}>
                Own the CX social media presence — content creation, community engagement, brand voice across platforms.
              </div>
            </div>
            <div style={{ padding: "20px", background: `${C.paper}04`, borderRadius: 12, border: `1px solid ${C.paper}06` }}>
              <div style={{ fontSize: 13, color: C.purple, fontWeight: 500, marginBottom: 8, letterSpacing: "0.04em" }}>Community Pulse</div>
              <div style={{ fontSize: 12, color: `${C.paper}60`, lineHeight: 1.7 }}>
                Be the eyes and ears of the community — surface feedback, track engagement, and keep the energy alive.
              </div>
            </div>
          </div>
        </SectionCard>

        {/* ─── Who You'll Work With ─── */}
        <SectionCard title="Your Team" icon="✦" color={C.purple} delay={100}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[
              { name: "William Etundi Jr.", role: "Founder & CEO", color: C.purple, note: "Vision and strategy. Your north star for brand direction." },
              { name: "Christine Hauer", role: "Head of Operations / COO", color: C.orange, note: "Your direct partner on day-to-day operations, systems, and processes." },
              { name: "Rose", role: "Curation & Connectors Lead", color: C.cyan, note: "Curates experiences and leads the connector program. Close collaborator." },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 14, padding: "14px 16px", background: `${C.paper}04`, borderRadius: 10, border: `1px solid ${C.paper}06` }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, marginTop: 6, flexShrink: 0, opacity: 0.7 }} />
                <div>
                  <div style={{ fontSize: 14, color: C.paper, marginBottom: 2 }}>
                    <strong style={{ fontWeight: 500 }}>{p.name}</strong>
                    <span style={{ color: `${C.muted}60`, marginLeft: 8, fontSize: 12 }}>{p.role}</span>
                  </div>
                  <div style={{ fontSize: 12, color: `${C.paper}50`, lineHeight: 1.6 }}>{p.note}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <LinkPill href="/team" label="Full Team & Tools" color={C.purple} />
          </div>
        </SectionCard>

        {/* ─── First Week Checklist ─── */}
        <SectionCard title="First Week Checklist" icon="☐" color={C.green} delay={200}>
          <CheckItem color={C.green}>Read the <span style={{ color: C.orange }}>Source of Truth</span> — understand the CX brand story, Sacred Geometry, and membership tiers</CheckItem>
          <CheckItem color={C.green}>Review the <span style={{ color: C.orange }}>CX Calendar</span> — know the 2026 programming, seasonal themes, and event cadence</CheckItem>
          <CheckItem color={C.green}>Review the <span style={{ color: C.orange }}>Communication page</span> — understand CX Media, PR, and Reputation pillars</CheckItem>
          <CheckItem color={C.green}>Walk the venue with Christine — learn the space, the Founders Table, the atmosphere</CheckItem>
          <CheckItem color={C.green}>Get access to all social media accounts and content tools</CheckItem>
          <CheckItem color={C.green}>Meet Rose — align on the connector program and community curation</CheckItem>
          <CheckItem color={C.green}>Set up your workspace — tools, logins, communication channels</CheckItem>
          <CheckItem color={C.green}>Attend your first CX Tribeca New Member Night (Tuesdays)</CheckItem>
        </SectionCard>

        {/* ─── Key Pages ─── */}
        <SectionCard title="Your Essential Pages" icon="◎" color={C.orange} delay={300}>
          <p style={{ margin: "0 0 20px", color: `${C.paper}70` }}>
            These are the living documents that define CX. Bookmark them — they evolve as we do.
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            <LinkPill href="/source" label="Source of Truth" color={C.orange} />
            <LinkPill href="/calendar" label="Calendar 2026" color={C.pink} />
            <LinkPill href="/communication" label="Communication" color={C.cyan} />
            <LinkPill href="/membership" label="Membership" color={C.gold} />
            <LinkPill href="/operations" label="Operations" color={C.blue} />
            <LinkPill href="/team" label="Team & Tools" color={C.purple} />
            <LinkPill href="/ops" label="Ops Dashboard" color={C.green} />
          </div>
        </SectionCard>

        {/* ─── The CX Philosophy ─── */}
        <SectionCard title="The CX Philosophy" icon="∞" color={C.gold} delay={400}>
          <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 18, fontWeight: 300, fontStyle: "italic", color: `${C.paper}70`, lineHeight: 1.8, marginBottom: 16 }}>
            &ldquo;CX was born from the idea that connection is infinite — that when you bring the right people into the right space, something sacred happens.&rdquo;
          </div>
          <p style={{ margin: "0 0 12px", color: `${C.paper}60` }}>
            <strong style={{ color: C.paper, fontWeight: 500 }}>C</strong> is the Heroine&rsquo;s Journey — Cleo, the internal world, the brand&rsquo;s soul.
          </p>
          <p style={{ margin: "0 0 12px", color: `${C.paper}60` }}>
            <strong style={{ color: C.paper, fontWeight: 500 }}>X</strong> is the Hero&rsquo;s Journey — Live Events, the external world, the experiences that bring people together.
          </p>
          <p style={{ margin: 0, color: `${C.paper}60` }}>
            Where C meets X, connection is born. That&rsquo;s where you come in — you are the bridge between brand and community.
          </p>
        </SectionCard>

        {/* ─── Membership Overview ─── */}
        <SectionCard title="Membership Tiers" icon="✦" color={C.gold} delay={500}>
          <p style={{ margin: "0 0 20px", color: `${C.paper}70` }}>
            You&rsquo;ll manage members across three tiers. Each tier has a credit allocation:
          </p>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { name: "Member", credits: 50, color: C.cyan },
              { name: "Patron", credits: 75, color: C.orange },
              { name: "Lifetime", credits: 100, color: C.gold },
            ].map((t, i) => (
              <div key={i} style={{
                flex: "1 1 140px", textAlign: "center",
                padding: "20px 16px", background: `${t.color}08`,
                border: `1px solid ${t.color}15`, borderRadius: 12,
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 28, color: t.color, fontWeight: 300 }}>{t.credits}</div>
                <div style={{ fontSize: 10, color: `${t.color}80`, letterSpacing: "0.12em", marginTop: 4 }}>CREDITS</div>
                <div style={{ fontSize: 13, color: C.paper, marginTop: 8 }}>{t.name}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 16 }}>
            <LinkPill href="/membership" label="Full Membership Details" color={C.gold} />
          </div>
        </SectionCard>

        {/* ─── Social Media ─── */}
        <SectionCard title="Social Media Responsibilities" icon="◉" color={C.cyan} delay={600}>
          <CheckItem color={C.cyan}>Own the CX voice across Instagram, TikTok, and other platforms</CheckItem>
          <CheckItem color={C.cyan}>Create and schedule content aligned with seasonal themes (Spring: Dirt/Soil, Summer: Sun/Burn, Autumn: Over/Change)</CheckItem>
          <CheckItem color={C.cyan}>Capture and share event moments — photos, stories, community highlights</CheckItem>
          <CheckItem color={C.cyan}>Engage with members and connectors online — respond, repost, build relationships</CheckItem>
          <CheckItem color={C.cyan}>Track engagement metrics and report on community growth</CheckItem>
          <CheckItem color={C.cyan}>Coordinate with CX Media and CX PR pillars (see Communication page)</CheckItem>
        </SectionCard>

        {/* ─── Bottom ─── */}
        <Reveal>
          <section style={{ textAlign: "center", padding: "60px 0 100px" }}>
            <div style={{ fontSize: 28, color: `${C.pink}25`, marginBottom: 20 }}>◌</div>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: 18, fontWeight: 300, fontStyle: "italic",
              color: `${C.muted}40`, lineHeight: 1.6,
              maxWidth: 400, margin: "0 auto",
            }}>
              You&rsquo;re not just joining a team.<br />
              You&rsquo;re entering a constellation.
            </p>
            <p style={{
              fontFamily: "'Inter', sans-serif",
              fontSize: 11, color: `${C.muted}25`, marginTop: 20,
              letterSpacing: "0.08em",
            }}>
              March 2, 2026 · Day One
            </p>
          </section>
        </Reveal>

      </div>
    </div>
  );
}
