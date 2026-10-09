/**
 * 展示用 DEMO 網站：所有公司名稱、成員、文章與數據皆為虛構內容。
 * 全站已設定 noindex / nofollow，避免被搜尋引擎收錄。
 */
// 網站完整網址（不含結尾斜線），由環境變數 SITE_URL 帶入，預設為本地開發網址
const BASE_URL = ( process.env.SITE_URL || 'http://localhost:3000' ).replace( /\/+$/ , '' )
const GTM_ID = 'GTM-XXXXXXX'
const GTAG_ID = 'G-XXXXXXXXXX'
const HOTJAR_ID = '0000000'
const HOTJAR_SV = '6'


export default defineNuxtConfig({
  ssr: true,
  srcDir: 'src',
  experimental: {
    payloadExtraction: false,
  },
  runtimeConfig: {
    public: {
      BASE_URL,
      EMAILJS: {
        SERVICE_ID: 'service_demo0000',
        TEMPLATE_ID: 'template_demo0000',
        PUBLIC_KEY: 'demoPublicKey00000',
      }
    },
  },
  modules: [
    '@nuxt/content',
    '@nuxtjs/i18n',
    '@zadigetvoltaire/nuxt-gtm',
    'nuxt-gtag',
  ],
  i18n: {
    baseUrl: BASE_URL,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    defaultLocale: 'tw',
    // 語系一律由網址決定，不依瀏覽器語言自動導向，避免英文瀏覽器無法停留在中文首頁
    detectBrowserLanguage: false,
    locales: [
      {
        code: 'tw',
        iso: 'zh-Hant-TW',
        name: '中文',
        file: 'tw.json',
        dir: 'ltr'
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
        dir: 'ltr'
      },
    ],
  },
  css: [
    '~/assets/css/style.css',
    '@fortawesome/fontawesome-svg-core/styles.css',
  ],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  gtm: {
    id: GTM_ID,
  },
  gtag: {
    id: GTAG_ID,
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
        class: 'scroll-smooth'
      },
      title: 'FakeCompany',
      meta: [
        { charset: 'utf-8' },
        // DEMO 網站：禁止搜尋引擎收錄與追蹤連結
        { name: 'robots' , content: 'noindex, nofollow' },
        { name: 'viewport' , content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' },
        { name: 'copyright', content: `Copyright ${ new Date().getFullYear() } © FakeCompany Co., Ltd. All Rights Reserved.` },
        { property: 'og:image' , content: `${ BASE_URL }/images/fakecompany.png` },
        { property: 'og:title' , content: 'FakeCompany' },
        { property: 'og:site_name', content: 'FakeCompany' },
        { name: 'twitter:title', content: 'FakeCompany' },
        { name: 'twitter:image' , content: `${ BASE_URL }/images/fakecompany.png` },
        { name: 'twitter:card' , content: 'summary_large_image' },
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', sizes: '48x48', href: `${ process.env.NUXT_APP_BASE_URL || '/' }favicon.ico` },
        { rel: 'icon', type: 'image/svg+xml', href: `${ process.env.NUXT_APP_BASE_URL || '/' }favicon.svg` },
        // DEMO 網站不需被搜尋引擎收錄，故不提供 sitemap 連結
      ],
      script: [
        {
          innerHTML: (
            `(function(h,o,t,j,a,r){` +
            `h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};` +
            `h._hjSettings={hjid:${ HOTJAR_ID },hjsv:${ HOTJAR_SV }};` +
            `a=o.getElementsByTagName('head')[0];` +
            `r=o.createElement('script');r.async=1;` +
            `r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;` +
            `a.appendChild(r);` +
            `})(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
          )
        }
      ],
    },
  },
})
