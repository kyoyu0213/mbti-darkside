import Image from "next/image";

/** 関連サイトへのバナーリンク。各ページ下部で使い回す。 */
export function PromoLinks() {
  return (
    <section className="mx-auto mt-12 flex w-full max-w-md flex-col items-center gap-4 px-6 pb-12">
      <p className="font-[var(--font-cinzel)] text-[11px] tracking-[0.3em] text-gold/50">
        RELATED
      </p>

      <a
        href="https://animal-16-type.vercel.app/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="動物16タイプ診断"
        className="block w-full overflow-hidden rounded-xl border border-gold/30 shadow-arcane transition hover:scale-[1.02] hover:border-gold hover:shadow-gold"
      >
        <Image
          src="/images/animal.png"
          alt="動物16タイプ診断"
          width={1774}
          height={482}
          className="h-auto w-full"
        />
      </a>

      <a
        href="https://note.com/intj_analyst"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="INTJ Analyst（note）"
        className="block w-full overflow-hidden rounded-xl border border-gold/30 shadow-arcane transition hover:scale-[1.02] hover:border-gold hover:shadow-gold"
      >
        <Image
          src="/images/INTJ.png"
          alt="INTJ Analyst（note）"
          width={1774}
          height={410}
          className="h-auto w-full"
        />
      </a>
    </section>
  );
}
