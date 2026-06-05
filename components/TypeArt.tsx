"use client";

import { useState } from "react";

/**
 * タイプの立ち絵を表示する。public/images/types/tatie/<file> を縦長フレームで表示し、
 * 画像が無い/読み込み失敗時は何も表示しない（結果ページのレイアウトを壊さない）。
 */
export function TypeArt({ file, alt }: { file: string; alt: string }) {
  const [failed, setFailed] = useState(false);
  if (failed) return null;

  const src = `/images/types/tatie/${file}`;

  return (
    <div className="relative mt-2 w-full max-w-xs">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        onError={() => setFailed(true)}
        className="w-full rounded-2xl border border-gold/30 object-cover shadow-arcane"
      />
      {/* 下端を背景へ溶け込ませる装飾 */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 rounded-b-2xl bg-gradient-to-t from-abyss to-transparent" />
    </div>
  );
}
