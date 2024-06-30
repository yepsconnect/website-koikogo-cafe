<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

const { data } = useFetch<{
  ok: boolean
  dishes: Dish[]
}>('/api/dish')

// composables
const { locale } = useI18n()
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold">{{ $t("screen.dishes.title") }}</h1>
      <NuxtLink class="btn btn-primary" :to="{ name: 'dish-add' }">
        {{ $t("label.add") }}
      </NuxtLink>
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
      <div v-for="dish in data?.dishes" :key="dish._id" class=" flex flex-col aspect-square rounded-md border p-3">
        <p class="font-bold line-clamp-2">{{ dish.name[locale] || dish?.name["ru"] }}</p>
        <p class="text-gray-400">{{ dish.price }}₽</p>
        <div class="flex-1 flex justify-end items-end">
          <NuxtLink class="btn btn-sm btn-outline" :to="{ name: 'dish-id', params: { id: dish._id } }">
            {{ $t('label.edit') }}
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>