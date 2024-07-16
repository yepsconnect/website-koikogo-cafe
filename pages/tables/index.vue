<script setup lang="ts">
import moment from "moment"
// composables
const { locale } = useI18n()
const { times } = useConfig()
// fetch
const { data } = useFetch<{
  ok: boolean,
  tables: Table[]
}>(`/api/tables`)
// state
const isLoading = ref(false)
const modal = ref(false)
const messageSuccess = ref(false)
const modalSuccess = ref(false)
const messageError = ref(null)
const modalError = ref(false)
const capacity = ref(1)
const isEnd = ref(false)
// form state
const selectedTable = ref<Table>()
const to = ref(null)
const choosingTo = ref(5)
// computed
const availableTimes = computed(() => times.filter(x => x >= moment().format("HH:mm")))
const tables = computed(() => {
  if (!data.value.tables) return []
  return data.value.tables.filter(table => table.capacity >= capacity.value)
})

const selectTable = (table: string) => {
  selectedTable.value = table
  modal.value = true
}

const handleSubmit = async () => {
  try {
    const response = await $fetch<{
      ok: boolean,
      message: string
      booking: Booking,
    }>('/api/booking', {
      method: 'POST',
      body: JSON.stringify({
        reservation: {
          tableId: selectedTable.value._id,
          date: moment().format("YYYY-MM-DD"),
          from: moment().format("HH:mm"),
          to: to.value || moment().add(120, 'minutes').format("HH:mm"),
          status: "confirmed",
          choosingTo: choosingTo.value,
        }
      })
    })
    if (!response.ok) {
      alert(response.message)
      return
    }
    modal.value = false
    to.value = ""
    isEnd.value = false
    modalSuccess.value = true
  } catch (error) {
    alert('ошибка')
  } finally {
    isLoading.value = false
  }
}
</script>
<template>
  <div>
    <select v-model="capacity" class="select select-bordered w-full">
      <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
    </select>
    <div v-if="data" class="flex flex-col gap-2 p-2">
      <div v-for="table in tables" :key="table._id" class="flex flex-col gap-2 p-2 border rounded"
        @click="selectTable(table)">
        <span>{{ table.name[locale] || table.name['ru'] }}</span>
      </div>
    </div>
    <Modal v-model="modal">
      <div v-if="selectedTable" class="flex flex-col gap-2">
        <div class="flex items-start justify-between">
          <h2 class="text-xl font-bold">{{ selectedTable.name[locale] || selectedTable.name['ru'] }}</h2>
          <div class="flex items-center gap-1">
            <p class="text-lg">{{ selectedTable.capacity }}</p>
            <IconUserGroup class="w-6" />
          </div>
        </div>
        <div class="form-control">
          <label class="label cursor-pointer justify-start gap-2">
            <input v-model="isEnd" type="checkbox" checked="checked" class="checkbox" />
            <span class="label-text">
              {{ $t('screen.tables.timeEnd') }}
            </span>
          </label>
          <select v-if="isEnd" v-model="to" class="select select-bordered">
            <option :value="null">{{ $t('label.select') }}</option>
            <option v-for="time in availableTimes" :key="time" :value="time">{{ time }}</option>
          </select>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">{{ $t('screen.tables.timeChoosing') }}</span>
            </div>
            <select v-model="choosingTo" class="select select-bordered">
              <option v-for="i in 10" :key="i" :value="i">{{ i }}</option>
            </select>
          </label>
        </div>
        <button class="btn btn-neutral" @click="handleSubmit" :disabled="isEnd && !to || isLoading">
          <span v-if="isLoading" class="loading loading-spinner"></span>
          <template v-else>{{ $t('label.reserve') }}</template>
        </button>
        <button class="btn btn-outline" @click="modal = false">{{ $t('label.cancel') }}</button>
      </div>
    </Modal>
    <Modal v-model="modalSuccess">
      <div class="flex flex-col gap-2">
        <h2 class="text-xl font-bold">Забронировано</h2>
        <p>Столик зарезервирован</p>
        <NuxtLink :to="{ name: 'order' }" class="btn btn-neutral">
          {{ $t('screen.tables.acceptOrder') }}
        </NuxtLink>
        <!-- <NuxtLink :to="{ name: 'waiter' }" class="btn btn-outline">
          {{ $t('screen.tables.acceptLater') }}
        </NuxtLink> -->
      </div>
    </Modal>
  </div>
</template>