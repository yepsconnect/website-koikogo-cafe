<script setup lang="ts">
import { Dish } from "~/types/Dish";

interface Props {
  dish: Dish;
}

defineEmits(["toggle"]);
const props = defineProps<Props>();

//composables
const { order } = useOrder();

// state
const isActive = ref(false);

const toggleItem = () => {
  const dishIndex = order.value.findIndex((item) => item.id === props.dish.id);

  if (isActive.value) {
    if (dishIndex === -1) {
      order.value.push(props.dish);
    }
  } else {
    if (dishIndex !== -1) {
      order.value.splice(dishIndex, 1);
    }
  }
};
</script>

<template>
  <div class="flex items-start gap-4">
    <div class="avatar">
      <div class="w-16 rounded-xl bg-gray-200">
        <!-- <img src="/images/stock/photo-1534528741775-53994a69daeb.jpg" /> -->
      </div>
    </div>
    <div class="flex flex-col md:flex-row justify-between w-full md:gap-4">
      <div class="flex-1 flex flex-col items-start">
        <p class="uppercase text-md">
          {{ dish.name }}
        </p>
        <div
          v-if="dish.is_kids_menu"
          class="tooltip tooltip-right"
          data-tip="Детское меню"
        >
          <button class="btn btn-sm btn-circle btn-ghost">
            <Child class="w-7" />
          </button>
        </div>
      </div>

      <p class="text-md">
        {{ dish.price }} р
        <span class="text-sm text-gray-600">
          {{ dish.portion_size }} {{ dish.unit }}
        </span>
      </p>
    </div>
  </div>
</template>
