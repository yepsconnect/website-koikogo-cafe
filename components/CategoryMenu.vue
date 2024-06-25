<script setup lang="ts">
defineEmits(["onSubmit"])
defineProps<{
  categories: Category[]
  activeCategory: string | null
  locale: string
}>()
</script>

<template>
  <div class="navbar bg-base-100 overflow-x-scroll gap-3 py-3 position: sticky top-0 z-10">
    <a v-for="(category, index) in categories" :key="index"
      class="badge badge-lg badge-outline whitespace-nowrap capitalize" :class="{
        'badge-primary': activeCategory === category.slug,
      }" :href="'#' + category.slug" @click="$emit('onSubmit', category.slug)">
      {{ category?.title[locale] || category?.title[Object.keys(category.title)[0]] }}
    </a>
  </div>
</template>