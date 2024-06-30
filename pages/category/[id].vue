<script setup lang="ts">
import Container from '~/components/Container.vue';
import { ref } from 'vue';

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

// composables
const category = ref<Category>();
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
const newLang = ref("");
const isLoading = ref(false);
// Список языков по умолчанию

// methods
const handleSubmit = async () => {
  if (!category.value) {
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
        description: category.value.description,
        title: category.value.title,
      })
    })
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
  }
}

onMounted(async () => {
  try {
    const response = await $fetch<{
      ok: boolean,
      category: Category
    }>(`/api/category/${route.params.id}`)
    if (!response.ok) {
      return alert("Ошибка при загрузке")
    }
    category.value = response.category
    for (const key in category.value.title) {
      languages.value.push(key);
    }
  } catch (error) {
    console.error(error)
  }
})

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
  if (!category.value) return

  if (!languages.value.includes(language)) {
    languages.value.push(language);
    category.value.description[language] = '';
    category.value.title[language] = '';
    newLang.value = "";
  }
};

const deleteLocale = (code: string) => {
  languages.value = languages.value.filter(x => x !== code);
};
</script>

<template>
  <Container class="flex flex-col gap-2">
    <div class="py-2 grid grid-cols-3 mb-4">
      <div>
        <NuxtLink :to="{ name: 'category' }" class="btn btn-sm btn-ghost">
          <IconChevronLeft class="w-3" />
        </NuxtLink>
      </div>
      <h1 class="text-2xl font-bold text-center">{{ t("screen.categoryEdit.title") }}</h1>
      <div></div>
    </div>
    <div class="grid sm:grid-cols-2 gap-6">
      <div class="w-full sm:max-w-lg">
        <form v-if="category" @submit.prevent="handleSubmit" class="flex flex-col gap-2">
          <div v-for="code in languages" :key="code" class="flex flex-col gap-2">
            <div class="flex items-center justify-between w-full">
              <h3>{{ t(`language.${code}`) }}</h3>
              <button v-if="languages.length > 1" class="btn btn-sm" @click="deleteLocale(code)">{{
                t('label.deleteTranslate') }}</button>
            </div>
            <input v-model="category.title[code]" type="text" class="input input-bordered"
              :placeholder="t('label.categoryName') + ' (' + code + ')'">
            <textarea v-model="category.description[code]" class="textarea textarea-bordered"
              :placeholder="t('label.categoryInfo') + ' (' + code + ')'"></textarea>
          </div>
          <button class="btn btn-neutral" type="submit">{{ t('label.save') }}</button>
        </form>
        <button class="btn btn-neutral btn-outline w-full mt-2" @click="handleDelete">
          {{ t('label.delete') }}
        </button>
      </div>
      <div class="flex flex-col flex-1 gap-4">
        <p>{{ t('label.addLocale') }}</p>
        <select v-model="newLang" class="select select-bordered">
          <option value="" disabled>{{ t('label.select') }}</option>
          <option v-for="option in notSelectedLocales" :key="option.value" :value="option.value">{{ option.label }}
          </option>
        </select>
        <button class="btn btn-primary" :disabled="!newLang" @click="addLanguage(newLang)">{{ t('label.add') }}</button>
      </div>
    </div>
  </Container>
</template>
