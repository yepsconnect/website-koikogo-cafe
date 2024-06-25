<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

// composables
const { t } = useI18n();
const { menu } = useMenu();
const { order, clearOrder } = useOrder();
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const totalPrice = computed(() => {
  const idToCountMap = order.value.reduce((map, item) => {
    map[item._id] = item.count;
    return map;
  }, {});

  return menu.reduce((sum, item) => {
    if (idToCountMap[item._id] != null) {
      return sum + item.price * idToCountMap[item._id];
    }
    return sum;
  }, 0);
});


</script>

<template>
  <Modal v-model="isOpen">
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">{{ t("modal.order.title") }}</h2>
      <div v-if="order.length" class="flex flex-col gap-2 max-h-[450px] overflow-y-auto">
        <DishOrderCard v-for="dish in order" :key="dish._id" :dish="dish" :menu="menu" />
      </div>
      <div v-else>
        <p class="text-center">{{ t('modal.order.empty') }}</p>
      </div>
      <div class="flex flex-col gap-3">
        <div v-if="totalPrice" class="flex items-end justify-between my-4">
          <p>{{ t('modal.order.totalPrice') }}</p>
          <p>{{ totalPrice }}₽</p>
        </div>
        <button class="btn btn-neutral" @click="isOpen = false">
          {{ t("label.close") }}
        </button>
        <button class="btn btn-outline" @click="clearOrder()">
          {{ t("label.clear") }}
        </button>
      </div>
    </div>
  </Modal>
</template>