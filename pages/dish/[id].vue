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
const route = useRoute();
const router = useRouter();
const { t, locale, locales } = useI18n();
const { token } = useAuth();
// state
const selectedLocale = ref('ru');
const isLoading = ref(false);
// form state
const dish = ref<Dish>()

onMounted(async () => {
  try {
    const response = await $fetch<{
      ok: boolean,
      dish: Dish
    }>(`/api/dish/${route.params.id}`)
    if (!response.ok) {
      return alert("Ошибка при загрузке")
    }
    dish.value = response.dish
  } catch (error) {
    console.error(error)
  }
})

// methods
const handleSubmit = async () => {
  if (!dish.value || !dish.value.title["ru"] || !dish.value.price || !dish.value.unit || !dish.value.categoryId) {
    return alert("")
  }
  try {
    isLoading.value = true;
    const response = await $fetch<{
      ok: boolean
      dish: Dish
    }>("/api/dish", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        dish: dish.value,
      })
    });
    if (!response.ok) {
      alert("Ошибка при добавлении");
      return;
    }
    const isConfirmed = confirm("Успуешно добавлено. Добавить еще?");
    if (isConfirmed) {
      dish.value.image = "";
      dish.value.title = {};
      dish.value.price = 0;
      dish.value.unit = "";
      dish.value.categoryId = "";
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
    isLoading.value = true;
    const response = await $fetch(`/api/dish/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token.value!
      }
    });

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="py-2 grid grid-cols-3 mb-4">
      <div>
        <NuxtLink :to="{ name: 'dish' }" class="btn btn-sm btn-ghost">
          <IconChevronLeft class="w-3" />
        </NuxtLink>
      </div>
      <h1 class="text-2xl font-bold text-center">{{ t("screen.dishEdit.title") }}</h1>
    </div>
    <div v-if="dish" class="flex flex-col gap-4 max-w-lg">
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

      <button class="btn btn-primary w-full" @click="handleSubmit()">{{ $t('label.save') }}</button>
      <button class="btn btn-primary btn-outline w-full" @click="handleDelete()">{{ $t('label.delete') }}</button>
    </div>
  </div>
</template>