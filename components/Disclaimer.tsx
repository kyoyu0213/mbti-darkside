/** エンタメ診断であることの注意書き。各ページで使い回す。 */
export function Disclaimer({ className = "" }: { className?: string }) {
  return (
    <p
      className={`text-xs leading-relaxed text-violet-200/50 ${className}`}
    >
      ※ 本診断はエンターテインメントを目的とした非科学的な占い・診断です。
      医学的・心理学的な診断ではなく、結果があなたの人格や精神状態を判定・断定するものではありません。
      「サイコパス」という語は世界観の演出として用いており、特定の疾患や人物を指すものではありません。
      結果はあくまで創作上のキャラクター設定としてお楽しみください。
    </p>
  );
}
