<script setup>
import moment from 'moment';

// composables
const { phone } = useConfig()
const { t } = useI18n()
// state
const loading = ref(false)
const isChecked = ref(false)
const modalDesert = ref(false)
const active = ref(1);
const activePosition = ref(1);
const mapLink = "https://yandex.ru/map-widget/v1/?um=constructor%3A63ccde52ac73bdd72e9a96d3dfe386069f6869a31541ddf24841c7908d8bc31b&amp;source=constructor"
const order = reactive({
  name: null,
  phone: null,
  date: moment().add(2, 'day').format("YYYY-MM-DD"),
  time: null,
  deliveryType: null,
  pickupAddress: null,
  city: null,
  street: null,
  house: null,
  flat: null,
  apartment: null,
})
onMounted(() => {
  setInterval(() => {
    if (active.value === 8) {
      active.value = 0;
    }
    if (activePosition.value === 4) {
      activePosition.value = 0;
    }
    active.value++;
    activePosition.value++;
  }, 3000);
})
const handleSubmit = async () => {
  if (order.deliveryType === 'delivery') {
    if (!order.city || !order.street || !order.house || !order.flat || !order.apartment) {
      return alert("Необходимо заполнить все поля")
    }
    order.pickupAddress = null
  }
  if (order.deliveryType === 'pickup') {
    if (!order.pickupAddress) {
      return alert("Выберите адрес для самовывоза")
    }
    order.city = null
    order.street = null
    order.house = null
    order.flat = null
    order.apartment = null
  }
  loading.value = true;
  try {
    const response = await $fetch("/api/bakery", {
      method: "POST",
      body: JSON.stringify({
        bakery: order
      }),
    })
    if (!response.ok) {
      return alert(response.message)
    }
    alert("Заказ успешно оформлен!")
    modalDesert.value = false;
    order.name = null
    order.phone = null
    order.date = moment().add(2, 'day').format("YYYY-MM-DD")
    order.time = "10:00"
    order.deliveryType = null
    order.pickupAddress = null
    order.city = null
    order.street = null
    order.house = null
    order.flat = null
    order.apartment = null
    isChecked.value = false
  } catch (error) {
    alert("Произошла ошибка при оформлении заказа")
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <Container class="flex flex-col gap-14">
    <section class="w-full flex justify-center items-center py-12 lg:py-48">
      <div class="flex flex-col md:flex-row items-center md:items-end">
        <Logo class="max-w-64" animated />
        <div>
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">{{ t('name[0]') }}</span>
            <br />
            {{ t('name[1]') }}
            <br />
            {{ t('name[2]') }}
          </h1>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-6">
      <h2 class="text-3xl font-bold">
        {{ t('screen.about.subtitle[0]') }} <br />{{ t('screen.about.subtitle[1]') }}
      </h2>
      <div class="max-h-96 overflow-hidden">
        <img src="@/assets/images/place0.jpg" alt="place0" loading="lazy" class="object-cover" />
      </div>
      <p class="text-lg">{{ t('screen.about.description') }}</p>
    </section>
    <section class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold">{{ t('screen.about.question.title') }}</h2>

      <div>
        <p>{{ t('screen.about.question.info[0]') }}:</p>
        <ul>
          <li>— {{ t('screen.about.question.talk[0]') }}</li>
          <li>— {{ t('screen.about.question.talk[1]') }}</li>
          <li>— {{ t('screen.about.question.talk[2]') }}</li>
          <li>— {{ t('screen.about.question.talk[3]') }}</li>
          <li>— {{ t('screen.about.question.talk[4]') }}</li>
        </ul>
      </div>
      <p>{{ t('screen.about.question.info[1]') }}:</p>
      <p>{{ t('screen.about.question.info[2]') }}:</p>

      <div class="flex flex-col md:flex-row justify-center gap-6">
        <a class="btn btn-primary w-full md:max-w-xs" :href="`tel:${phone}`">
          {{ $t('label.call') }}
        </a>
      </div>
    </section>
    <section class="grid lg:grid-cols-2 gap-6">
      <div class="flex flex-col justify-center gap-6">
        <h2 class="text-3xl">{{ t('screen.about.new.title') }}</h2>
        <p class="text-lg">{{ t('screen.about.new.info[0]') }}</p>
        <p class="text-lg">{{ t('screen.about.new.info[1]') }}</p>
        <p class="text-lg">{{ t('screen.about.new.info[2]') }}</p>
        <div class="grid lg:grid-cols-2 gap-6">
          <NuxtLink to="/" class="btn btn-primary md:w-auto btn-block">
            {{ $t('label.kitchen') }}
          </NuxtLink>
          <NuxtLink to="/bar" class="btn btn-primary md:w-auto btn-block">
            {{ $t('label.bar') }}
          </NuxtLink>
        </div>
      </div>
      <div class="columns-2 hidden md:block">
        <div class="h-6"></div>
        <div class="avatar w-full mb-4">
          <div class="w-full">
            <img src="@/assets/images/dish2.jpeg" alt="dish2" loading="lazy" />
          </div>
        </div>
        <img src="@/assets/images/dish1.jpeg" alt="dish1" loading="lazy" />
        <img src="@/assets/images/dish4.jpeg" alt="dish4" loading="lazy" class="mb-4" />
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/dish3.jpeg" alt="dish3" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="md:hidden">
        <div class="avatar w-full" v-if="activePosition === 1">
          <div class="w-full">
            <img src="@/assets/images/dish1.jpeg" alt="dish1" loading="lazy" class="object-cover" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activePosition === 2">
          <div class="w-full">
            <img src="@/assets/images/dish2.jpeg" alt="dish2" loading="lazy" class="object-cover" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activePosition === 3">
          <div class="w-full">
            <img src="@/assets/images/dish3.jpeg" alt="dish3" loading="lazy" class="object-cover" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activePosition === 4">
          <div class="w-full">
            <img src="@/assets/images/dish4.jpeg" alt="dish4" loading="lazy" class="object-cover" />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="grid lg:grid-cols-2 gap-6">
        <div class="lg:order-2 flex flex-col justify-center gap-6">
          <h2 class="text-3xl">{{ t('screen.about.comfort.title') }}</h2>
          <p class="text-lg">{{ t('screen.about.comfort.info[0]') }}</p>
          <p class="text-lg">{{ t('screen.about.comfort.info[1]') }}</p>
          <p class="text-lg">{{ t('screen.about.comfort.info[2]') }}</p>
          <a class="btn btn-primary w-full md:max-w-xs" :href="`tel:${phone}`">
            {{ t('label.reserve') }}
          </a>
        </div>
        <div class="lg:order-1 columns-2">
          <div class="avatar w-full mb-4">
            <div class="w-full">
              <img src="@/assets/images/place1.jpeg" alt="1" loading="lazy" />
            </div>
          </div>

          <img src="@/assets/images/place3.jpeg" alt="3" loading="lazy" class="mb-4" />
          <img src="@/assets/images/place4.jpeg" alt="4" loading="lazy" class="mb-4" />
          <div class="avatar w-full">
            <div class="w-full">
              <img src="@/assets/images/place5.jpeg" alt="5" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="grid lg:grid-cols-2 gap-6">
      <div class="flex flex-col gap-6">
        <h2 class="text-3xl font-bold">{{ t('screen.about.find.title') }}</h2>
        <p class="text-lg">{{ t('screen.about.find.info[0]') }}</p>
        <p class="text-lg">{{ t('screen.about.find.info[1]') }}</p>
        <p class="text-lg">{{ t('screen.about.find.info[2]') }}</p>
        <div class="flex">
          <a class="btn btn-primary w-full md:max-w-xs" :href="`tel:${phone}`">{{ t('label.call') }}</a>
        </div>
      </div>
      <iframe :src="mapLink" width="100%" height="400" frameborder="0"></iframe>
    </section>
    <section class="grid lg:grid-cols-2 gap-4">
      <img src="@/assets/images/events.jpeg" alt="events" class="lg:max-w-md object-cover aspect-square mx-auto">
      <div class="flex flex-col gap-4 justify-center">
        <h2 class="text-3xl font-bold">{{ t('screen.banquet.title') }}</h2>
        <p class="text-lg">{{ t('screen.banquet.text[0]') }}</p>
        <div class="flex flex-col sm:flex-row gap-2">
          <NuxtLink :to="{ name: 'events', hash: '#booking' }" class="btn btn-primary">
            {{ t('screen.banquet.btnReserve') }}
          </NuxtLink>
          <NuxtLink :to="{ name: 'banquet' }" class="btn btn-primary">
            {{ t('screen.banquet.menuTitle') }}
          </NuxtLink>
        </div>
      </div>
    </section>
    <section class="grid lg:grid-cols-2 gap-4">
      <div class="flex flex-col items-start justify-center gap-4">
        <h2 class="text-3xl font-bold">{{ t('screen.desert.title') }}</h2>
        <p class="text-lg">{{ t('screen.desert.details') }}</p>
        <div class="flex flex-col sm:flex-row gap-2">
          <button class="btn btn-primary" @click="modalDesert = true">
            {{ t('screen.desert.btnOrder') }}
          </button>
        </div>
      </div>
      <img src="@/assets/images/cake.webp" alt="cake" class="lg:max-w-md object-cover mx-auto">
    </section>
    <section class="flex flex-col gap-6">
      <h2 class="text-3xl font-bold">{{ t('screen.about.gallery.title') }}</h2>
      <p class="text-lg">{{ t('screen.about.gallery.info[0]') }}</p>

      <div class="md:hidden">
        <div class="avatar w-full" v-if="active === 1">
          <div class="w-full">
            <img src="@/assets/images/people1.jpeg" alt="1" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 2">
          <div class="w-full">
            <img src="@/assets/images/people2.jpeg" alt="2" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 3">
          <div class="w-full">
            <img src="@/assets/images/people3.jpeg" alt="3" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 4">
          <div class="w-full">
            <img src="@/assets/images/people4.jpeg" alt="4" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 5">
          <div class="w-full">
            <img src="@/assets/images/people5.jpeg" alt="5" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 6">
          <div class="w-full">
            <img src="@/assets/images/people6.jpeg" alt="6" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 7">
          <div class="w-full">
            <img src="@/assets/images/people7.jpeg" alt="7" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 8">
          <div class="w-full">
            <img src="@/assets/images/people8.jpeg" alt="8" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="hidden md:grid md:grid-cols-4 gap-6">
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people1.jpeg" alt="1" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people2.jpeg" alt="2" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people3.jpeg" alt="3" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people4.jpeg" alt="4" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people5.jpeg" alt="5" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people6.jpeg" alt="6" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people7.jpeg" alt="7" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people8.jpeg" alt="8" loading="lazy" />
          </div>
        </div>
      </div>
      <p class="text-lg">{{ t('screen.about.gallery.info[1]') }}</p>
      <p class="text-lg">{{ t('screen.about.gallery.info[2]') }}</p>
      <a class="btn btn-primary capitalize md:max-w-xs"
        href="https://yandex.ru/maps/org/imeni_koykogo/66827419380/?ll=53.197919%2C56.846779&z=16" target="_blank">
        {{ t('label.talk') }}
      </a>
    </section>
    <Modal v-model="modalDesert">
      <h2 class="text-xl font-semibold text-center mb-4">{{ $t('modal.desertOrder.title') }}</h2>
      <div class="flex flex-col gap-2 w-full">
        <input v-model="order.name" type="text" class="input input-bordered" :placeholder="$t('label.name')">
        <input v-model="order.phone" type="text" class="input input-bordered" :placeholder="$t('label.phone')">
        <div class="grid grid-cols-2 gap-2">
          <input v-model="order.date" type="date" class="input input-bordered flex-1">
          <input v-model="order.time" type="time" class="input input-bordered flex-1">
        </div>
        <select v-model="order.deliveryType" class="select select-bordered" @change="">
          <option :value="null">{{ $t('label.deliveryType') }}</option>
          <option value="pickup">{{ $t('label.pickup') }}</option>
          <option value="delivery">{{ $t('label.delivery') }}</option>
        </select>
        <template v-if="order.deliveryType === 'pickup'">
          <select v-model="order.pickupAddress" class="select select-bordered">
            <option :value="null">{{ $t('label.pickupAddress') }}</option>
            <option value="Удмуртская, 268">Удмуртская, 268</option>
            <option value="Милиционная, 4">Милиционная, 4</option>
          </select>
          <iframe
            src="https://yandex.ru/map-widget/v1/?um=constructor%3Ac7c94380bee70b9f720bd64e999a2c799df5275b8b93785bbe1425f250f7736d&amp;source=constructor"
            width="100%" height="270" frameborder="0"></iframe>
        </template>
        <template v-else-if="order.deliveryType === 'delivery'">
          <input v-model="order.city" type="text" class="input input-bordered" :placeholder="$t('label.city')">
          <input v-model="order.street" type="text" class="input input-bordered" :placeholder="$t('label.street')">
          <div class="grid grid-cols-3 gap-2">
            <input v-model="order.house" type="text" class="input input-bordered" :placeholder="$t('label.house')">
            <input v-model="order.flat" type="text" class="input input-bordered" :placeholder="$t('label.flat')">
            <input v-model="order.apartment" type="text" class="input input-bordered"
              :placeholder="$t('label.apartment')">
          </div>
        </template>
        <button class="btn btn-primary"
          :disabled="loading || !isChecked || !order.name || !order.phone || !order.date || !order.time || !order.deliveryType"
          @click="handleSubmit">
          {{ $t('label.order') }}
        </button>
        <label class="label cursor-pointer justify-start gap-2">
          <input v-model="isChecked" type="checkbox" class="checkbox" />
          <span class="label-text">{{ $t('label.agreeWith') }}
            <a href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer"
              class="link link-primary link-hover">
              {{ $t('label.politics') }}
            </a>
          </span>
        </label>
        <!-- <div class="text-xs text-gray-400 mx-auto">
          <li>{{ $t('modal.desertOrder.details[0]') }}</li>
          <li>{{ $t('modal.desertOrder.details[1]') }}</li>
          <li>{{ $t('modal.desertOrder.details[2]') }}</li>
          <li>{{ $t('modal.desertOrder.details[3]') }}</li>
        </div> -->
      </div>
    </Modal>
  </Container>
</template>
