// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/fonts.css"],
  runtimeConfig: {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
    PHONE_NUMBER: "+79511985779",
    REGISTER_ACCESS: process.env.REGISTER_ACCESS,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-mongoose",
    "yandex-metrika-module-nuxt3",
    "@nuxtjs/i18n",
  ],
  mongoose: {
    uri: process.env.MONGODB_URI,
    options: {},
    modelsDir: "models",
  },
  yandexMetrika: {
    id: "95378132",
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
});
