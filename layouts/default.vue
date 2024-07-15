<script setup lang="ts">
const route = useRoute()
const isModalOrder = ref(false)
const modalReserve = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="navbar bg-base-100">
      <div class="navbar-start">
        <ChangeLanguage />
      </div>
      <div class="navbar-end">
        <ul class="hidden lg:flex menu menu-lg menu-horizontal gap-2">
          <li>
            <NuxtLink :to="{ name: 'index' }" :class="{
              'active': route.name === 'index'
            }">{{ $t('screen.about.title') }}</NuxtLink>
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
        </ul>
        <Menu class="lg:hidden" />
      </div>
    </div>
    <main class="flex-1">
      <slot />
      <ModalOrder v-model="isModalOrder" />
      <div v-if="route.name !== 'index'" tabindex="0" role="button"
        class="btn btn-circle bg-[#f65d32] border-[#f65d32] hover:bg-[#f65d32] hover:border-[#f65d32] hover:shadow-custom-hover fixed bottom-6 left-6 z-50"
        @click="isModalOrder = true">
        <div class="indicator">
          <IconCart class="w-5 stroke-white" />
        </div>
      </div>
    </main>
    <Footer class="mt-10" />
  </div>
</template>
