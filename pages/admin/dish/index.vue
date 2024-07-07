<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

const { data } = useFetch<{
  ok: boolean
  dishes: Dish[]
}>('/api/dish')

const { data: dataCategory } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')

// composables
const { locale } = useI18n()
const { token } = useAuth()
// state
const mode = ref('cards')
const isAvailable = ref(null)
const selectedCategory = ref<string | null>(null)
const isLoading = ref(false)
const searchableDish = ref('')
const dishes = computed(() => {
  if (!data.value) return []

  const currentLocale = locale.value

  return data.value.dishes
    .sort((a, b) => a.order - b.order)
    .filter(dish => selectedCategory.value ? dish.categoryId === selectedCategory.value : true)
    .filter(dish => isAvailable.value === null ? dish : dish.isAvailable === isAvailable.value)
    .filter(dish => {
      const title = dish.title[currentLocale] || dish.title['en']

      return title.toLowerCase().includes(searchableDish.value.toLowerCase())
    })
})

const changeOrder = async (firstCategoryId: string, secondCategoryId: string) => {
  isLoading.value = true;

  try {
    const response = await $fetch<{
      ok: boolean
      message: string
      dishes: Dish[]
    }>('/api/dish/order', {
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
      return alert(response.message)
    }

    const firstCategoryIndex = data.value!.dishes.findIndex(cat => cat._id === firstCategoryId);
    const secondCategoryIndex = data.value!.dishes.findIndex(cat => cat._id === secondCategoryId);

    if (firstCategoryIndex !== -1 && secondCategoryIndex !== -1) {
      const tempOrder = data.value!.dishes[firstCategoryIndex].order;
      data.value!.dishes[firstCategoryIndex].order = data.value!.dishes[secondCategoryIndex].order;
      data.value!.dishes[secondCategoryIndex].order = tempOrder;
    }

  } catch (error) {
    console.error('An error occurred while updating the order:', error);
  } finally {
    isLoading.value = false;
  }
}

const handleChangeVisibility = async (item: Dish) => {
  try {
    const response = await $fetch<{
      ok: boolean
      message: string
      dishes: Dish[]
    }>(`/api/dish/visibility`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value!
      },
      body: JSON.stringify({
        id: item._id,
        isAvailable: !item.isAvailable
      }),
    })
    if (!response.ok) {
      return alert(response.message)
    }
    data.value!.dishes = response.dishes;

  } catch (error) {
    console.error('An error occurred while updating the order:', error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <Header :title="$t('screen.dishes.title')">
      <div class="flex justify-end">
        <NuxtLink :to="{ name: 'admin-dish-add' }" class="btn btn-sm btn-square">
          <IconPlus class="w-3" />
        </NuxtLink>
      </div>
    </Header>
    <div class="py-3 flex flex-col gap-2">
      <input v-model="searchableDish" type="text" class="input input-bordered w-full" :placeholder="$t('label.search')">
      <div class="grid md:grid-cols-3 gap-2">
        <select v-if="dataCategory" v-model="selectedCategory" class="select select-bordered">
          <option :value="null">{{ $t("label.all") }}</option>
          <option v-for="category in dataCategory.categories" :key="category._id" :value="category._id">
            {{ category.title[locale] || category?.title["ru"] }}
          </option>
        </select>
        <select v-model="isAvailable" class="select select-bordered">
          <option :value="null">{{ $t("label.all") }}</option>
          <option :value="true">{{ $t("label.available") }}</option>
          <option :value="false">{{ $t("label.unavailable") }}</option>
        </select>
        <select v-model="mode" class="select select-bordered">
          <option value="cards">{{ $t("label.cards") }}</option>
          <option value="table">{{ $t("label.table") }}</option>
        </select>
      </div>
    </div>
    <h2 class="text-xl font-bold mb-2">{{ $t("screen.dishes.subtitle") }}</h2>
    <div v-if="mode === 'cards'" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="(dish, index) in dishes" :key="dish._id"
        class=" flex flex-col sm:aspect-square rounded-md border p-3">
        <div class="flex justify-between gap-2">
          <p class="font-bold line-clamp-2">{{ dish.title[locale] || dish?.title["ru"] }}</p>
          <input type="checkbox" class="toggle" :checked="dish.isAvailable" @change="handleChangeVisibility(dish)" />
        </div>
        <p class="text-gray-400">{{ dish.price }}₽</p>
        <div class="flex-1 flex flex-col justify-end gap-1  mt-4 sm:mt-0">
          <NuxtLink class="btn btn-sm hidden sm:inline-flex" :to="{ name: 'admin-dish-id', params: { id: dish._id } }">
            {{ $t('label.edit') }}
          </NuxtLink>

          <div class="flex gap-1">
            <button v-if="index !== 0" class="btn btn-sm flex-1" @click="changeOrder(dish._id, dishes[index - 1]._id)"
              :disabled="isLoading">
              <IconChevronLeft class="w-2" />
            </button>
            <NuxtLink class="btn btn-sm sm:hidden" :to="{ name: 'admin-dish-id', params: { id: dish._id } }">
              {{ $t('label.edit') }}
            </NuxtLink>
            <button v-if="index !== dishes.length - 1" class="btn btn-sm flex-1"
              @click="changeOrder(dish._id, dishes[index + 1]._id)" :disabled="isLoading">
              <IconChevronRight class="w-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="mode === 'table'" class="overflow-x-auto">
      <table class="table table-pin-rows table-pin-cols">
        <thead>
          <tr>
            <th>{{ $t('label.availability') }}</th>
            <td>{{ $t('label.title') }}</td>
            <td>{{ $t('label.price') }}</td>
            <td>{{ $t('label.unit') }}</td>
            <td>{{ $t('label.category') }}</td>
            <td>{{ $t('label.action') }}</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in dishes" :key="item._id">
            <th>
              <input type="checkbox" class="checkbox checkbox-sm" :checked="item.isAvailable"
                @change="handleChangeVisibility(item)" />
            </th>
            <td>{{ item.title[locale] }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.price }}</td>
            <td>{{ dataCategory.categories.find(x => x._id === item.categoryId).title[locale] }}</td>
            <td>
              <NuxtLink class="btn btn-sm  btn-square mr-2" :to="{ name: 'admin-dish-id', params: { id: item._id } }">
                <IconPen class=" w-3" />
              </NuxtLink>
              <button v-if="index !== 0" class="btn btn-sm btn-square mr-2"
                @click="changeOrder(item._id, dishes[index - 1]._id)" :disabled="isLoading">
                <IconChevronUp class=" w-3" />
              </button>
              <button v-if="index !== dishes.length - 1" class="btn btn-sm btn-square"
                @click="changeOrder(item._id, dishes[index + 1]._id)" :disabled="isLoading">
                <IconChevronDown class="w-3" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!dishes.length" class="flex flex-col justify-center items-center py-20 w-full">
      <p class="text-lg text-gray-400">{{ $t('label.empty') }}</p>
    </div>
  </div>
</template>