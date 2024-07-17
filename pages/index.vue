<script setup lang="ts">
import moment from 'moment';

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { t, locale } = useI18n();
const { token } = useAuth()
// state
const selectedTab = ref("pending")
// filter
const selectedPage = ref(1);
const itemsPerPage = ref(6);
const selectedFrom = ref(moment().format('YYYY-MM-DD'));
const selectedTo = ref(null);
// computed 
const tabs = computed(() => [
  {
    label: t('label.pending'),
    value: 'pending',
  },
  {
    label: t('label.confirmed'),
    value: 'confirmed',
  },
  {
    label: t('label.cancelled'),
    value: 'cancelled',
  },
]);
const { data, pending, refresh } = await useAsyncData<{
  ok: boolean;
  reservations: Booking[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
}>(
  "reservation",
  () =>
    $fetch("/api/booking", {
      query: {
        from: selectedFrom.value,
        to: selectedTo.value,
        page: selectedPage.value,
        limit: itemsPerPage.value,
        status: selectedTab.value,
      },
    }),
  {
    watch: [selectedFrom, selectedTo, selectedPage, itemsPerPage, selectedTab],
  }
);
const { data: dataTables } = useFetch<{
  ok: boolean
  tables: Table[]
}>(`/api/tables`)

const reservations = computed(() => {
  // Копируем массив, чтобы избежать мутации исходных данных
  const filteredReservations = [...data.value.reservations];

  // Фильтруем и сортируем по полю date с использованием Moment.js
  return filteredReservations
    .filter(x => x.status === selectedTab.value)
    .sort((a, b) => moment(a.date).diff(moment(b.date)));
});
//methods
const handleSubmit = async (reservation: Booking, status: string) => {
  try {
    const data = await $fetch<{
      ok: boolean
      reservation: Booking
      message: string
    }>(`/api/booking/${reservation._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value!
      },
      body: JSON.stringify({ status })
    })
    if (!data.ok) {
      alert(data.message)
    }
    refresh()
  } catch (error) {
    alert(error)
  }
}

function goToNextPage() {
  if (selectedPage.value < data.value.totalPages) {
    selectedPage.value += 1;
  }
}

function goToPreviousPage() {
  if (selectedPage.value > 1) {
    selectedPage.value -= 1;
  }
}

function setItemsPerPage(newLimit) {
  itemsPerPage.value = newLimit;
  selectedPage.value = 1;
}
</script>

<template>
  <div class="p-3 flex flex-col gap-4">
    <Header :title="$t('screen.reservation.title')">
      <div class="flex justify-end">
        <NuxtLink :to="{ name: 'reserve-add' }" class="btn btn-sm btn-square">
          <IconPlus class="w-3" />
        </NuxtLink>
      </div>
    </Header>
    <div class="grid md:grid-cols-2 gap-4">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">{{ $t('label.from') }}</span>
        </div>
        <input v-model="selectedFrom" type="date" class="input input-bordered">
      </label>
      <label class="form-control w-full">
        <div class=" label">
          <span class="label-text">{{ $t('label.to') }}</span>
        </div>
        <input v-model="selectedTo" type="date" class="input input-bordered">
      </label>


    </div>
    <div role="tablist" class="tabs tabs-boxed">
      <a v-for="tab in tabs" :key="tab.value" role="tab" class="tab" :class="{
        'tab-active': selectedTab === tab.value,
      }" @click="selectedTab = tab.value, selectedPage = 1">
        {{ tab.label }}
      </a>
    </div>
    <div v-if="reservations.length" class="flex flex-col gap-2">
      <div v-for="reservation in reservations" :key="reservation._id" class="p-2 border rounded flex flex-col gap-3">
        <div class="flex justify-between gap-3">
          <div>
            <p class="text-lg">{{ reservation.name }}</p>
            <p>{{ $t('label.phone') }}: {{ reservation.phone }}</p>
            <p>{{ reservation.specialRequests }}</p>
          </div>
          <div class="text-right">
            <p class="text-lg">{{ moment(reservation.date).format('DD.MM') }}</p>
            <p>{{ reservation.from }} - {{ reservation.to }}</p>
          </div>
        </div>
        <div class="flex flex-col md:flex-row justify-between gap-3">
          <a :href="`tel:+${reservation.phone}`" class="btn">
            <IconPhone class="w-4" />
            {{ $t('label.call') }}
          </a>
          <div class="flex flex-col sm:flex-row gap-2">
            <button v-if="selectedTab === 'pending'" class="btn btn-outline flex-1 md:flex-auto btn-success"
              @click="handleSubmit(reservation, 'confirmed')">
              <IconCheck class="w-5 fill-success" />
              {{ $t('label.confirm') }}
            </button>
            <button v-if="selectedTab === 'pending' || selectedTab === 'confirmed'"
              class="btn btn-outline flex-1 md:flex-auto btn-error" @click="handleSubmit(reservation, 'cancelled')">
              <IconXmark class="w-4  fill-error" />
              {{ $t('label.cancel') }}
            </button>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="py-10 flex justify-center items-center">
      <span v-if="pending" class="loading"></span>
      <p v-else class="text-center text-lg text-gray-300">{{ $t('label.empty') }}</p>
    </div>
    <div class="flex justify-between gap-2">
      <div class="flex gap-2">
        <button @click="goToPreviousPage" :disabled="selectedPage === 1"
          class="btn btn-sm btn-outline">Previous</button>
        <button @click="goToNextPage" :disabled="selectedPage === data.totalPages || data.totalPages === 0"
          class="btn btn-sm btn-outline">Next</button>

      </div>
      <div>
        <select v-model="itemsPerPage" @change="setItemsPerPage($event.target.value)"
          class="select select-sm select-bordered">
          <option value="6">6</option>
          <option value="12">12</option>
          <option value="20">20</option>
        </select>
      </div>
    </div>
  </div>
</template>