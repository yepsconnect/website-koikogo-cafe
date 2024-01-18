<script setup lang="ts">
const route = useRoute();

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

const categories = [
  "BRANCH BREAKFAST",
  "закуски",
  "супы",
  "гарнир",
  "на углях",
  "пицца",
  "пироги",
  "паста",
  "горячее",
  "салаты",
  "десерты",
  "кофе",
  "чай",
  "фирменный чай",
  "напитки",
  "лимонады",
  "морсы",
  "милкшейки",
];

const isActive = ref(false);
onMounted(() => {
  const isShowModal = localStorage.getItem("notShow");

  if (isShowModal) {
    return;
  }

  const now = new Date();

  if (now.getHours() > 16) {
    return;
  }

  const savedDate = localStorage.getItem("modalBreakfast");
  if (!savedDate) {
    setTimeout(() => {
      openModal();
      localStorage.setItem("modalBreakfast", now.toISOString());
    }, 2000);
  } else {
    const parsedDate = new Date(savedDate);
    var timeDiff = Math.abs(now.getTime() - parsedDate.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    if (diffDays < 18000000) {
      setTimeout(() => {
        openModal();
        localStorage.setItem("modalBreakfast", now.toISOString());
      }, 0);
    }
  }
});

const openModal = () => {
  isActive.value = true;
};

const closeShow = () => {
  localStorage.setItem("notShow", "true");
  isActive.value = false;
};
</script>

<template>
  <div>
    <TemplatePage :seo="seo" :categories="categories" page="home" />
    <Modal v-model="isActive">
      <h2 class="uppercase flex flex-row justify-center">
        <p
          class="first-letter:text-5xl first-letter:font-bold second first-letter:float-left"
        >
          B
        </p>
        <p
          class="first-letter:text-5xl first-letter:font-bold second first-letter:float-left"
        >
          R
        </p>
        anch<br />
        eakfast
      </h2>
      <div class="overflow-hidden">
        <div class="my-4 flex flex-col gap-1">
          <p>
            Мы рады сообщить Вам, что теперь завтраки доступны с
            <data class="text-primary">10:00</data> до
            <data class="text-primary">16:00</data>.
          </p>
          <div>
            <p>
              Появилось шесть новых блюд, которые, мы уверены, покорят ваши
              вкусовые рецепторы.
            </p>
            <ul class="list-disc ml-4">
              <li>Салат c имбирным цыплёнка, киноа и томатами</li>
              <li>Зелёный салат киноа</li>
              <li>Куриный суп с лапшой</li>
              <li>Суп-гуляш</li>
              <li>Бефстроганов с картофелем пюре</li>
              <li>Котлеты пожарские с картофельным пюре</li>
            </ul>
          </div>
          <p>
            Не упустите свой шанс попробовать все эти блюда, ведь они доступны
            для вас каждый день с 10:00 до 16:00.
          </p>
        </div>
        <div class="flex justify-center gap-3">
          <button class="btn capitalize" @click="closeShow()">
            Не показывать
          </button>
          <NuxtLink
            to="/#BRANCH%20BREAKFAST"
            class="btn btn-primary capitalize"
            @click="isActive = false"
          >
            Смотреть
          </NuxtLink>
        </div>
      </div>
    </Modal>
  </div>
</template>
