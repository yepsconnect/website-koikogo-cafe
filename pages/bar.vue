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
const { locale, t } = useI18n();
// data
const availableCategories = [
  "66803f7e410a17d1138d937c",
  "66803f93410a17d1138d937f",
  "66803f9c410a17d1138d9381",
  "66803fa9410a17d1138d9383",
  "66803fb9410a17d1138d9385",
  "66803fc3410a17d1138d9387",
  "66803fcd410a17d1138d9389",
  "66803fd9410a17d1138d938b",
  "66803fe3410a17d1138d938d",
  "66803ff4410a17d1138d9390",
  "66803ffe410a17d1138d9392",
  "6680400d410a17d1138d9394",
  "66804019410a17d1138d9396",
  "66804025410a17d1138d9398",
  "66804031410a17d1138d939a",
  "6680403d410a17d1138d939c",
  "668074ec410a17d1138d93ab",
]
// state
const activeCategory = ref(null);
const isModalInfo = ref(false);
const selectedDish = ref();
const { data } = useFetch<{
  ok: boolean
  categories: Category[]
}>('/api/category')
const { data: dataMenu } = useFetch<{
  ok: boolean
  dishes: Dish[]
}>('/api/dish')

// computed
const result = computed(() => {
  if (!data.value?.categories) return []
  return data.value?.categories.filter(category => availableCategories.includes(category._id)).sort((a, b) => a.order - b.order)
})

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
            <span class="text-2xl">{{ t('name[0]') }}</span>
            <br />
            {{ t('name[1]') }}
            <br />
            {{ t('name[2]') }}
          </h1>
          <br />
          <p class="text-xl uppercase">
            {{ t("screen.bar.title") }}
          </p>
        </div>
      </div>
    </div>
    <Container v-if="dataMenu">
      <CategoryMenu :categories="result" :active-category="activeCategory" @on-submit="val => activeCategory = val"
        :locale="locale" />
      <div v-for="(category) in result" :key="category._id" class="relative mb-6">
        <span :id="category.slug" class="absolute -top-16"></span>
        <h2 class="text-2xl font-bold uppercase">{{ category?.title[locale] || "ru" }}</h2>
        <DishItem v-for="item in dataMenu.dishes.filter(x => x.categoryId === category._id)" :key="item._id"
          :dish="item" :locale="locale" @on-submit="openModalInfo" />
      </div>
    </Container>

    <ModalInfo v-model="isModalInfo" :dish="selectedDish" />
  </div>
</template>
