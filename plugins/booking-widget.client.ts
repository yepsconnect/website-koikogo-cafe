import { defineNuxtPlugin } from "#app";
import { useRoute } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      const script = document.createElement("script");
      script.src = "//app.restoplace.cc/widget.js?h=2e926d6d435f14e7511e";
      script.async = true;
      document.body.appendChild(script);
    });
  }
});
