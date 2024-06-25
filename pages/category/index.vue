<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { t } = useI18n()

const { data } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')

</script>

<template>
  <Container>
    <div class="flex items-center justify-between mb-6 py-2">
      <h1 class="text-2xl font-bold">{{ $t("screen.category.title") }}</h1>
      <NuxtLink :to="{ name: 'category-add' }" class="btn btn-sm btn-primary btn-outline">{{ $t("label.add") }}
      </NuxtLink>
    </div>
    <div v-if="data?.categories" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
      <NuxtLink v-for="category in data.categories" :key="category._id"
        :to="{ name: 'category-id', params: { id: category._id } }" class="aspect-square rounded-md border p-3">
        <p>{{ category.title }}</p>
      </NuxtLink>
    </div>
  </Container>
</template>