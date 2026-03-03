"use client";

import { useEffect, useState } from "react";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const main = document.getElementById("main-content");
    if (!main) return;

    const onScroll = () => setVisible(main.scrollTop > 400);
    main.addEventListener("scroll", onScroll, { passive: true });
    // Also check window scroll for non-fixed layouts
    window.addEventListener("scroll", () => setVisible(window.scrollY > 400), { passive: true });
    return () => {
      main.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
        document.getElementById("main-content")?.scrollTo({ top: 0, behavior: "smooth" });
      }}
      className="fixed bottom-6 right-6 z-40 flex h-10 w-10 items-center justify-center rounded-full bg-black text-white shadow-lg transition-all hover:scale-110 hover:bg-[var(--cx-pink)]"
      aria-label="Scroll to top"
    >
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="M8 12V4M4 7l4-3 4 3" />
      </svg>
    </button>
  );
}
