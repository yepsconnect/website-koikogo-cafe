<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const dropdown = ref()

const getLanguageName = (code: string) => {
  switch (code) {
    case "ru":
      return "Русский"
      break;
    case "en":
      return "English"
      break;
    default:
      return "Русский"
      break;
  }
}

const closeDropdown = () => {
  dropdown.value.removeAttribute('open');
}
</script>

<template>

  <details ref="dropdown" class="dropdown z-10">
    <summary class="btn btn-circle">
      <IconLanguage class="w-6" />
    </summary>
    <ul class="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
      <li v-for="x in locales" :key="x.code" @click="setLocale(x.code); closeDropdown()">
        <a class="flex justify-between">
          {{ getLanguageName(x.code) }}
          <IconCheckmarkCircle02 v-if="x.code === locale" class="w-4" />
        </a>
      </li>
    </ul>
  </details>

</template>
