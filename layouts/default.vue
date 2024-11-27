<script setup lang="ts">
const route = useRoute();
const { order } = useOrder();

const visible = ref(false);
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="navbar bg-base-100 max-w-7xl mx-auto">
      <ChangeLanguage />
      <div class="ml-auto">
        <ul class="hidden lg:flex justify-end menu menu-horizontal gap-2">
          <li>
            <NuxtLink
              :to="{ name: 'index' }"
              :class="{
                active: route.name === 'index',
              }"
              >{{ $t("screen.about.title") }}</NuxtLink
            >
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'events' }"
              :class="{
                active: route.name === 'events',
              }"
            >
              {{ $t("screen.banquet.shortTitle") }}
            </NuxtLink>
          </li>
          <li>
            <NuxtLink
              :to="{ name: 'banquet' }"
              :class="{
                active: route.name === 'banquet',
              }"
              >{{ $t("screen.banquet.menu.title") }}</NuxtLink
            >
          </li>
        </ul>
        <Menu class="lg:hidden" />
      </div>
    </div>
    <main class="flex-1">
      <slot />
      <ModalOrder v-model="visible" />
    </main>
    <Footer class="mt-10" />
    <button
      v-if="order.length"
      class="btn btn-primary fixed bottom-5 left-5 uppercase"
      @click="visible = true"
    >
      Мой заказ
    </button>
  </div>
</template>
