<script setup lang="ts">
definePageMeta({
  layout: 'menu'
});

useSeoMeta({
  title: "Кафе имени Койкого - Карта бара",
  description:
    "Мы рады предложить вам ознакомиться с винной картой нашего кафе.",
  ogTitle: "Кафе имени Койкого - Карта бара",
  ogDescription:
    "Мы рады предложить вам ознакомиться с винной картой нашего кафе.",
  ogImage: "https://koikogo.cafe/logo.png",
  ogUrl: "https://koikogo.cafe/",
  twitterTitle: "Кафе имени Койкого - Карта бара",
  twitterDescription:
    "Мы рады предложить вам ознакомиться с винной картой нашего кафе.",
  twitterImage: "https://koikogo.cafe/logo.png",
  twitterCard: "summary",
})

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
const { menu, categories } = useMenu();
const { order } = useOrder();

// state
const selectedDish = ref<Dish>();
const isOpen = ref(false);
const isModalInfo = ref(false);
const activeCategory = ref(null);
const { locale } = useI18n();

onMounted(() => {
  const orderCache = localStorage.getItem("order");
  if (orderCache) {
    const parsedOrder = JSON.parse(orderCache);
    order.value = parsedOrder;
  }
});

// methods
const openModalInfo = (dish: Dish) => {
  isModalInfo.value = true
  selectedDish.value = dish
}
</script>

<template>
  <div>
    <div class="h-screen w-full flex justify-center items-center">
      <div class="flex flex-col md:flex-row items-center md:items-end">
        <Vine class="max-w-64" />
        <div>
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">Кафе</span>
            <br />
            Имени
            <br />
            Койкого
          </h1>
          <br />

          <p class="text-xl uppercase">
            Карта Бара
          </p>
        </div>
      </div>
    </div>
    <Container>
      <div class="mb-12">
        <CategoryMenu :categories="categories" :active-category="activeCategory"
          @on-submit="val => activeCategory = val" :locale="locale" />
        <div class="flex flex-col gap-12 mt-6">
          <div v-for="(category, index) in categories" :key="index" class="relative">
            <span :id="category._id" class="absolute -top-16"></span>
            <h3 class="text-3xl uppercase">{{ category.title[locale] }}</h3>
            <div class="flex flex-col gap-4 mt-3">
              <DishItem v-for="item in menu.filter(x => x.category === category.title[locale])" :dish="item"
                @on-submit="openModalInfo" />
            </div>
          </div>
        </div>
      </div>
    </Container>
    <ModalInfo v-model="isModalInfo" :dish="selectedDish" @show-order="isOpen = true" />
  </div>
</template>
