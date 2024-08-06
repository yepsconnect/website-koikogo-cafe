<script setup lang="ts">
const emit = defineEmits(["onAdd"])
const props = defineProps<{
  cake: Cupcake
  order: Cake[]
}>()

// state
const taste = ref(null)
const type = ref(props.cake.prices[0].type)

// computed
const item = computed(() => {
  return {
    ...props.cake,
    taste: taste.value,
  }
})

const countInOrder = computed(() => {
  return props.order.filter(x => x.title === props.cake.title).length
})
</script>

<template>
  <div class="p-3 border rounded-lg flex flex-col gap-1">
    <div class="avatar">
      <div class="rounded">
        <img src="@/assets/images/placeholder/cake.jpeg" alt="cake" class="fit-cover">
      </div>
    </div>
    <h3 class="text-lg font-semibold">{{ cake.title }}</h3>
    <p class="text-gray-300 text-sm">{{ cake.description || "Описание отсутствует" }}</p>
    <div class="flex-1 flex flex-col gap-2 justify-end mt-2">
      <select v-if="cake.filling.length" v-model="taste" class="select select-bordered select-sm">
        <option :value="null">Выбрать начинку</option>
        <option v-for="item in cake.filling" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <select v-model="type" class="select select-bordered select-sm">
        <option :value="null">Выбрать</option>
        <option v-for="item in cake.prices" :key="item.type" :value="item.type">
          {{ item.type }}
        </option>
      </select>
      <p class="font-bold">{{ item.prices.find(x => x.type === type)!.price }}₽</p>

      <button class="btn btn-primary btn-full btn-sm" :class="{
        'btn-outline': !countInOrder
      }" :disabled="type === null || (cake.filling.length && !taste)" @click="$emit('onAdd', item)">
        {{
          !countInOrder ? "В корзину" : `${countInOrder} шт`
        }}
      </button>
    </div>
  </div>
</template>