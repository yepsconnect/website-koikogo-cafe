<script setup lang="ts">
const emit = defineEmits(["onAdd"])
const props = defineProps<{
  cake: Cake
  order: CakeOrder[]
}>()

const weight = ref(1000)

const sizes = [
  { price: 1100, weight: 1000, portions: "6 - 9" },
  { price: 2200, weight: 2000, portions: "10 - 12" },
  { price: 3300, weight: 3000, portions: "16 - 18" },
  { price: 4400, weight: 4000, portions: "20 - 24" },
  { price: 5500, weight: 5000, portions: "26 - 30" },
  { price: 6600, weight: 6000, portions: "30 - 36" },
  { price: 7700, weight: 7000, portions: "36 - 42" }
]

const x = computed(() => {
  return {
    title: props.cake.title,
    description: props.cake.description,
    filling: '',
    price: props.cake.price || sizes.find(x => x.weight === weight.value)!.price,
    weight: weight.value || null,
    type: 'traditional'
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
      <select v-if="!cake.price" v-model="weight" class="select select-bordered select-sm">
        <option :value="null">Выбрать</option>
        <option v-for="item in sizes" :key="item.weight" :value="item.weight">
          {{ item.weight }} кг на {{ item.portions }} гостей
        </option>
      </select>
      <p class="font-bold">{{ cake.price ? cake.price : sizes.find(x => x.weight === weight)!.price }}₽</p>

      <button class="btn btn-primary btn-full btn-sm" :class="{
        'btn-outline': !countInOrder
      }" @click="$emit('onAdd', x)">
        {{
          !countInOrder ? "В корзину" : `${countInOrder} шт`
        }}
      </button>
    </div>
  </div>
</template>