<script setup lang="ts">
defineEmits(["onSubmit"]);
defineProps<{
  product: Product;
}>();

const { t } = useI18n();
</script>

<template>
  <div
    class="flex flex-col gap-2 cursor-pointer relative"
    @click="$emit('onSubmit', product)"
  >
    <div class="avatar">
      <div class="rounded-xl bg-gray-200">
        <img
          v-if="product.images && product.images[0]"
          :src="`https://koikogo.cafe/positions/${product.images[0]}`"
          loading="lazy"
        />
        <img
          v-else
          src="https://multimedia.properati.com.co/properati/images/no-image-placeholder.png"
          loading="lazy"
        />
      </div>
    </div>
    <div class="flex justify-between items-start gap-1 flex-1">
      <p class="uppercase text-sm">
        {{ product.name }}
      </p>
    </div>

    <button class="btn btn-sm btn-circle btn-primary absolute top-2 right-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        class="w-6"
      >
        <path
          d="M12 8V16M16 12L8 12"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z"
          stroke="currentColor"
          stroke-width="1.5"
        />
      </svg>
    </button>
  </div>
</template>
