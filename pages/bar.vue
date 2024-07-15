<script setup lang="ts">
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
const route = useRoute();
const { locale, t } = useI18n();
// state
const activeCategory = ref(null);
const isModalInfo = ref(false);
const selectedDish = ref();
const { data } = useFetch<{
  ok: boolean
  categories: Category[]
}>(`/api/category?page=bar`)
const { data: dataMenu } = useFetch<{
  ok: boolean
  dishes: Dish[]
}>('/api/dish?available=true')

// computed
const result = computed(() => {
  if (!data.value?.categories) return []
  return data.value?.categories.sort((a, b) => a.order - b.order)
})

// methods
const openModalInfo = (dish: Dish) => {
  isModalInfo.value = true
  selectedDish.value = dish
}
</script>

<template>
  <div>
    <div class="w-full flex justify-center items-center py-12 lg:py-48">
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
