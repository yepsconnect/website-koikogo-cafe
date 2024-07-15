<script setup lang="ts">
const { t } = useI18n()
const dropdown = ref()

const closeDropdown = () => {
  dropdown.value.removeAttribute('open');
}
</script>

<template>
  <details ref="dropdown" class="dropdown dropdown-end">
    <summary tabindex="0" role="button" class="btn btn-circle">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
        class="w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </summary>
    <ul tabindex="0" class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52">
      <li>
        <NuxtLink :to="{ name: 'about' }">{{ t('screen.about.title') }}</NuxtLink>
      </li>
      <li></li>
      <li>
        <NuxtLink to="/" @click="closeDropdown()">{{ t('screen.index.title') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ name: 'bar' }" @click="closeDropdown()">{{ t('screen.bar.title') }}</NuxtLink>
      </li>
      <li>
        <NuxtLink :to="{ name: 'index' }" @click="closeDropdown()">{{ t('screen.reservation.title') }}</NuxtLink>
      </li>
    </ul>
  </details>
</template>
