import { defineNuxtPlugin } from "#app";
import { useRoute } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    nuxtApp.hook("app:mounted", () => {
      const route = useRoute();
      const allowedRoutes = ["index", "bar", "about"];

      if (allowedRoutes.includes(route.name)) {
        const script = document.createElement("script");
        script.src = "//app.restoplace.cc/widget.js?h=2e926d6d435f14e7511e";
        script.async = true;
        document.body.appendChild(script);
      }
    });
  }
});
