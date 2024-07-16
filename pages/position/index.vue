<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

const { data } = useFetch<{
  ok: boolean
  positions: Position[]
}>('/api/position')

const { data: dataCategory } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')

// composables
const { locale, t } = useI18n()
const { token } = useAuth()
// state
const mode = ref('cards')
const selectedTab = ref<boolean | null>(true)
const isArchived = ref(false)
const selectedCategory = ref<string | null>(null)
const selectedStatus = ref<boolean | null>(null)
const isLoading = ref(false)
const searchablePosition = ref('')
const positions = computed(() => {
  if (!data.value) return []

  const currentLocale = locale.value

  return data.value.positions
    .sort((a, b) => a.order - b.order)
    .filter(position => selectedCategory.value ? position.categoryId === selectedCategory.value : true)
    .filter(position => isArchived.value === position.isArchived)
    .filter(position => selectedStatus.value === null ? position : selectedStatus.value === true ? position.new === true : position.new !== true)
    .filter(position => selectedTab.value === null ? position : position.isAvailable === selectedTab.value)
    .filter(position => {
      const title = position.title[currentLocale] || position.title['ru']

      return title.toLowerCase()
        .includes(searchablePosition.value.toLowerCase())
    })
})

const changeOrder = async (firstCategoryId: string, secondCategoryId: string) => {
  isLoading.value = true;

  try {
    const response = await $fetch<{
      ok: boolean
      message: string
      positions: Position[]
    }>('/api/position/order', {
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

    const firstCategoryIndex = data.value!.positions.findIndex(cat => cat._id === firstCategoryId);
    const secondCategoryIndex = data.value!.positions.findIndex(cat => cat._id === secondCategoryId);

    if (firstCategoryIndex !== -1 && secondCategoryIndex !== -1) {
      const tempOrder = data.value!.positions[firstCategoryIndex].order;
      data.value!.positions[firstCategoryIndex].order = data.value!.positions[secondCategoryIndex].order;
      data.value!.positions[secondCategoryIndex].order = tempOrder;
    }

  } catch (error) {
    console.error('An error occurred while updating the order:', error);
  } finally {
    isLoading.value = false;
  }
}

const handleChangeVisibility = async (item: Position) => {
  try {
    const response = await $fetch<{
      ok: boolean
      message: string
      positions: Position[]
    }>(`/api/position/visibility`, {
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
    data.value!.positions = response.positions;

  } catch (error) {
    console.error('An error occurred while updating the order:', error);
  } finally {
    isLoading.value = false;
  }
}

const tabs = computed(() => [
  {
    label: t("label.all"),
    value: null,
  },
  {
    label: t("label.available"),
    value: true,
  },
  {
    label: t("label.unavailable"),
    value: false,
  }
])
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <Header :title="$t('screen.positions.title')">
      <div class="flex justify-end">
        <NuxtLink :to="{ name: 'position-add' }" class="btn btn-sm btn-square">
          <IconPlus class="w-3" />
        </NuxtLink>
      </div>
    </Header>
    <div class="py-3 flex flex-col gap-2">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">{{ $t('label.search') }}</span>
        </div>
        <input v-model="searchablePosition" type="text" class="input input-bordered w-full"
          :placeholder="$t('label.title')">
      </label>
      <div class="grid md:grid-cols-3 gap-2">

        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ $t('label.category') }}</span>
          </div>
          <select v-if="dataCategory" v-model="selectedCategory" class="select select-bordered">
            <option :value="null">{{ $t("label.all") }}</option>
            <option v-for="category in dataCategory.categories" :key="category._id" :value="category._id">
              {{ category.title[locale] || category?.title["ru"] }}
            </option>
          </select>
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ $t('label.status') }}</span>
          </div>
          <select v-model="isArchived" class="select select-bordered">
            <option :value="false">{{ $t("label.inMenu") }}</option>
            <option :value="true">{{ $t("label.inArchive") }}</option>
          </select>
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ $t('label.status') }}</span>
          </div>
          <select v-model="selectedStatus" class="select select-bordered">
            <option :value="null">{{ $t("label.all") }}</option>
            <option :value="true">{{ $t("label.new") }}</option>
            <option :value="false">{{ $t("label.current") }}</option>
          </select>
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ $t('label.viewMode') }}</span>
          </div>
          <select v-model="mode" class="select select-bordered">
            <option value="cards">{{ $t("label.cards") }}</option>
            <option value="table">{{ $t("label.table") }}</option>
          </select>
        </label>
      </div>
      <div role="tablist" class="tabs tabs-boxed">
        <a v-for="tab in tabs" :key="tab.value" role="tab" class="tab" :class="{
          'tab-active': selectedTab === tab.value,
        }" @click="selectedTab = tab.value">
          {{ tab.label }}
        </a>
      </div>

    </div>
    <h2 class="text-xl font-bold mb-2">{{ $t("screen.positions.subtitle") }}</h2>
    <div v-if="mode === 'cards'" class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      <div v-for="(position, index) in positions" :key="position._id" class="aspect-square w-full indicator">
        <span v-if="position.new" class="indicator-item badge badge-primary">{{ $t('label.new') }}</span>
        <div class="flex flex-col sm:aspect-square rounded-md border p-3">
          <div class="flex justify-between gap-2">
            <p class="font-bold line-clamp-2">{{ position.title[locale] || position?.title["ru"] }}</p>
            <input type="checkbox" class="toggle" :checked="position.isAvailable"
              @change="handleChangeVisibility(position)" />
          </div>
          <p class="text-gray-400">{{ position.price }}₽</p>
          <div class="flex-1 flex flex-col justify-end gap-1  mt-4 sm:mt-0">
            <NuxtLink class="btn btn-sm hidden sm:inline-flex"
              :to="{ name: 'position-id', params: { id: position._id } }">
              {{ $t('label.edit') }}
            </NuxtLink>

            <div class="flex gap-1">
              <button v-if="index !== 0" class="btn btn-sm flex-1"
                @click="changeOrder(position._id, positions[index - 1]._id)" :disabled="isLoading">
                <IconChevronLeft class="w-2" />
              </button>
              <NuxtLink class="btn btn-sm sm:hidden" :to="{ name: 'position-id', params: { id: position._id } }">
                {{ $t('label.edit') }}
              </NuxtLink>
              <button v-if="index !== positions.length - 1" class="btn btn-sm flex-1"
                @click="changeOrder(position._id, positions[index + 1]._id)" :disabled="isLoading">
                <IconChevronRight class="w-2" />
              </button>
            </div>
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
          <tr v-for="(item, index) in positions" :key="item._id">
            <th>
              <input type="checkbox" class="checkbox checkbox-sm" :checked="item.isAvailable"
                @change="handleChangeVisibility(item)" />
            </th>
            <td>{{ item.title[locale] }}</td>
            <td>{{ item.price }}</td>
            <td>{{ item.unit }}</td>
            <td>{{ dataCategory ? dataCategory.categories.find(x => x._id === item.categoryId)?.title[locale] : "" }}
            </td>
            <td class="flex">
              <NuxtLink class="btn btn-sm  btn-square mr-2" :to="{ name: 'position-id', params: { id: item._id } }">
                <IconPen class=" w-3" />
              </NuxtLink>
              <button v-if="index !== 0" class="btn btn-sm btn-square mr-2"
                @click="changeOrder(item._id, positions[index - 1]._id)" :disabled="isLoading">
                <IconChevronUp class=" w-3" />
              </button>
              <button v-if="index !== positions.length - 1" class="btn btn-sm btn-square"
                @click="changeOrder(item._id, positions[index + 1]._id)" :disabled="isLoading">
                <IconChevronDown class="w-3" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-if="!positions.length" class="flex flex-col justify-center items-center py-20 w-full gap-6">
      <p class="text-lg text-gray-400">{{ $t('label.empty') }}</p>
      <NuxtLink :to="{ name: 'position-add' }" class="btn btn-neutral">{{ $t('label.add') }}</NuxtLink>
    </div>
  </div>
</template>