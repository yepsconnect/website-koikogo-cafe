<script setup lang="ts">
const emit = defineEmits(["onAdd"])
const props = defineProps<{
  cake: CakeBento
  order: CakeOrder[]
}>()

// state
const taste = ref(null)
const weight = ref(300)

// computed
const x = computed(() => {
  return {
    title: props.cake.title,
    filling: taste.value,
    weight: weight.value,
    price: props.cake.options.find(x => x.weight === weight.value)!.price,
    type: 'bento'
  }
})

const countInOrder = computed(() => {
  return props.order.filter(x => x.title === props.cake.title).length
})

const handleSubmit = () => {
  emit('onAdd', x)
}
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
        <option v-for="item in cake.fillings" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <select v-model="weight" class="select select-bordered select-sm">
        <option :value="null">Выбрать</option>
        <option v-for="item in cake.options" :key="item.weight" :value="item.weight">
          {{ item.weight }}гр. на {{ item.size }}
        </option>
      </select>
      <p class="font-bold">{{ cake.options.find(x => x.weight === weight)!.price }}₽</p>

      <button class="btn btn-primary btn-full btn-sm" :class="{
        'btn-outline': !countInOrder
      }" :disabled="taste === null" @click="handleSubmit">
        {{
          !countInOrder ? "В корзину" : `${countInOrder} шт`
        }}
      </button>
    </div>
  </div>
</template>