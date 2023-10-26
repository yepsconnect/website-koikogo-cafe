<script setup lang="ts">
useSeoMeta({
  title: "Заказ",
  description:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogTitle: "Заказ",
  ogDescription:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogImage: "https://koikogo.cafe/logo.png",
  ogUrl: "https://koikogo.cafe/",
  twitterTitle: "Заказ",
  twitterDescription:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  twitterImage: "https://koikogo.cafe/logo.png",
  twitterCard: "summary",
});

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
const { menu, menuAlco } = useMenu();
const { order } = useOrder();

const deleteFromOrder = (id: Number) => {
  const dishIndex = order.value.findIndex((item) => item.id === id);

  if (dishIndex !== -1) {
    order.value.splice(dishIndex, 1);
  }
  console.log(order.value);
};
</script>

<template>
  <div>
    <div class="flex justify-between items-center py-3">
      <NuxtLink :to="{ name: 'index' }">Назад</NuxtLink>
      <NuxtLink :to="{ name: 'index' }">
        <Logo class="w-12" animated />
      </NuxtLink>
    </div>
    <div id="menu" class="py-6">
      <h1 class="text-4xl text-center">Мой заказ</h1>
    </div>
    <div v-if="order.length" class="flex flex-col gap-6">
      <div
        v-for="item in order"
        :key="item.id"
        class="flex justify-between items-start gap-2"
      >
        <div>
          <p class="uppercase">{{ item.name }}</p>
          <Child v-if="item.is_kids_menu" class="w-5 ml-2" />
          <p class="text-lg">
            {{ item.price }} р
            <span class="text-sm text-gray-600">
              {{ item.portion_size }} {{ item.unit }}
            </span>
          </p>
        </div>
        <button
          class="w-8 aspect-square flex items-center justify-center border rounded-full active:scale-75"
          @click="deleteFromOrder(item.id)"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 14 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.947 3.17243H11.4697L11.4475 3.64919L11.027 12.6867C11.027 12.6871 11.027 12.6875 11.027 12.6879C11.007 13.0674 10.8795 13.3246 10.7075 13.487C10.535 13.6499 10.2694 13.7632 9.88783 13.7632H4.11843C3.7277 13.7632 3.46129 13.6498 3.29038 13.4888C3.12016 13.3285 2.99311 13.0727 2.97302 12.688C2.973 12.6876 2.97298 12.6872 2.97296 12.6868L2.55246 3.64919L2.53028 3.17243H2.053H1.36244C1.3381 3.17243 1.32324 3.16384 1.3144 3.15507C1.30612 3.14685 1.29742 3.133 1.29742 3.10742C1.29742 3.09344 1.30213 3.08276 1.31162 3.07349C1.32145 3.06389 1.33777 3.05496 1.36244 3.05496H4.13727H4.63727V2.55496V1.61327C4.63727 1.23935 4.75292 1.00142 4.91449 0.852767C5.08176 0.698859 5.3629 0.581467 5.80091 0.581467H8.18651C8.62453 0.581467 8.90567 0.698859 9.07294 0.852767C9.2345 1.00142 9.35016 1.23935 9.35016 1.61327V2.55496V3.05496H9.85016H12.6375C12.666 3.05496 12.682 3.06498 12.6898 3.07251C12.6939 3.07654 12.6968 3.08083 12.6987 3.0853C12.7005 3.08947 12.7026 3.09632 12.7026 3.10742C12.7026 3.13175 12.694 3.14661 12.6852 3.15545C12.677 3.16373 12.6631 3.17243 12.6375 3.17243H11.947ZM8.67619 3.05496H9.17619V2.55496V1.66978C9.17619 1.38635 9.07269 1.11535 8.85881 0.918305C8.64906 0.725075 8.37663 0.642432 8.1049 0.642432H5.88252C5.6108 0.642432 5.33836 0.725075 5.12862 0.918305C4.91474 1.11535 4.81124 1.38635 4.81124 1.66978V2.55496V3.05496H5.31124H8.67619ZM3.12932 12.5355L3.1294 12.5371C3.16004 13.1396 3.59982 13.6395 4.24399 13.6395H9.74971C10.0505 13.6395 10.3341 13.5312 10.5442 13.3166C10.7512 13.105 10.8541 12.8241 10.8645 12.5319L11.2725 3.69548L11.2966 3.17243H10.773H3.20814H2.68378L2.7087 3.69619L3.12932 12.5355Z"
              stroke="#454545"
            />
          </svg>
        </button>
      </div>
    </div>
    <div v-else>
      <p class="text-center">Вернитиесь в меню чтобы добавить блюдо в заказ</p>
    </div>
  </div>
</template>
