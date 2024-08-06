<script setup lang="ts">
// state
const cakes = [
  {
    title: "Бенто Торт «С днем рождения»",
    description: "",
    fillings: [
      "Торт Красный бархат",
      "Торт Шоколадно-банановый",
      "Торт Сникерс",
      "Торт Прага",
    ],
    options: [
      { weight: 300, size: "1-3", price: 590 },
      { weight: 700, size: "3-5", price: 890 },
      { weight: 1000, size: "6-9", price: 1490 }
    ]
  },
  {
    title: "Бенто Торт «Ваша Надпись и Дизайн»",
    description: "Свою надпись или фото можно оставить в комментарии при совершении заказа",
    fillings: [
      "Торт Красный бархат",
      "Торт Шоколадно-банановый",
      "Торт Сникерс",
      "Торт Прага",
    ],
    options: [
      { weight: 300, size: "1-3", price: 590 },
      { weight: 700, size: "3-5", price: 890 },
      { weight: 1000, size: "6-9", price: 1490 }
    ]
  },
  {
    title: "Бенто Торт в форме сердца «Ваша Надпись и Дизайн»",
    description: "Свою надпись или фото можно оставить в комментарии при совершении заказа",
    fillings: [
      "Торт Красный бархат",
      "Торт Шоколадно-банановый",
      "Торт Сникерс",
      "Торт Прага",
    ],
    options: [
      { weight: 300, size: "1-3", price: 690 },
      { weight: 700, size: "3-5", price: 990 },
      { weight: 1000, size: "6-9", price: 1690 }
    ]
  },
  {
    title: "Бенто Торт со свежими ягодами",
    description: "Свою надпись или фото можно оставить в комментарии при совершении заказа",
    fillings: [
      "Торт Красный бархат",
      "Торт Шоколадно-банановый",
      "Торт Сникерс",
      "Торт Прага",
    ],
    options: [
      { weight: 300, size: "1-3", price: 790 },
      { weight: 700, size: "3-5", price: 1090 },
      { weight: 1000, size: "6-9", price: 1790 }
    ]
  },
]

const order = ref<CakeOrder[]>([])

const addToOrder = (x: CakeOrder) => {
  order.value.push(x)
}
</script>

<template>
  <section>
    <h2 class="text-xl font-bold">Бенто торты</h2>
    <pre>{{ order }}</pre>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <CardCakeBento v-for="cake in cakes" :key="cake.title" :cake="cake" :order="order" @on-add="addToOrder" />
    </div>
  </section>
</template>