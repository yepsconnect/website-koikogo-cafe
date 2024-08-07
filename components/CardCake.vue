<script setup lang="ts">
const emit = defineEmits(["onAdd"])
const props = defineProps<{
  cake: Cake
  order: CakeOrder[]
}>()

// state
const additional = ref(props.cake.additional && props.cake.additional.length ? props.cake.additional[0].name : null)
const taste = ref(null)
const size = ref(props.cake.options[0].weight)

const addPrice = computed(() => props.cake.additional && props.cake.additional.length && props.cake.additional.find(x => x.name === additional.value).price || 0)

// computed
const x = computed(() => {
  return {
    type: props.cake.type,
    title: props.cake.title,
    weight: size.value,
    unit: size.value && props.cake.options.find(x => x.weight === size.value)!.unit,
    price: size.value && props.cake.options.find(x => x.weight === size.value)!.price + addPrice.value,
    filling: taste.value,
    additional: additional.value
  }
})

const countInOrder = computed(() => {
  return props.order.filter(x => x.title === props.cake.title).length
})

const handleSubmit = () => {
  emit('onAdd', x.value)
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
      <select v-if="cake.fillings.length" v-model="taste" class="select select-bordered select-sm">
        <option :value="null">Выбрать начинку</option>
        <option v-for="item in cake.fillings" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
      <select v-if="cake.additional && cake?.additional.length" v-model="additional"
        class="select select-bordered select-sm">
        <option v-for="item in cake.additional" :key="item.name" :value="item.name">
          {{ item.name }}
        </option>
      </select>

      <select v-if="cake.options.length > 1" v-model="size" class="select select-bordered select-sm">
        <option v-for="item in cake.options" :key="item.weight" :value="item.weight">
          <template v-if="item.weight">{{ item.weight }}{{ item.unit }}</template>
          <template v-if="item.size"> на {{ item.size }} гостей.</template>
          <template v-if="item.type">{{ item.type }}</template>
        </option>
      </select>
      <p v-if="size" class="font-bold">{{ x.price }}₽</p>
      <p v-else class="font-bold">0₽</p>

      <button class="btn btn-primary btn-full btn-sm" :class="{
        'btn-outline': !countInOrder
      }" :disabled="size === null || (cake.fillings.length && !taste)" @click="handleSubmit">
        {{
          !countInOrder ? "В корзину" : `${countInOrder} шт`
        }}
      </button>
    </div>
  </div>
</template>