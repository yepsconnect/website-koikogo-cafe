<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { t } = useI18n()
const router = useRouter()
const { setAuth } = useAuth();
// methods
const handleLogout = () => {
  setAuth(null)
  router.push('/login')
}
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <Header :title="$t('screen.settings.title')" />
    <button class="btn btn-neutral" @click="handleLogout">{{ t("label.logout") }}</button>
  </div>
</template>