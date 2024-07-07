<script setup lang="ts">
const isModalOrder = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ChangeLanguage class="fixed top-12 left-6 z-50" />
    <Menu class="fixed top-12 right-6 z-50" />
    <main class="flex-1">
      <slot />
      <ModalOrder v-model="isModalOrder" />
      <div tabindex="0" role="button"
        class="btn btn-circle bg-[#f65d32] border-[#f65d32] hover:bg-[#f65d32] hover:border-[#f65d32] hover:shadow-custom-hover fixed bottom-8 left-8 z-99"
        @click="isModalOrder = true">
        <div class="indicator">
          <IconCart class="w-5 stroke-white" />
          <!-- <span class="badge badge-sm indicator-item">{{ order.length }}</span> -->
        </div>
      </div>
    </main>
    <Footer class="mt-10" />
  </div>
</template>
