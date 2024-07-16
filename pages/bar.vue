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
const { locale, t } = useI18n();
// state
const activeCategory = ref(null);
const isModalInfo = ref(false);
const selectedPosition = ref();
const { data } = useFetch<{
  ok: boolean
  categories: Category[]
  positions: Position[]
}>(`/api/menu`, {
  query: {
    pageId: '66952c98a9159c7fc085a875'
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
    <Container v-if="data">
      <CategoryMenu :categories="data?.categories" :active-category="activeCategory"
        @on-submit="val => activeCategory = val" :locale="locale" />
      <div v-for="(category) in data?.categories" :key="category._id" class="relative mb-6">
        <span :id="category.slug" class="absolute -top-16"></span>
        <h2 class="text-2xl font-bold uppercase">{{ category?.title[locale] || category?.title['ru'] }}</h2>
        <PositionItem v-for="item in data.positions.filter(x => x.categoryId === category._id)" :key="item._id"
          :position="item" :locale="locale" @on-submit="openModalInfo" />
      </div>
    </Container>

    <ModalInfo v-model="isModalInfo" :position="selectedPosition" />
  </div>
</template>
