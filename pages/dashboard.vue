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
      <ul class="menu bg-base-200 rounded-box w-56">
        <li>
          <NuxtLink :to="{ name: 'category' }">Управление категориями</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'settings' }">Настройки</NuxtLink>
        </li>
      </ul>
    </Container>
  </div>
</template>