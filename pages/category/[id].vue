<script setup lang="ts">
import Container from '~/components/Container.vue';
import { ref } from 'vue';
import IconСircleXmark from '~/components/IconСircleXmark.vue';



definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

// composables
const route = useRoute();
const router = useRouter();
const { t, locale, locales } = useI18n();
const { token } = useAuth();
// state
const isLoading = ref(false);
const selectedLocale = ref("ru");
// form
const { data } = await useFetch<{
  ok: boolean,
  category: Category
}>(`/api/category/${route.params.id}`)
// computed
const availableLocales = computed(() => locales.value.map(x => {
  return {
    value: x.code,
    label: t(`language.${x.code}`)
  }
}));

// methods
const handleSubmit = async () => {
  if (!data.value?.category) {
    return
  }
  try {
    isLoading.value = true;
    const response = await $fetch<{
      ok: boolean
      category: Category
    }>(`/api/category/${route.params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        title: data.value.category.title,
        description: data.value.category.description,
      })
    });
    if (!response.ok) {
      return alert("Ошибка при обновлении")
    }
    const isConfirm = confirm("Категория успешно обновлена. Внести ещё изменения?");
    if (!isConfirm) {
      router.push({ name: 'category' })
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

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
    <div class="py-2 grid grid-cols-3 mb-4">
      <div>
        <NuxtLink :to="{ name: 'category' }" class="btn btn-sm btn-ghost">
          <IconChevronLeft class="w-3" />
        </NuxtLink>
      </div>
      <h1 class="text-2xl font-bold text-center">{{ t("screen.categoryEdit.title") }}</h1>
    </div>
    <form v-if="data?.category" @submit.prevent="handleSubmit" class="flex flex-col gap-2 w-full sm:max-w-lg">
      <div class="flex flex-col gap-2">
        <div class="flex items-center justify-between w-full">
          <div class="flex gap-1">
            <div v-for="item in locales" :key="item.code" class="badge badge-lg badge-outline cursor-pointer gap-1"
              :class="{
                'badge-primary': item.code === selectedLocale,
              }" @click="selectedLocale = item.code">
              {{ $t(`language.${item.code}`) }}
              <IconCheck v-if="data.category.title[item.code]" class="w-4 fill-success" />
              <IconСircleXmark v-else class="w-4 fill-error" />
            </div>
          </div>
        </div>
        <input v-model="data.category.title[selectedLocale]" type="text" class="input input-bordered"
          :placeholder="t('label.categoryName') + ' (selectedLocale' + code + ')'">
        <textarea v-model="data.category.description[selectedLocale]"
          class="textarea textarea-bordered placeholder:text-base text-base"
          :placeholder="t('label.categoryInfo') + ' (' + selectedLocale + ')'"></textarea>
      </div>
      <button class="btn btn-neutral" type="submit">{{ t('label.save') }}</button>
    </form>
    <button class="btn btn-neutral btn-outline w-full max-w-lg mt-2" @click="handleDelete">
      {{ t('label.delete') }}
    </button>
  </Container>
</template>
