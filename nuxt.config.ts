// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  routeRules: {
    // prerender index route by default
    "/": { prerender: true },
  },
  // クライアントサイドで利用する公開設定
  runtimeConfig: {
    // Publicly accessible config
    public: {
      API_BASE_URL: "https://opendata.resas-portal.go.jp/api/v1", // This is fine as it's just a base URL
      RESAS_API_KEY: process.env.RESAS_API_KEY,
    },
  },
});
