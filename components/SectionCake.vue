<script setup lang="ts">
defineEmits(["onAdd"])
defineProps<{
  title: string,
  order: CakeOrder[]
  cakes: Cake[]
}>()
</script>

<template>
  <section>
    <h2 class="text-xl font-bold mb-3">{{ title }}</h2>
    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <CardCake v-for="cake in cakes" :key="cake.title" :cake="cake" :order="order"
        @on-add="val => $emit('onAdd', val)" />
    </div>
  </section>
</template>