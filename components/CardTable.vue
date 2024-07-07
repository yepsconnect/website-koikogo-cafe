<script setup lang="ts">
import moment from 'moment';
import { getTimeDifference } from "../services/timeService"

defineEmits(["onSelect"])
const props = defineProps<{
  table: Table
  reservations: Reservation[]
  halls: Hall[]
  from: string
  to: string
  date: string
}>()

const { locale } = useI18n()

const bookings = computed(() => {
  const fromMoment = moment(props.from, 'HH:mm');
  const toMoment = moment(props.to, 'HH:mm');

  return props.reservations
    .filter(r => r.tableId === props.table._id
      && r.date === props.date
      && r.status !== 'cancelled'
      && fromMoment.isBefore(moment(r.to, 'HH:mm'))
      && toMoment.isAfter(moment(r.from, 'HH:mm'))
    )
    .sort((a, b) => a.from.localeCompare(b.from));
});
const booking = computed(() => bookings.value[0])
</script>

<template>
  <div class="border p-4 rounded-lg hover:bg-gray-200 cursor-pointer" @click="$emit('onSelect', table)">
    <div class="flex justify-between items-start gap-2">
      <div>
        <p class="font-bold">{{ table.name[locale] || table.name['ru'] }}</p>
        <p class="text-gray-500 text">{{ halls.find(x => x._id === table.hall)?.title[locale || 'ru'] }}</p>
      </div>
      <div class="flex items-center gap-1">
        <p>{{ table.capacity }}</p>
        <IconUserGroup class="w-6" />
      </div>
    </div>
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
</template>