<script setup lang="ts">
const isModalOrder = ref(false)
const modalReserve = ref(false)
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <ChangeLanguage class="fixed top-16 left-8 z-50" />
    <Menu class="fixed top-16 right-8 z-50" />
    <main class="flex-1">
      <slot />
      <ModalOrder v-model="isModalOrder" />
      <ModalReserve v-model="modalReserve" />
      <div tabindex="0" role="button"
        class="btn btn-circle bg-[#f65d32] border-[#f65d32] hover:bg-[#f65d32] hover:border-[#f65d32] hover:shadow-custom-hover fixed bottom-8 left-8 z-50"
        @click="isModalOrder = true">
        <div class="indicator">
          <IconCart class="w-5 stroke-white" />
          <!-- <span class="badge badge-sm indicator-item">{{ order.length }}</span> -->
        </div>
      </div>
      <div tabindex="0" role="button"
        class="btn btn-circle bg-[#f65d32] border-[#f65d32] hover:bg-[#f65d32] hover:border-[#f65d32] hover:shadow-custom-hover fixed bottom-8 right-8 z-50"
        @click="modalReserve = true">
        <div class="indicator">
          <IconPhone class="w-5 fill-white" />
        </div>
      </div>
    </main>
    <Footer class="mt-10" />
  </div>
</template>
