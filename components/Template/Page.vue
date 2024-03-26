<script setup lang="ts">
import type { Dish } from "@/types/Dish";

interface Props {
  seo: {
    title: string;
    description: string;
    ogTitle: string;
    ogDescription: string;
    ogImage: string;
    ogUrl: string;
    twitterTitle: string;
    twitterDescription: string;
    twitterImage: string;
    twitterCard: string;
  };
  categories: string[];
  page: string;
}

const props = defineProps<Props>();

useSeoMeta(props.seo);

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

// state

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
    <Menu />
    <div class="toast toast-top toast-end z-50">
      <div v-for="item in notifications" class="alert alert-success">
        <span>Добавлено {{ item.count }} шт</span>
      </div>
    </div>
    <Modal v-model="isOpen">
      <div class="flex flex-col gap-4">
        <h2 class="text-2xl font-bold">Мой заказ</h2>
        <template v-if="orderList.length">
          <h3>
            {{ page === "home" ? "Основное меню" : "Карта бара" }}
          </h3>
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

        <div v-if="!orderList.length">
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
          <LogoMenu v-if="page === 'home'" class="max-w-64" animated />
          <Vine v-if="page === 'bar'" class="max-w-64" />
          <div>
            <h1 class="text-4xl font-bold uppercase">
              <span class="text-2xl">Кафе</span>
              <br />
              Имени
              <br />
              Койкого
            </h1>

            <br />
            <p v-if="page === 'home'" class="text-xl uppercase">
              Основное меню
            </p>
            <p v-else-if="page === 'bar'" class="text-xl uppercase">
              Карта Бара
            </p>
          </div>
        </div>
      </div>
      <div class="mb-12">
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
              <template v-for="item in menu" :key="item.id">
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
