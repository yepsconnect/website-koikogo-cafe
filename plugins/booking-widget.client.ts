import { defineNuxtPlugin, useRouter } from "#app";

export default defineNuxtPlugin((nuxtApp) => {
  // if (import.meta.client) {
  //   const router = useRouter();
  //   const loadScript = () => {
  //     const script = document.createElement("script");
  //     script.src = "https://r.cubic.rest/js/widget.js?h=B8E45d10";
  //     script.async = true;
  //     document.body.appendChild(script);
  //   };
  //   const handleRouteChange = (to: any) => {
  //     const allowedRoutes = ["index", "bar", "about"];
  //     if (allowedRoutes.includes(to.name)) {
  //       loadScript();
  //     }
  //   };
  //   // Check the current route on page load
  //   router.isReady().then(() => {
  //     handleRouteChange(router.currentRoute.value);
  //   });
  //   // Listen for route changes
  //   router.afterEach((to) => {
  //     handleRouteChange(to);
  //   });
  // }
});
