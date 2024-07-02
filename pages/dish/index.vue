<script setup lang="ts">
import IconChevronLeft from '~/components/IconChevronLeft.vue';

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
const { token } = useAuth()
// state
const isLoading = ref(false)
const searchableDish = ref('')
const dishes = computed(() => {
  if (!data.value) return []

  const currentLocale = locale.value

  return data.value.dishes
    .sort((a, b) => a.order - b.order)
    .filter(dish => {
      const title = dish.title[currentLocale] || dish.title['en']

      return title.toLowerCase().includes(searchableDish.value.toLowerCase())
    })
})

const changeOrder = async (firstCategoryId: string, secondCategoryId: string) => {
  isLoading.value = true;

  try {
    const response = await fetch('/api/dish/order', {
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
      const firstCategoryIndex = data.value!.dishes.findIndex(cat => cat._id === firstCategoryId);
      const secondCategoryIndex = data.value!.dishes.findIndex(cat => cat._id === secondCategoryId);

      if (firstCategoryIndex !== -1 && secondCategoryIndex !== -1) {
        const tempOrder = data.value!.dishes[firstCategoryIndex].order;
        data.value!.dishes[firstCategoryIndex].order = data.value!.dishes[secondCategoryIndex].order;
        data.value!.dishes[secondCategoryIndex].order = tempOrder;
      }
    } else {
      console.error('Failed to update order:', result.message);
    }
  } catch (error) {
    console.error('An error occurred while updating the order:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div>
    <div class="flex items-center justify-between">
      <NuxtLink class="btn btn-square btn-ghost" :to="{ name: 'admin' }">
        <IconChevronLeft class="w-3" />
      </NuxtLink>
      <h1 class="text-2xl font-bold">{{ $t("screen.dishes.title") }}</h1>
      <NuxtLink class="btn btn-primary" :to="{ name: 'dish-add' }">
        {{ $t("label.add") }}
      </NuxtLink>
    </div>
    <div class="py-3">
      <input v-model="searchableDish" type="text" class="input input-bordered w-full" :placeholder="$t('label.search')">
    </div>
    <div class="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-6">
      <div v-for="(dish, index) in dishes" :key="dish._id" class=" flex flex-col aspect-square rounded-md border p-3">
        <p class="font-bold line-clamp-2">{{ dish.title[locale] || dish?.title["ru"] }}</p>
        <p class="text-gray-400">{{ dish.price }}₽</p>
        <div class="flex-1 flex flex-col justify-end gap-1">
          <NuxtLink class="btn btn-sm btn-outline" :to="{ name: 'dish-id', params: { id: dish._id } }">
            {{ $t('label.edit') }}
          </NuxtLink>

          <div class="flex gap-1">
            <button v-if="index !== 0" class="btn btn-sm flex-1" @click="changeOrder(dish._id, dishes[index - 1]._id)"
              :disabled="isLoading">
              <IconChevronLeft class="w-2" />
            </button>
            <button v-if="index !== dishes.length - 1" class="btn btn-sm flex-1"
              @click="changeOrder(dish._id, dishes[index + 1]._id)" :disabled="isLoading">
              <IconChevronRight class="w-2" />
            </button>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>