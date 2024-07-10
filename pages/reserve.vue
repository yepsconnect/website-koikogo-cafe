<script setup lang="ts">
import moment from 'moment';
// composables
const { locale, t } = useI18n();
// state
const times = [
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '12:30',
  '13:00',
  '13:30',
  '14:00',
  '14:30',
  '15:00',
  '15:30',
  '16:00',
  '16:30',
  '17:00',
  '17:30',
  '18:00',
  '18:30',
  '19:00',
  '19:30',
  '20:00',
  '20:30',
  '21:00',
  '21:30',
  '22:00',
  '22:30',
  '23:00',
  '23:30',
]
const isOpen = ref(false);
const selectedHall = ref(null);
const modes = computed(() => [
  {
    label: t('label.list'),
    value: 'list'
  },
  {
    label: t('label.map'),
    value: 'map'
  },
])
// filters state
const selectedMode = ref('list')
const selectedDate = ref(moment().format('YYYY-MM-DD'));
const selectedCapacity = ref(0);
const selectedTable = ref<Table>();
const selectedFrom = ref();
const selectedTo = ref();

const start = (time?: string) => {
  let candidate
  if (!time) {
    candidate = times.find(x => x >= moment().format("HH:mm"))
  } else {
    candidate = times.find(x => x >= moment(time, "HH:mm").format("HH:mm"))
  }
  if (candidate) {
    selectedFrom.value = candidate
    if (candidate === times[times.length - 2]) {
      selectedTo.value = moment(candidate, "HH:mm").add(30, 'minutes').format("HH:mm");
    } else {
      selectedTo.value = moment(candidate, "HH:mm").add(60, 'minutes').format("HH:mm");
    }
  } else {
    selectedFrom.value = times[0]
    selectedTo.value = times[2]
  }
}
start()

const { data: dataHalls } = useFetch<{
  ok: boolean
  halls: Hall[]
}>(`/api/hall`)

const { data: dataB, refresh } = await useAsyncData<{
  ok: boolean
  bookings: Booking[]
}>(
  'bookings',
  () =>
    $fetch(`/api/bookings`, {
      query: {
        from: selectedDate.value,
        to: selectedDate.value,
      },
    }),
  {
    watch: [selectedDate],
  }
);
const { data } = useFetch<{
  ok: boolean
  tables: Table[]
}>(`/api/tables`)



// computed
const tables = computed(() => {
  if (!data.value || !data.value.tables.length) {
    return []
  }
  if (selectedMode.value === 'map') return data.value.tables

  return data.value.tables.filter(table =>
    table.capacity >= selectedCapacity.value && table.hall === selectedHall.value || selectedHall.value === null
  )
})
// methods
const openModal = (tableId: string) => {
  selectedTable.value = tables.value.find(x => x._id === tableId);
  isOpen.value = true;
}

const changeTime = () => {
  if (selectedDate.value < moment().format("YYYY-MM-DD")) {
    selectedDate.value = moment().format("YYYY-MM-DD");
  }
}

watch(selectedFrom, (val) => {
  if (val >= selectedTo.value) {
    start(val)
  }
})
</script>

<template>
  <div class="container mx-auto p-4">
    <div class="flex flex-col gap-6 relative">
      <h1 class="text-2xl font-bold">{{ $t('screen.reservation.title') }}</h1>
      <div class="flex flex-col md:flex-row gap-4">
        <div class="flex gap-4">
          <PickerTime v-model="selectedFrom" :times="times" :min="moment().format('HH:mm')" :date="selectedDate" />
          <PickerTime v-model="selectedTo" :times="times" :min="selectedFrom" />
        </div>
        <select v-model="selectedMode" class="select select-bordered">

          <option v-for="option in modes" :key="option.value" :value="option.value">
            {{ option.label }}
          </option>
        </select>
        <select v-model="selectedHall" class="select select-bordered">
          <option :value="null">{{ $t('label.allHalls') }}</option>
          <option v-for="hall in dataHalls?.halls" :key="hall._id" :value="hall._id">
            {{ hall.title[locale] || hall.title['ru'] }}
          </option>
        </select>
        <select v-model="selectedCapacity" class="select select-bordered">
          <option :value="0">{{ $t('label.capacity') }}</option>
          <option v-for="item in 10" :key="item" :value="item">{{ item }}</option>
        </select>
        <input v-model="selectedDate" type="date" class="input input-bordered md:flex-1" @change="changeTime">
      </div>

      <TableView v-if="selectedMode === 'map'" :selected-hall="selectedHall" :tables="tables"
        :bookings="dataB?.bookings || []" :date="selectedDate" :from="selectedFrom" :to="selectedTo"
        :capacity="selectedCapacity" @on-pick-desk="openModal" />
      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CardTable v-for="table in tables" :key="table._id" :table="table" :halls="dataHalls?.halls || []"
          :reservations="dataB?.bookings || []" :date="selectedDate" :from="selectedFrom" :to="selectedTo"
          @onSelect="openModal" />
      </div>
    </div>

    <ModalReservation v-model="isOpen" :table="selectedTable?._id ? selectedTable : null"
      :reservations="dataB?.bookings || []" :date="selectedDate" :from="selectedFrom" :to="selectedTo"
      :halls="dataHalls?.halls || []" :capacity="selectedCapacity" @on-booking="refresh()" />
  </div>
</template>
