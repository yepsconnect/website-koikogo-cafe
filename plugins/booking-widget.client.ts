import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const script = document.createElement("script");
    script.src = "//app.restoplace.cc/widget.js?h=2e926d6d435f14e7511e";
    script.async = true;
    document.body.appendChild(script);
  }
});
