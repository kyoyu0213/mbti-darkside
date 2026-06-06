// 診断で使う型定義をまとめる場所。

/** MBTIの4軸。 */
export type Axis = "EI" | "SN" | "TF" | "JP";

/** 各軸の2極。最初の文字が「マイナス方向」、2文字目が「プラス方向」のスコア。 */
export type Pole = "E" | "I" | "S" | "N" | "T" | "F" | "J" | "P";

/** 16タイプを表す4文字コード。例: "INTJ" */
export type MbtiCode = string;

/** 質問の選択肢。選ぶと指定した極のスコアが加算される。 */
export interface Choice {
  /** 画面に表示する選択肢テキスト。 */
  label: string;
  /** この選択肢が加点する極。 */
  pole: Pole;
}

/** 1問分の質問データ。 */
export interface Question {
  id: number;
  /** どの軸の質問か。 */
  axis: Axis;
  /** 質問文。 */
  text: string;
  /** 2つの選択肢（A/B）。 */
  choices: [Choice, Choice];
}

/** MBTIダークサイドタイプ1件分の表示データ。 */
export interface PsychoType {
  /** 対応する本来のMBTIコード。 */
  mbti: MbtiCode;
  /** プレースホルダー用の絵文字。 */
  emoji: string;
  /** ダークサイド称号（タイプ名）。 */
  title: string;
  /** キャッチコピー。 */
  catch: string;
  /** 紹介文（エンタメ用・短文）。 */
  description: string;
  /** 長文の鑑定文（任意）。設定されていれば結果ページで章立て表示する。 */
  reading?: string;
  /** 強み・特徴の箇条書き。 */
  traits: string[];
  /** 画像ファイル名（public/images/types/ 配下）。なければ絵文字で代替。 */
  image: string;
  /** 立ち絵ファイル名（public/images/types/tatie/ 配下）。なければ非表示。 */
  tatie?: string;
}
