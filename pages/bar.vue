<script setup lang="ts">
const seo = {
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
};

const { categories } = useMenu();

const filteredCategories = computed(() =>
  categories.filter((x) => x.menu === "Бар").map((x) => x.name)
);
</script>

<template>
  <div>
    <TemplatePage :seo="seo" :categories="filteredCategories" page="bar" />
  </div>
</template>
