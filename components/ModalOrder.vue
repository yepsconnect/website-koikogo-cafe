<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

// composables
const { t } = useI18n();
const { order, clearOrder } = useOrder();
const isLoading = ref(false)
const positions = ref<Position[]>()
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
      positions: Position[];
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

    positions.value = response.positions
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
      <div v-if="order.length && positions" class="flex flex-col gap-3 max-h-[310px] overflow-y-scroll">
        <PositionOrderCard v-for="orderItem in order" :key="orderItem._id" :order-item="orderItem" :menu="positions" />
      </div>
      <div v-else>
        <p class="text-center">{{ t('modal.order.empty') }}</p>
      </div>
      <button class="btn btn-neutral" @click="isOpen = false">
        {{ t("label.close") }}
      </button>
      <button class="btn btn-outline" @click="clearOrder()">
        {{ t("label.clear") }}
      </button>
    </div>
  </Modal>
</template>