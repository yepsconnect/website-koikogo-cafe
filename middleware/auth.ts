export default defineNuxtRouteMiddleware((to, from) => {
  const { isAuth } = useAuth();

  if (!isAuth.value && import.meta.client) {
    return navigateTo("/login");
  }
});
