<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { t, locale } = useI18n()
const { token } = useAuth()

const { data } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')

// state
const searchableCategory = ref('')

// computed 
const categories = computed(() => {
  if (!data.value) return []

  const currentLocale = locale.value

  return data.value.categories
    .sort((a, b) => a.order - b.order)
    .filter(category => {
      const title = category.title[currentLocale] || category.title['ru']
      return title.toLowerCase().includes(searchableCategory.value.toLowerCase())
    })
})
</script>

<template>
  <div class=" flex flex-col gap-4 p-3">
    <Header :title="$t('screen.category.title')">
      <div class="flex justify-end">
        <NuxtLink :to="{ name: 'category-add' }" class="btn btn-sm btn-square">
          <IconPlus class="w-3" />
        </NuxtLink>
      </div>
    </Header>
    <div role="alert" class="alert max-w-xl">
      <IconInformationSquare class="w-12 sm:w-8" />
      <span>В данном разделе находятся все категории. Вы можете добавить новую категорию, а также редактировать или
        удалить уже существущие. Категории можно привязать к определенному разделу меню на странице <NuxtLink
          :to="{ name: 'page' }" class="link link-primary">Страницы</NuxtLink>, а также к конкретной позиции на
        странице <NuxtLink :to="{ name: 'position' }" class="link link-primary">Позиции</NuxtLink>.</span>
    </div>
    <div>
      <input v-model="searchableCategory" type="text" class="input input-bordered w-full"
        :placeholder="t('label.search', { field: t('label.categoryName') })">
    </div>
    <div v-if="categories.length" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="(category, index) in categories" :key="category._id"
        class="flex flex-col sm:aspect-square rounded-md border p-3 cursor:pointer hover:bg-gray-100">
        <div class="flex justify-between items-start gap-2">
          <p>{{ category?.title[locale] || category?.title["ru"] }}</p>
          <NuxtLink :to="{ name: 'category-id', params: { id: category._id } }" class="btn btn-sm btn-circle">
            <IconPen class="w-4" />
          </NuxtLink>
        </div>
      </div>
    </div>
    <div v-else class="py-10 flex flex-col items-center gap-6">
      <p class="text-lg text-center text-gray-500">{{ $t('label.empty') }}</p>
    </div>
  </div>
</template>