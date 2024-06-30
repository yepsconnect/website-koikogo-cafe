<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { t, locale } = useI18n()

const { data } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')

</script>

<template>
  <Container>
    <div class="py-2 grid grid-cols-3 mb-4">
      <div>
        <NuxtLink :to="{ name: 'admin' }" class="btn btn-sm btn-ghost">
          <IconChevronLeft class="w-3" />
        </NuxtLink>
      </div>
      <h1 class="text-2xl font-bold text-center">{{ $t("screen.category.title") }}</h1>
      <div class="flex justify-end">
        <NuxtLink :to="{ name: 'category-add' }" class="btn btn-sm btn-primary btn-outline">{{ $t("label.add") }}
        </NuxtLink>
      </div>
    </div>
    <div v-if="data?.categories" class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
      <NuxtLink v-for="category in data.categories" :key="category._id"
        :to="{ name: 'category-id', params: { id: category._id } }" class="aspect-square rounded-md border p-3">
        <p>{{ category?.title[locale] || category?.title["ru"] }}</p>
      </NuxtLink>
    </div>
  </Container>
</template>