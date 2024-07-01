<script setup lang="ts">
import Container from '~/components/Container.vue';
import { ref } from 'vue';
import IconСircleXmark from '~/components/IconСircleXmark.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

// composables
const router = useRouter();
const { t, locales } = useI18n();
const { token } = useAuth();
// state
const isLoading = ref(false);
const selectedLocale = ref('ru');
// form
const category = ref<CategoryNew>({
  title: {},
  description: {}
})
// computed
const availableLocales = computed(() => locales.value.map(x => {
  return {
    value: x.code,
    label: t(`language.${x.code}`)
  }
}));
// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await $fetch<{
      category: Category
      ok: boolean
    }>("/api/category", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({ category: category.value })
    });
    if (!response.ok) {
      return alert("Ошибка при создании категории")
    }
    const isConfirmed = confirm(t("screen.categoryAdd.confirm"));
    if (isConfirmed) {
      category.value.title = {}
      category.value.description = {}
    } else {
      router.push({ name: 'category' });
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
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
    </div>
    <form @submit.prevent="handleSubmit" class="flex flex-col gap-2 w-full sm:max-w-lg">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between w-full">
          <div class="flex gap-1">
            <div v-for="item in locales" :key="item.code" class="badge badge-lg badge-outline cursor-pointer gap-1"
              :class="{
                'badge-primary': item.code === selectedLocale,
              }" @click="selectedLocale = item.code">
              {{ $t(`language.${item.code}`) }}
              <IconCheck v-if="category.title[item.code]" class="w-4 fill-success" />
              <IconСircleXmark v-else class="w-4 fill-error" />
            </div>
          </div>
        </div>
        <input v-model="category.title[selectedLocale]" type="text" class="input input-bordered"
          :placeholder="t('label.categoryName') + ' (selectedLocale' + code + ')'">
        <textarea v-model="category.description[selectedLocale]"
          class="textarea textarea-bordered placeholder:text-base text-base"
          :placeholder="t('label.categoryInfo') + ' (' + selectedLocale + ')'"></textarea>
      </div>
      <button class="btn btn-neutral" type="submit">{{ t('label.add') }}</button>
    </form>

  </Container>
</template>
