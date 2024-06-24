// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ["~/assets/css/fonts.css"],
  runtimeConfig: {
    TOKEN_SECRET: process.env.TOKEN_SECRET,
  },
  modules: [
    "@nuxtjs/tailwindcss",
    "nuxt-mongoose",
    "yandex-metrika-module-nuxt3",
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
});
