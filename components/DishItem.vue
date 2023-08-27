<script setup lang="ts">
import { Dish } from "~/types/Dish";

interface Props {
  dish: Dish;
}

defineEmits(["toggle"]);
defineProps<Props>();
</script>

<template>
  <div>
    <div>
      <div class="flex items-end justify-between">
        <div class="flex flex-wrap flex-1">
          <p class="uppercase">{{ dish.name }}</p>
          <Child v-if="dish.is_kids_menu" class="w-5 ml-2" />
        </div>

        <div>
          <p class="text-right">
            <span class="text-sm text-gray-600">
              {{ dish.portion_size }} {{ dish.unit }}
            </span>
            {{ dish.price }}
          </p>
        </div>
      </div>
      <p class="text-sm text-gray-600" v-if="dish.description">
        {{ dish.description }}
      </p>
    </div>
  </div>
</template>
