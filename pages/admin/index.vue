<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

const { t } = useI18n();
</script>

<template>
  <div>
    <h1 class="text-center mb-6 text-xl font-bold">{{ $t('screen.admin.title')}}</h1>
    <Logo class="w-64 mx-auto"/>
  </div>
</template>