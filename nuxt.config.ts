// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/fonts.css"],

  runtimeConfig: {
    TOKEN_SECRET: process.env.DEV_MODE,
    public: {
      API_URL: process.env.API_URL,
      X_API_KEY: process.env.X_API_KEY,
    },
  },

  modules: [
    "@nuxtjs/tailwindcss",
    "yandex-metrika-module-nuxt3",
    "@nuxtjs/i18n",
    "@hebilicious/vue-query-nuxt",
  ],

  yandexMetrika: {
    id: process.env.YANDEX_METRIKA_ID,
    webvisor: true,
  },

  i18n: {
    strategy: "no_prefix",
    locales: [
      {
        code: "ru",
        file: "ru.yaml",
      },
      {
        code: "en",
        file: "en.yaml",
      },
    ],
    lazy: true,
    langDir: "lang",
    defaultLocale: "ru",
  },

  compatibilityDate: "2024-11-27",
});