<script setup lang="ts">
// composables
const { order } =
  useOrder();

// state
const isModalOrder = ref(false)
const notifications: { count: 2 }[] = []
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <div class="fixed top-8 w-full flex justify-end px-6">
      <!-- <ChangeLanguage /> -->
      <Menu />
    </div>
    <main class="flex-1">
      <div class="toast toast-top toast-end z-50">
        <div v-for="item in notifications" class="alert alert-success">
          <span>Добавлено {{ item.count }} шт</span>
        </div>
      </div>
      <slot />
      <ModalOrder v-model="isModalOrder" />
      <div v-if="order.length" tabindex="0" role="button"
        class="btn btn-circle bg-[#f65d32] border-[#f65d32] hover:bg-[#f65d32] hover:border-[#f65d32] hover:shadow-custom-hover fixed bottom-8 left-8 z-99"
        @click="isModalOrder = true">
        <div class="indicator">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="white">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span v-if="order.length" class="badge badge-sm indicator-item">{{ order.length }}</span>
        </div>
      </div>
    </main>
    <Footer class="mt-10" />
  </div>
</template>
