<script setup lang="ts">
const emit = defineEmits(["onSelect"])
const props = defineProps<{
  cake: Cake
  order: Cake[]
}>()

const tastes = [
  "Торт Красный бархат",
  "Торт Шоколадно-банановый",
  "Торт Сникерс",
  "Торт Прага",
]

const weight = ref(1)
const taste = ref(null)
const sizes = [
  { price: 1100, weight: 1, portions: "6 - 9" },
  { price: 2200, weight: 2, portions: "10 - 12" },
  { price: 3300, weight: 3, portions: "16 - 18" },
  { price: 4400, weight: 4, portions: "20 - 24" },
  { price: 5500, weight: 5, portions: "26 - 30" },
  { price: 6600, weight: 6, portions: "30 - 36" },
  { price: 7700, weight: 7, portions: "36 - 42" }
]

const x = computed(() => {
  return {
    title: props.cake.title,
    filling: "",
    price: props.cake.price || sizes.find(x => x.weight === weight.value)!.price,
    weight: weight.value || null,
    type: "wedding"
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
      <select v-model="taste" class="select select-bordered select-sm">
        <option :value="null">Выбрать начинку</option>
        <option v-for="item in tastes" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <select v-if="!cake.price" v-model="weight" class="select select-bordered select-sm">
        <option :value="null">Выбрать</option>
        <option v-for="item in sizes" :key="item.weight" :value="item.weight">
          {{ item.weight }} кг на {{ item.portions }} гостей
        </option>
      </select>
      <p class="font-bold">{{ cake.price ? cake.price : sizes.find(x => x.weight === weight)!.price }}₽</p>

      <button class="btn btn-primary btn-full btn-sm" :class="{
        'btn-outline': !countInOrder
      }" :disabled="taste === null" @click="$emit('onSelect', item)">
        {{
          !countInOrder ? "В корзину" : `${countInOrder} шт`
        }}
      </button>
    </div>
  </div>
</template>