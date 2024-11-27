<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

// composables
const { t } = useI18n();
const { order, clearOrder } = useOrder();
const positions = ref<Product[]>();

// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const config = useRuntimeConfig();
const { isLoading, data } = useQuery<Product[]>({
  queryKey: [`products`],
  queryFn: () =>
    $fetch(`${config.public.API_URL}/product`, {
      headers: {
        "x-api-key": config.public.X_API_KEY,
      },
    }),
});

const products = computed(() => {
  if (!data.value) return [];

  return data.value
    .map((product) => {
      // Find the corresponding order item for the product
      const orderItem = order.value.find(
        (item) => item.productId === product._id
      );

      // If orderItem exists, include the count, otherwise set count to 0
      if (orderItem) {
        return {
          ...product,
          count: orderItem.count,
        };
      }
      return null; // This should never happen because of the filter condition
    })
    .filter(Boolean); // Remove any null values (in case of mismatch)
});
</script>

<template>
  <Modal v-model="isOpen">
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">{{ t("modal.order.title") }}</h2>
      <div
        v-if="products && products.length"
        class="flex flex-col gap-3 max-h-[310px] overflow-y-scroll"
      >
        <OrderCard
          v-for="product in products"
          :key="product._id"
          :product="product"
        />
      </div>
      <div v-else>
        <p class="text-center">{{ t("modal.order.empty") }}</p>
      </div>
      <button class="btn btn-neutral" @click="isOpen = false">
        {{ t("label.close") }}
      </button>
      <button v-if="order.length" class="btn btn-outline" @click="clearOrder()">
        {{ t("label.clear") }}
      </button>
    </div>
  </Modal>
</template>
