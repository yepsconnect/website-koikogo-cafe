<script setup lang="ts">
import moment from "moment"
import { getTimeDifference } from "../services/timeService"
import { formatPhoneNumber } from "../services/phoneService"

const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<{
  modelValue: boolean;
  table: Table
  from: string
  to: string
  date: string
  reservations: Booking[]
  halls: Hall[]
  capacity: number
}>();
// composables
const { phone } = useConfig()
const { locale } = useI18n()
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
const bookings = computed(() => {
  if (!props.reservations || !props.table?._id) return []
  const fromMoment = moment(props.from, 'HH:mm');
  const toMoment = moment(props.to, 'HH:mm');
  return props.reservations
    .filter(r => r.tableId === props.table?._id
      && r.date === props.date
      && r.status !== 'cancelled'
      && fromMoment.isBefore(moment(r.to, 'HH:mm'))
      && toMoment.isAfter(moment(r.from, 'HH:mm'))
    )
    .sort((a, b) => a.from.localeCompare(b.from));
});
const booking = computed(() => bookings.value[0])
// state
const isCheck = ref(false)
const reservation = ref<BookingNew>({
  tableId: "",
  date: "",
  from: "",
  to: "",
  name: "",
  phone: "",
  status: "pending",
})
// methods 
const isLoading = ref(false)
const handleSubmit = async () => {
  return
  isLoading.value = true
  try {
    reservation.value.tableId = props.table?._id
    reservation.value.date = props.date
    reservation.value.from = props.from
    reservation.value.to = props.to

    const response = await $fetch<{
      ok: boolean
      reservation: Booking
      message: string
    }>('/api/reservation', {
      method: 'POST',
      body: JSON.stringify({ reservation: reservation.value }),
    })
    alert(response.message)

  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <Modal v-model="isOpen">
    <div class="flex flex-col gap-4">
      <div class="flex justify-between items-start gap-2">
        <div>
          <h2 class="text-xl font-bold">{{ table?.name[table?.name[locale] ? locale : 'ru'] }}</h2>
          <p class="text-gray-500 text">{{ halls.find(x => x._id === table?.hall)?.title[locale || 'ru'] }}</p>
          <p v-if="!bookings.length || booking.status === 'cancelled'" class="text-green-500">{{
            $t('label.free') }}
          </p>
          <p v-else-if="to > booking.from" class="text-red-500">
            Столик занят с {{ booking.from }} до {{ booking.to }}
          </p>
          <p v-else-if="booking.from > from" class="text-yellow-500">
            Будет свободен ещё {{ getTimeDifference(booking.date, booking.from, date, from) }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <p>{{ table?.capacity }}</p>
          <IconUserGroup class="w-6" />
        </div>
      </div>
      <p v-if="capacity && capacity > table.capacity" class="text-lg text-center">
        {{ $t('modal.reservation.capacity') }}
      </p>
      <template v-if="true">
        <!-- TODO: delete this section -->
      </template>
      <template v-else-if="!bookings.length">
        <label class="input input-bordered flex items-center gap-2">
          <IconUser class="w-3" />
          <input v-model="reservation.name" type="text" class="grow" :placeholder="$t('label.name')" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <IconPhone class="w-3" />
          <input v-model="reservation.phone" type="text" class="grow" :placeholder="$t('label.phone')" />
        </label>
        <label class="label cursor-pointer">
          <input v-model="isCheck" type="checkbox" class="checkbox checkbox-primary mr-2" />
          <span class="label-text text-sm text-gray-400">{{ $t('modal.reservation.confirmation') }}</span>
        </label>
        <button class="btn btn-neutral" :disabled="!isCheck || !reservation.name || !reservation.phone"
          @click="handleSubmit">
          {{ $t('label.reserve') }}
        </button>
        <div class="divider my-0 py-0">{{ $t('label.or') }}</div>
      </template>
      <template v-else>
        <p class="text-lg text-center">
          {{ $t('modal.reservation.error') }}
        </p>
      </template>
      <a :href="`tel:${phone}`" class="btn btn-neutral">
        <IconPhone class="w-3 fill-white" />
        {{ $t('label.call') }}
      </a>
      <p class="text-sm text-gray-400 text-center max-w-64 mx-auto">
        {{ $t('modal.reservation.info') }}
        <a :href="`tel:${phone}`" class="link link-hover link-primary">{{ formatPhoneNumber(phone) }}</a>
      </p>
    </div>

  </Modal>
</template>