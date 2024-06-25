<script setup lang="ts">
import Container from '~/components/Container.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { t } = useI18n()
const { token } = useAuth()
// state
const description = ref('')
const title = ref('')
const slug = ref('')
const isLoading = ref(false)

// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true
    const response = $fetch("/api/category", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        description: description.value,
        title: title.value,
        slug: slug.value
      })
    })
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
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2  w-full max-w-lg">
      <input v-model="title" type="text" class="input input-bordered" :placeholder="t('label.categoryName')">
      <input v-model="slug" type="text" class="input input-bordered" :placeholder="t('label.slug')">
      <textarea v-model="description" type="text" class="textarea textarea-bordered"
        :placeholder="t('label.categoryInfo')"></textarea>
      <button class="btn btn-neutral" type="submit">{{ t('label.add') }}</button>
    </form>
  </Container>
</template>