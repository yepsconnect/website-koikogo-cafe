<script setup lang="ts">
defineEmits(["onSubmit"]);
defineProps<{
  categories: Category[];
  activeCategory: string | null;
}>();
</script>

<template>
  <div
    class="navbar bg-base-100 overflow-x-scroll gap-3 py-3 sticky top-0 z-10 flex"
  >
    <a
      v-for="(category, index) in categories"
      :key="index"
      class="badge badge-lg badge-outline whitespace-nowrap capitalize"
      :class="{
        'badge-primary': activeCategory === category.slug,
      }"
      :href="'#' + category.slug"
      @click="$emit('onSubmit', category.slug)"
    >
      {{ category.name }}
    </a>
  </div>
</template>
