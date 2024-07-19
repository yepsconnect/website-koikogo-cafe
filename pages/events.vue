<script setup lang="ts">
import moment from 'moment';
// composables
const { times, phone } = useConfig()
// state
const modalSuccess = ref(false)
const modalError = ref(false)
const errorMessage = ref("")
const isChecked = ref(false)
const selectedPhoto = ref(1)
const isLoading = ref(false)
const booking = reactive({
  name: "",
  phone: "",
  date: moment().add(1, 'day').format('YYYY-MM-DD'),
  quantity: null,
  specialRequests: null,
})
// mounted
onMounted(() => {
  setInterval(() => {
    selectedPhoto.value = (selectedPhoto.value + 1) % 6 + 1
  }, 3000)
})
// methods
const handleSubmit = async () => {
  isLoading.value = true

  if (booking.date <= moment().format('YYYY-MM-DD')) {
    errorMessage.value = "Некорректная дата бронирования"
    modalError.value = true
    isLoading.value = false
    return
  }

  try {
    const response = await $fetch<{
      ok: boolean,
      message: string
    }>('/api/booking', {
      method: 'POST',
      body: JSON.stringify({
        booking
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    if (!response.ok) {
      errorMessage.value = response.message
      modalError.value = true
      return
    }
    modalSuccess.value = true
    booking.name = ""
    booking.phone = ""
    booking.date = moment().add(1, 'day').format('YYYY-MM-DD')
    booking.quantity = null
    booking.specialRequests = null

  } catch (e) {
    errorMessage.value = `Произошла непредвиденная ошибка при бронировании. Пожалуйста, попробуйте снова или позвоните по номеру ${phone}`
    modalError.value = true
    return
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div>
    <Container class="py-12">
      <img src="@/assets/images/friends.jpg" alt="" class="w-full max-w-xl mx-auto">
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
        <input v-model="booking.name" type="text" class="input input-bordered" :placeholder="$t('label.name')" />
        <input v-model="booking.phone" type="text" inputmode="numeric" class="input input-bordered"
          :placeholder="$t('label.phone')" />
        <input v-model="booking.date" type="date" class="input input-bordered" />
        <input v-model="booking.quantity" type="numeric" class="input input-bordered"
          :placeholder="$t('label.guestCount')" />
        <textarea v-model="booking.specialRequests" class="textarea textarea-bordered placeholder:text-base text-base"
          :placeholder="$t('label.comment')"></textarea>
        <button class="btn btn-primary" :disabled="!isChecked" @click="handleSubmit">{{ $t('label.reserve') }}</button>
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-2">
            <input v-model="isChecked" type="checkbox" class="checkbox" />
            <span class="label-text">{{ $t('label.acceptCallManager') }} <a href="/privacy-policy.pdf" target="_blank"
                rel="noopener noreferrer" class="link link-primary link-hover">{{ $t('label.politics')
                }}</a></span>
          </label>
        </div>
      </div>
    </Container>
    <Modal v-model="modalSuccess">
      <h2 class="text-xl font-bold text-center mb-4">{{ $t('modal.desertOrder.successTitle') }}</h2>
      <p class="text-lg text-center">{{ $t('modal.desertOrder.successDetails') }}</p>
      <button class="btn btn-primary w-full mt-4" @click="modalSuccess = false">{{ $t('label.close') }}</button>
    </Modal>
    <Modal v-model="modalError">
      <h2 class="text-xl font-bold text-center mb-4">{{ $t('modal.desertOrder.errorTitle') }}</h2>
      <p class="text-lg text-center">{{ errorMessage }}</p>
      <button class="btn btn-primary w-full mt-4" @click="modalError = false, errorMessage = ''">{{ $t('label.close')
        }}</button>
    </Modal>
  </div>
</template>