<script setup lang="ts">
const route = useRoute()
const isModalOrder = ref(false)
const modalReserve = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="navbar bg-base-100">
      <ChangeLanguage />
      <div class="ml-auto">
        <ul class="hidden lg:flex justify-end menu menu-horizontal gap-2">
          <li>
            <NuxtLink :to="{ name: 'index' }" :class="{
              'active': route.name === 'index'
            }">{{ $t('screen.about.title') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ name: 'events' }" :class="{
              'active': route.name === 'events'
            }">
              {{ $t('screen.banquet.shortTitle') }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ name: 'menu' }" :class="{
              'active': route.name === 'menu'
            }">{{ $t('screen.index.title') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ name: 'bar' }" :class="{
              'active': route.name === 'bar'
            }">{{ $t('screen.bar.title') }}</NuxtLink>
          </li>
          <li>
            <NuxtLink :to="{ name: 'banquet' }" :class="{
              'active': route.name === 'banquet'
            }">{{ $t('screen.banquet.menu.title') }}</NuxtLink>
          </li>
        </ul>
        <Menu class="lg:hidden" />
      </div>
    </div>
    <main class="flex-1">
      <slot />
      <ModalOrder v-model="isModalOrder" />
      <div v-if="route.name === 'menu' || route.name === 'bar'" tabindex="0" role="button"
        class="btn btn-circle btn-primary fixed bottom-6 left-6 z-50" @click="isModalOrder = true">
        <div class="indicator">
          <IconShoppingCart02 class="w-5 text-white" />
        </div>
      </div>
    </main>
    <Footer class="mt-10" />
  </div>
</template>
