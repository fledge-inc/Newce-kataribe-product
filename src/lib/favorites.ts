"use client";

import {useCallback, useEffect, useState} from "react";

const STORAGE_KEY = "kataribe.favorites";

function read(): string[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed)
      ? parsed.filter((id): id is string => typeof id === "string")
      : [];
  } catch {
    // プライベートブラウジング等で localStorage が使えない場合は握りつぶす
    return [];
  }
}

/**
 * お気に入り（あとで見る）。バックエンドが無いので端末内に保存する。
 *
 * localStorage はサーバに存在しないため、初期値は必ず空配列で描画し、
 * 読み出しは useEffect に閉じる。そうしないとハイドレーション不一致になる。
 * `ready` が false の間は「空」と「未読込」を呼び出し側で区別できる。
 */
export function useFavorites() {
  const [ids, setIds] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setIds(read());
    setReady(true);

    // 別タブでの変更にも追随する
    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) setIds(read());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const persist = useCallback((next: string[]) => {
    setIds(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      // 保存できなくても画面上の状態は維持する
    }
  }, []);

  const toggle = useCallback(
    (id: string) => {
      persist(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
    },
    [ids, persist]
  );

  const has = useCallback((id: string) => ids.includes(id), [ids]);

  const clear = useCallback(() => persist([]), [persist]);

  return {ids, ready, toggle, has, clear};
}
