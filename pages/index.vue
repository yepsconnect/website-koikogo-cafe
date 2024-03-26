<script setup lang="ts">
const seo = {
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
};

const { categories } = useMenu();

const filteredCategories = computed(() =>
  categories.filter((x) => x.menu === "Основное меню").map((x) => x.name)
);
</script>

<template>
  <div>
    <TemplatePage :seo="seo" :categories="filteredCategories" page="home" />
  </div>
</template>
