<script setup lang="ts">
import IconCheck from '~/components/IconCheck.vue';
import IconСircleXmark from '~/components/IconСircleXmark.vue';

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});

const { data } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')
// composables
const router = useRouter();
const { t, locale, locales } = useI18n();
const { token } = useAuth();
// state
const selectedLocale = ref('ru');
const isLoading = ref(false);
// form state
const dish = reactive<NewDish>({
  categoryId: "",
  description: {},
  image: "",
  title: {},
  price: 0,
  unit: "",
})

// methods
const handleSubmit = async () => {
  if (!dish.title["ru"] || !dish.price || !dish.unit || !dish.categoryId) {
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
        dish
      })
    });
    if (!response.ok) {
      alert(response.message);
      return;
    }
    const isConfirmed = confirm("Успуешно добавлено. Добавить еще?");
    if (isConfirmed) {
      dish.image = "";
      dish.title = {};
      dish.price = 0;
      dish.unit = "";
      dish.categoryId = "";
    } else {
      router.push({ name: 'dish' });
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <div class="py-2 grid grid-cols-3 mb-4">
      <div>
        <NuxtLink :to="{ name: 'dish' }" class="btn btn-sm btn-square btn-ghost">
          <IconChevronLeft class="w-2" />
        </NuxtLink>
      </div>
      <h1 class="text-2xl font-bold text-center">{{ t("screen.dishAdd.title") }}</h1>
    </div>
    <div class="w-full max-w-xl flex flex-col gap-2">
      <div class="avatar w-full">
        <div class="rounded-xl w-full bg-gray-200">
          <img v-if="dish.image" :src="dish.image" />
        </div>
      </div>
      <input v-model="dish.image" class="input input-bordered" :placeholder="$t('label.image')" type="text" />
      <p class="text-center text-gray-500 text-sm">{{ $t('screen.dishAdd.remark') }}</p>
      <div class="flex gap-1">
        <div v-for="item in locales" :key="item.code" class="badge badge-lg badge-outline cursor-pointer gap-1" :class="{
          'badge-primary': item.code === selectedLocale,
        }" @click="selectedLocale = item.code">
          {{ $t(`language.${item.code}`) }}
          <IconCheck v-if="dish.title[item.code]" class="w-4 fill-success" />
          <IconСircleXmark v-else class="w-4 fill-error" />
        </div>
      </div>
      <input v-model="dish.title[selectedLocale]" class="input input-bordered"
        :placeholder="$t('label.title') + ' (' + selectedLocale + ')'" />
      <textarea v-model="dish.description[selectedLocale]"
        class="textarea textarea-bordered placeholder:text-base text-base"
        :placeholder="$t('label.description') + ' (' + selectedLocale + ')'"></textarea>
      <input v-model="dish.unit" class="input input-bordered" :placeholder="$t('label.unit')" type="text"
        inputmode="numeric" />
      <input v-model="dish.price" class="input input-bordered" :placeholder="$t('label.price')" type="number"
        inputmode="numeric" />
      <select v-if="data?.categories" v-model="dish.categoryId" class="select select-bordered w-full">
        <option value="" disabled>{{ $t('label.select', { field: $t('label.category') }) }}</option>
        <option v-for="category in data.categories" :key="category._id" :value="category._id">
          {{ category.title[locale] }}
        </option>
      </select>
      <button class="btn btn-primary w-full" @click="handleSubmit()"
        :disabled="isLoading || !dish.title['ru'] || !dish.unit || !dish.price || !dish.categoryId">
        <Loading v-if="isLoading" />
        <template v-else>{{ $t('label.add') }}</template>
      </button>
    </div>
  </div>
</template>