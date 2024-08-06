<script setup lang="ts">

const cakes = [
  {
    title: "Капкейк",
    description: null,
    filling: ["малина", "соленая карамель", "банан"],
    prices: [
      { type: "Соленая карамель и банан", price: 100 },
      { type: "Малина", price: 110 },
    ]
  },
  {
    title: "Кейк - попс",
    description: null,
    filling: [],
    prices: [
      { type: "Традиционный", price: 80 },
    ]
  },
  {
    title: "Трафл",
    description: null,
    filling: [],
    prices: [
      { type: "Традиционный", price: 170 },
    ]
  },
  {
    title: "Панна котик",
    description: null,
    filling: [],
    prices: [
      { type: "Традиционный", price: 120 },
    ]
  }
]
const order = ref<any[]>([])

const addToOrder = (item: any) => {
  order.value.push(item)

}
</script>
<template>
  <section>
    <h2 class="text-xl font-bold">Капкейки и другие десерты</h2>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <CardCupcake v-for="cake in cakes" :key="cake.title" :cake="cake" :order="order" @on-select="addToOrder" />
    </div>
  </section>
</template>