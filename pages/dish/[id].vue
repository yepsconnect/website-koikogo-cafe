<script setup lang="ts">
import IconCheck from '~/components/IconCheck.vue';
import IconСircleXmark from '~/components/IconСircleXmark.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

const { data: dataCategory } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')
// composables
const route = useRoute();
const router = useRouter();
const { t, locale, locales } = useI18n();
const { token } = useAuth();
// state
const selectedLocale = ref('ru');
const isLoading = ref(false);
const isLoadingDelete = ref(false);


const { data } = await useFetch<{
  ok: boolean,
  message: string
  dish: Dish
}>(`/api/dish/${route.params.id}`)

// methods
const handleSubmit = async () => {
  if (!data.value.dish || !data.value.dish.title["ru"] || !data.value.dish.price || !data.value.dish.unit || !data.value.dish.categoryId) {
    return alert("")
  }
  try {
    isLoading.value = true;
    const response = await $fetch<{
      ok: boolean
      message: string
      dish: Dish
    }>("/api/dish", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        dish: data.value.dish,
      })
    });
    if (!response.ok) {
      return alert(response.message);
    }
    const isConfirmed = confirm("Успуешно добавлено. Добавить еще?");
    if (isConfirmed) {
      data.value.dish.image = "";
      data.value.dish.title = {};
      data.value.dish.price = 0;
      data.value.dish.unit = "";
      data.value.dish.categoryId = "";
    } else {
      router.push({ name: 'dish' });
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async () => {
  try {
    isLoadingDelete.value = true;
    const response = await $fetch<{
      ok: boolean
      message: string
    }>(`/api/dish/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token.value!
      }
    });
    if (!response.ok) {
      return alert(response.message);
    }
    router.push({ name: 'dish' });

  } catch (error) {
    console.error(error);
  } finally {
    isLoadingDelete.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <div class="py-2 grid grid-cols-3 mb-4">
      <div>
        <NuxtLink :to="{ name: 'dish' }" class="btn btn-sm btn-square btn-ghost">
          <IconChevronLeft class="w-2" />
        </NuxtLink>
      </div>
      <h1 class="text-2xl font-bold text-center">{{ t("screen.dishEdit.title") }}</h1>
    </div>
    <div v-if="data.dish" class="flex flex-col gap-4 max-w-lg">
      <div class="avatar w-full">
        <div class="rounded-xl w-full bg-gray-200">
          <img v-if="data.dish.image" :src="data.dish.image" />
        </div>
      </div>
      <input v-model="data.dish.image" class="input input-bordered" :placeholder="$t('label.image')" type="text" />
      <p class="text-center text-gray-500 text-sm">{{ $t('screen.dishAdd.remark') }}</p>
      <div class="flex gap-1">
        <div v-for="item in locales" :key="item.code" class="badge badge-lg badge-outline cursor-pointer gap-1" :class="{
          'badge-primary': item.code === selectedLocale,
        }" @click="selectedLocale = item.code">
          {{ $t(`language.${item.code}`) }}
          <IconCheck v-if="data.dish.title[item.code]" class="w-4 fill-success" />
          <IconСircleXmark v-else class="w-4 fill-error" />
        </div>
      </div>
      <input v-model="data.dish.title[selectedLocale]" class="input input-bordered"
        :placeholder="$t('label.title') + ' (' + selectedLocale + ')'" />
      <textarea v-model="data.dish.description[selectedLocale]"
        class="textarea textarea-bordered placeholder:text-base text-base"
        :placeholder="$t('label.description') + ' (' + selectedLocale + ')'"></textarea>
      <input v-model="data.dish.unit" class="input input-bordered" :placeholder="$t('label.unit')" type="text"
        inputmode="numeric" />
      <input v-model="data.dish.price" class="input input-bordered" :placeholder="$t('label.price')" type="number"
        inputmode="numeric" />
      <select v-if="dataCategory?.categories" v-model="data.dish.categoryId" class="select select-bordered w-full">
        <option value="" disabled>{{ $t('label.select', { field: $t('label.category') }) }}</option>
        <option v-for="category in dataCategory.categories" :key="category._id" :value="category._id">
          {{ category.title[locale] }}
        </option>
      </select>

      <button class="btn btn-primary w-full" @click="handleSubmit()"
        :disabled="isLoading || !data.dish.title['ru'] || !data.dish.categoryId || !data.dish.price || !data.dish.unit">
        <Loading v-if="isLoading" />
        <template v-else>{{ $t('label.save') }}</template>
      </button>
      <button class="btn btn-primary btn-outline w-full" @click="handleDelete()" :disabled="isLoadingDelete">
        <Loading v-if="isLoadingDelete" />
        <template v-else>{{ $t('label.delete') }}</template>
      </button>
    </div>
  </div>
</template>