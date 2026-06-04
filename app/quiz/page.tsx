"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { questions } from "@/data/questions";
import type { Pole } from "@/lib/types";
import { diagnose, encodeAnswers } from "@/lib/diagnose";
import { Disclaimer } from "@/components/Disclaimer";

export default function QuizPage() {
  const router = useRouter();
  const total = questions.length;

  // 各問の回答（Pole）を保持。未回答は null。
  const [answers, setAnswers] = useState<(Pole | null)[]>(
    () => Array(total).fill(null)
  );
  const [current, setCurrent] = useState(0);

  const question = questions[current];
  const progress = Math.round((current / total) * 100);
  const answeredCount = useMemo(
    () => answers.filter(Boolean).length,
    [answers]
  );

  function choose(pole: Pole) {
    const next = [...answers];
    next[current] = pole;
    setAnswers(next);

    // 最終問なら結果へ、それ以外は自動で次へ進む。
    if (current === total - 1) {
      finish(next);
    } else {
      // 少し余韻を持たせて次へ。
      setTimeout(() => setCurrent((c) => Math.min(c + 1, total - 1)), 180);
    }
  }

  function finish(finalAnswers: (Pole | null)[]) {
    const code = diagnose(finalAnswers);
    const enc = encodeAnswers(finalAnswers);
    router.push(`/result?mbti=${code}&a=${enc}`);
  }

  function back() {
    setCurrent((c) => Math.max(c - 1, 0));
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-2xl flex-col px-6 py-10">
      {/* ヘッダー：進捗 */}
      <div className="mb-8">
        <div className="flex items-center justify-between text-xs text-violet-200/60">
          <Link href="/" className="hover:text-goldLight">
            ← 入口へ戻る
          </Link>
          <span className="font-[var(--font-cinzel)] tracking-widest text-gold/70">
            {current + 1} / {total}
          </span>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-royal/40">
          <div
            className="h-full rounded-full bg-gradient-to-r from-arcane to-gold transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* 質問本体 */}
      <section className="flex flex-1 flex-col justify-center">
        <p className="mb-2 text-center font-[var(--font-cinzel)] text-xs tracking-[0.3em] text-gold/50">
          QUESTION {String(current + 1).padStart(2, "0")}
        </p>
        <h1 className="mb-10 text-center text-2xl font-semibold leading-relaxed text-violet-50 sm:text-3xl">
          {question.text}
        </h1>

        <div className="flex flex-col gap-4">
          {question.choices.map((choice, i) => {
            const selected = answers[current] === choice.pole;
            return (
              <button
                key={i}
                onClick={() => choose(choice.pole)}
                className={`group rounded-xl border px-6 py-5 text-left text-base transition hover:scale-[1.01] sm:text-lg ${
                  selected
                    ? "border-gold bg-royal/60 text-goldLight shadow-gold"
                    : "border-arcane/30 bg-abyss/60 text-violet-100/90 hover:border-arcane hover:bg-royal/40"
                }`}
              >
                <span className="mr-3 font-[var(--font-cinzel)] text-gold/60 group-hover:text-gold">
                  {i === 0 ? "Ⅰ" : "Ⅱ"}
                </span>
                {choice.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* フッターナビ */}
      <div className="mt-10 flex items-center justify-between">
        <button
          onClick={back}
          disabled={current === 0}
          className="rounded-full border border-arcane/30 px-5 py-2 text-sm text-violet-200/70 transition enabled:hover:border-arcane enabled:hover:text-goldLight disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← 前の問い
        </button>
        <span className="text-xs text-violet-200/50">
          回答済み {answeredCount} / {total}
        </span>
      </div>

      <Disclaimer className="mt-8 text-center" />
    </main>
  );
}
