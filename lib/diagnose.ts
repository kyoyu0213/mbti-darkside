import type { Axis, MbtiCode, Pole, Question } from "@/lib/types";
import { questions } from "@/data/questions";
import { psychoTypes } from "@/data/types";

/** 軸ごとに、左の極（マイナス側）と右の極（プラス側）の対応を定義。 */
const axisPoles: Record<Axis, { left: Pole; right: Pole }> = {
  EI: { left: "E", right: "I" },
  SN: { left: "S", right: "N" },
  TF: { left: "T", right: "F" },
  JP: { left: "J", right: "P" },
};

/**
 * 回答配列を受け取り、MBTIコードを判定する。
 * @param answers questions と同じ並び・同じ長さの極の配列。
 *                未回答は null を許容（同点扱いで left を採用）。
 */
export function diagnose(answers: (Pole | null)[]): MbtiCode {
  // 各軸ごとに「右の極」のスコアを集計する。
  const score: Record<Axis, number> = { EI: 0, SN: 0, TF: 0, JP: 0 };

  questions.forEach((q: Question, index: number) => {
    const answer = answers[index];
    if (!answer) return;
    const { right } = axisPoles[q.axis];
    // 右の極を選んでいれば +1、左なら -1。
    score[q.axis] += answer === right ? 1 : -1;
  });

  // スコアが正なら右の極、0以下なら左の極を採用（同点は left 寄り）。
  const code =
    (score.EI > 0 ? axisPoles.EI.right : axisPoles.EI.left) +
    (score.SN > 0 ? axisPoles.SN.right : axisPoles.SN.left) +
    (score.TF > 0 ? axisPoles.TF.right : axisPoles.TF.left) +
    (score.JP > 0 ? axisPoles.JP.right : axisPoles.JP.left);

  return code;
}

/** MBTIコードからダークサイドタイプを取得。未知のコードは INTJ にフォールバック。 */
export function getPsychoType(code: MbtiCode) {
  return psychoTypes[code] ?? psychoTypes["INTJ"];
}

/** 回答文字列（"EINS..." のような連結）をPole配列に戻す。URLのクエリ用。 */
export function decodeAnswers(raw: string | null): (Pole | null)[] {
  if (!raw) return [];
  const valid: Pole[] = ["E", "I", "S", "N", "T", "F", "J", "P"];
  return raw.split("").map((c) => (valid.includes(c as Pole) ? (c as Pole) : null));
}

/** Pole配列を1つの文字列に符号化する。URLのクエリ用。 */
export function encodeAnswers(answers: (Pole | null)[]): string {
  return answers.map((a) => a ?? "_").join("");
}

/** MBTIコードの妥当性チェック（16タイプに存在するか）。 */
export function isValidCode(code: string): boolean {
  return code in psychoTypes;
}
