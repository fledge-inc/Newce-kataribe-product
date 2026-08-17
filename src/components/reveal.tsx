"use client";

import {useEffect, useRef} from "react";

/**
 * スクロールで画面に入ったら一度だけ .is-revealed を付ける。
 * 動き自体は globals.css の .reveal が持つ（ゆっくり下から立ち上がる）。
 */
export function Reveal({
  children,
  delay = 0,
  className = ""
}: {
  children: React.ReactNode;
  /** 連続する要素を少しずつ遅らせるための ms */
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.classList.add("is-revealed");
          observer.disconnect();
        }
      },
      {threshold: 0.15, rootMargin: "0px 0px -6% 0px"}
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${className}`}
      style={delay ? {transitionDelay: `${delay}ms`} : undefined}
    >
      {children}
    </div>
  );
}
