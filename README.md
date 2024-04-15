# PrefectureDataViz

## 仕様

1. RESAS(地域経済分析システム) API の「都道府県一覧」API から取得する
2. API レスポンスから都道府県一覧のチェックボックスを動的に生成する
3. 都道府県にチェックを入れると、RESAS API から選択された都道府県の「人口構
   成」を取得する
4. 人口構成 API レスポンスから、X 軸:年、Y 軸:人口数の折れ線グラフを動的に生成し
   て表示する

## 事前準備

RESAS(地域経済分析システム) API の API キーを[取得](https://opendata.resas-portal.go.jp/)し、.env ファイルに記述して root 上に配置してください。

### .env 記述例

```
RESAS_API_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

RESAS_API_KEY は取得したキーを記述してください。

## Setup

```bash
# yarn
yarn

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

Checkout the [deployment documentation](https://nuxt.com/docs/getting-started/deployment#presets) for more information.
