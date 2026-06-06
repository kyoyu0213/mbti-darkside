"use client";

import { useState } from "react";

/**
 * X（旧Twitter）へのシェア・結果画像のダウンロード・結果リンクのコピー。
 * クライアント側で短い結果URL（回答パラメータを含まない）を組み立てて共有する。
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
  /** kekka フォルダの結果画像パス（任意）。ダウンロードボタンで利用する。 */
  imageUrl?: string;
}) {
  const [copied, setCopied] = useState(false);

  // ハッシュタグはサイト名から1つだけ生成（重複させない）。
  const hashtag = `#${siteName.replace(/\s/g, "")}`;

  /** 回答パラメータ a を含まない、結果タイプのみの短いURL。 */
  function buildShareUrl(): string {
    return `${window.location.origin}/result?mbti=${mbti}`;
  }

  /** Xシェア用の本文（末尾に短い結果URLを含める）。 */
  function buildShareText(shareUrl: string): string {
    return `私のMBTIダークサイドは「${emoji} ${title}（${mbti}）」でした。\nあなたがダークサイドに堕ちたら？\n\n${hashtag}\n${shareUrl}`;
  }

  function share() {
    const shareUrl = buildShareUrl();
    // 本文に短いURLを含めるため、url パラメータは付けない（重複・冗長化を避ける）。
    const intent = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      buildShareText(shareUrl)
    )}`;
    window.open(intent, "_blank", "noopener,noreferrer");
  }

  /** kekka 画像のファイル名から拡張子を除いた英語スラッグ。 */
  function imageSlug(): string {
    const base = imageUrl?.split("/").pop() ?? "";
    return base.replace(/\.[^.]+$/, "");
  }

  async function downloadImage() {
    if (!imageUrl) return;
    const fileName = `result-${mbti}-${imageSlug()}.png`;
    try {
      const res = await fetch(imageUrl);
      const blob = await res.blob();
      const objectUrl = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(objectUrl);
    } catch {
      // 失敗時は画像を新しいタブで開き、長押し保存に委ねる。
      window.open(imageUrl, "_blank", "noopener,noreferrer");
    }
  }

  function copyLink() {
    // コピーするリンクも短い結果URLに統一する。
    const shareUrl = buildShareUrl();
    navigator.clipboard
      .writeText(shareUrl)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      })
      .catch(() => setCopied(false));
  }

  return (
    <div className="flex w-full flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:justify-center">
      <button
        onClick={share}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gradient-to-b from-royal/80 to-abyss px-7 py-3.5 font-semibold text-goldLight shadow-arcane transition hover:scale-[1.03] hover:border-gold hover:shadow-gold"
      >
        <span aria-hidden className="text-lg font-bold">𝕏</span>
        結果をシェアする
      </button>

      {imageUrl && (
        <button
          onClick={downloadImage}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-gold/40 bg-gradient-to-b from-royal/80 to-abyss px-7 py-3.5 font-semibold text-goldLight shadow-arcane transition hover:scale-[1.03] hover:border-gold hover:shadow-gold"
        >
          <span aria-hidden className="text-lg">⬇</span>
          結果画像をダウンロード
        </button>
      )}

      <button
        onClick={copyLink}
        className="inline-flex items-center justify-center gap-2 rounded-full border border-arcane/30 px-6 py-3.5 text-sm text-violet-100/80 transition hover:border-arcane hover:text-goldLight"
      >
        {copied ? "✓ コピーしました" : "🔗 結果リンクをコピー"}
      </button>
    </div>
  );
}
