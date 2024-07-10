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
    const response = await $fetch<{
      ok: boolean;
      message: string;
    }>('/api/category/order', {
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


    if (!response.ok) {
      alert(response.message);
      return
    }

    const firstCategoryIndex = data.value!.categories.findIndex(cat => cat._id === firstCategoryId);
    const secondCategoryIndex = data.value!.categories.findIndex(cat => cat._id === secondCategoryId);

    if (firstCategoryIndex !== -1 && secondCategoryIndex !== -1) {
      const tempOrder = data.value!.categories[firstCategoryIndex].order;
      data.value!.categories[firstCategoryIndex].order = data.value!.categories[secondCategoryIndex].order;
      data.value!.categories[secondCategoryIndex].order = tempOrder;
    }

  } catch (error) {
    console.error('An error occurred while updating the order:', error);
  }
}
</script>

<template>
  <div class=" flex flex-col gap-4 p-3">
    <Header :title="$t('screen.category.title')">
      <div class="flex justify-end">
        <NuxtLink :to="{ name: 'admin-category-add' }" class="btn btn-sm btn-square">
          <IconPlus class="w-3" />
        </NuxtLink>
      </div>
    </Header>
    <div>
      <input v-model="searchableCategory" type="text" class="input input-bordered w-full"
        :placeholder="t('label.search', { field: t('label.categoryName') })">
    </div>
    <div v-if="categories.length" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="(category, index) in categories" :key="category._id"
        class="flex flex-col sm:aspect-square rounded-md border p-3 cursor:pointer hover:bg-gray-100">
        <p>{{ category?.title[locale] || category?.title["ru"] }}</p>
        <p v-if="category?.page" class="text-xs text-gray-400">{{ $t(`screen.${category?.page}.title`) }}</p>
        <div class="flex flex-col gap-2 justify-end flex-1 mt-4 sm:mt-0">
          <NuxtLink :to="{ name: 'admin-category-id', params: { id: category._id } }"
            class="btn btn-sm btn-glass hidden sm:inline-flex">
            {{
              $t('label.edit')
            }}
          </NuxtLink>
          <div class="flex gap-2">
            <button v-if="index !== 0" class="btn btn-sm flex-1"
              @click="changeOrder(category._id, categories[index - 1]._id)">
              <IconChevronLeft class="w-2" />
            </button>
            <NuxtLink :to="{ name: 'admin-category-id', params: { id: category._id } }"
              class="btn btn-sm btn-glass flex-1 sm:hidden">
              {{
                $t('label.edit')
              }}
            </NuxtLink>
            <button v-if="index !== categories.length - 1" class="btn btn-sm flex-1"
              @click="changeOrder(category._id, categories[index + 1]._id)">
              <IconChevronRight class="w-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="py-10 flex flex-col items-center gap-6">
      <p class="text-lg text-center text-gray-500">{{ $t('label.empty') }}</p>
      <NuxtLink :to="{ name: 'admin-category-add' }" class="btn btn-neutral">{{ $t('label.add') }}</NuxtLink>
    </div>
  </div>
</template>