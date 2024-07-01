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
const { locale, t } = useI18n();
// data
const availableCategories = [
  "667aa60907d1b9558d226be9",
  "667aa61407d1b9558d226bec",
  "667aa62607d1b9558d226bf1",
  "667aa62e07d1b9558d226bf4",
  "667aa65807d1b9558d226bfa",
  "667aa66107d1b9558d226bfd",
  "667aa68e07d1b9558d226c01",
  "667aa6a907d1b9558d226c04",
  "667aa6d407d1b9558d226c08",
  "667aa6eb07d1b9558d226c0c",
  "667aa70007d1b9558d226c0f",
  "667aa71507d1b9558d226c12",
  "667aa72e07d1b9558d226c15"
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
        <LogoMenu class="max-w-64" animated />
        <div>
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">{{ t('name[0]') }}</span>
            <br />
            {{ t('name[1]') }}
            <br />
            {{ t('name[2]') }}
          </h1>
          <br>
          <p class="text-xl uppercase">
            {{ t("screen.menu.title") }}
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
