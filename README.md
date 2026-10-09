# FakeCompany Official Website

> **展示用 DEMO 網站**：網站中的公司名稱、成員、文章與數據皆為虛構內容。全站已設定 `noindex, nofollow`，不會被搜尋引擎收錄。

## 初始化

須擁有 `node.js` 與 `npm`：  
建議使用 `nvm` 做為 `node.js` 版本管理工具，詳請參考 [nvm](https://github.com/nvm-sh/nvm)  

|           | 基本       | 建議       |
| :-------- | :-------- | :-------- |
| `node.js` | `v17.0.0` | `v22`     |
| `npm`     | `v8.1.0`  | `v10`     |

```bash
npm install
```

## 開發環境

開發環境預設監聽於 `http://localhost:3000`:

```bash
npm run dev
```

## 產品環境

此專案使用 靜態頁面生成 Static site generation (SSG) 技術

```bash
# 靜態頁面生成
npm run generate

# 預覽
npm run preview
```

建置時可透過環境變數設定網址（GitHub Actions 部署時會自動帶入）：

| 環境變數             | 說明                                              | 預設值                   |
| :------------------ | :----------------------------------------------- | :---------------------- |
| `SITE_URL`          | 網站完整網址，用於 og:image、sitemap 等             | `http://localhost:3000` |
| `NUXT_APP_BASE_URL` | 網站部署的子路徑，例如 `/demo-business-website/`     | `/`                     |

## 主要使用技術
- TypeScript： 為 JavaScript 的型別語言，詳情參考 [TypeScript](https://www.typescriptlang.org/)
- Nuxt： 為 Vue 的拓展框架，詳情參考 [Vue](https://vuejs.org/) 與 [Nuxt](https://nuxt.com/)
- tailwindcss： 為 css 框架，詳情參考 [tailwindcss](https://tailwindcss.com/)

## 專案架構
```
acme-tech
    |
    |__bin  // 執行檔
    |__docs // 輸出檔
    |__src
    |   |__assets      // 影音資產
    |   |__components  // 元件
    |   |__composables // 組合函數
    |   |__content     // 文章
    |   |__layouts     // 佈局
    |   |__locales     // 語言包
    |   |__pages       // 頁面
    |   |__plugins     // 第三方套件
    |   |__public      // 靜態資源
    |   |__app.vue     // 應用程式入口
    |   |__error.vue   // 錯誤頁面
    |
    |__nuxt.config.js     // Nuxt 設定檔
    |__tailwind.config.js // tailwindcss 設定檔
```

## 文章新增
於 `src/content` 中依語系個別新增文章，文章必須為 `.md` 檔，但可在檔中撰寫 `Markdown` 或是 `html` 格式，皆可正常編譯。  

文章圖片請放置於 `src/public/images/blog` 資料夾內，在文章中引用連結為 `/images/blog/your_folder/your_image.jpg`。

## 新增語系
可於 `nuxt.config.ts` 中 `i18n.locales` 配置、新增語系，語言包請放置於 `src/locales`。
