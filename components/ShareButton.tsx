"use client";

import { useState } from "react";

/**
 * X（旧Twitter）へのシェアボタンと、結果URLのコピー機能。
 * クライアント側で現在のURLを取得してシェア文面を組み立てる。
 */
export function ShareButton({
  title,
  emoji,
  mbti,
  siteName,
}: {
  title: string;
  emoji: string;
  mbti: string;
  siteName: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `私のサイコパスMBTIは「${emoji} ${title}（${mbti}）」でした。\nあなたの内なる闇は?\n\n#${siteName.replace(/\s/g, "")} #サイコパスMBTI診断`;

  function openX() {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(url)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  }

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
      <button
        onClick={openX}
        className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gradient-to-b from-royal/80 to-abyss px-7 py-3 font-semibold text-goldLight shadow-arcane transition hover:scale-[1.03] hover:border-gold hover:shadow-gold"
      >
        <span aria-hidden className="text-lg font-bold">𝕏</span>
        結果をシェアする
      </button>

      <button
        onClick={copyLink}
        className="inline-flex items-center gap-2 rounded-full border border-arcane/30 px-6 py-3 text-sm text-violet-100/80 transition hover:border-arcane hover:text-goldLight"
      >
        {copied ? "✓ コピーしました" : "🔗 結果リンクをコピー"}
      </button>
    </div>
  );
}
