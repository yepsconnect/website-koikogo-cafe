import { Button } from '#build/components';
<script setup lang="ts">
import type { Dish } from "@/types/Dish";

interface Props {
  modelValue: boolean;
  dish: Dish | null;
}

const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<Props>();

//composables
const { order, addToOrder } = useOrder();

// computed
const count = ref(1);

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const showOrder = () => {
  isOpen.value = false;
  emit("show-order");
};

// reset count when modal is closed
watch(isOpen, (value) => {
  if (!value) {
    count.value = 1;
  }
});
</script>

<template>
  <Modal v-model="isOpen">
    <div v-if="dish" class="mt-2">
      <div class="avatar w-full">
        <div
          class="rounded-xl bg-gray-200 w-full"
          :class="{
            'animate-pulse': !dish.image,
          }"
        >
          <img v-if="dish.image" :src="dish.image" loading="lazy" />
        </div>
      </div>
      <h2 class="uppercase text-lg font-bold">{{ dish?.name }}</h2>
      <p v-if="dish?.description">{{ dish.description }}</p>
      <p class="text-sm">
        <span class="text-lg font-bold">{{ dish?.price }} р</span>
        {{ dish?.portion_size }} {{ dish?.unit }}
      </p>
      <div class="mt-4 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <button class="btn btn-square" :disabled="count < 2" @click="count--">
            -
          </button>
          <div>{{ count }} шт</div>
          <button class="btn btn-square" @click="count++">+</button>
        </div>
      </div>
      <div class="mt-2 flex justify-between gap-2">
        <button class="btn flex-1" @click="isOpen = false">Закрыть</button>
        <button
          class="btn flex-1"
          @click="addToOrder(dish.id, count, false), (isOpen = false)"
        >
          Добавить
        </button>
      </div>
    </div>
  </Modal>
</template>
