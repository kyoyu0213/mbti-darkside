# サイコパスMBTI診断

禁書庫・古城・黒×紫×金のダークファンタジー世界観で、20問からあなたの「サイコパスMBTIタイプ」を暴き出すエンタメ診断サイト。

> ⚠️ 本サイトはエンターテインメント目的の非科学的な診断です。医学的・心理学的な診断ではありません。

## 技術スタック

- Next.js 14（App Router）
- TypeScript
- Tailwind CSS
- npm
- Vercel へそのままデプロイ可能

## セットアップ

```bash
npm install
npm run dev      # http://localhost:3000
```

## ビルド

```bash
npm run build
npm start
```

## ページ構成

| パス | 内容 |
| --- | --- |
| `/` | トップページ（世界観紹介・16タイプ一覧） |
| `/quiz` | 質問ページ（全20問） |
| `/result?mbti=XXXX` | 結果ページ（タイプ・対応MBTI・Xシェア） |

## 診断ロジックの編集ポイント

ロジックとデータは分離してあり、後から編集しやすい構成です。

| ファイル | 役割 |
| --- | --- |
| `data/questions.ts` | 20問の質問・選択肢・対応軸 |
| `data/types.ts` | 16タイプの称号・説明・絵文字・画像名 |
| `lib/diagnose.ts` | 4軸スコアリングと判定ロジック |
| `lib/types.ts` | 型定義 |
| `lib/site.ts` | サイト名・URLなどの定数 |

### 判定の仕組み

- 質問は4軸（E/I・S/N・T/F・J/P）に各5問。
- 各回答が軸の「右の極」なら +1、「左の極」なら −1。
- 軸の合計が正なら右の極、0以下なら左の極を採用し、4文字の MBTI コードを決定。

## 画像の差し替え

`public/images/types/<MBTIコード>.png` を置くと、結果ページで絵文字の代わりに画像が表示されます。
画像が無い間は自動的に絵文字プレースホルダーになります。詳細は
[`public/images/types/README.md`](public/images/types/README.md) を参照。

## Vercel デプロイ

このリポジトリを Vercel にインポートするだけでデプロイできます（追加設定不要）。
デプロイ後、`lib/site.ts` の `url` を本番URLに更新すると OGP 等に反映されます。
