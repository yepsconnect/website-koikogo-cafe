<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

// composables
const { t } = useI18n();
const { order, clearOrder } = useOrder();
const isLoading = ref(false)
const dishes = ref<Dish[]>()
const totalPrice = ref()
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

async function handleGetOrder() {
  isLoading.value = true;
  try {
    const response = await $fetch<{
      ok: boolean;
      dishes: Dish[];
      totalPrice: number;
    }>('/api/order', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        order: order.value,
      }),
    })
    if (!response.ok) {
      return false;
    }

    dishes.value = response.dishes
    totalPrice.value = response.totalPrice
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false;
  }
}

watch(isOpen, val => {
  if (val) {
    handleGetOrder()
  }
})

</script>

<template>
  <Modal v-model="isOpen">
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">{{ t("modal.order.title") }}</h2>
      <div v-if="order.length && dishes" class="flex flex-col gap-3 max-h-[310px] overflow-y-scroll">
        <DishOrderCard v-for="orderItem in order" :key="orderItem._id" :order-item="orderItem" :menu="dishes" />
      </div>
      <div v-else>
        <p class="text-center">{{ t('modal.order.empty') }}</p>
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