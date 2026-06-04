import Link from "next/link";
import type { Metadata } from "next";
import { getPsychoType, isValidCode } from "@/lib/diagnose";
import { site } from "@/lib/site";
import { TypeImage } from "@/components/TypeImage";
import { ShareButton } from "@/components/ShareButton";
import { Disclaimer } from "@/components/Disclaimer";

// MBTIコードと本来の意味（参考表示用）。
const axisMeaning: Record<string, string> = {
  E: "外向 (E)",
  I: "内向 (I)",
  S: "感覚 (S)",
  N: "直観 (N)",
  T: "思考 (T)",
  F: "感情 (F)",
  J: "判断 (J)",
  P: "知覚 (P)",
};

type SearchParams = { [key: string]: string | string[] | undefined };

function resolveCode(searchParams: SearchParams): string {
  const raw = searchParams.mbti;
  const code = (Array.isArray(raw) ? raw[0] : raw)?.toUpperCase() ?? "";
  return isValidCode(code) ? code : "INTJ";
}

export function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Metadata {
  const t = getPsychoType(resolveCode(searchParams));
  const title = `${t.emoji} ${t.title}（${t.mbti}）`;
  return {
    title,
    description: `${t.catch} ── ${site.name}の診断結果。`,
    openGraph: { title: `${title} | ${site.name}`, description: t.catch },
    twitter: { card: "summary_large_image", title, description: t.catch },
  };
}

export default function ResultPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const code = resolveCode(searchParams);
  const t = getPsychoType(code);
  const letters = t.mbti.split("");

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col items-center px-6 py-14 text-center">
      <p className="mb-3 font-[var(--font-cinzel)] tracking-[0.4em] text-xs text-gold/60">
        YOUR VERDICT
      </p>

      {/* タイプ画像 / 絵文字 */}
      <TypeImage image={t.image} emoji={t.emoji} alt={t.title} size={170} />

      {/* 称号 */}
      <h1 className="mt-7 text-3xl font-bold sm:text-5xl">
        <span className="text-gold-gradient drop-shadow-[0_0_25px_rgba(212,175,55,0.3)]">
          {t.emoji} {t.title}
        </span>
      </h1>

      {/* 対応MBTI */}
      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-arcane/40 bg-abyss/70 px-5 py-2">
        <span className="text-xs text-violet-200/60">対応MBTI</span>
        <span className="font-[var(--font-cinzel)] text-lg font-bold tracking-[0.2em] text-goldLight">
          {t.mbti}
        </span>
      </div>

      {/* キャッチコピー */}
      <p className="mt-6 text-lg italic text-violet-100/90">「{t.catch}」</p>

      {/* 紹介文 */}
      <p className="mt-5 max-w-xl text-sm leading-loose text-violet-200/80">
        {t.description}
      </p>

      {/* 4軸の内訳 */}
      <div className="mt-8 grid w-full max-w-md grid-cols-4 gap-2">
        {letters.map((ch, i) => (
          <div
            key={i}
            className="gothic-border rounded-lg bg-abyss/60 py-3"
          >
            <div className="font-[var(--font-cinzel)] text-2xl font-bold text-gold">
              {ch}
            </div>
            <div className="mt-1 text-[10px] leading-tight text-violet-200/60">
              {axisMeaning[ch]?.replace(/\s\(.+\)/, "")}
            </div>
          </div>
        ))}
      </div>

      {/* 特徴 */}
      <div className="gothic-border mt-8 w-full max-w-md rounded-xl bg-abyss/50 p-5 text-left">
        <h2 className="mb-3 text-center text-sm font-semibold text-goldLight">
          ✦ あなたの闇の特性 ✦
        </h2>
        <ul className="space-y-2">
          {t.traits.map((trait, i) => (
            <li
              key={i}
              className="flex items-start gap-2 text-sm text-violet-100/85"
            >
              <span className="mt-0.5 text-gold/70">◆</span>
              <span>{trait}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="rune-divider my-10 w-full" />

      {/* シェア */}
      <ShareButton
        title={t.title}
        emoji={t.emoji}
        mbti={t.mbti}
        siteName={site.name}
      />

      {/* 再診断・トップ */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
        <Link
          href="/quiz"
          className="rounded-full border border-arcane/40 px-6 py-2.5 text-violet-100/80 transition hover:border-arcane hover:text-goldLight"
        >
          ↺ もう一度診断する
        </Link>
        <Link
          href="/"
          className="rounded-full border border-arcane/40 px-6 py-2.5 text-violet-100/80 transition hover:border-arcane hover:text-goldLight"
        >
          ⌂ 入口へ戻る
        </Link>
      </div>

      <Disclaimer className="mt-10 max-w-xl" />

      <footer className="mt-8 text-[11px] text-violet-200/40">
        © {site.name} — エンタメ診断
      </footer>
    </main>
  );
}
