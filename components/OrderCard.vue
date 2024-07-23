<script setup lang="ts">
defineEmits(["onOpen"])
const props = defineProps<{
  orderItem: OrderItem
  menu: Position[]
}>()

const { t, locale } = useI18n()
const { decrementOrder, incrementOrder } = useOrder();

const item = computed(() => {
  return props.menu.find((x) => x._id === props.orderItem._id)
})
</script>

<template>
  <div class="flex justify-between gap-2">
    <div class="flex items-center gap-2">
      <div class="avatar w-14">
        <div class=" rounded-xl bg-gray-200">
          <img v-if="item?.image" :src="item.image" loading="lazy" />
          <img v-else src="https://multimedia.properati.com.co/properati/images/no-image-placeholder.png"
            loading="lazy" />
        </div>
      </div>
      <div class="flex-1">
        <p class="line-clamp-2 text-md">
          {{ item?.title[locale] || item?.title['ru'] }}
        </p>
        <p class="text-gray-700">
          {{ item?.price }}₽
          <span class="text-gray-300 text-sm">{{ item?.unit }}</span>
        </p>

      </div>
    </div>
    <div class="flex items-center justify-center gap-2">
      <button class="btn btn-xs btn-glass btn-circle" @click="decrementOrder(orderItem._id)">
        -
      </button>
      <p class="text-center text-lg font-bold mx-1">{{ orderItem.count }}</p>
      <button class="btn btn-xs btn-glass btn-circle" @click="incrementOrder(orderItem._id)">
        +
      </button>
    </div>
  </div>
</template>