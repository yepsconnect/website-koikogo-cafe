<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
const { data: dataP } = useFetch<{
  ok: boolean
  pages: Page[]
}>('/api/page')
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
const position = reactive<NewPosition>({
  title: {},
  description: {},
  pageIds: [],
  categoryId: "",
  image: "",
  price: 0,
  unit: "",
  type: "",
})

// methods
const handleSubmit = async () => {
  if (!position.title["ru"] || !position.price || !position.unit || !position.categoryId) {
    return alert("")
  }
  try {
    isLoading.value = true;
    const response = await $fetch<{
      ok: boolean
      message: string
      position: Position
    }>("/api/position", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        position
      })
    });
    if (!response.ok) {
      alert(response.message);
      return;
    }
    const isConfirmed = confirm(t('modal.positionAdd.success'));
    position.image = "";
    position.title = {};
    position.price = 0;
    position.unit = "";
    position.categoryId = "";

    if (!isConfirmed) {
      router.push({ name: 'position' });
    }
  } catch (error) {
    t('modal.positionAdd.error')
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <Header :title="$t('screen.positionAdd.title')" />
    <div class="w-full max-w-xl flex flex-col gap-2">
      <div class="avatar w-full">
        <div class="rounded-xl w-full bg-gray-200">
          <img v-if="position.image" :src="position.image" />
        </div>
      </div>
      <input v-model="position.image" class="input input-bordered" :placeholder="$t('label.image')" type="text" />
      <p class="text-center text-gray-500 text-sm">{{ $t('screen.positionAdd.remark') }}</p>
      <div class="flex gap-1">
        <div v-for="item in locales" :key="item.code" class="badge badge-lg badge-outline cursor-pointer gap-1" :class="{
          'badge-primary': item.code === selectedLocale,
        }" @click="selectedLocale = item.code">
          {{ $t(`language.${item.code}`) }}
          <IconCheck v-if="position.title[item.code]" class="w-4 fill-success" />
          <IconCircleXmark v-else class="w-4 fill-error" />
        </div>
      </div>
      <input v-model="position.title[selectedLocale]" class="input input-bordered"
        :placeholder="$t('label.title') + ' (' + selectedLocale + ')'" />
      <textarea v-model="position.description[selectedLocale]"
        class="textarea textarea-bordered placeholder:text-base text-base"
        :placeholder="$t('label.description') + ' (' + selectedLocale + ')'"></textarea>
      <input v-model="position.unit" class="input input-bordered" :placeholder="$t('label.unit')" type="text"
        inputmode="numeric" />
      <input v-model="position.price" class="input input-bordered" :placeholder="$t('label.price')" type="number"
        inputmode="numeric" />
      <div v-if="dataP?.pages">
        <label v-for="page in dataP.pages" :key="page._id" class="label cursor-pointer gap-2 justify-start">
          <input :value="page._id" v-model="position.pageIds" type="checkbox" class="checkbox" />
          <span class="label-text">{{ page.title['ru'] }}</span>
        </label>
      </div>
      <select v-if="data?.categories" v-model="position.categoryId" class="select select-bordered w-full">
        <option value="" disabled>{{ $t('label.category') }}</option>
        <option v-for="category in data.categories" :key="category._id" :value="category._id">
          {{ category.title[locale] }}
        </option>
      </select>
      <select v-model="position.type" class="select select-bordered">
        <option value="">Без типа</option>
        <option value="new">Новинка</option>
      </select>
      <button class="btn btn-primary w-full" @click="handleSubmit()"
        :disabled="isLoading || !position.title['ru'] || !position.unit || !position.price || !position.categoryId">
        <Loading v-if="isLoading" />
        <template v-else>{{ $t('label.add') }}</template>
      </button>
    </div>
  </div>
</template>