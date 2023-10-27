import { Button } from '#build/components';
<script setup lang="ts">
interface Props {
  modelValue: boolean;
  dish: Dish | null;
}

const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<Props>();

//composables
const { order, addToOrder, removeFromOrder } = useOrder();

// computed
const dishCount = computed(() => {
  return order.value.find((x) => x.id === props.dish.id)?.count;
});

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const showOrder = () => {
  isOpen.value = false;
  emit("show-order");
};
</script>

<template>
  <Modal v-model="isOpen">
    <h2 class="text-2xl font-bold">Информация</h2>
    <div v-if="dish" class="mt-2">
      <div class="avatar w-full">
        <div class="rounded-xl bg-gray-200 w-full animate-pulse">
          <!-- <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> -->
        </div>
      </div>
      <h2 class="uppercase text-xl font-bold">{{ dish?.name }}</h2>
      <p>{{ dish?.description }}</p>
      <p class="text-sm">
        <span class="text-lg font-bold">{{ dish?.price }} р</span>
        {{ dish?.portion_size }} {{ dish?.unit }}
      </p>
      <div v-if="dishCount" class="mt-4 flex flex-col gap-4">
        <button class="btn w-full" @click="showOrder">Посмотреть заказ</button>
        <div class="flex items-center justify-between">
          <button class="btn btn-square" @click="removeFromOrder(dish.id)">
            -
          </button>
          <div>{{ dishCount }} шт</div>
          <button class="btn btn-square" @click="addToOrder(dish.id)">+</button>
        </div>
      </div>
      <div v-else class="mt-4">
        <button class="btn w-full" @click="addToOrder(dish.id)">
          Добавить в заказ
        </button>
      </div>
    </div>
  </Modal>
</template>
