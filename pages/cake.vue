<script setup lang="ts">
useSeoMeta({
  title: "Торты",
  description:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogTitle: "Торты",
  ogDescription:
    "Мы рады приветствовать вас в кафе в историческом центре города - на всеми известной улице в кой-каком парке.",
  ogImage: "https://koikogo.cafe/logo.png",
  ogUrl: "https://koikogo.cafe/",
  twitterTitle: "Торты",
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

// composabeles
const { cakes } = useCakes()
const { t } = useI18n()
const selectedCake = ref<CakeOrder | null>(null)


// state
const order = ref<CakeOrder[]>([])
const visible = ref(false)

// computed
const cakesBento = computed(() => cakes.filter(x => x.type === 'bento'))
const cakesTraditional = computed(() => cakes.filter(x => x.type === 'traditional'))
const cakesWedding = computed(() => cakes.filter(x => x.type === 'wedding'))
const cupcakes = computed(() => cakes.filter(x => x.type === 'cupcake'))

// methods
const addToOrder = (cake: CakeOrder) => {
  selectedCake.value = cake
  visible.value = true
}
</script>

<template>
  <Container class="flex flex-col gap-14">
    <section class="w-full flex flex-col gap-12 justify-center items-center py-12 lg:py-48">
      <div class="flex flex-col md:flex-row items-center md:items-end">
        <LogoCake class="" animated />
        <div>
          <h1 class="text-4xl font-bold uppercase w-32">
            {{ t('screen.cake.title') }}
          </h1>
        </div>
      </div>
      <div class="flex flex-col sm:flex-row gap-2">
        <button class="btn btn-primary">
          {{ t('screen.cake.btnOrder') }}
        </button>
        <button class="btn btn-primary">
          {{ t('screen.cake.btnQuestion') }}
        </button>
      </div>
    </section>
    <section>
      <p class="text-lg text-center">{{ t('screen.cake.promo') }}</p>
    </section>
    <section class="grid md:grid-cols-5 gap-4">
      <a href="#bento"
        class="rounded-lg aspect-[3/1] md:aspect-[1/2] flex justify-center items-center p-8 bg-[url('@/assets/images/cake/bento.webp')] bg-cover group relative">
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#C30B52] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
        <p class="text-lg text-center group-hover:text-white z-10">Бенто торты</p>
      </a>
      <a href="#traditional"
        class="bg-gray-200 rounded-lg aspect-[3/1] md:aspect-[1/2] hover:bg-gray-300 flex justify-center items-center p-8">
        <p class="text-lg text-center">Традиционные торты на заказ </p>
      </a>
      <a href="#wedding"
        class="rounded-lg aspect-[3/1] md:aspect-[1/2] flex justify-center items-center p-8 bg-[url('@/assets/images/cake/weeding.webp')] bg-cover group relative">
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#C30B52] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
        <p class="text-lg text-center group-hover:text-white z-10">Свадебные торты от одного яруса и выше</p>
      </a>
      <a href="#events"
        class="bg-gray-200 rounded-lg aspect-[3/1] md:aspect-[1/2] hover:bg-gray-300 flex justify-center items-center p-8">
        <p class="text-lg text-center">Корпоративные и праздничные торты</p>
      </a>

      <a href="#cupcake"
        class="rounded-lg aspect-[3/1] md:aspect-[1/2] flex justify-center items-center p-8 bg-[url('@/assets/images/cake/cupcake.webp')] bg-cover group relative">
        <div
          class="absolute inset-0 bg-gradient-to-b from-transparent to-[#C30B52] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
        <p class="text-lg text-center group-hover:text-white z-10">Капкейки и другие десерты</p>
      </a>
    </section>
    <SectionCake id="bento" title="Бенто торты" :cakes="cakesBento" :order="order" @onAdd="addToOrder" />
    <SectionCake id="traditional" title="Традиционные торты на заказ" :cakes="cakesTraditional" :order="order"
      @onAdd="addToOrder" />
    <SectionCake id="wedding" title="Свадебные торты от одного яруса и выше" :cakes="cakesWedding" :order="order"
      @onAdd="addToOrder" />
    <section id="events">
      <h2 class="text-xl font-bold">Корпоративные и праздничные торты</h2>
      <p>Пусто</p>
    </section>
    <SectionCake id="cupcake" title="Капкейки и другие десерты" :cakes="cupcakes" :order="order" @onAdd="addToOrder" />
    <section>
      <div class="flex flex-col gap-3 max-w-md">
        <h2 class="text-xl font-bold">Заказ</h2>
        <div>
          <div v-for="(item, index) in order" :key="index">
            <div class="flex gap-2">
              <p>{{ item.title }}</p>
              <p>{{ item.weight }}{{ item.unit }}</p>
              <p>{{ item.price }}₽</p>
            </div>
            <p v-if="item.comment"><strong>Комментарий: </strong>{{ item.comment }}</p>
          </div>
        </div>
        <input type="text" class="input input-bordered" placeholder="Имя">
        <input type="text" class="input input-bordered" placeholder="Номер телефона">
        <input type="date" class="input input-bordered" />
        <input type="time" class="input input-bordered" />
        <textarea class="textarea textarea-bordered"
          placeholder="Здесь вы можете указать ваши пожелания по дизайну торта или задать вопрос, и мы сориентируем вас по стоимости и подберем идеальный вариант декора."
          rows="6"></textarea>
        <button class="btn btn-primary">Заказать</button>
        <label class="label cursor-pointer justify-start gap-2">
          <input type="checkbox" class="checkbox" />
          <span class="label-text">{{ $t('label.acceptCallManager') }} <a href="/privacy-policy.pdf" target="_blank"
              rel="noopener noreferrer" class="link link-primary link-hover">{{ $t('label.politics')
              }}</a></span>
        </label>
      </div>
      <div class=" max-w-md mt-3">
        <p class="text-gray-500 text-sm">Уважаемые гости! Несколько нюансов, которые стоит учесть при оформлении заказа:
        </p>
        <ul class="list-disc ml-4 text-gray-500 text-sm">
          <li>заказы на торты принимаются минимум за 48 часов;</li>
          <li>при выполнении Вашего заказа возможна погрешность в весе 100-200 гр., в случае разницы, данная сумма
            оплачивается по готовности торта;</li>
          <li>если вы желаете дополнить торт декором, пожалуйста укажите это в комментариях</li>
        </ul>
      </div>
    </section>
    <Modal v-model="visible">
      <div v-if="selectedCake" class="flex flex-col gap-3">
        <h2 class="text-xl font-bold">Заказ торта {{ selectedCake?.title }}</h2>
        <p>{{ selectedCake?.description || 'Нет описания' }}</p>
        <div class="flex justify-between gap-2">
          <p><strong>Размер:</strong> {{ selectedCake.weight }}</p>
          <p><strong>Цена:</strong> {{ selectedCake.price }}₽</p>
        </div>
        <p v-if="selectedCake?.filling"><strong>Начинка:</strong> {{ selectedCake?.filling }}</p>
        <textarea v-if="selectedCake" v-model="selectedCake.comment" class="textarea textarea-bordered"
          placeholder="Здесь вы можете указать ваши пожелания по дизайну торта или задать вопрос, и мы сориентируем вас по стоимости и подберем идеальный вариант декора."
          rows="4"></textarea>
        <button class=" btn btn-primary" @click="visible = false, order.push(selectedCake), selectedCake = null">
          Добавить в заказ
        </button>
        <button class="btn btn-outline" @click="visible = false, selectedCake = null">
          Отменить
        </button>
      </div>
    </Modal>
  </Container>
</template>
