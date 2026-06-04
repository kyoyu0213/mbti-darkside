"use client";

import { useState } from "react";

/**
 * タイプ画像を表示する。public/images/types/<image> が存在すれば画像を、
 * なければ絵文字プレースホルダーを表示する（画像読み込み失敗時にも絵文字へ自動フォールバック）。
 */
export function TypeImage({
  image,
  emoji,
  alt,
  size = 160,
}: {
  image: string;
  emoji: string;
  alt: string;
  size?: number;
}) {
  const [failed, setFailed] = useState(false);
  const src = `/images/types/${image}`;

  if (failed) {
    return (
      <div
        className="flex items-center justify-center rounded-full bg-royal/40 gothic-border animate-floaty"
        style={{ width: size, height: size }}
        role="img"
        aria-label={alt}
      >
        <span style={{ fontSize: size * 0.5 }} className="drop-shadow-[0_0_12px_rgba(168,85,247,0.6)]">
          {emoji}
        </span>
      </div>
    );
  }

  return (
    // next/image を使わず素の img を使うことで、画像未配置でもビルド/表示が安全。
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      width={size}
      height={size}
      onError={() => setFailed(true)}
      className="rounded-full object-cover gothic-border animate-floaty"
      style={{ width: size, height: size }}
    />
  );
}
