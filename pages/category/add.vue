<script setup lang="ts">
import Container from '~/components/Container.vue';
import { ref } from 'vue';



definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

// composables
const { t, locales } = useI18n();
const { token } = useAuth();

const languages = ref(['ru']);

const availableLocales = computed(() => locales.value.map(x => {
  return {
    value: x.code,
    label: t(`language.${x.code}`)
  }
}));
const notSelectedLocales = computed(() => {
  return availableLocales.value.filter(x => !languages.value.includes(x.value));
})

// state
const newLang = ref("");
const description = ref<{ [key: string]: string }>({ ru: '' });
const title = ref<{ [key: string]: string }>({ ru: '' });
const isLoading = ref(false);
// Список языков по умолчанию

// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await $fetch("/api/category", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        description: description.value,
        title: title.value,
      })
    });
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const addLanguage = (language: string) => {
  if (!languages.value.includes(language)) {
    languages.value.push(language);
    description.value[language] = '';
    title.value[language] = '';
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
      <h1 class="text-2xl font-bold text-center">{{ t("screen.categoryAdd.title") }}</h1>
      <div></div>
    </div>
    <div class="grid sm:grid-cols-2 gap-6">
      <form @submit.prevent="handleSubmit" class="flex flex-col gap-2 w-full sm:max-w-lg">
        <div v-for="code in languages" :key="code" class="flex flex-col gap-2">
          <div class="flex items-center justify-between w-full">
            <h3>{{ t(`language.${code}`) }}</h3>
            <button v-if="languages.length > 1" class="btn btn-sm" @click="deleteLocale(code)">{{
              t('label.deleteTranslate') }}</button>
            <button v-else @click="addLanguage('en')">Add en</button>
          </div>
          <input v-model="title[code]" type="text" class="input input-bordered"
            :placeholder="t('label.categoryName') + ' (' + code + ')'">
          <textarea v-model="description[code]" class="textarea textarea-bordered"
            :placeholder="t('label.categoryInfo') + ' (' + code + ')'"></textarea>
        </div>
        <button class="btn btn-neutral" type="submit">{{ t('label.add') }}</button>
      </form>
      <div class="flex-1 flex flex-col gap-2">
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
