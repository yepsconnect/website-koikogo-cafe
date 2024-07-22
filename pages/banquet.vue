<script setup lang="ts">
useSeoMeta({
  title: "Банкетное меню",
  description:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogTitle: "Банкетное меню",
  ogDescription:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogImage: "https://koikogo.cafe/logo.png",
  ogUrl: "https://koikogo.cafe/",
  twitterTitle: "Банкетное меню",
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
const route = useRoute();
const { locale, t } = useI18n();
// state
const activeCategory = ref(null);
const isModalInfo = ref(false);
const selectedPosition = ref();
const { data } = useFetch<{
  categories: Category[];
  positions: Position[];
}>(`/api/menu`, {
  query: {
    slug: 'banquet'
  }
})

// methods
const openModalInfo = (position: Position) => {
  isModalInfo.value = true
  selectedPosition.value = position
}
</script>

<template>
  <div>
    <div class="w-full flex justify-center items-center py-12 lg:py-48">
      <div class="flex flex-col md:flex-row items-center md:items-end">
        <LogoChef class="max-w-80" />
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
            {{ $t("screen.banquet.menu.title") }}
          </p>
        </div>
      </div>
    </div>
    <Container v-if="data">
      <CategoryMenu :categories="data.categories" :active-category="activeCategory"
        @on-submit="val => activeCategory = val" :locale="locale" />
      <div v-for="(category) in data.categories" :key="category._id" class="relative mb-6">
        <span :id="category.slug" class="absolute -top-16"></span>
        <h2 class="text-2xl font-bold uppercase">{{ category.title[locale as Locale] || category.title['ru'] }}</h2>
        <PositionItem v-for="item in data.positions.filter(x => x.categoryId === category._id)" :key="item._id"
          :position="item" :locale="locale" @on-submit="openModalInfo" />
      </div>
    </Container>
    <ModalInfo v-model="isModalInfo" :position="selectedPosition" />
  </div>
</template>
