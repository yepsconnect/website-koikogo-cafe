<script setup lang="ts">
const route = useRoute()
const sidebar = ref()
</script>

<template>
  <div class="drawer lg:drawer-open min-h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col flex-1">
      <main>
        <slot />
      </main>
    </div>
    <div ref=sidebar class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <ChangeLanguage class="mb-5" />
        <li>
          <NuxtLink :to="{ name: 'admin-reserve' }" :class="{
            'active': route.name === 'admin-reserve',
          }">
            {{ $t('screen.reservation.title') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'admin-category' }" :class="{
            'active': route.name === 'admin-category',
          }">
            {{ $t('screen.category.title') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'admin-dish' }" :class="{
            'active': route.name === 'admin-dish',
          }">
            {{ $t('screen.dishes.title') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'admin-settings' }" :class="{
            'active': route.name === 'admin-settings',
          }">
            {{ $t('screen.settings.title') }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>