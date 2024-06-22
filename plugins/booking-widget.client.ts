// plugins/booking-widget.client.ts
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const script = document.createElement("script");
    script.src = "https://r.cubic.rest/js/widget.js?h=B8E45d10";
    script.async = true;
    document.body.appendChild(script);
  }
});
