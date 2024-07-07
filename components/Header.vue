<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <header class="py-2 grid grid-cols-3 lg:grid-cols-2">
    <label for="my-drawer-2" class="btn btn-neutral btn-circle drawer-button lg:hidden">
      <IconMenu class="w-4 fill-white" />
    </label>
    <div class="flex justify-center lg:justify-start items-center">
      <h1 v-if="title" class="text-2xl font-bold text-center lg:text-left">{{ title }}</h1>
    </div>
    <slot />
  </header>
</template>