<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { t } = useI18n()
const { token } = useAuth()
const route = useRoute()
const router = useRouter()
// state
const isLoading = ref(false)

// methods
const handleSubmit = async () => {
  if (!data.value?.category) {
    return
  }
  try {
    isLoading.value = true
    const response = $fetch(`/api/category/${route.params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        description: data.value.category.description,
        title: data.value.category.title,
        slug: data.value.category.slug
      })
    })
  } catch (error) {

  } finally {
    isLoading.value = false
  }
}

const { data } = useFetch<{
  ok: boolean,
  category: Category
}>(`/api/category/${route.params.id}`)

const handleDelete = async () => {
  try {
    isLoading.value = true
    const response = await $fetch<{
      ok: boolean
      category: Category
    }>(`/api/category/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token.value!
      }
    })
    if (!response.ok) {
      return alert("Ошибка при удалении")
    }
    router.push({ name: 'category' })
  } catch (error) {

  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <Container class="flex flex-col gap-2">
    <div class="py-2">
      <h1 class="text-2xl font-bold">{{ $t("screen.categoryAdd.title") }}</h1>
    </div>
    <form v-if="data?.category" @submit.prevent="handleSubmit" class="flex flex-col gap-2 w-full max-w-lg">
      <input v-model="data.category.title" type="text" class="input input-bordered"
        :placeholder="t('label.categoryName')">
      <input v-model="data.category.slug" type="text" class="input input-bordered" :placeholder="t('label.slug')">
      <textarea v-model="data.category.description" type="text" class="textarea textarea-bordered"
        :placeholder="t('label.categoryInfo')"></textarea>
      <button class="btn btn-neutral" type="submit">{{ t('label.save') }}</button>
    </form>
    <button class="btn btn-neutral btn-outline w-full max-w-lg" @click="handleDelete">{{ t('label.delete') }}</button>
  </Container>
</template>