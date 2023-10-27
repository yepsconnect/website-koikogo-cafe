<script setup lang="ts">
import type { Dish } from "~/types/Dish";

useSeoMeta({
  title: "Кафе имени Койкого",
  description:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogTitle: "Кафе имени Койкого",
  ogDescription:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogImage: "https://koikogo.cafe/logo.png",
  ogUrl: "https://koikogo.cafe/",
  twitterTitle: "Кафе имени Койкого",
  twitterDescription:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  twitterImage: "https://koikogo.cafe/logo.png",
  twitterCard: "summary",
});

useHead({
  link: [
    {
      rel: "icon",
      type: "image/png",
      href: "logo.png",
    },
  ],
});

// composables
const { menu } = useMenu();
const { order, addToOrder, removeFromOrder } = useOrder();

const orderList = computed(() => {
  return order.value.map((item) => {
    const dish = menu.find((x) => x.id === item.id);
    return {
      ...item,
      ...dish,
    };
  });
});

// state
const categories = [
  "завтраки до 13:00",
  "закуски",
  "салаты",
  "супы",
  "основные блюда",
  "пицца",
  "паста",
  "гарниры",
  "десерты",
  "кофе",
  "чай",
  "фирменный чай",
  "напитки",
  "лимонады",
  "морсы",
  "милкшейки",
  "коктейли (безалкогольные)",
  "белые вина",
  "красные вина",
  "розовые вина",
  "игристые вина",
  "вина по бокалам",
  "пиво",
  "коктейли",
];

// state
const selectedDish = ref<Dish>();
const isOpen = ref(false);
const isShowDish = ref(false);

onMounted(() => {
  selectedDish.value = menu[0];
});

const showInfo = (dishId: Number) => {
  isOpen.value = false;
  selectedDish.value = menu.find((item) => item.id === dishId);
  isShowDish.value = true;
};
</script>

<template>
  <div>
    <Modal v-model="isOpen">
      <div class="mt-4 flex flex-col gap-4">
        <h2 class="text-2xl font-bold">Мой заказ</h2>
        <template v-if="orderList.length">
          <div
            v-for="item in orderList"
            :key="item.name"
            class="flex justify-between gap-2"
          >
            <p class="uppercase" @click="showInfo(item.id)">{{ item.name }}</p>
            <div class="flex items-center gap-5">
              <button
                class="w-8 aspect-square flex items-center justify-center border rounded-full active:scale-75"
                @click="removeFromOrder(item.id)"
              >
                -
              </button>
              <p>{{ item.count }}</p>
              <button
                class="w-8 aspect-square flex items-center justify-center border rounded-full active:scale-75"
                @click="addToOrder(item.id)"
              >
                +
              </button>
            </div>
          </div>
        </template>
        <div v-else>
          <p class="text-center">Заказ пуст</p>
        </div>
      </div>
    </Modal>
    <ModalDish
      v-model="isShowDish"
      :dish="selectedDish"
      @show-order="isOpen = true"
    />
    <Container>
      <div class="h-screen w-full flex justify-center items-center">
        <div class="flex flex-col md:flex-row items-center md:items-end">
          <Logo class="max-w-64" animated />
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">Кафе</span>
            <br />
            Имени
            <br />
            Койкого
          </h1>
        </div>
      </div>
      <div class="mb-12">
        <div id="menu" class="py-6">
          <h2 class="text-4xl text-center">Меню</h2>
        </div>
        <div class="flex flex-col gap-12 mt-6">
          <div v-for="(category, index) in categories" :key="index">
            <h3 class="text-3xl uppercase">{{ category }}</h3>
            <div class="flex flex-col gap-4 mt-3">
              <template v-for="(item, index) in menu" :key="index">
                <DishItem
                  v-if="item.category === category"
                  :dish="item"
                  @click="showInfo(item.id)"
                />
              </template>
            </div>
          </div>
        </div>
      </div>
    </Container>
    <div
      v-if="order.length"
      class="sticky bottom-0 bg-white py-5 border-t mt-10"
    >
      <Container class="flex items-center justify-between gap-3">
        <p>Выбрано позиций: {{ order.length }}</p>
        <button class="btn" @click="isOpen = true">Посмотреть</button>
      </Container>
    </div>
  </div>
</template>
