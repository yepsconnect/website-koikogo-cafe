<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
</script>

<template>
  <div>
    <Container>
      <h1 class="text-2xl font-bold mb-6">Управление</h1>
      <NuxtLink :to="{ name: 'settings' }">Настройки</NuxtLink>
    </Container>
  </div>
</template>