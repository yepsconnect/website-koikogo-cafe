<script setup lang="ts">
import type { Dish } from "@/types/Dish";

interface Props {
  dish: Dish;
}

defineEmits(["toggle"]);
defineProps<Props>();
</script>

<template>
  <div
    class="flex items-center gap-1 p-2 rounded-xl hover:bg-base-200 cursor-pointer"
  >
    <div class="flex items-start gap-4 w-full">
      <div class="avatar">
        <div class="w-16 rounded-xl bg-gray-200">
          <img v-if="dish.image" :src="dish.image" loading="lazy" />
          <img
            v-else
            src="https://multimedia.properati.com.co/properati/images/no-image-placeholder.png"
            loading="lazy"
          />
        </div>
      </div>
      <div class="flex flex-col md:flex-row justify-between w-full md:gap-4">
        <div class="flex-1 flex flex-col items-start">
          <p class="uppercase text-md">
            {{ dish.name }}
          </p>
          <p>
            <span class="text-sm text-gray-600">
              {{ dish.portion_size }} {{ dish.unit }}
            </span>
          </p>
        </div>

        <p class="text-md">
          {{ dish.price === 0 ? "Уточните в меню" : dish.price }}
        </p>
      </div>
    </div>
    <div class="btn btn-circle btn-xs btn-ghost">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          class="fill-current"
          d="M10.7055 6.70538C10.3159 6.31581 9.68428 6.31581 9.2947 6.70538C8.90543 7.09466 8.90509 7.72569 9.29393 8.11538L13.1701 12L9.29393 15.8846C8.90509 16.2743 8.90543 16.9053 9.2947 17.2946C9.68428 17.6842 10.3159 17.6842 10.7055 17.2946L16.0001 12L10.7055 6.70538Z"
        />
      </svg>
    </div>
  </div>
</template>
