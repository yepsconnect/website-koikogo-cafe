<script setup lang="ts">
const route = useRoute()
const sidebar = ref()
</script>

<template>
  <div class="drawer lg:drawer-open min-h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col flex-1">
      <div>
        <header class="p-3 lg:hidden">
          <label for="my-drawer-2" class="btn btn-neutral btn-circle drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="w-4 fill-white">
              <path
                d="M0 96C0 78.3 14.3 64 32 64H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 128 0 113.7 0 96zM0 256c0-17.7 14.3-32 32-32H416c17.7 0 32 14.3 32 32s-14.3 32-32 32H32c-17.7 0-32-14.3-32-32zM448 416c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32s14.3-32 32-32H416c17.7 0 32 14.3 32 32z" />
            </svg>
          </label>
        </header>
        <main>
          <slot />
        </main>
      </div>
    </div>
    <div ref=sidebar class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>
      <ul class="menu bg-base-200 text-base-content min-h-full w-80 p-4">
        <ChangeLanguage class="mb-5" />
        <li>
          <NuxtLink :to="{ name: 'category' }" :class="{
            'active': route.name === 'category',
            }">
              {{ $t('screen.category.title') }}
          </NuxtLink>
        </li>
        <li>
        <NuxtLink :to="{ name: 'dish' }" :class="{
          'active': route.name === 'dish',
        }">
            {{ $t('screen.dishes.title') }}
          </NuxtLink>
        </li>
        <li>
          <NuxtLink :to="{ name: 'settings' }"  :class="{
            'active': route.name === 'settings',
          }">
            {{ $t('screen.settings.title') }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>