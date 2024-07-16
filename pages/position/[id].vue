<script setup lang="ts">
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


const { data, refresh } = await useFetch<{
  ok: boolean,
  message: string
  position: Position
}>(`/api/position/${route.params.id}`)

// methods
const handleSubmit = async () => {
  if (!data.value.position || !data.value.position.title["ru"] || !data.value.position.price || !data.value.position.unit || !data.value.position.categoryId) {
    return
  }
  try {
    isLoading.value = true;
    const response = await $fetch<{
      ok: boolean
      message: string
      position: Position
    }>(`/api/position/${data.value.position._id}`, {
      method: 'PUT',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        position: data.value.position,
      })
    });
    if (!response.ok) {
      return alert(response.message);
    }
    const isConfirmed = confirm("Обновленно. Изменить ещё?");
    if (!isConfirmed) {
      router.push({ name: 'position' });
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleArchive = async () => {
  const isConfirmed = confirm(t('modal.positionArchive.title'));
  if (!isConfirmed) {
    return;
  }
  try {
    isLoading.value = true;
    const response = await $fetch<{
      ok: boolean
      message: string
      position: Position
    }>(`/api/position/${data.value.position._id}`, {
      method: 'PUT',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        position: {
          isArchived: !data.value.position.isArchived
        },
      })
    });
    if (!response.ok) {
      return alert(response.message);
    }
    refresh()

  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async () => {
  const isConfirmed = confirm(t('modal.positionDelete.title'));
  if (!isConfirmed) {
    return;
  }
  try {
    isLoadingDelete.value = true;
    const response = await $fetch<{
      ok: boolean
      message: string
    }>(`/api/position/${route.params.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: token.value!
      }
    });
    if (!response.ok) {
      return alert(response.message);
    }
    alert(t('modal.positionDelete.success'));
    router.push({ name: 'position' });

  } catch (error) {
    console.error(error);
  } finally {
    isLoadingDelete.value = false;
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <Header :title="$t('screen.positionEdit.title')" />
    <div v-if="data?.position" class="flex flex-col gap-4 max-w-lg">
      <div class="avatar w-full">
        <div class="rounded-xl w-full bg-gray-200">
          <img v-if="data.position.image" :src="data.position.image" />
        </div>
      </div>
      <input v-model="data.position.image" class="input input-bordered" :placeholder="$t('label.image')" type="text" />
      <p class="text-center text-gray-500 text-sm">{{ $t('screen.positionAdd.remark') }}</p>
      <div class="flex gap-1">
        <div v-for="item in locales" :key="item.code" class="badge badge-lg badge-outline cursor-pointer gap-1" :class="{
          'badge-primary': item.code === selectedLocale,
        }" @click="selectedLocale = item.code">
          {{ $t(`language.${item.code}`) }}
          <IconCheck v-if="data.position.title[item.code]" class="w-4 fill-success" />
          <IconCircleXmark v-else class="w-4 fill-error" />
        </div>
      </div>
      <input v-model="data.position.title[selectedLocale]" class="input input-bordered"
        :placeholder="$t('label.title') + ' (' + selectedLocale + ')'" />
      <textarea v-model="data.position.description[selectedLocale]"
        class="textarea textarea-bordered placeholder:text-base text-base"
        :placeholder="$t('label.description') + ' (' + selectedLocale + ')'"></textarea>
      <input v-model="data.position.unit" class="input input-bordered" :placeholder="$t('label.unit')" type="text"
        inputmode="numeric" />
      <input v-model="data.position.price" class="input input-bordered" :placeholder="$t('label.price')" type="number"
        inputmode="numeric" />
      <select v-if="dataCategory?.categories" v-model="data.position.categoryId" class="select select-bordered w-full">
        <option value="" disabled>{{ $t('label.select', { field: $t('label.category') }) }}</option>
        <option v-for="category in dataCategory.categories" :key="category._id" :value="category._id">
          {{ category.title[locale] }}
        </option>
      </select>
      <div class="form-control">
        <label class="label cursor-pointer justify-start gap-2">
          <input v-model="data.position.new" type="checkbox" class="checkbox checkbox-primary" />
          <span class="label-text">{{ $t('label.new') }}</span>
        </label>
      </div>
      <button class="btn btn-primary w-full" @click="handleSubmit()"
        :disabled="isLoading || !data.position.title['ru'] || !data.position.categoryId || !data.position.price || !data.position.unit">
        <Loading v-if="isLoading" />
        <template v-else>{{ $t('label.save') }}</template>
      </button>
      <button class="btn btn-primary btn-outline w-full" @click="handleArchive()" :disabled="isLoading">
        <Loading v-if="isLoadingDelete" />
        <template v-else>{{ data?.position.isArchived ? $t('label.fromArchive') : $t('label.toArchive') }}</template>
      </button>
      <button class="btn btn-primary btn-outline w-full" @click="handleDelete()" :disabled="isLoadingDelete">
        <Loading v-if="isLoadingDelete" />
        <template v-else>{{ $t('label.delete') }}</template>
      </button>
    </div>
    <div v-else class="py-10 flex flex-col items-center gap-4">
      <p class="text-center text-lg text-gray-500">{{ $t('label.positionNotExist') }}</p>
      <NuxtLink :to="{ name: 'position' }" class="btn btn-primary">{{ $t('label.back') }}</NuxtLink>
    </div>
  </div>
</template>