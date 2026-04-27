# 金沢ヴィラズ — Kanazawa Villas

民泊施設「金沢ヴィラズ」の公式HPおよび予約システム設定のリポジトリ。

- **公開URL**: https://muuukkk.github.io/kanazawa-villas/
- **Beds24予約URL**: https://beds24.com/booking2.php?propid=261406
- **運営法人**: 合同会社IMK / Beds24アカウント: minpaku01312331

---

## 物件一覧

| 物件名 | エリア | 広さ | 定員 | 状態 |
|--------|--------|------|------|------|
| Nomachi Villa（野町邸） | 金沢市野町 | 77m² | 6名 | ✅ 開業済（2024.11） |
| Shiragiku Villa（白菊町邸） | 金沢市白菊町 | 56m² | 5名 | 🔜 2025.8開業予定 |
| Horikawa Villa（堀川町邸） | 金沢市堀川町 | 3部屋 | 11名 | 🔜 2026.7開業予定 |

---

## ファイル構成

```
kanazawa-villas/
├── index.html        # React+Babel 単一ファイル（全セクション含む）
├── images/
│   ├── nomachi-hero.jpg   # Nomachi ヒーロー画像
│   └── nomachi-01.jpg     # Nomachi 室内写真
└── README.md
```

---

## HP（index.html）の現状

### 実装済み
- Header / Hero / Concept / VillasList / Neighborhood / Reviews / Location / Host / FAQ / BookingPreview / Footer
- カラーテーマ：墨（sumi）/ フォント：Cormorant Garamond + しっぽり明朝
- Nomachi VillaのVillasListカード → Beds24 URLに接続済み（新タブ）
- BookingPreviewの「Continue on Beds24」→ villa選択時のみBeds24 URLに遷移

### 未対応（写真待ち）
- Shiragiku・Horikawa → Coming Soon表示のまま
- Neighborhoodの8枚・Hostの写真 → プレースホルダー（.ph）のまま
- フォトグラファー撮影後に差し替え予定

---

## Beds24 設定の現状

### 予約ページのカスタマイズ方針
**スタイルはすべてJavaScript（jQuery）で管理。CSSは使わない。**

理由：CSSの`:empty`がBeds24の空白文字に効かないため、空コンテナの非表示をJSで解決した経緯がある。セレクタ重複による上書きバグも複数回経験したため、JS一本化に統一。

### JSの設置場所
`予約ページ → …（Developer）→ 挿入 HTML <BODY> bottom`

### JSの現在の内容（v2）
- Google Fonts読み込み（Cormorant Garamond + Shippori Mincho）
- 基本スタイル（背景色・フォント・文字色）
- ヘッダースライダー（PC: 480px / SP: 260px）
- 検索バー全幅化
- 物件名・説明文・アメニティのスタイル
- カレンダーのスタイル
- ボタンスタイル（墨色・ホバー時アクセント色）
- powered by Beds24 非表示
- 空コンテナ非表示
- テキスト改善（less details → ▲close）
- リサイズ時再適用
- 言語切替（English▼）は意図的に残してある

### 各設定場所
| 設定項目 | 場所 |
|----------|------|
| 写真 | 設定 > 予約エンジン > ピクチャー（プロパティ写真 / オファー1ピクチャー） |
| 説明文 | プロパティ > オファー > オファー1編集 > 概要1 |
| 利用規約・キャンセルポリシー | 予約ページ > コンテンツ |
| スタイル | 使わない（JS管理） |
| JavaScript | 予約ページ > … > デベロッパー > 挿入HTML BODY bottom |
| 地図 | レイアウト > プロパティマップ > 設定 > ロケーション「Property Name and Address」・ズーム16 |

### 完成状態
| 項目 | 状態 |
|------|------|
| ヘッダースライダー | ✅ |
| オファー写真スライダー | ✅ |
| 説明文 | ✅ |
| アメニティ | ✅ |
| 地図（ピンあり・野町） | ✅ |
| スマホ対応 | ✅ |
| 空白非表示 | ✅ |
| powered by Beds24 非表示 | ✅ |
| 言語切替（English▼） | ✅ 表示あり |
| カレンダー・料金設定 | 🔒 直予約開放時に設定 |
| Stripe連携 | 🔒 審査完了後に設定 |

---

## Stripe の現状

- 合同会社IMK名義でアカウント作成済み（Google連携）
- Beds24との連携申請済み・**審査待ち中**
- セキュリティチェックリスト提出済み
- 本番稼働には代表社員の本人確認が必要（代表社員への依頼が必要）

### Stripe審査完了後にやること
1. Beds24のStripe設定を「有効/優先」→「使用する」に変更

---

## 残タスク一覧

### 優先度高
- [ ] Stripe：代表社員に本人確認情報の入力を依頼
- [ ] フォトグラファー撮影（外観・リビング・寝室・水回り・テクスチャー）

### 写真撮影後
- [ ] Beds24：プロパティ写真を撮影後の写真5枚程度に絞り差し替え
- [ ] HP：Shiragiku・Horikawaのvilla写真を差し替え
- [ ] HP：Neighborhood・Host写真のプレースホルダーを実素材に置き換え

### Stripe審査完了後
- [ ] Beds24：Stripe設定を本番に切り替え
- [ ] Beds24：料金設定・カレンダー開放
- [ ] HP：直予約開放の告知

### 任意
- [ ] 独自ドメイン取得

---

## 撮影指示メモ（フォトグラファー向け）

### 撮影候補
- 外観：玄関ドア正面・夕暮れ時のライトアップ・通りからの全景
- リビング・ダイニング：自然光・スタイリングあり
- 寝室：障子・布団・間接照明
- 水回り・キッチン
- テクスチャー接写（障子・畳・木の框）

### 技術要件
- 自然光メイン（蛍光灯オフ・間接照明のみ）
- 横長（16:9または3:2）
- RAWまたは高解像度JPEG
- 人物・私物を映り込ませない
