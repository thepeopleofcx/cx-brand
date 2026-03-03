'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

/* ── colors ── */
const C = {
  bg: '#0B0B0C',
  card: '#111',
  border: '#222',
  weekendBg: '#0D0D0E',
  pink: '#FF00B4',
  cyan: '#00D4AA',
  orange: '#FD7E01',
  teal: '#A78BFA',
  purple: '#9750CD',
  gray: '#888',
  white: '#F2F2F2',
  dim: '#666',
};

/* ── types ── */
type EventTag = {
  label: string;
  color: string;
  color2?: string;
  italic?: boolean;
  bold?: boolean;
  circled?: boolean;
};

type SpecialEvent = { day: number; tags: EventTag[] };

type MonthData = {
  month: number;
  year: number;
  specials: SpecialEvent[];
  triEventDays?: 'sat-only' | 'tue-sat';
};

/* ── helpers ── */
function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDayOfWeek(y: number, m: number) {
  return new Date(y, m, 1).getDay();
}
function isLastSaturday(y: number, m: number, d: number) {
  const date = new Date(y, m, d);
  if (date.getDay() !== 6) return false;
  return d + 7 > getDaysInMonth(y, m);
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* ── moon data 2027 (month 0-indexed) ── */
const MOONS: Record<number, { day: number; type: 'full' | 'new' }[]> = {
  0:  [{ day: 22, type: 'full' }, { day: 7, type: 'new' }],
  1:  [{ day: 20, type: 'full' }, { day: 6, type: 'new' }],
  2:  [{ day: 22, type: 'full' }, { day: 8, type: 'new' }],
  3:  [{ day: 20, type: 'full' }, { day: 6, type: 'new' }],
  4:  [{ day: 20, type: 'full' }, { day: 6, type: 'new' }],
  5:  [{ day: 18, type: 'full' }, { day: 4, type: 'new' }],
  6:  [{ day: 18, type: 'full' }, { day: 3, type: 'new' }],
  7:  [{ day: 17, type: 'full' }, { day: 2, type: 'new' }, { day: 31, type: 'new' }],
  8:  [{ day: 15, type: 'full' }, { day: 29, type: 'new' }],
  9:  [{ day: 15, type: 'full' }, { day: 29, type: 'new' }],
  10: [{ day: 13, type: 'full' }, { day: 27, type: 'new' }],
  11: [{ day: 13, type: 'full' }, { day: 27, type: 'new' }],
};

/* ── solstices & equinoxes 2027 ── */
const SOLSTICES: { month: number; day: number; label: string }[] = [
  { month: 2, day: 20, label: '🌱 Spring Equinox' },
  { month: 5, day: 21, label: '☀️ Summer Solstice' },
  { month: 8, day: 22, label: '🍂 Autumn Equinox' },
  { month: 11, day: 21, label: '🌙 Winter Solstice' },
];

/* ── recurring event builder ── */
function getRecurringEvents(y: number, m: number, d: number, dow: number, triMode: 'sat-only' | 'tue-sat'): EventTag[] {
  const tags: EventTag[] = [];
  // Tuesday
  if (dow === 2) {
    tags.push({ label: 'CX Tribeca (New Members)', color: C.teal });
    tags.push({ label: 'Member Email', color: C.cyan });
    tags.push({ label: 'Carousel', color: C.pink });
  }
  // Thursday
  if (dow === 4) {
    tags.push({ label: 'Network Email', color: C.cyan });
    tags.push({ label: 'Carousel', color: C.pink });
  }
  // CX Tribeca
  if (triMode === 'tue-sat' && dow >= 2 && dow <= 6) {
    tags.push({ label: 'CX Tribeca', color: C.teal });
  }
  // XXXXXXX - last saturday (May-Sep, Nov)
  if (isLastSaturday(y, m, d) && [4,5,6,7,8,10].includes(m)) {
    tags.push({ label: 'XXXXXXX', color: C.orange });
  }
  // Halloween - every Friday & Saturday in October
  if (m === 9 && (dow === 5 || dow === 6)) {
    tags.push({ label: 'Halloween', color: C.orange });
  }
  // Solstices & Equinoxes
  for (const sol of SOLSTICES) {
    if (sol.month === m && sol.day === d) {
      tags.push({ label: sol.label, color: '#FFD700' });
    }
  }
  // Moons
  const moonMonth = MOONS[m];
  if (moonMonth) {
    for (const moon of moonMonth) {
      if (moon.day === d) {
        tags.push({ label: moon.type === 'full' ? '🌕 Full Moon' : '🌑 New Moon', color: '#E8D5B7' });
      }
    }
  }
  return tags;
}

/* ── month data 2027 ── */
const MONTHS_2027: MonthData[] = [
  {
    month: 0, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }, { label: "New Year's Day", color: C.gray, circled: true }] },
      { day: 19, tags: [{ label: 'MLK Day', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 1, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 14, tags: [{ label: "Valentine's Day", color: C.gray, circled: true }] },
    ],
  },
  {
    month: 2, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }, { label: 'Hardcore Investors', color: C.cyan }] },
      { day: 17, tags: [{ label: "St. Patrick's Day", color: C.gray, circled: true }] },
    ],
  },
  {
    month: 3, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 4, tags: [{ label: 'Easter', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 4, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 25, tags: [{ label: 'Memorial Day', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 5, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }, { label: 'Hardcore Investors', color: C.cyan }] },
      { day: 19, tags: [{ label: 'Juneteenth', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 6, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 4, tags: [{ label: 'July 4th', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 7, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
    ],
  },
  {
    month: 8, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }, { label: 'Hardcore Investors', color: C.cyan }] },
      { day: 6, tags: [{ label: 'Labor Day', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 9, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 11, tags: [{ label: 'Columbus Day', color: C.gray, circled: true }] },
      { day: 31, tags: [{ label: 'Halloween', color: C.orange }] },
    ],
  },
  {
    month: 10, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 11, tags: [{ label: 'Veterans Day', color: C.gray, circled: true }] },
      { day: 25, tags: [{ label: 'Thanksgiving', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 11, year: 2027, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }, { label: 'Hardcore Investors', color: C.cyan }] },
      { day: 24, tags: [{ label: 'Christmas Eve', color: C.gray, circled: true }] },
      { day: 25, tags: [{ label: 'Christmas Day', color: C.gray, circled: true }] },
      { day: 31, tags: [{ label: "New Year's Eve", color: C.orange }] },
    ],
  },
];

/* ── Scroll reveal hook ── */
function useReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, visible };
}

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, visible } = useReveal();
  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.8s ease ${delay}ms, transform 0.8s ease ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

/* ── Filter categories ── */
const FILTER_CATEGORIES: { id: string; label: string; color: string; labels: string[] }[] = [
  { id: 'content', label: 'Content / Social', color: C.pink, labels: ['Carousel', 'IG Reel'] },
  { id: 'comms', label: 'Communications', color: C.cyan, labels: ['Member Email', 'Network Email', 'VIP Email', 'Hardcore Investors'] },
  { id: 'tribeca', label: 'CX Tribeca', color: C.teal, labels: ['CX Tribeca', 'CX Tribeca (New Members)'] },
  { id: 'events', label: 'CX Chelsea', color: C.orange, labels: ['XXXXXXX', 'Halloween', "New Year's Eve"] },
  { id: 'moons', label: 'Moons', color: '#E8D5B7', labels: ['🌑 New Moon', '🌕 Full Moon'] },
  { id: 'solstice', label: 'Solstices & Equinoxes', color: '#FFD700', labels: ['☀️ Summer Solstice', '🌙 Winter Solstice', '🌱 Spring Equinox', '🍂 Autumn Equinox'] },
  { id: 'holidays', label: 'Holidays', color: C.gray, labels: [] },
];

function getFilterId(tag: EventTag): string {
  if (tag.circled) return 'holidays';
  for (const cat of FILTER_CATEGORIES) {
    if (cat.labels.some(l => tag.label.includes(l) || tag.label === l)) return cat.id;
  }
  return 'events';
}

/* ── Month Calendar ── */
function MonthCalendar({ data, activeFilters }: { data: MonthData; activeFilters: Set<string> }) {
  const { month, year, specials, triEventDays } = data;
  const daysInMonth = getDaysInMonth(year, month);
  const firstDow = getFirstDayOfWeek(year, month);
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const specialMap = new Map<number, EventTag[]>();
  for (const s of specials) {
    specialMap.set(s.day, s.tags);
  }

  const cells: React.ReactNode[] = [];

  for (let i = 0; i < 7; i++) {
    cells.push(
      <div key={`h-${i}`} style={{
        padding: '8px 4px',
        textAlign: 'center',
        fontSize: '11px',
        fontFamily: 'Inter, sans-serif',
        color: C.dim,
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        borderBottom: `1px solid ${C.border}`,
      }}>
        {dayNames[i]}
      </div>
    );
  }

  for (let i = 0; i < firstDow; i++) {
    cells.push(<div key={`e-${i}`} style={{ borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }} />);
  }

  for (let d = 1; d <= daysInMonth; d++) {
    const dow = (firstDow + d - 1) % 7;
    const isWeekend = dow === 0 || dow === 6;
    const recurring = getRecurringEvents(year, month, d, dow, triEventDays || 'tue-sat');
    const special = specialMap.get(d) || [];
    const allTags = [...special, ...recurring];

    const seen = new Set<string>();
    const dedupedTags = allTags.filter(t => {
      const key = t.label;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).filter(t => {
      return activeFilters.has(getFilterId(t));
    });

    const hasCircled = dedupedTags.some(t => t.circled);

    cells.push(
      <div key={`d-${d}`} style={{
        padding: '4px',
        minHeight: '70px',
        borderBottom: `1px solid ${C.border}`,
        borderRight: `1px solid ${C.border}`,
        background: isWeekend ? C.weekendBg : 'transparent',
        position: 'relative',
      }}>
        <div style={{
          fontSize: '13px',
          fontFamily: 'Inter, sans-serif',
          fontWeight: 600,
          color: C.white,
          marginBottom: '3px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: hasCircled ? '22px' : 'auto',
          height: hasCircled ? '22px' : 'auto',
          borderRadius: hasCircled ? '50%' : '0',
          border: hasCircled ? `1.5px solid ${C.gray}` : 'none',
        }}>
          {d}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1px' }}>
          {dedupedTags.map((tag, i) => (
            <span key={i} style={{
              fontSize: '8px',
              fontFamily: 'Inter, sans-serif',
              color: tag.color,
              fontStyle: tag.italic ? 'italic' : 'normal',
              fontWeight: tag.bold ? 700 : 400,
              lineHeight: '1.3',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              background: tag.circled ? 'none' : `${tag.color}15`,
              padding: '1px 3px',
              borderRadius: '2px',
            }}>
              {tag.label}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <RevealSection>
      <div style={{ marginBottom: '60px' }}>
        <h2 style={{
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: 'clamp(28px, 4vw, 42px)',
          fontWeight: 300,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          marginBottom: '20px',
          color: C.white,
        }}>
          {MONTH_NAMES[month]} {year}
        </h2>
        <div style={{
          background: C.card,
          borderRadius: '12px',
          border: `1px solid ${C.border}`,
          overflow: 'hidden',
          overflowX: 'auto',
        }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, minmax(100px, 1fr))',
            minWidth: '700px',
          }}>
            {cells}
          </div>
        </div>
      </div>
    </RevealSection>
  );
}

/* ── Legend pill ── */
function LegendItem({ label, color, dimmed }: { label: string; color: string; italic?: boolean; bold?: boolean; dimmed?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: dimmed ? 0.3 : 1, transition: 'opacity 0.2s ease' }}>
      <span style={{
        width: '12px', height: '12px', borderRadius: '3px',
        background: color, flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: '13px', color: C.white,
      }}>
        {label}
      </span>
    </div>
  );
}

/* ── Filter toggle button ── */
function FilterButton({ category, active, onToggle }: { category: typeof FILTER_CATEGORIES[number]; active: boolean; onToggle: () => void }) {
  return (
    <button
      onClick={onToggle}
      style={{
        display: 'flex', alignItems: 'center', gap: '10px',
        background: active ? `${category.color}18` : `${C.card}`,
        border: `1px solid ${active ? category.color : C.border}`,
        borderRadius: '8px',
        padding: '10px 16px',
        cursor: 'pointer',
        opacity: active ? 1 : 0.4,
        transition: 'all 0.2s ease',
        width: '100%',
      }}
    >
      <span style={{
        width: '10px', height: '10px', borderRadius: '3px',
        background: category.color, flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: '13px', color: C.white,
        fontWeight: 500,
      }}>
        {category.label}
      </span>
    </button>
  );
}

/* ── Year Navigation ── */
function YearNav() {
  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', position: 'relative' }}>
      <Link href="/calendar" style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: 500,
        letterSpacing: '0.15em',
        color: C.dim,
        textDecoration: 'none',
        padding: '8px 20px',
        borderRadius: '6px',
        border: `1px solid ${C.border}`,
        transition: 'all 0.2s ease',
        opacity: 0.5,
      }}>
        2026
      </Link>
      <span style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '14px',
        fontWeight: 600,
        letterSpacing: '0.15em',
        color: C.white,
        padding: '8px 20px',
        borderRadius: '6px',
        border: `1px solid ${C.dim}`,
        background: `${C.white}10`,
      }}>
        2027
      </span>
    </div>
  );
}

/* ── Main Page ── */
export default function Calendar2027Page() {
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(FILTER_CATEGORIES.map(c => c.id)));

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Inter:wght@300;400;500;600;700&display=swap');
      `}</style>

      {/* Hero */}
      <section style={{
        position: 'relative',
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        overflow: 'hidden',
        padding: '80px 20px',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(29,191,191,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,0,180,0.08) 0%, transparent 60%)',
          animation: 'morphBg 12s ease-in-out infinite alternate',
        }} />
        <div style={{
          position: 'absolute', inset: 0, opacity: 0.04, pointerEvents: 'none',
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '128px 128px',
        }} />
        <style>{`
          @keyframes morphBg {
            0% { transform: scale(1) rotate(0deg); }
            100% { transform: scale(1.15) rotate(3deg); }
          }
        `}</style>
        <RevealSection>
          <h1 style={{
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(36px, 7vw, 72px)',
            fontWeight: 300,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: C.white,
            marginBottom: '16px',
            position: 'relative',
          }}>
            CX Calendar
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: C.dim,
            position: 'relative',
          }}>
            2027
          </p>
          <YearNav />
        </RevealSection>
      </section>

      {/* Legend */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 40px' }}>
        <RevealSection delay={100}>
          <div style={{
            background: C.card,
            borderRadius: '12px',
            border: `1px solid ${C.border}`,
            padding: '24px 32px',
          }}>
            <h3 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '20px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: C.dim,
              marginBottom: '8px',
            }}>
              Filter Categories
            </h3>
            <p style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '12px',
              color: C.dim,
              marginBottom: '16px',
            }}>
              Click to show/hide categories on the calendar
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: '8px',
              marginBottom: '20px',
            }}>
              {FILTER_CATEGORIES.map(cat => (
                <FilterButton key={cat.id} category={cat} active={activeFilters.has(cat.id)} onToggle={() => toggleFilter(cat.id)} />
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${C.border}`, paddingTop: '16px' }}>
              <h4 style={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '16px',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: C.dim,
                marginBottom: '12px',
              }}>
                Legend
              </h4>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                gap: '10px',
              }}>
                <LegendItem label="Carousel Post (Tue)" color={C.pink} dimmed={!activeFilters.has('content')} />
                <LegendItem label="Carousel Post (Thu)" color={C.pink} dimmed={!activeFilters.has('content')} />
                <LegendItem label="IG Reel (1st monthly)" color={C.pink} dimmed={!activeFilters.has('content')} />

                <LegendItem label="Member Email (Tue)" color={C.cyan} dimmed={!activeFilters.has('comms')} />
                <LegendItem label="Network Email (Thu)" color={C.cyan} dimmed={!activeFilters.has('comms')} />
                <LegendItem label="VIP Email (1st monthly)" color={C.cyan} dimmed={!activeFilters.has('comms')} />
                <LegendItem label="Hardcore Investors (Quarterly)" color={C.cyan} dimmed={!activeFilters.has('comms')} />

                <LegendItem label="CX Tribeca" color={C.teal} dimmed={!activeFilters.has('tribeca')} />
                <LegendItem label="CX Tribeca (New Members)" color={C.teal} dimmed={!activeFilters.has('tribeca')} />

                <LegendItem label="XXXXXXX" color={C.orange} dimmed={!activeFilters.has('events')} />
                <LegendItem label="Halloween (Oct Weekends)" color={C.orange} dimmed={!activeFilters.has('events')} />
                <LegendItem label="New Year's Eve" color={C.orange} dimmed={!activeFilters.has('events')} />

                <LegendItem label="🌕 Full Moon" color={'#E8D5B7'} dimmed={!activeFilters.has('moons')} />
                <LegendItem label="🌑 New Moon" color={'#E8D5B7'} dimmed={!activeFilters.has('moons')} />

                <LegendItem label="🌱 Spring Equinox (Mar 20)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />
                <LegendItem label="☀️ Summer Solstice (Jun 21)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />
                <LegendItem label="🍂 Autumn Equinox (Sep 22)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />
                <LegendItem label="🌙 Winter Solstice (Dec 21)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />

                <LegendItem label="Holiday" color={C.gray} dimmed={!activeFilters.has('holidays')} />
              </div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Cadence */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 60px' }}>
        <RevealSection delay={200}>
          <div style={{
            background: C.card,
            borderRadius: '12px',
            border: `1px solid ${C.border}`,
            padding: '24px 32px',
          }}>
            <h3 style={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: '20px',
              fontWeight: 400,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: C.dim,
              marginBottom: '16px',
            }}>
              Communication Cadence
            </h3>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
              gap: '12px',
              fontFamily: 'Inter, sans-serif',
              fontSize: '13px',
              color: C.white,
              lineHeight: '1.8',
            }}>
              <div><span style={{ color: C.pink }}>●</span> Carousel Posts — <b>Tue &amp; Thu</b></div>
              <div><span style={{ color: C.pink }}>●</span> Member Email — <b>Every Tuesday</b></div>
              <div><span style={{ color: C.cyan }}>●</span> Network Email — <b>Every Thursday</b></div>
              <div><span style={{ color: C.orange }}>●</span> VIP Email + WhatsApp — <b>1st of Month</b></div>
              <div><span style={{ color: C.white }}>●</span> IG Reel — <b>1st of Month</b></div>
              <div><span style={{ color: C.teal }}>●</span> Hardcore Investors — <b>Quarterly</b></div>
            </div>
          </div>
        </RevealSection>
      </section>

      {/* Monthly Grids */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px 60px' }}>
        {MONTHS_2027.map((m) => (
          <MonthCalendar key={m.month} data={m} activeFilters={activeFilters} />
        ))}
      </section>

      {/* Footer */}
      <footer style={{
        textAlign: 'center',
        padding: '40px 20px 60px',
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: '16px',
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: C.dim,
      }}>
        CX 2027
      </footer>
    </>
  );
}
