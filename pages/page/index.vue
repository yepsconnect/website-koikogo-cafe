<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// fetch
const { data } = useFetch<{
  ok: boolean,
  pages: Page[]
}>("/api/page")

const { data: dataC } = useFetch<{
  ok: boolean,
  categories: Category[]
}>("/api/category")
// composables
const { token } = useAuth()
// state
const isLoading = ref(false)
const selectedPage = ref<Page | null>(null)
const modal = ref(false)
// methods
const openModal = (id: string) => {
  const candidate = data.value?.pages.find(p => p._id === id)
  if (!candidate) {
    return
  }
  selectedPage.value = candidate
  modal.value = true;
}
const toggleCategory = (id: string) => {
  if (!selectedPage.value) {
    return
  }
  const isExist = selectedPage.value.categories.includes(id)
  if (isExist) {
    selectedPage.value.categories = selectedPage.value.categories.filter(c => c !== id)
  } else {
    selectedPage.value.categories.push(id)
  }
}

const updateCategories = async () => {
  if (!selectedPage.value) {
    return
  }
  isLoading.value = true
  try {
    const response = await $fetch<{
      ok: boolean
      message: string
    }>(`/api/page/${selectedPage.value._id}`, {
      method: 'PUT',
      body: JSON.stringify({ categories: selectedPage.value.categories }),
      headers: {
        Authorization: token.value!
      },
    })
    if (!response.ok) return alert(response.message)
    modal.value = false

  } catch (error) {
    alert(error)
  } finally {
    isLoading.value = false
  }

}
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <h1 class="text-2xl font-bold">Меню</h1>
    <div role="alert" class="alert max-w-xl">
      <IconInformationSquare class="w-12 sm:w-8" />
      <span>В данном разделе находятся страницы сайта, на которых отображается меню. Для каждого раздела меню можно
        выбрать категории, которые будут отображены на соответствующей странице.</span>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="item in data?.pages" class="border rounded p-3 flex flex-col justify-between gap-3">
        <div class="flex justify-between items-start gap-2">
          <h2 class="text-xl font-semibold">{{ item.title['ru'] }}</h2>
          <div class="btn btn-sm btn-circle" @click="openModal(item._id)">
            <IconPen class="w-4" />
          </div>
        </div>
        <div class="flex flex-wrap gap-1">
          <div v-for="categoryId in item.categories" :key="categoryId" class="badge badge-outline">
            {{ dataC?.categories.find(x => x._id === categoryId)?.title['ru'] }}
          </div>
        </div>
      </div>
    </div>
    <Modal v-model="modal">
      <h2 class="text-xl font-semibold mb-6">{{ $t('label.categories') }}</h2>
      <div v-if="selectedPage" class="flex flex-wrap gap-1">
        <div v-for="item in dataC?.categories" class="badge badge-lg gap-1 cursor-pointer" :class="{
          'badge-primary badge-outline': selectedPage.categories.includes(item._id),
        }" @click="toggleCategory(item._id)">
          {{ item.title['ru'] }}
          <IconCheck v-if="selectedPage.categories.includes(item._id)" class="w-4 text-primary" />
        </div>
      </div>
      <button class="btn btn-primary w-full mt-6" @click="updateCategories">{{ $t('label.save') }}</button>
      <button class="btn btn-outline w-full mt-3" @click="modal = false">{{ $t('label.cancel') }}</button>
    </Modal>
  </div>
</template>