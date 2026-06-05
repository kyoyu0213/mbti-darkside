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
  imageUrl,
}: {
  title: string;
  emoji: string;
  mbti: string;
  siteName: string;
  /** kekka フォルダのシェア用画像パス（任意）。対応端末では画像を添付して共有する。 */
  imageUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  const shareText = `私のサイコパスMBTIは「${emoji} ${title}（${mbti}）」でした。\nあなたの内なる闇は?\n\n#${siteName.replace(/\s/g, "")} #サイコパスMBTI診断`;

  function openXIntent(url: string) {
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      shareText
    )}&url=${encodeURIComponent(url)}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  }

  // スマホ等で画像ファイル添付の共有が使えるか（File対応を空ファイルで判定）。
  function canShareImage(): boolean {
    if (!imageUrl || typeof navigator === "undefined" || !navigator.canShare) {
      return false;
    }
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || "");
    if (!isMobile) return false;
    try {
      return navigator.canShare({
        files: [new File([], "p.png", { type: "image/png" })],
      });
    } catch {
      return false;
    }
  }

  function share() {
    const url = window.location.href;

    // スマホ（画像添付対応）はネイティブ共有で画像を添付。
    if (canShareImage()) {
      shareWithImage(url);
      return;
    }

    // PC等は同期的にXの投稿画面を開く（画像はOGPカードで表示）。
    openXIntent(url);
  }

  async function shareWithImage(url: string) {
    try {
      const res = await fetch(imageUrl!);
      const blob = await res.blob();
      const file = new File([blob], imageUrl!.split("/").pop() ?? "result.png", {
        type: blob.type || "image/png",
      });
      await navigator.share({ files: [file], text: shareText, url });
    } catch {
      // 失敗・キャンセル時はXの投稿画面へ（同一タブ遷移でブロック回避）。
      const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
        shareText
      )}&url=${encodeURIComponent(url)}`;
      window.location.href = intent;
    }
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
        onClick={share}
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
