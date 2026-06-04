import type { Question } from "@/lib/types";

/**
 * 20問の診断質問。各軸5問ずつ。
 * 選択肢Aは軸の「左の極」、選択肢Bは「右の極」に加点する設計だが、
 * 偏りを避けるため pole は各問で明示している。
 * 追加・編集はこのファイルだけで完結する。
 */
export const questions: Question[] = [
  // ===== E / I 軸（外向 / 内向） =====
  {
    id: 1,
    axis: "EI",
    text: "玉座の間に招かれた。あなたはまず――",
    choices: [
      { label: "群衆の前へ進み出て、まず声を上げる", pole: "E" },
      { label: "柱の影から、全員の顔ぶれを観察する", pole: "I" },
    ],
  },
  {
    id: 2,
    axis: "EI",
    text: "力を取り戻すために必要なのは――",
    choices: [
      { label: "夜会へ繰り出し、他者の気配を浴びること", pole: "E" },
      { label: "誰もいない書庫に籠もり、独り沈むこと", pole: "I" },
    ],
  },
  {
    id: 3,
    axis: "EI",
    text: "支配を広げるとき、あなたの武器は――",
    choices: [
      { label: "言葉と存在感で、その場の空気を奪う", pole: "E" },
      { label: "沈黙と距離で、相手を不安にさせる", pole: "I" },
    ],
  },
  {
    id: 4,
    axis: "EI",
    text: "新たな従者が現れた。あなたは――",
    choices: [
      { label: "すぐ話しかけ、自分の輪に引き込む", pole: "E" },
      { label: "まず観察し、信頼に値するか見極める", pole: "I" },
    ],
  },
  {
    id: 5,
    axis: "EI",
    text: "勝利の宴。あなたの居場所は――",
    choices: [
      { label: "中央。注目を集めるほど満たされる", pole: "E" },
      { label: "端の特等席。少数の相手とだけ語る", pole: "I" },
    ],
  },

  // ===== S / N 軸（感覚 / 直観） =====
  {
    id: 6,
    axis: "SN",
    text: "禁書を開くとき、あなたが信じるのは――",
    choices: [
      { label: "頁に記された、確かな事実と手触り", pole: "S" },
      { label: "行間に潜む、まだ見ぬ意味の予兆", pole: "N" },
    ],
  },
  {
    id: 7,
    axis: "SN",
    text: "計略を練るとき、思考はどこへ向かう――",
    choices: [
      { label: "今ここで起きている、現実の盤面", pole: "S" },
      { label: "まだ訪れぬ、いくつもの未来の分岐", pole: "N" },
    ],
  },
  {
    id: 8,
    axis: "SN",
    text: "古城の地図を渡された。まず見るのは――",
    choices: [
      { label: "歩数と距離。具体的な道のり", pole: "S" },
      { label: "全体の構造。隠し通路の可能性", pole: "N" },
    ],
  },
  {
    id: 9,
    axis: "SN",
    text: "他者を語るとき、あなたが掴むのは――",
    choices: [
      { label: "その者が実際に取った行動と結果", pole: "S" },
      { label: "その者の奥に眠る、本質と動機", pole: "N" },
    ],
  },
  {
    id: 10,
    axis: "SN",
    text: "新しい術を学ぶなら――",
    choices: [
      { label: "手順を一つずつ、確実に身体へ刻む", pole: "S" },
      { label: "原理を掴み、応用で一気に飛躍する", pole: "N" },
    ],
  },

  // ===== T / F 軸（思考 / 感情） =====
  {
    id: 11,
    axis: "TF",
    text: "裏切り者を裁くとき、基準にするのは――",
    choices: [
      { label: "罪の重さ。情を排した論理と公正", pole: "T" },
      { label: "その者の事情。心情への共感", pole: "F" },
    ],
  },
  {
    id: 12,
    axis: "TF",
    text: "重い決断を下すとき、優先するのは――",
    choices: [
      { label: "最も合理的で、効率のよい結末", pole: "T" },
      { label: "関わる者の心を、最も傷つけない道", pole: "F" },
    ],
  },
  {
    id: 13,
    axis: "TF",
    text: "他者に評価を告げるとき――",
    choices: [
      { label: "事実をそのまま、容赦なく突きつける", pole: "T" },
      { label: "相手が受け止められるよう、言葉を選ぶ", pole: "F" },
    ],
  },
  {
    id: 14,
    axis: "TF",
    text: "あなたが従者から最も求めるのは――",
    choices: [
      { label: "有能さ。結果を出す力こそ全て", pole: "T" },
      { label: "忠誠。心からの献身こそ全て", pole: "F" },
    ],
  },
  {
    id: 15,
    axis: "TF",
    text: "議論が紛糾した。あなたの一手は――",
    choices: [
      { label: "矛盾を突き、論理で相手を黙らせる", pole: "T" },
      { label: "感情を汲み、場の調和を取り戻す", pole: "F" },
    ],
  },

  // ===== J / P 軸（判断 / 知覚） =====
  {
    id: 16,
    axis: "JP",
    text: "征服を始める前、あなたは――",
    choices: [
      { label: "綿密な計画を立て、その通りに進める", pole: "J" },
      { label: "まず動き、流れの中で道を選ぶ", pole: "P" },
    ],
  },
  {
    id: 17,
    axis: "JP",
    text: "あなたにとって心地よいのは――",
    choices: [
      { label: "全てが定まり、秩序立った盤面", pole: "J" },
      { label: "余白が残り、何でも起こりうる盤面", pole: "P" },
    ],
  },
  {
    id: 18,
    axis: "JP",
    text: "予定が崩れたとき、あなたは――",
    choices: [
      { label: "苛立つ。秩序の乱れは許せない", pole: "J" },
      { label: "むしろ高揚する。混沌こそ好機", pole: "P" },
    ],
  },
  {
    id: 19,
    axis: "JP",
    text: "目標を前にしたあなたは――",
    choices: [
      { label: "期限を決め、着実に仕留めにいく", pole: "J" },
      { label: "気の向くまま、複数を同時に転がす", pole: "P" },
    ],
  },
  {
    id: 20,
    axis: "JP",
    text: "あなたの城の流儀は――",
    choices: [
      { label: "全てに定位置。寸分の狂いもない統治", pole: "J" },
      { label: "決まりは最小限。自由な裁量での統治", pole: "P" },
    ],
  },
];
