'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function BrandBook() {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [darkLogo, setDarkLogo] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const copyToClipboard = (hex: string, name: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedColor(name);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  const colors = [
    { name: 'Ethernet Sky', hex: '#1d90bf' },
    { name: 'Cherry Collapse', hex: '#fe4247' },
    { name: 'Tangerine Tantrum', hex: '#fd7e01' },
    { name: 'Slime Blessing', hex: '#08f22f' },
    { name: 'Flashbulb Memory', hex: '#e8e200' },
    { name: 'Dream Bruise', hex: '#9750cd' },
    { name: 'Coolant Crush', hex: '#05aec6' },
  ];

  if (!mounted) return null;

  return (
    <div className="w-full">
      {/* HERO SECTION - White Background */}
      <section className="section-white min-h-screen flex flex-col items-center justify-center relative">
        <div className="section-container text-center py-20">
          {/* CX Logo */}
          <div className="mb-12 animate-on-scroll">
            <Image
              src="/logos/CX-Logo-Thick_black.png"
              alt="CX"
              width={120}
              height={80}
              className="mx-auto"
              priority
            />
          </div>

          {/* Massive Headline */}
          <h1 className="hero-headline mb-8 animate-on-scroll">
            BRAND BOOK
          </h1>

          {/* Subtitle */}
          <p className="subheadline text-gray-600 mb-16 animate-on-scroll">
            The future of connection
          </p>

          {/* Scroll Indicator */}
          <div className="scroll-indicator text-gray-400 animate-on-scroll">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              className="mx-auto"
            >
              <path d="M12 5v14M19 12l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </section>

      {/* SECTION 01 — BRAND ESSENCE */}
      <section className="section-dark py-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/photos/cx_home_page.jpg"
            alt=""
            fill
            className="object-cover"
          />
        </div>
        <div className="section-container relative z-10">
          <div className="max-w-4xl animate-on-scroll">
            <p className="section-label mb-6">01 — BRAND ESSENCE</p>
            <h2 className="section-headline mb-12">
              A vision from the underground
            </h2>
            <div className="body-large space-y-6 mb-16">
              <p>
                CX is an underground social club for artists, writers, musicians,
                and edge-seekers who want more than networking—they want transformation.
              </p>
              <p>
                We create immersive experiences where creativity meets intellect,
                where strangers become collaborators, and where the night rewrites the rules.
              </p>
              <p className="text-2xl font-semibold mt-8">
                "CX is the new Studio 54—without having to say it."
              </p>
            </div>

            {/* Four Pillars */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
              <div className="border border-white/20 p-8 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-3">Experimental</h3>
                <p className="text-gray-300">
                  We test the edges. Format-breaking events,
                  unconventional spaces, unexpected collisions.
                </p>
              </div>
              <div className="border border-white/20 p-8 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-3">Provocative</h3>
                <p className="text-gray-300">
                  Ideas that challenge. Conversations that unsettle.
                  Art that doesn't ask permission.
                </p>
              </div>
              <div className="border border-white/20 p-8 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-3">Fusion</h3>
                <p className="text-gray-300">
                  Where disciplines blur. Tech meets poetry.
                  Performance meets philosophy.
                </p>
              </div>
              <div className="border border-white/20 p-8 rounded-lg backdrop-blur-sm">
                <h3 className="text-2xl font-bold mb-3">Pulse</h3>
                <p className="text-gray-300">
                  We move with the underground's rhythm.
                  Late nights, raw energy, spontaneous magic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 02 — VOICE & COPY */}
      <section className="section-dark py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-4xl animate-on-scroll">
            <p className="section-label mb-6">02 — VOICE & COPY</p>
            <h2 className="section-headline mb-12">
              Elegant, precise, slightly dangerous
            </h2>

            <div className="body-large space-y-8 mb-16">
              <p>
                <strong>Tone:</strong> Poetic when it matters; blunt when it clarifies.
                We don't explain ourselves—we invite you in.
              </p>

              <div className="bg-white/5 p-8 rounded-lg border border-white/10">
                <h3 className="text-xl font-bold mb-4">Copy Rules</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>→ One idea per slide. Make it stick.</li>
                  <li>→ Titles: 3–7 words. Headlines, not sentences.</li>
                  <li>→ Replace adjectives with specifics. "Immersive" → "5am conversations."</li>
                  <li>→ Kill corporate filler. No "innovative," "cutting-edge," "best-in-class."</li>
                  <li>→ End with action or mystery—never with a period that feels final.</li>
                </ul>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-6">Threshold Language</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-400 mb-2">Instead of:</p>
                    <p className="line-through text-gray-500">"Join our community"</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Say:</p>
                    <p className="text-white">"Enter the underground"</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Instead of:</p>
                    <p className="line-through text-gray-500">"Premium experiences"</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Say:</p>
                    <p className="text-white">"Threshold moments"</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Instead of:</p>
                    <p className="line-through text-gray-500">"Networking event"</p>
                  </div>
                  <div>
                    <p className="text-gray-400 mb-2">Say:</p>
                    <p className="text-white">"Collision space"</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 03 — VISUAL IDENTITY */}
      <section className="section-dark py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-5xl animate-on-scroll">
            <p className="section-label mb-6">03 — VISUAL IDENTITY</p>
            <h2 className="section-headline mb-12">
              The mark is handwritten
            </h2>

            {/* Logo Display */}
            <div className="mb-16">
              <div className={`${darkLogo ? 'bg-white' : 'bg-black'} p-16 rounded-lg mb-6 transition-colors duration-300`}>
                <Image
                  src={darkLogo ? '/logos/CX-Logo-Thick_black.png' : '/logos/CX-Logo-Thick_white.png'}
                  alt="CX Logo"
                  width={300}
                  height={200}
                  className="mx-auto logo-toggle"
                />
              </div>
              <button
                onClick={() => setDarkLogo(!darkLogo)}
                className="px-6 py-3 bg-white text-black rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Toggle: {darkLogo ? 'Light' : 'Dark'} Background
              </button>
            </div>

            {/* Logo Variants */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
              <div className="bg-white p-8 rounded-lg">
                <Image src="/logos/CX-Logo-Thick_black.png" alt="Thick Black" width={100} height={60} className="w-full" />
                <p className="text-xs text-black mt-2 text-center">Thick / Black</p>
              </div>
              <div className="bg-black p-8 rounded-lg border border-white/20">
                <Image src="/logos/CX-Logo-Thick_white.png" alt="Thick White" width={100} height={60} className="w-full" />
                <p className="text-xs text-white mt-2 text-center">Thick / White</p>
              </div>
              <div className="bg-white p-8 rounded-lg">
                <Image src="/logos/CX-Logo-Thin_black.png" alt="Thin Black" width={100} height={60} className="w-full" />
                <p className="text-xs text-black mt-2 text-center">Thin / Black</p>
              </div>
              <div className="bg-black p-8 rounded-lg border border-white/20">
                <Image src="/logos/CX-Logo-Thin_white.png" alt="Thin White" width={100} height={60} className="w-full" />
                <p className="text-xs text-white mt-2 text-center">Thin / White</p>
              </div>
            </div>

            {/* Clear Space */}
            <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-16">
              <h3 className="text-xl font-bold mb-4">Clear Space Rules</h3>
              <p className="text-gray-300 mb-4">
                Maintain minimum clear space equal to the height of the "C" in the CX mark
                on all sides. Never crowd the logo.
              </p>
            </div>

            {/* Typography */}
            <div className="mt-16">
              <h3 className="text-3xl font-bold mb-8">Typography System</h3>
              <div className="space-y-8">
                <div>
                  <p className="section-label mb-3">HEADLINES — Big Caslon</p>
                  <p className="text-6xl font-serif">The Night Rewrites</p>
                  <p className="text-gray-400 text-sm mt-2">Use for: Event titles, hero headlines, key statements</p>
                </div>
                <div>
                  <p className="section-label mb-3">BODY / UI — Proxima Nova / Inter</p>
                  <p className="text-xl">Where creativity meets intellect, where strangers become collaborators.</p>
                  <p className="text-gray-400 text-sm mt-2">Use for: Body copy, UI elements, descriptions</p>
                </div>

                {/* Type Scale */}
                <div className="mt-12 space-y-4">
                  <p className="text-5xl font-bold">Display — 80px</p>
                  <p className="text-4xl font-bold">Headline 1 — 60px</p>
                  <p className="text-3xl font-bold">Headline 2 — 48px</p>
                  <p className="text-2xl font-semibold">Headline 3 — 36px</p>
                  <p className="text-xl">Body Large — 24px</p>
                  <p className="text-base">Body — 18px</p>
                  <p className="text-sm">Caption — 14px</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 04 — COLOR SYSTEM */}
      <section className="section-dark py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-5xl animate-on-scroll">
            <p className="section-label mb-6">04 — COLOR SYSTEM</p>
            <h2 className="section-headline mb-12">
              Disciplined chaos
            </h2>

            <div className="body-large mb-12">
              <p className="mb-6">
                CX is primarily black and white. Colors are accent signals—emotional triggers
                that punctuate experiences, not dominate them.
              </p>

              {/* 80/15/5 Ratio */}
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-12">
                <h3 className="text-xl font-bold mb-4">The 80 / 15 / 5 Rule</h3>
                <div className="space-y-3 text-gray-300">
                  <p><strong className="text-white">80%</strong> — Black + White foundation</p>
                  <p><strong className="text-white">15%</strong> — Single accent color per piece</p>
                  <p><strong className="text-white">5%</strong> — Surprise highlight</p>
                </div>
              </div>
            </div>

            {/* Interactive Color Swatches */}
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-6">Event Spectrum (click to copy)</h3>
              {copiedColor && (
                <p className="text-sm text-green-400 mb-4 copy-success">
                  ✓ Copied {copiedColor} to clipboard
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              {colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => copyToClipboard(color.hex, color.name)}
                  className="color-swatch group"
                >
                  <div
                    className="w-full h-32 rounded-lg mb-3"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="text-sm font-semibold mb-1">{color.name}</p>
                  <p className="text-xs text-gray-400 font-mono">{color.hex}</p>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 05 — GRID & LAYOUT */}
      <section className="section-dark py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-5xl animate-on-scroll">
            <p className="section-label mb-6">05 — GRID & LAYOUT</p>
            <h2 className="section-headline mb-12">
              Space is the brand
            </h2>

            <div className="body-large space-y-8 mb-16">
              <p>
                Generous margins. Bold asymmetry. Let content breathe—white space is not wasted space.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <p className="text-4xl font-bold mb-2">16:9</p>
                  <p className="text-sm text-gray-400">Landscape / Presentations</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <p className="text-4xl font-bold mb-2">1:1</p>
                  <p className="text-sm text-gray-400">Social / Instagram</p>
                </div>
                <div className="bg-white/5 p-6 rounded-lg border border-white/10">
                  <p className="text-4xl font-bold mb-2">9:16</p>
                  <p className="text-sm text-gray-400">Stories / Vertical</p>
                </div>
              </div>

              <div className="bg-white/5 p-8 rounded-lg border border-white/10 mt-12">
                <h3 className="text-xl font-bold mb-4">Margin Rules</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>→ Minimum 10% margins on all sides</li>
                  <li>→ Increase to 15–20% for high-impact pieces</li>
                  <li>→ Never let text touch the edge</li>
                  <li>→ Asymmetric layouts encouraged—break the center</li>
                </ul>
              </div>

              <div className="mt-12">
                <h3 className="text-xl font-bold mb-4">Composition Principles</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>→ <strong>Typography first.</strong> Images are optional.</li>
                  <li>→ <strong>Hierarchy through scale,</strong> not decoration.</li>
                  <li>→ <strong>Align to edges,</strong> not centers (unless intentional).</li>
                  <li>→ <strong>Texture sparingly.</strong> Grain, noise, film artifacts—used to enhance, not distract.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 06 — PHOTOGRAPHY */}
      <section className="section-dark py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-5xl animate-on-scroll">
            <p className="section-label mb-6">06 — PHOTOGRAPHY</p>
            <h2 className="section-headline mb-12">
              Typography first. Images are optional.
            </h2>

            <div className="body-large mb-12">
              <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-8">
                <h3 className="text-xl font-bold mb-4">Rules</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>→ <strong>Intentional.</strong> Every image must earn its place.</li>
                  <li>→ <strong>High contrast.</strong> Deep blacks, bright highlights, raw energy.</li>
                  <li>→ <strong>No clutter.</strong> Clean backgrounds, focused subjects.</li>
                  <li>→ <strong>Candid over posed.</strong> Capture the moment, not the smile.</li>
                </ul>
              </div>
            </div>

            {/* Sample Photos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/photos/5am_1.jpg"
                  alt="5am atmosphere"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/photos/dj_culture_1.jpg"
                  alt="DJ culture"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/photos/quiet_mornings.jpg"
                  alt="Quiet morning"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="relative h-80 rounded-lg overflow-hidden">
                <Image
                  src="/photos/literary.jpg"
                  alt="Literary atmosphere"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — DO / DON'T */}
      <section className="section-dark py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-5xl animate-on-scroll">
            <p className="section-label mb-6">07 — DO / DON'T</p>
            <h2 className="section-headline mb-12">
              Hard rules
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* DO */}
              <div className="bg-green-500/10 p-8 rounded-lg border border-green-500/30">
                <h3 className="text-2xl font-bold mb-6 text-green-400">✓ DO</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>→ Use generous white space</li>
                  <li>→ Keep logo proportions exact</li>
                  <li>→ Use one accent color at a time</li>
                  <li>→ Lead with typography</li>
                  <li>→ Maintain clear space around logo</li>
                  <li>→ Use high-contrast photography</li>
                  <li>→ Keep copy concise and specific</li>
                  <li>→ Embrace asymmetry</li>
                </ul>
              </div>

              {/* DON'T */}
              <div className="bg-red-500/10 p-8 rounded-lg border border-red-500/30">
                <h3 className="text-2xl font-bold mb-6 text-red-400">✗ DON'T</h3>
                <ul className="space-y-3 text-gray-300">
                  <li>→ Stretch or distort the logo</li>
                  <li>→ Use multiple accent colors</li>
                  <li>→ Add effects to the logo (drop shadow, glow)</li>
                  <li>→ Use generic stock photography</li>
                  <li>→ Crowd the composition</li>
                  <li>→ Use corporate language</li>
                  <li>→ Center everything by default</li>
                  <li>→ Add unnecessary decoration</li>
                </ul>
              </div>
            </div>

            {/* Logo Don'ts Visual */}
            <div className="mt-16 bg-white/5 p-8 rounded-lg border border-white/10">
              <h3 className="text-xl font-bold mb-6">Never do this to the mark:</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-black p-6 rounded-lg mb-3 border-2 border-red-500">
                    <div className="transform scale-x-150">
                      <Image src="/logos/CX-Logo-Thick_white.png" alt="" width={80} height={40} />
                    </div>
                  </div>
                  <p className="text-xs text-red-400">✗ Stretch</p>
                </div>
                <div className="text-center">
                  <div className="bg-black p-6 rounded-lg mb-3 border-2 border-red-500">
                    <div className="transform rotate-12">
                      <Image src="/logos/CX-Logo-Thick_white.png" alt="" width={80} height={40} />
                    </div>
                  </div>
                  <p className="text-xs text-red-400">✗ Rotate</p>
                </div>
                <div className="text-center">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 rounded-lg mb-3 border-2 border-red-500">
                    <Image src="/logos/CX-Logo-Thick_white.png" alt="" width={80} height={40} />
                  </div>
                  <p className="text-xs text-red-400">✗ Gradient bg</p>
                </div>
                <div className="text-center">
                  <div className="bg-black p-6 rounded-lg mb-3 border-2 border-red-500">
                    <div style={{ filter: 'drop-shadow(0 4px 8px rgba(255,0,0,0.5))' }}>
                      <Image src="/logos/CX-Logo-Thick_white.png" alt="" width={80} height={40} />
                    </div>
                  </div>
                  <p className="text-xs text-red-400">✗ Effects</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 08 — QUICK REFERENCE */}
      <section className="section-dark py-32 border-t border-white/10">
        <div className="section-container">
          <div className="max-w-5xl animate-on-scroll">
            <p className="section-label mb-6">08 — QUICK REFERENCE</p>
            <h2 className="section-headline mb-12">
              Design decision ladder
            </h2>

            <div className="bg-white/5 p-10 rounded-lg border border-white/10 mb-12">
              <h3 className="text-2xl font-bold mb-6">6 Questions Before You Ship</h3>
              <ol className="space-y-4 text-gray-300">
                <li className="flex gap-4">
                  <span className="text-white font-bold">1.</span>
                  <span>Does this feel <strong className="text-white">slightly dangerous</strong> or safe?</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold">2.</span>
                  <span>Could this exist without the logo and still feel like <strong className="text-white">CX</strong>?</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold">3.</span>
                  <span>Is the typography doing <strong className="text-white">all the work</strong>?</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold">4.</span>
                  <span>Does the color choice <strong className="text-white">signal emotion</strong>, not decoration?</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold">5.</span>
                  <span>Would this make someone <strong className="text-white">stop scrolling</strong>?</span>
                </li>
                <li className="flex gap-4">
                  <span className="text-white font-bold">6.</span>
                  <span>Is there <strong className="text-white">enough white space</strong> to breathe?</span>
                </li>
              </ol>
            </div>

            {/* File Naming */}
            <div className="bg-white/5 p-8 rounded-lg border border-white/10 mb-12">
              <h3 className="text-xl font-bold mb-4">File Naming Convention</h3>
              <div className="font-mono text-sm space-y-2 text-gray-300">
                <p>CX_[project]_[date]_[version].[ext]</p>
                <p className="text-xs text-gray-500 mt-4">Example:</p>
                <p className="text-xs">CX_esoterica-poster_2025-03-15_v2.pdf</p>
              </div>
            </div>

            {/* Quick Color Reference */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              <div className="bg-black text-white p-4 rounded-lg border border-white/20">
                <p className="font-mono text-xs mb-1">#000000</p>
                <p className="text-sm font-semibold">Black</p>
              </div>
              <div className="bg-white text-black p-4 rounded-lg">
                <p className="font-mono text-xs mb-1">#FFFFFF</p>
                <p className="text-sm font-semibold">White</p>
              </div>
              <div className="bg-[#0b0b0c] text-white p-4 rounded-lg border border-white/20">
                <p className="font-mono text-xs mb-1">#0B0B0C</p>
                <p className="text-sm font-semibold">CX Dark</p>
              </div>
              <div className="bg-[#fe4247] text-white p-4 rounded-lg">
                <p className="font-mono text-xs mb-1">#FE4247</p>
                <p className="text-sm font-semibold">Accent</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center mt-20 pt-12 border-t border-white/10">
              <Image
                src="/logos/CX-Logo-Thick_white.png"
                alt="CX"
                width={100}
                height={60}
                className="mx-auto mb-6 opacity-50"
              />
              <p className="text-sm text-gray-500">
                CX Brand Book — Updated March 2026
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
