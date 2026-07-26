"use client";

import {useEffect, useState} from "react";

interface Tab {
  id: string;
  label: string;
}

/**
 * kubara.jp のランキングタブと同じ組み。囲みも塗りも使わず、
 * 縦のヘアラインで区切り、アクティブは 1px の墨罫で示す。
 */
export function AnchorTabs({tabs}: {tabs: Tab[]}) {
  const [active, setActive] = useState(tabs[0]?.id ?? "");

  useEffect(() => {
    const sections = tabs
      .map((tab) => document.getElementById(tab.id))
      .filter((section): section is HTMLElement => Boolean(section));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]?.target.id) {
          setActive(visible[0].target.id);
        }
      },
      {rootMargin: "-112px 0px -62% 0px", threshold: [0, 0.2, 0.5]}
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [tabs]);

  return (
    <nav className="sticky top-[60px] z-20 grid h-[52px] grid-cols-5 border-b border-rule bg-washi">
      {tabs.map((tab, index) => (
        <a
          key={tab.id}
          href={`#${tab.id}`}
          onClick={() => setActive(tab.id)}
          className={`relative flex min-w-0 items-center justify-center px-1 text-center ${
            active === tab.id ? "text-ink" : "text-muted"
          }`}
        >
          {index > 0 && (
            <span
              className="absolute left-0 top-1/2 h-4 w-px -translate-y-1/2 bg-rule"
              aria-hidden="true"
            />
          )}
          <span className="mincho break-words text-[11px] leading-4 tracking-jp-tight">
            {tab.label}
          </span>
          {active === tab.id && (
            <span
              className="absolute inset-x-3 bottom-0 h-px bg-ink"
              aria-hidden="true"
            />
          )}
        </a>
      ))}
    </nav>
  );
}
