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

const changeOrder = async (firstCategoryId: string, secondCategoryId: string) => {
  try {
    const response = await fetch('/api/category/order', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value!
      },
      body: JSON.stringify({
        firstCategoryId,
        secondCategoryId,
      }),
    });

    const result = await response.json();

    if (result.ok) {
      const firstCategoryIndex = data.value!.categories.findIndex(cat => cat._id === firstCategoryId);
      const secondCategoryIndex = data.value!.categories.findIndex(cat => cat._id === secondCategoryId);

      if (firstCategoryIndex !== -1 && secondCategoryIndex !== -1) {
        const tempOrder = data.value!.categories[firstCategoryIndex].order;
        data.value!.categories[firstCategoryIndex].order = data.value!.categories[secondCategoryIndex].order;
        data.value!.categories[secondCategoryIndex].order = tempOrder;
      }
    } else {
      console.error('Failed to update order:', result.message);
    }
  } catch (error) {
    console.error('An error occurred while updating the order:', error);
  }
}
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
    <div class="py-3">
      <input v-model="searchableCategory" type="text" class="input input-bordered w-full"
        :placeholder="t('label.search', { field: t('label.categoryName') })">
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
      <div v-for="(category, index) in categories" :key="category._id"
        class="flex flex-col aspect-square rounded-md border p-3 cursor:pointer hover:bg-gray-100">
        <p>{{ category?.title[locale] || category?.title["ru"] }}</p>
        <div class="flex flex-col gap-2 justify-end flex-1">
          <NuxtLink :to="{ name: 'category-id', params: { id: category._id } }" class="btn btn-sm btn-glass">
            {{
              $t('label.edit')
            }}
          </NuxtLink>
          <div class="flex gap-2">
            <button v-if="index !== 0" class="btn btn-sm flex-1"
              @click="changeOrder(category._id, categories[index - 1]._id)">
              <IconChevronLeft class="w-2" />
            </button>
            <button v-if="index !== categories.length - 1" class="btn btn-sm flex-1"
              @click="changeOrder(category._id, categories[index + 1]._id)">
              <IconChevronRight class="w-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </Container>
</template>