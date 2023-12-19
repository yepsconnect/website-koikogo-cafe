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
const { order, addToOrder, removeFromOrder, notifications } = useOrder();

onMounted(() => {
  const orderCache = localStorage.getItem("order");
  if (orderCache) {
    const parsedOrder = JSON.parse(orderCache);
    order.value = parsedOrder;
  }
});

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

const showInfo = (dishId: number) => {
  isOpen.value = false;
  selectedDish.value = menu.find((item) => item.id === dishId);
  isShowDish.value = true;
};

const activeCategory = ref();
</script>

<template>
  <div>
    <div class="toast toast-top toast-end z-50">
      <div v-for="item in notifications" class="alert alert-success">
        <span>Добавлено {{ item.count }} шт</span>
      </div>
    </div>
    <Modal v-model="isOpen">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold">Мой заказ</h2>
        <div v-if="orderList.length" class="flex flex-col gap-2">
          <div
            v-for="item in orderList"
            :key="item.name"
            class="flex justify-between gap-2"
          >
            <p
              class="uppercase text-lg hover:underline cursor-pointer"
              @click="showInfo(item.id)"
            >
              {{ item.name }}
            </p>
            <div class="flex items-center gap-2">
              <button
                class="btn btn-xs btn-outline btn-circle"
                @click="removeFromOrder(item.id)"
              >
                -
              </button>
              <div class="w-10">
                <p class="text-center text-lg font-bold">{{ item.count }}</p>
              </div>
              <button
                class="btn btn-xs btn-outline btn-circle"
                @click="addToOrder(item.id, 1, true)"
              >
                +
              </button>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="text-center">Заказ пуст</p>
        </div>
        <div class="flex gap-3">
          <button class="btn flex-1" @click="isOpen = false">Закрыть</button>
          <button class="btn flex-1" @click="(isOpen = false), (order = [])">
            Очистить заказ
          </button>
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
        <div
          class="navbar bg-base-100 overflow-x-scroll gap-3 py-3 position: sticky top-0 z-10"
        >
          <a
            v-for="(category, index) in categories"
            :key="index"
            class="badge badge-lg badge-outline whitespace-nowrap capitalize"
            :class="{
              'badge-primary': activeCategory === category,
            }"
            :href="'#' + category"
            @click="activeCategory = category"
          >
            {{ category }}
          </a>
        </div>

        <div class="flex flex-col gap-12 mt-6">
          <div
            v-for="(category, index) in categories"
            :key="index"
            class="relative"
          >
            <span :id="category" class="absolute -top-16"></span>
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
    <Container v-if="order.length" class="sticky bottom-3 flex justify-center">
      <div class="alert shadow-lg flex justify-between max-w-xl">
        <p class="text-based-content">Выбрано позиций: {{ order.length }}</p>
        <button class="btn btn-sm" @click="isOpen = true">Посмотреть</button>
      </div>
    </Container>
  </div>
</template>

<style>
* {
  scroll-behavior: smooth;
}
</style>
