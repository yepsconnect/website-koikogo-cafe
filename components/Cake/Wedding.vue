<script setup lang="ts">
import CardCakeTraditional from '../CardCakeTraditional.vue';

const cakes = [
  {
    title: "Торт 1",
    description: ""
  },
  {
    title: "Торт 2",
    description: ""
  },
  {
    title: "Торт 3",
    description: ""
  },
  {
    title: "Торт 4",
    description: ""
  },
  {
    title: "Торт 5",
    description: ""
  },
  {
    title: "Торт 6",
    description: ""
  },

]

const order = ref<Cake[]>([])

const addToOrder = (cake: Cake) => {
  order.value.push(cake)
}

</script>

<template>
  <section>
    <h2 class="text-xl font-bold">Свадебные торты от одного яруса и выше</h2>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <CardCakeWedding v-for="cake in cakes" :key="cake.title" :cake="cake" :order="order" @on-select="addToOrder" />
    </div>
  </section>
</template>