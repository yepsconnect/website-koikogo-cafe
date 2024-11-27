<script setup lang="ts">
defineEmits(["onOpen"]);
defineProps<{
  product: ProductOrder;
}>();

const { decrementOrder, incrementOrder } = useOrder();
</script>

<template>
  <div class="flex justify-between gap-2">
    <div class="flex items-center gap-2">
      <div class="avatar w-14">
        <div class="rounded-xl bg-gray-200">
          <img
            v-if="product.images && product.images[0]"
            :src="product.images[0]"
            loading="lazy"
          />
          <img
            v-else
            src="https://multimedia.properati.com.co/properati/images/no-image-placeholder.png"
            loading="lazy"
          />
        </div>
      </div>
      <div class="flex-1">
        <p class="line-clamp-2 text-md">
          {{ product.name }}
        </p>
        <p class="text-gray-700">
          {{ product?.price }}₽
          <span class="text-gray-300 text-sm">{{ product?.output }}</span>
        </p>
      </div>
    </div>
    <div class="flex items-center justify-center gap-2">
      <button
        class="btn btn-xs btn-glass btn-circle"
        @click="decrementOrder(product._id)"
      >
        -
      </button>
      <p class="text-center text-lg font-bold mx-1">{{ product.count }}</p>
      <button
        class="btn btn-xs btn-glass btn-circle"
        @click="incrementOrder(product._id)"
      >
        +
      </button>
    </div>
  </div>
</template>
