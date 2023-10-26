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
  console.log(order.value);
};
</script>

<template>
  <div>
    <div class="flex items-start justify-between gap-3">
      <input v-model="isActive" type="checkbox" @change="toggleItem" />
      <div class="flex flex-wrap flex-1">
        <p
          class="uppercase text-lg"
          @click="(isActive = !isActive), toggleItem()"
        >
          {{ dish.name }}
        </p>
        <Child v-if="dish.is_kids_menu" class="w-5 ml-2" />
      </div>

      <div>
        <p class="text-right text-lg">
          <span class="text-sm text-gray-600">
            {{ dish.portion_size }} {{ dish.unit }}
          </span>
          {{ dish.price }}
        </p>
      </div>
    </div>
    <p class="text-md text-gray-600" v-if="dish.description">
      {{ dish.description }}
    </p>
  </div>
</template>

<style scoped>
input[type="checkbox"] {
  width: 18px;
  height: 30px;
  accent-color: rgb(71, 71, 71);
}
</style>
