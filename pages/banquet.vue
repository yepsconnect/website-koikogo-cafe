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

const { t } = useI18n();
const isCard = ref(true);
const isModalInfo = ref(false);
const selectedPosition = ref();
const config = useRuntimeConfig();

const { isLoading: loadingCategories, data: categories } = useQuery<Category[]>(
  {
    queryKey: [`categories`],
    queryFn: () =>
      $fetch(`${config.public.API_URL}/category`, {
        headers: {
          "x-api-key": config.public.X_API_KEY,
        },
      }),
  }
);

const { isLoading: loadingProducts, data: products } = useQuery<Product[]>({
  queryKey: [`products`],
  queryFn: () =>
    $fetch(`${config.public.API_URL}/product`, {
      headers: {
        "x-api-key": config.public.X_API_KEY,
      },
    }),
});

// methods
const openModalInfo = (product: Product) => {
  isModalInfo.value = true;
  selectedPosition.value = product;
};
</script>

<template>
  <div>
    <div class="w-full flex justify-center items-center py-12 lg:py-48">
      <div class="flex flex-col md:flex-row items-center md:items-end">
        <LogoChef class="max-w-80" />
        <div>
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">{{ t("name[0]") }}</span>
            <br />
            {{ t("name[1]") }}
            <br />
            {{ t("name[2]") }}
          </h1>
          <br />
          <p class="text-xl uppercase">
            {{ $t("screen.banquet.menu.title") }}
          </p>
        </div>
      </div>
    </div>
    <div class="py-3 sticky top-0 bg-white z-10 shadow-md mb-4">
      <Container>
        <Toggle
          v-model="isCard"
          :label="isCard ? 'Показать списком' : 'Показать карточками'"
        />
      </Container>
    </div>
    <Container>
      <!-- <CategoryMenu
        v-if="categories"
        :categories="categories"
        :active-category="activeCategory"
        @on-submit="(val) => (activeCategory = val)"
      /> -->

      <div
        v-for="category in categories"
        :key="category._id"
        class="relative mb-12"
      >
        <span :id="category.slug" class="absolute -top-16"></span>
        <h2 class="text-2xl font-bold uppercase mb-4">
          {{ category.name }}
        </h2>
        <template v-if="products">
          <div
            v-if="isCard"
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          >
            <ProductCard
              v-for="product in products.filter(
                (x) => x.category === category._id
              )"
              :key="product._id"
              :product="product"
              @on-submit="openModalInfo"
            />
          </div>
          <div v-else class="flex flex-col gap-1">
            <ProductRow
              v-for="product in products.filter(
                (x) => x.category === category._id
              )"
              :key="product._id"
              :product="product"
              @on-submit="openModalInfo"
            />
          </div>
        </template>
      </div>
    </Container>
    <ModalInfo v-model="isModalInfo" :product="selectedPosition" />
  </div>
</template>
