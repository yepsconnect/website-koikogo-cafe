<script setup lang="ts">
import type { Dish } from "@/types/Dish";

useSeoMeta({
  title: "Кафе имени Койкого - Винная карта",
  description:
    "Мы рады предложить вам ознакомиться с  винной картой нашего кафе.",
  ogTitle: "Кафе имени Койкого - Винная карта",
  ogDescription:
    "Мы рады предложить вам ознакомиться с  винной картой нашего кафе.",
  ogImage: "https://koikogo.cafe/logo.png",
  ogUrl: "https://koikogo.cafe/",
  twitterTitle: "Кафе имени Койкого - Винная карта",
  twitterDescription:
    "Мы рады предложить вам ознакомиться с  винной картой нашего кафе.",
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
const { menu, bar } = useMenu();
const { order, addToOrder, removeFromOrder, notifications, clearOrder } =
  useOrder();

onMounted(() => {
  const orderCache = localStorage.getItem("order");
  if (orderCache) {
    const parsedOrder = JSON.parse(orderCache);
    order.value = parsedOrder;
  }
});

const orderItems = computed(() => {
  return order.value.filter((x) => x.id < 1000);
});

const orderList = computed(() => {
  return orderItems.value.map((item) => {
    const dish = menu.find((x) => x.id === item.id);
    return {
      ...item,
      ...dish,
    };
  });
});

const barItems = computed(() => {
  return order.value.filter((x) => x.id > 999);
});

const barList = computed(() => {
  return barItems.value.map((item) => {
    const dish = bar.find((x) => x.id === item.id);
    return {
      ...item,
      ...dish,
    };
  });
});

const currentHour = computed(() => {
  return new Date().getHours();
});

// state
const categories = [
  "БЕЛЫЕ ВИНА",
  "КРАСНЫЕ ВИНА",
  "РОЗОВЫЕ ВИНА",
  "ИГРИСТЫЕ ВИНА",
  "ВИНА ПО БОКАЛАМ",
  "ПИВО",
  "КОКТЕЙЛИ АЛКОГОЛЬНЫЕ",
  "КОКТЕЙЛИ Б/А",
];

const filteredCategories = computed(() => {
  if (currentHour.value > 15) {
    return categories.filter((x) => x !== "BRANCH BREAKFAST");
  }
  return categories;
});

// state
const selectedDish = ref<Dish>();
const isOpen = ref(false);
const isShowDish = ref(false);

onMounted(() => {
  selectedDish.value = bar[0];
});

const showInfo = (dishId: number) => {
  isOpen.value = false;
  selectedDish.value = bar.find((item) => item.id === dishId);
  isShowDish.value = true;
};

const activeCategory = ref();
</script>

<template>
  <div>
    <div class="fixed top-16 right-2 dropdown dropdown-end z-50">
      <div tabindex="0" role="button" class="btn btn-circle m-1">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </div>
      <ul
        tabindex="0"
        class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
      >
        <li><NuxtLink to="/">Основное меню</NuxtLink></li>
        <li><NuxtLink :to="{ name: 'bar' }">Винная карта</NuxtLink></li>
      </ul>
    </div>
    <div class="toast toast-top toast-end z-50">
      <div v-for="item in notifications" class="alert alert-success">
        <span>Добавлено {{ item.count }} шт</span>
      </div>
    </div>
    <Modal v-model="isOpen">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold">Мой заказ</h2>
        <template v-if="orderList.length">
          <h3>Основное меню</h3>
          <div class="flex flex-col gap-2">
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
        </template>
        <template v-if="barList.length">
          <h3>Винная карта</h3>
          <div class="flex flex-col gap-2">
            <div
              v-for="item in barList"
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
        </template>
        <div v-if="!barList.length && !orderList.length">
          <p class="text-center">Заказ пуст</p>
        </div>
        <div class="flex gap-3">
          <button class="btn flex-1" @click="isOpen = false">Закрыть</button>
          <button class="btn flex-1" @click="clearOrder()">
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
          <div>
            <h1 class="text-4xl font-bold uppercase">
              <span class="text-2xl">Кафе</span>
              <br />
              Имени
              <br />
              Койкого
            </h1>
            <br />
            <p class="text-xl">ВИННАЯ КАРТА</p>
          </div>
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
            v-for="(category, index) in filteredCategories"
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
            v-for="(category, index) in filteredCategories"
            :key="index"
            class="relative"
          >
            <span :id="category" class="absolute -top-16"></span>
            <h3 class="text-3xl uppercase">{{ category }}</h3>
            <div class="flex flex-col gap-4 mt-3">
              <template v-for="(item, index) in bar" :key="index">
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
