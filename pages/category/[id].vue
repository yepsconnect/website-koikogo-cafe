<script setup lang="ts">
import Container from '~/components/Container.vue';
import { ref } from 'vue';



definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

// composables
const route = useRoute();
const router = useRouter();
const { t, locales } = useI18n();
const { token } = useAuth();

// computed
const languages = ref<string[]>([]);

const availableLocales = computed(() => locales.value.map(x => {
  return {
    value: x.code,
    label: t(`language.${x.code}`)
  }
}));
const notSelectedLocales = computed(() => {
  // return all locales except selected locales
  return availableLocales.value.filter(x => !languages.value.includes(x.value));
})

// state
const newLang = ref(null);
const isLoading = ref(false);
// Список языков по умолчанию

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


for (const key in data.value?.category.title) {
  languages.value.push(key);

}


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

const addLanguage = (language: string) => {
  if (!data.value?.category) return

  if (!languages.value.includes(language)) {
    languages.value.push(language);
    data.value.category.description[language] = '';
    data.value.category.title[language] = '';
    newLang.value = null;
  }
};
</script>

<template>
  <Container class="flex flex-col gap-2">
    <div class="py-2">
      <h1 class="text-2xl font-bold">{{ t("screen.categoryAdd.title") }}</h1>
    </div>
    <div class="flex gap-6">
      <div class="w-full max-w-lg">
        <form v-if="data?.category" @submit.prevent="handleSubmit" class="flex flex-col gap-2">
          <div v-for="code in languages" :key="code" class="flex flex-col gap-2">
            <div class="flex items-center justify-between w-full">
              <h3>{{ t(`language.${code}`) }}</h3>
              <button v-if="languages.length > 1" class="btn btn-sm">{{ t('label.deleteTranslate') }}</button>
            </div>
            <input v-model="data.category.title[code]" type="text" class="input input-bordered"
              :placeholder="t('label.categoryName') + ' (' + code + ')'">
            <textarea v-model="data.category.description[code]" class="textarea textarea-bordered"
              :placeholder="t('label.categoryInfo') + ' (' + code + ')'"></textarea>
          </div>
          <input v-model="data.category.slug" type="text" class="input input-bordered" :placeholder="t('label.slug')">
          <button class="btn btn-neutral" type="submit">{{ t('label.save') }}</button>
        </form>
        <button class="btn btn-neutral btn-outline w-full max-w-lg mt-2" @click="handleDelete">
          {{ t('label.delete') }}
        </button>
      </div>
      <div class="flex flex-col flex-1 gap-4">
        <p>Добавление перевода</p>
        <select v-model="newLang" class="select select-bordered">
          <option value="null" disabled>{{ t('label.select') }}</option>
          <option v-for="option in notSelectedLocales" :key="option.value" :value="option.value">{{ option.label }}
          </option>
        </select>
        <button class="btn btn-primary" :disabled="!newLang" @click="addLanguage(newLang)">{{ t('label.add') }}</button>
      </div>
    </div>
  </Container>
</template>
