<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

const { t } = useI18n();
</script>

<template>
  <div>
    <Container>
      <h1 class="text-2xl font-bold mb-6">{{ t('screen.admin.title') }}</h1>
      <ul class="menu bg-base-200 rounded-box w-56">
        <li>
          <NuxtLink :to="{ name: 'category' }">{{ t('screen.category.title') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'dish' }">{{ t('screen.dishes.title') }}</NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'settings' }">{{ t('screen.settings.title') }}</NuxtLink>
        </li>
      </ul>
    </Container>
  </div>
</template>