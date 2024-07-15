<script setup lang="ts">
// state
const isChecked = ref(false)
const selectedPhoto = ref(1)

// auth change selected photo from 1 to 5
onMounted(() => {
  setInterval(() => {
    selectedPhoto.value = (selectedPhoto.value + 1) % 6 + 1
  }, 3000)
})


</script>

<template>
  <div>
    <Container class="py-12">
      <h1 class="text-3xl font-bold text-center max-w-lg mx-auto">{{ $t('screen.banquet.title') }}</h1>
    </Container>
    <Container class="py-8 flex flex-col gap-4 items-start">
      <!-- <h2 class="text-2xl font-bold">{{ $t('screen.banquet.title') }}</h2> -->
      <p class="text-lg">{{ $t('screen.banquet.text[0]') }}</p>
      <p class="text-lg">{{ $t('screen.banquet.text[1]') }}</p>
      <a href="#booking" class="btn btn-primary">{{ $t('screen.banquet.btnReserve') }}</a>
    </Container>
    <Container class="py-8 grid lg:grid-cols-2 gap-6">
      <div class="flex flex-col gap-4 items-start justify-center lg:order-2">
        <h2 class="text-2xl font-bold">{{ $t('screen.banquet.menu.title') }}</h2>
        <p class="text-lg">{{ $t('screen.banquet.menu.text') }}</p>
        <NuxtLink :to="{ name: 'banquet' }" class="btn btn-primary">{{ $t('screen.banquet.menu.btn') }}</NuxtLink>
      </div>
      <div>
        <img v-show="selectedPhoto === 1"
          src="https://avatars.mds.yandex.net/get-sprav-products/9495815/2a00000189452bc4f74e11671c77521a641b/M_height"
          alt="" class="object-cover w-full">
        <img v-show="selectedPhoto === 2"
          src="https://avatars.mds.yandex.net/get-sprav-products/9495815/2a00000189453a197992e919fd6d99e95388/M_height"
          alt="" class="object-cover w-full">
        <img v-show="selectedPhoto === 3"
          src="https://avatars.mds.yandex.net/get-sprav-products/5399152/2a0000018944d7153a383c556b0188f817a1/orig"
          alt="" class="object-cover w-full">
        <img v-show="selectedPhoto === 4"
          src="https://avatars.mds.yandex.net/get-sprav-products/9495815/2a000001895372003d0aa8d88f5074a63c08/M_height"
          alt="" class="object-cover w-full">
        <img v-show="selectedPhoto === 5"
          src="https://avatars.mds.yandex.net/get-sprav-products/9854027/2a00000189537d67c06b674750de764f0fe0/M_height"
          alt="" class="object-cover w-full">
      </div>
    </Container>
    <Container id="booking" class="py-8 flex flex-col  items-center">
      <h2 class="text-2xl font-bold mb-6">{{ $t('screen.banquet.booking.title') }}</h2>
      <div class="flex flex-col gap-4 max-w-96">
        <input type="text" class="input input-bordered" :placeholder="$t('label.name')" />
        <input type="text" inputmode="numeric" class="input input-bordered" :placeholder="$t('label.phone')" />
        <input type="date" class="input input-bordered" />
        <div class="grid lg:grid-cols-2 gap-2">
          <input type="time" class="input input-bordered" />
          <input type="time" class="input input-bordered" />
        </div>
        <input type="numeric" class="input input-bordered" placeholder="Количество гостей" />
        <textarea class="textarea textarea-bordered placeholder:text-base text-base"
          placeholder="Комментарий"></textarea>
        <button class="btn btn-primary" :disabled="!isChecked">{{ $t('label.reserve') }}</button>
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-2">
            <input v-model="isChecked" type="checkbox" class="checkbox" />
            <span class="label-text">Отправляя заявку на звонок банкетного менеджера, Вы принимаете <a
                href="/privacy-policy.pdf" target="_blank" rel="noopener noreferrer"
                class="link link-primary link-hover">политику
                конфиденциальности</a></span>
          </label>
        </div>
      </div>
    </Container>
  </div>
</template>