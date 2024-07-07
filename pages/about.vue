<script setup>
// composables
const { phone } = useConfig()
const { t } = useI18n()
// state
const active = ref(1);
const activeDish = ref(1);
const mapLink = "https://yandex.ru/map-widget/v1/?um=constructor%3A63ccde52ac73bdd72e9a96d3dfe386069f6869a31541ddf24841c7908d8bc31b&amp;source=constructor"

onMounted(() => {
  setInterval(() => {
    if (active.value === 8) {
      active.value = 0;
    }
    if (activeDish.value === 4) {
      activeDish.value = 0;
    }
    active.value++;
    activeDish.value++;
  }, 3000);
})
</script>

<template>
  <Container class="flex flex-col gap-10">
    <section class="h-screen w-full flex justify-center items-center">
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
    <section class="grid md:grid-cols-2 gap-6">
      <div class="flex flex-col justify-center gap-6">
        <h2 class="text-3xl">{{ t('screen.about.new.title') }}</h2>
        <p class="text-lg">{{ t('screen.about.new.info[0]') }}</p>
        <p class="text-lg">{{ t('screen.about.new.info[1]') }}</p>
        <p class="text-lg">{{ t('screen.about.new.info[2]') }}</p>
        <div class="grid grid-cols-2 gap-6">
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
        <div class="avatar w-full" v-if="activeDish === 1">
          <div class="w-full">
            <img src="@/assets/images/dish1.jpeg" alt="dish1" loading="lazy" class="object-cover" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activeDish === 2">
          <div class="w-full">
            <img src="@/assets/images/dish2.jpeg" alt="dish2" loading="lazy" class="object-cover" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activeDish === 3">
          <div class="w-full">
            <img src="@/assets/images/dish3.jpeg" alt="dish3" loading="lazy" class="object-cover" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activeDish === 4">
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
          <a class="btn btn-primary w-full md:max-w-xs" :href="`tel:${phone}`">{{ t('label.reserve')
            }}</a>
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
  </Container>
</template>
