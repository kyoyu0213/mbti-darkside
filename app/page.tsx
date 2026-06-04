import Link from "next/link";
import { site } from "@/lib/site";
import { Disclaimer } from "@/components/Disclaimer";
import { psychoTypes, allMbtiCodes } from "@/data/types";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col items-center px-6 py-16 text-center">
      {/* ヒーロー */}
      <p className="mb-4 font-[var(--font-cinzel)] tracking-[0.4em] text-xs text-gold/70">
        FORBIDDEN ARCHIVE
      </p>

      <h1 className="animate-flicker text-4xl font-bold leading-tight sm:text-6xl">
        <span className="text-gold-gradient drop-shadow-[0_0_25px_rgba(212,175,55,0.25)]">
          {site.name}
        </span>
      </h1>

      <p className="mt-5 text-base text-violet-100/80 sm:text-lg">{site.tagline}</p>

      <p className="mt-6 max-w-xl text-sm leading-relaxed text-violet-200/70">
        古城の最奥、封じられた禁書庫。
        頁をめくる者の心の奥を、20の問いが暴いていく――。
        あなたはどの闇を宿す者なのか。16のサイコパスタイプから、その正体を診断します。
      </p>

      {/* CTA */}
      <Link
        href="/quiz"
        className="group mt-10 inline-flex items-center gap-3 rounded-full border border-gold/40 bg-gradient-to-b from-royal/80 to-abyss px-10 py-4 text-lg font-semibold text-goldLight shadow-arcane transition hover:scale-[1.03] hover:border-gold hover:shadow-gold"
      >
        <span className="text-xl">🕯</span>
        禁書を開く
        <span className="transition group-hover:translate-x-1">→</span>
      </Link>

      <p className="mt-3 text-xs text-violet-200/50">所要時間 約3分 / 全20問</p>

      <div className="rune-divider my-14 w-full" />

      {/* 16タイプ プレビュー */}
      <section className="w-full">
        <h2 className="mb-6 text-lg font-semibold text-goldLight">
          ✦ 16の称号 ✦
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {allMbtiCodes.map((code) => {
            const t = psychoTypes[code];
            return (
              <div
                key={code}
                className="gothic-border rounded-lg bg-abyss/60 px-3 py-4 transition hover:bg-royal/40"
              >
                <div className="text-3xl drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                  {t.emoji}
                </div>
                <div className="mt-2 text-sm font-semibold text-violet-50">
                  {t.title}
                </div>
                <div className="mt-0.5 font-[var(--font-cinzel)] text-[10px] tracking-widest text-gold/60">
                  {t.mbti}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="rune-divider my-14 w-full" />

      <Disclaimer className="max-w-xl" />

      <footer className="mt-10 text-[11px] text-violet-200/40">
        © {site.name} — エンタメ診断
      </footer>
    </main>
  );
}
