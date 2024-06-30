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
const languages = ref(['ru']);
const isLoading = ref(false);
// form state
const categoryId = ref("");
const name = ref<{ [key: string]: string }>({ ru: '' });
const description = ref<{ [key: string]: string }>({ ru: '' });
const unit = ref()
const price = ref()
const image = ref("")

// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await $fetch("/api/dish", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        dish: {
          categoryId: categoryId.value,
          name: name.value,
          description: description.value,
          unit: unit.value,
          price: price.value,
          image: image.value,
        }
      })
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
    <div class="flex flex-col gap-4 max-w-lg">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">{{ $t('label.category') }}</span>
        </div>
        <select v-if="data.categories" v-model="categoryId" class="select select-bordered w-full">
          <option value="" disabled>{{ $t('label.select') }}</option>
          <option v-for="category in data.categories" :key="category._id" :value="category._id">{{
            category.title[locale] }}</option>
        </select>
      </label>
      <div v-for="code in languages" :key="code" class="flex flex-col gap-2">

        <h2>{{ $t(`language.${code}`) }}</h2>
        <input v-model="name[code]" class="input input-bordered" :placeholder="$t('label.name') + ' (' + code + ')'" />
        <textarea v-model="description[code]" class="textarea textarea-bordered placeholder:text-base text-base"
          :placeholder="$t('label.description') + ' (' + code + ')'"></textarea>
      </div>
      <input v-model="unit" class="input input-bordered" :placeholder="$t('label.unit')" type="number"
        inputmode="numeric" />
      <input v-model="price" class="input input-bordered" :placeholder="$t('label.price')" type="number"
        inputmode="numeric" />
      <input v-model="image" class="input input-bordered" :placeholder="$t('label.image')" type="text" />
      <p class="text-center text-gray-500 text-sm">{{ $t('page.dishAdd.remark') }}</p>
      <button class="btn btn-primary w-full" @click="handleSubmit()">{{ $t('label.add') }}</button>
    </div>
    <AvailableLocales :languages="languages" @on-submit="val => languages.push(val)" />
  </div>
</template>