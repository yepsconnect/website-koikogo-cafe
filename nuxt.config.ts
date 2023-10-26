// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    [
      "yandex-metrika-module-nuxt3",
      {
        id: "95378132",
        webvisor: true,
        // consoleLog: true,
        // clickmap: true,
        // useCDN: false,
        // trackLinks: true,
        // accurateTrackBounce: true,
      },
    ],
  ],
  css: ["~/assets/css/fonts.css"],
});
