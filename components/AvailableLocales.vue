<script setup lang="ts">
defineEmits(["onSubmit"])
const props = defineProps<{
  languages: string[]
}>()
// composables
const { t, locales } = useI18n();
// state
const newLang = ref(null);
// computed
const availableLocales = computed(() => locales.value.map(x => {
  return {
    value: x.code,
    label: t(`language.${x.code}`)
  }
}));
const notSelectedLocales = computed(() => {
  return availableLocales.value.filter(x => !props.languages.includes(x.value));
})
</script>

<template>
  <div class="flex flex-col gap-2">
    <p>{{ t('label.addLocale') }}</p>
    <select v-model="newLang" class="select select-bordered">
      <option :value="null" disabled>{{ t('label.select') }}</option>
      <option v-for="option in notSelectedLocales" :key="option.value" :value="option.value">
        {{ option.label }}
      </option>
    </select>
    <button class="btn btn-primary" :disabled="!newLang" @click="$emit('onSubmit', newLang), newLang = null">
      {{ t('label.add') }}
    </button>
  </div>
</template>