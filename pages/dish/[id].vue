<script setup lang="ts">
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
const { locale } = useI18n();
const { token } = useAuth();
// state
const languages = ref<string[]>([]);
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
    for (const key in dish.value.name) {
      languages.value.push(key);
    }
  } catch (error) {
    console.error(error)
  }
})

// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await $fetch(`/api/dish/${route.params.id}`, {
      method: 'PUT',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({ dish: dish.value })
    });
    console.log(response);

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="grid sm:grid-cols-2 gap-6">
    <div v-if="dish" class="flex flex-col gap-4 max-w-lg">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">{{ $t('label.category') }}</span>
        </div>
        <select v-if="data.categories" v-model="dish.categoryId" class="select select-bordered w-full">
          <option value="" disabled>{{ $t('label.select') }}</option>
          <option v-for="category in data.categories" :key="category._id" :value="category._id">{{
            category.title[locale] }}</option>
        </select>
      </label>
      <div v-for="code in languages" :key="code" class="flex flex-col gap-2">

        <div class="flex items-center justify-between">
          <h2>{{ $t(`language.${code}`) }}</h2>
          <button v-if="code === 'ru'" class="btn btn-sm btn-ghost" @click="languages.push('en')">Add en</button>
          <button v-else class="btn btn-sm btn-ghost" @click="languages = languages.filter(x => x !== 'en')">remove
            en</button>
        </div>
        <input v-model="dish.name[code]" class="input input-bordered"
          :placeholder="$t('label.name') + ' (' + code + ')'" />
        <textarea v-model="dish.description[code]" class="textarea textarea-bordered placeholder:text-base text-base"
          :placeholder="$t('label.description') + ' (' + code + ')'"></textarea>
      </div>
      <input v-model="dish.unit" class="input input-bordered" :placeholder="$t('label.unit')" type="number"
        inputmode="numeric" />
      <input v-model="dish.price" class="input input-bordered" :placeholder="$t('label.price')" type="number"
        inputmode="numeric" />
      <input v-model="dish.image" class="input input-bordered" :placeholder="$t('label.image')" type="text" />
      <p class="text-center text-gray-500 text-sm">{{ $t('page.dishAdd.remark') }}</p>
      <button class="btn btn-primary w-full" @click="handleSubmit()">{{ $t('label.save') }}</button>
      <button class="btn btn-primary btn-outline w-full" @click="handleDelete()">{{ $t('label.delete') }}</button>
    </div>
    <AvailableLocales :languages="languages" @on-submit="val => languages.push(val)" />
  </div>
</template>