<script setup lang="ts">
const seo = {
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
};

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
</script>

<template>
  <TemplatePage :seo="seo" :categories="categories" page="bar" />
</template>
