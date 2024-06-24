<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
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
    <h1 class="text-2xl font-bold mb-6">Настройки</h1>
    <button class="btn btn-neutral" @click="handleLogout">Выйти</button>
  </Container>
</template>