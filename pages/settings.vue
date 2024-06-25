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
  <Container>
    <div class="py-2 grid grid-cols-3 mb-4">
      <div>
        <NuxtLink :to="{ name: 'admin' }" class="btn btn-sm btn-ghost">
          <IconChevronLeft class="w-3" />
        </NuxtLink>
      </div>
      <h1 class="text-2xl font-bold text-center">
        {{ t("screen.settings.title") }}
      </h1>
      <div class="flex justify-end">
      </div>
    </div>
    <button class="btn btn-neutral" @click="handleLogout">{{ t("label.logout") }}</button>
  </Container>
</template>