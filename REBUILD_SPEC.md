# CX Brand — Rebuild Spec

## Objective
Rebuild the landing page of this brand book to match the visual style of the CX main website (https://cx-website-red.vercel.app). Keep the brand guideline CONTENT from the existing site (https://cx-brand-book.vercel.app) but completely restyle it.

## Visual DNA to Match (from CX Website)
1. **White-first hero** — The website opens with a bright white background, massive bold black type, and a centered B&W event photo
2. **Massive bold sans-serif** — Very large, compressed, black type ("HI!" and "CX" are enormous)
3. **B&W event photography** — Prominent, cinematic, raw energy
4. **White-to-dark transition** — Hero is white, then scrolls into dark sections with full-bleed photo backgrounds
5. **Minimal navigation** — CX handwritten mark top-left, almost no other chrome
6. **Copy style** — Short, confident, exclusive ("We are a private network of edge-seekers & the intellectually promiscuous")

## What to Build
A single-page brand guidelines site with these sections (matching the v1 content):

### Hero (white background, matching website style)
- CX handwritten logo mark (use `/public/logos/CX-Logo-Thick_black.png` on white, `/public/logos/CX-Logo-Thick_white.png` on dark)
- Massive bold headline: "BRAND BOOK"
- Subtitle: "The future of connection"
- Scroll indicator

### Section 01 — Brand Essence
- "A vision from the underground"
- CX description: underground social club, artists/writers/musicians, immersive experiences
- "CX is the new Studio 54—without having to say it."
- Four pillars: Experimental, Provocative, Fusion, Pulse

### Section 02 — Voice & Copy
- "Elegant, precise, slightly dangerous"
- Tone: Poetic when it matters; blunt when it clarifies
- Copy Rules (one idea per slide, titles 3-7 words, replace adjectives with specifics, kill corporate filler)
- Threshold Language examples

### Section 03 — Visual Identity (Logo)
- "The mark is handwritten"
- Show logo variants: thick/thin, dark/light
- Clear space rules
- Typography section: Big Caslon (headlines) + Proxima Nova (body/UI) with type scale

### Section 04 — Color System
- "Disciplined chaos" — primarily black+white, colors are accent signals
- 80/15/5 ratio display
- Event-spectrum accent swatches (ethernet sky, cherry collapse, tangerine tantrum, slime blessing, flashbulb memory, dream bruise, coolant crush)
- Interactive color explorer (click to copy hex)

### Section 05 — Grid & Layout
- "Space is the brand"
- Format ratios: 16:9, 1:1, 9:16
- Margin rules (10-20%)
- Composition principles
- Texture guidelines

### Section 06 — Photography
- "Typography first. Images are optional"
- Rules: Intentional, High contrast, No clutter
- Show 3-4 sample photos from /public/photos/

### Section 07 — Do / Don't
- Hard rules with ✓ and ✗ lists
- "Never do this to the mark" warnings

### Section 08 — Quick Reference
- Condensed reference card
- Design Decision Ladder (6 questions)
- File naming convention

## Design Requirements
1. **Typography**: Use Inter 900 for headlines (like the current codebase already does), but style it to feel more like the website — massive, bold, high-contrast
2. **Color scheme**: White hero transitioning to dark (#0B0B0C) sections, matching the website's white-to-dark scroll pattern
3. **Photography**: Use photos from `/public/photos/` prominently — full-bleed backgrounds, not thumbnails. Key photos to feature:
   - `cx_home_page.jpg` (hero or about)
   - `esoterica.jpg`, `5am_1.jpg`, `chelsea_rooftop.jpg` (atmosphere)
   - `dj_culture_1.jpg`, `emerging_artists_1.jpg` (energy)
   - `quiet_mornings.jpg`, `literary.jpg` (intimate)
4. **Scroll experience**: Smooth scrolling with subtle fade-in animations on section entry. Keep it elegant, not flashy.
5. **Interactive elements**: Color swatches that copy on click, type specimen preview, logo toggle (dark/light)
6. **Navigation**: Fixed minimal top bar with CX mark + section dots or small links. No hamburger menu needed for a single-page site.
7. **Responsive**: Must work well on mobile

## Technical Constraints
- Next.js 16 + Tailwind v4 + TypeScript (already in the project)
- Keep the existing `/public/photos/` and `/public/logos/` assets
- Port should be 3015 for dev (`next dev -p 3015`)
- Must build cleanly (`next build` with zero errors)
- Remove all existing page routes EXCEPT the root page — this is a single-page site now

## Files to Modify
1. `src/app/globals.css` — Complete rewrite for website-matching style
2. `src/app/layout.tsx` — Simplified layout, remove hamburger menu
3. `src/app/page.tsx` — Complete rewrite as single-page brand book
4. `src/app/components/` — Remove or replace shared components
5. `package.json` — Update dev script to use port 3015
6. Delete all sub-route directories (color/, logo/, voice/, etc.) — everything is on one page now

## Brand Accent Colors (for reference)
- Ethernet Sky: #1d90bf
- Cherry Collapse: #fe4247
- Tangerine Tantrum: #fd7e01
- Slime Blessing: #08f22f
- Flashbulb Memory: #e8e200
- Dream Bruise: #9750cd
- Coolant Crush: #05aec6
