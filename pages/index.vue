<script setup lang="ts">
definePageMeta({
  layout: 'menu'
});

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
const { menu } = useMenu()
const { locale } = useI18n();
// state
const activeCategory = ref(null);
const isModalInfo = ref(false);
const selectedDish = ref();
const { data } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')
// computed
const filteredMenu = computed(() => menu.filter(x => x.menu === "Основное меню"))

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
        <LogoMenu class="max-w-64" animated />
        <div>
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">Кафе</span>
            <br />
            Имени
            <br />
            Койкого
          </h1>
        </div>
      </div>
    </div>
    <template v-if="data?.categories">
      <CategoryMenu :categories="data?.categories" :active-category="activeCategory"
        @on-submit="val => activeCategory = val" :locale="locale" />
      <Container>
        <div v-for="(category) in data.categories" :key="category._id" class="relative mb-6">
          <span :id="category.slug" class="absolute -top-16"></span>
          <h2 class="text-2xl font-bold uppercase">{{ category?.title[locale] || Object.keys(category.title)[0] }}</h2>
          <DishItem v-for="item in filteredMenu.filter(x => x.categoryId === category._id)" :key="item._id" :dish="item"
            @on-submit="openModalInfo" />
        </div>
      </Container>
    </template>
    <ModalInfo v-model="isModalInfo" :dish="selectedDish" />
  </div>
</template>
