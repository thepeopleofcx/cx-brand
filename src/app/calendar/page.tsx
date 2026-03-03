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
  color2?: string; // second color for split tags
  italic?: boolean;
  bold?: boolean;
  circled?: boolean;
};

type SpecialEvent = { day: number; tags: EventTag[] };

type MonthData = {
  month: number; // 0-indexed
  year: number;
  specials: SpecialEvent[];
  triEventDays?: 'sat-only' | 'tue-sat';
};

/* ── helpers ── */
function getDaysInMonth(y: number, m: number) {
  return new Date(y, m + 1, 0).getDate();
}
function getFirstDayOfWeek(y: number, m: number) {
  return new Date(y, m, 1).getDay(); // 0=Sun
}
function isLastSaturday(y: number, m: number, d: number) {
  const date = new Date(y, m, d);
  if (date.getDay() !== 6) return false;
  return d + 7 > getDaysInMonth(y, m);
}

const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];

/* ── color groups ── */
// 1. Content/Social → pink
// 2. Communications → cyan
// 3. CX Tribeca Programming → teal
// 4. Special Events → orange
// 5. Holidays → gray

/* ── moon data 2026 (month 0-indexed) ── */
const MOONS: Record<number, { day: number; type: 'full' | 'new' }[]> = {
  2:  [{ day: 3, type: 'full' }, { day: 18, type: 'new' }],
  3:  [{ day: 1, type: 'full' }, { day: 17, type: 'new' }],
  4:  [{ day: 1, type: 'full' }, { day: 16, type: 'new' }, { day: 31, type: 'full' }],
  5:  [{ day: 14, type: 'new' }, { day: 29, type: 'full' }],
  6:  [{ day: 14, type: 'new' }, { day: 29, type: 'full' }],
  7:  [{ day: 12, type: 'new' }, { day: 27, type: 'full' }],
  8:  [{ day: 10, type: 'new' }, { day: 26, type: 'full' }],
  9:  [{ day: 10, type: 'new' }, { day: 25, type: 'full' }],
  10: [{ day: 8, type: 'new' }, { day: 24, type: 'full' }],
  11: [{ day: 8, type: 'new' }, { day: 23, type: 'full' }],
};

/* ── solstices & equinoxes 2026 (month 0-indexed) ── */
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
    // New Member Night every Tuesday starting March 10, 2026
    const date = new Date(y, m, d);
    if (date >= new Date(2026, 2, 10)) {
      tags.push({ label: 'CX Tribeca (New Members)', color: C.teal });
    }
    tags.push({ label: 'Member Email', color: C.cyan });
    tags.push({ label: 'Carousel', color: C.pink });
  }
  // Thursday
  if (dow === 4) {
    tags.push({ label: 'Network Email', color: C.cyan });
    tags.push({ label: 'Carousel', color: C.pink });
  }
  // CX Tribeca
  if (triMode === 'sat-only' && dow === 6 && !(m === 2 && d === 7)) {
    tags.push({ label: 'CX Tribeca', color: C.teal });
  }
  if (triMode === 'tue-sat' && dow >= 2 && dow <= 6) {
    tags.push({ label: 'CX Tribeca', color: C.teal });
  }
  // XXXXXXX - last saturday (only in months May-Sep, Nov)
  if (isLastSaturday(y, m, d) && [4,5,6,7,8,10].includes(m)) {
    tags.push({ label: 'XXXXXXX', color: C.orange });
  }
  // Halloween - every Friday & Saturday in October
  if (m === 9 && (dow === 5 || dow === 6)) {
    tags.push({ label: 'Halloween', color: C.orange });
  }
  // Theme starts (shown on equinox/solstice days)
  if (m === 2 && d === 20) tags.push({ label: 'Theme: Dirt/Soil', color: '#C4956A' });
  if (m === 5 && d === 21) tags.push({ label: 'Theme: Sun/Burn', color: '#C4956A' });
  if (m === 8 && d === 22) tags.push({ label: 'Theme: Over/Change', color: '#C4956A' });

  // Solstices & Equinoxes
  for (const sol of SOLSTICES) {
    if (sol.month === m && sol.day === d) {
      tags.push({ label: sol.label, color: '#FFD700' });
    }
  }
  // Moons + Sub-Themes
  const moonMonth = MOONS[m];
  if (moonMonth) {
    for (const moon of moonMonth) {
      if (moon.day === d) {
        tags.push({ label: moon.type === 'full' ? '🌕 Full Moon' : '🌑 New Moon', color: '#E8D5B7' });
        // Sub-themes: full moon = first word, new moon = second word
        const dt = new Date(y, m, d);
        const springEq = new Date(2026, 2, 20);
        const summerSol = new Date(2026, 5, 21);
        const autumnEq = new Date(2026, 8, 22);
        const winterSol = new Date(2026, 11, 21);
        let subLabel = '';
        if (dt >= springEq && dt < summerSol) {
          subLabel = moon.type === 'full' ? 'Sub-Theme: Dirt' : 'Sub-Theme: Soil';
        } else if (dt >= summerSol && dt < autumnEq) {
          subLabel = moon.type === 'full' ? 'Sub-Theme: Sun' : 'Sub-Theme: Burn';
        } else if (dt >= autumnEq && dt < winterSol) {
          subLabel = moon.type === 'full' ? 'Sub-Theme: Over' : 'Sub-Theme: Change';
        }
        if (subLabel) tags.push({ label: subLabel, color: '#D4A574' });
      }
    }
  }
  return tags;
}

/* ── month data ── */
const MONTHS_2026: MonthData[] = [
  {
    month: 2, year: 2026, triEventDays: 'sat-only',
    specials: [
      { day: 1, tags: [{ label: 'VIP Email', color: C.cyan }, { label: 'Hardcore Investors', color: C.cyan }] },
      { day: 2, tags: [{ label: "Mabel's 1st Day", color: C.gray }] },
      { day: 8, tags: [{ label: "Women's Day", color: C.gray, circled: true }] },
      { day: 10, tags: [{ label: 'Private: Harvard', color: C.white }] },
      { day: 20, tags: [{ label: 'Easter', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 3, year: 2026, triEventDays: 'sat-only',
    specials: [
      { day: 1, tags: [{ label: 'VIP Email', color: C.cyan }] },
      { day: 23, tags: [{ label: 'IG Reel', color: C.pink }] },
      { day: 24, tags: [{ label: 'w/ Anderson .Paak', color: C.teal, color2: C.orange }, { label: 'CX Tribeca', color: C.teal }] },
    ],
  },
  {
    month: 4, year: 2026, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'Phase 2 CX Tribeca', color: C.gray }, { label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 25, tags: [{ label: 'Memorial Day', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 5, year: 2026, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }, { label: 'Hardcore Investors', color: C.cyan }] },
      { day: 19, tags: [{ label: 'Juneteenth', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 6, year: 2026, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 4, tags: [{ label: 'July 4th', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 7, year: 2026, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
    ],
  },
  {
    month: 8, year: 2026, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }, { label: 'Hardcore Investors', color: C.cyan }] },
      { day: 7, tags: [{ label: 'Labor Day', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 9, year: 2026, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 12, tags: [{ label: 'Columbus Day', color: C.gray, circled: true }] },
      { day: 31, tags: [{ label: 'Halloween', color: C.orange }] },
    ],
  },
  {
    month: 10, year: 2026, triEventDays: 'tue-sat',
    specials: [
      { day: 1, tags: [{ label: 'IG Reel', color: C.pink }, { label: 'VIP Email', color: C.cyan }] },
      { day: 11, tags: [{ label: 'Veterans Day', color: C.gray, circled: true }] },
      { day: 26, tags: [{ label: 'Thanksgiving', color: C.gray, circled: true }] },
    ],
  },
  {
    month: 11, year: 2026, triEventDays: 'tue-sat',
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
  { id: 'events', label: 'CX Chelsea', color: C.orange, labels: ['XXXXXXX', 'Halloween', 'w/ Anderson .Paak', "New Year's Eve"] },
  { id: 'private', label: 'Private Events', color: C.white, labels: ['Private:'] },
  { id: 'moons', label: 'Moons', color: '#E8D5B7', labels: ['🌑 New Moon', '🌕 Full Moon'] },
  { id: 'solstice', label: 'Solstices & Equinoxes', color: '#FFD700', labels: ['☀️ Summer Solstice', '🌙 Winter Solstice', '🌱 Spring Equinox', '🍂 Autumn Equinox'] },
  { id: 'theme', label: 'Theme', color: '#C4956A', labels: ['Theme:'] },
  { id: 'subtheme', label: 'Sub-Theme', color: '#D4A574', labels: ['Sub-Theme:'] },
  { id: 'operations', label: 'Operations', color: C.gray, labels: ["Mabel's 1st Day", "Phase 2 CX Tribeca"] },
  { id: 'holidays', label: 'Holidays', color: C.gray, labels: [] }, // matched by circled flag
];

function getFilterId(tag: EventTag): string {
  if (tag.circled) return 'holidays';
  for (const cat of FILTER_CATEGORIES) {
    if (cat.labels.some(l => tag.label.includes(l) || tag.label === l)) return cat.id;
  }
  return 'events'; // fallback
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

  // Header row
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

  // Empty cells before first day
  for (let i = 0; i < firstDow; i++) {
    cells.push(<div key={`e-${i}`} style={{ borderBottom: `1px solid ${C.border}`, borderRight: `1px solid ${C.border}` }} />);
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const dow = (firstDow + d - 1) % 7;
    const isWeekend = dow === 0 || dow === 6;
    const recurring = getRecurringEvents(year, month, d, dow, triEventDays || 'sat-only');
    const special = specialMap.get(d) || [];
    const allTags = [...special, ...recurring];

    // Deduplicate CX Tribeca
    const seen = new Set<string>();
    const dedupedTags = allTags.filter(t => {
      const key = t.label;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    }).filter(t => {
      if (t.color2) return activeFilters.has('tribeca') || activeFilters.has('events');
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
          color: hasCircled ? C.white : C.white,
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
          {dedupedTags.map((tag, i) => tag.color2 ? (
            <span key={i} style={{
              fontSize: '8px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              lineHeight: '1.3',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              padding: '1px 3px',
              borderRadius: '2px',
              background: `linear-gradient(90deg, ${tag.color}25, ${tag.color2}25)`,
            }}>
              <span style={{ color: tag.color }}>{tag.label.split(' ').slice(0, Math.ceil(tag.label.split(' ').length / 2)).join(' ')}</span>
              <span style={{ color: tag.color2 }}>{' '}{tag.label.split(' ').slice(Math.ceil(tag.label.split(' ').length / 2)).join(' ')}</span>
            </span>
          ) : (
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
function LegendItem({ label, color, italic, bold, dimmed }: { label: string; color: string; italic?: boolean; bold?: boolean; dimmed?: boolean }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: dimmed ? 0.3 : 1, transition: 'opacity 0.2s ease' }}>
      <span style={{
        width: '12px', height: '12px', borderRadius: '3px',
        background: color, flexShrink: 0,
      }} />
      <span style={{
        fontFamily: 'Inter, sans-serif', fontSize: '13px', color: C.white,
        fontStyle: italic ? 'italic' : 'normal',
        fontWeight: bold ? 700 : 400,
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

/* ── Main Page ── */
export default function CalendarPage() {
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
        {/* Animated gradient bg */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(ellipse at 30% 50%, rgba(29,191,191,0.12) 0%, transparent 60%), radial-gradient(ellipse at 70% 50%, rgba(255,0,180,0.08) 0%, transparent 60%)',
          animation: 'morphBg 12s ease-in-out infinite alternate',
        }} />
        {/* Grain */}
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
            fontFamily: '"Cormorant Garamond", serif',
            fontSize: 'clamp(16px, 2.5vw, 22px)',
            fontWeight: 300,
            fontStyle: 'italic',
            letterSpacing: '0.1em',
            color: `${C.white}66`,
            position: 'relative',
            marginBottom: '12px',
          }}>
            &ldquo;The emotional pulse of time&rdquo;
          </p>
          <p style={{
            fontFamily: 'Inter, sans-serif',
            fontSize: 'clamp(14px, 2vw, 18px)',
            fontWeight: 300,
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: C.dim,
            position: 'relative',
          }}>
            2026
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '20px', position: 'relative' }}>
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
              2026
            </span>
            <Link href="/calendar/2027" style={{
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
              2027
            </Link>
          </div>
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
                marginBottom: '16px',
              }}>
                Legend
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

                {/* Programming */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dim, marginBottom: '2px' }}>Programming</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '6px' }}>
                    <LegendItem label="CX Tribeca" color={C.teal} dimmed={!activeFilters.has('tribeca')} />
                    <LegendItem label="CX Tribeca (New Members)" color={C.teal} dimmed={!activeFilters.has('tribeca')} />
                    <LegendItem label="XXXXXXX" color={C.orange} dimmed={!activeFilters.has('events')} />
                    <LegendItem label="Halloween (Oct Weekends)" color={C.orange} dimmed={!activeFilters.has('events')} />
                    <LegendItem label="New Year's Eve" color={C.orange} dimmed={!activeFilters.has('events')} />
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', opacity: (!activeFilters.has('events') && !activeFilters.has('tribeca')) ? 0.3 : 1, transition: 'opacity 0.2s ease' }}>
                      <span style={{ width: '12px', height: '12px', borderRadius: '3px', flexShrink: 0, background: `linear-gradient(90deg, ${C.teal}, ${C.orange})` }} />
                      <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '13px', color: C.white }}>April 24 w/ Anderson .Paak</span>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}08` }} />

                {/* Content & Communications */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dim, marginBottom: '2px' }}>Content &amp; Communications</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '6px' }}>
                    <LegendItem label="Carousel Post (Tue &amp; Thu)" color={C.pink} dimmed={!activeFilters.has('content')} />
                    <LegendItem label="IG Reel (1st monthly)" color={C.pink} dimmed={!activeFilters.has('content')} />
                    <LegendItem label="Member Email (Tue)" color={C.cyan} dimmed={!activeFilters.has('comms')} />
                    <LegendItem label="Network Email (Thu)" color={C.cyan} dimmed={!activeFilters.has('comms')} />
                    <LegendItem label="VIP Email (1st monthly)" color={C.cyan} dimmed={!activeFilters.has('comms')} />
                    <LegendItem label="Hardcore Investors (Quarterly)" color={C.cyan} dimmed={!activeFilters.has('comms')} />
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}08` }} />

                {/* Themes & Celestial */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dim, marginBottom: '2px' }}>Themes &amp; Celestial</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '6px' }}>
                    <LegendItem label="Theme: Dirt/Soil (Spring)" color={'#C4956A'} dimmed={!activeFilters.has('theme')} />
                    <LegendItem label="Theme: Sun/Burn (Summer)" color={'#C4956A'} dimmed={!activeFilters.has('theme')} />
                    <LegendItem label="Theme: Over/Change (Autumn)" color={'#C4956A'} dimmed={!activeFilters.has('theme')} />
                    <LegendItem label="Sub-Theme: 🌕 = 1st half" color={'#D4A574'} dimmed={!activeFilters.has('subtheme')} />
                    <LegendItem label="Sub-Theme: 🌑 = 2nd half" color={'#D4A574'} dimmed={!activeFilters.has('subtheme')} />
                    <LegendItem label="🌕 Full Moon" color={'#E8D5B7'} dimmed={!activeFilters.has('moons')} />
                    <LegendItem label="🌑 New Moon" color={'#E8D5B7'} dimmed={!activeFilters.has('moons')} />
                    <LegendItem label="🌱 Spring Equinox (Mar 20)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />
                    <LegendItem label="☀️ Summer Solstice (Jun 21)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />
                    <LegendItem label="🍂 Autumn Equinox (Sep 22)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />
                    <LegendItem label="🌙 Winter Solstice (Dec 21)" color={'#FFD700'} dimmed={!activeFilters.has('solstice')} />
                  </div>
                </div>

                <div style={{ borderTop: `1px solid ${C.border}08` }} />

                {/* Other */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontFamily: 'Inter, sans-serif', fontSize: '10px', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: C.dim, marginBottom: '2px' }}>Other</span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '6px' }}>
                    <LegendItem label="Private: Harvard" color={C.white} dimmed={!activeFilters.has('private')} />
                    <LegendItem label="Mabel's 1st Day (Mar 2)" color={C.gray} dimmed={!activeFilters.has('operations')} />
                    <LegendItem label="Phase 2 CX Tribeca (May 1)" color={C.gray} dimmed={!activeFilters.has('operations')} />
                    <LegendItem label="Holiday" color={C.gray} dimmed={!activeFilters.has('holidays')} />
                  </div>
                </div>

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
        {MONTHS_2026.map((m) => (
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
        CX 2026
      </footer>
    </>
  );
}
