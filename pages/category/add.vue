<script setup lang="ts">
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
  description: {},
  page: ""
})
// computed
const availablePages = router.options.routes.filter(x => x.meta?.layout === 'menu')
// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true;
    const response = await $fetch<{
      category: Category
      ok: boolean
      message: string
    }>("/api/category", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({ category: category.value })
    });
    if (!response.ok) {
      return alert(response.message)
    }
    const isConfirmed = confirm(t("modal.categoryAdd.success"));

    category.value.title = {}
    category.value.description = {}
    category.value.page = ""

    if (!isConfirmed) {
      router.push({ name: 'category' });
    }

  } catch (error) {
    confirm(t("modal.categoryAdd.error"));
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <Header :title="$t('screen.categoryAdd.title')" />
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
              <IconCircleXmark v-else class="w-4 fill-error" />
            </div>
          </div>
        </div>
        <input v-model="category.title[selectedLocale]" type="text" class="input input-bordered"
          :placeholder="t('label.categoryName') + ' (' + selectedLocale + ')'">
        <textarea v-model="category.description[selectedLocale]"
          class="textarea textarea-bordered placeholder:text-base text-base"
          :placeholder="t('label.categoryInfo') + ' (' + selectedLocale + ')'"></textarea>
        <select v-model="category.page" class="select select-bordered">
          <option value="" disabled>{{ $t('label.select') }}</option>
          <option v-for="route in availablePages" :key="route.name" :value="route.name">
            {{ $t(`screen.${route.name?.toString()}.title`) }}
          </option>
        </select>
      </div>
      <button class="btn btn-neutral" type="submit" :disabled="isLoading || !category.title['ru'] || !category.page">
        <span v-if="isLoading" class="loading loading-dots loading-sm"></span>
        <template v-else>{{ t('label.add') }}</template>
      </button>
    </form>

  </div>
</template>
