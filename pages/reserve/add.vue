<script setup lang="ts">
definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const { token } = useAuth()
const { locale } = useI18n()
const router = useRouter()
// state
const isLoading = ref(false)
const reservation = ref<BookingNew>({
  tableId: "",
  date: "",
  from: "",
  to: "",
  name: "",
  phone: "",
  status: "confirmed",
})
// fetch
const { data } = useFetch<{
  ok: boolean
  tables: Table[]
}>(`/api/tables`)

const handleSubmit = async () => {
  try {
    const response = await fetch<{
      ok: boolean
      reservation: Booking
      message: string
    }>(`/api/reservation`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: token.value!
      },
      body: JSON.stringify({ reservation: reservation.value })
    })
    if (!response.ok) {
      return alert(response.message)
    }
    const isConfirmed = confirm("Бронь создана. Добавить ещё одну бронь?")
    if (isConfirmed) {
      reservation.value = {
        tableId: "",
        date: "",
        from: "",
        to: "",
        name: "",
        phone: "",
        status: "pending",
      }
      return
    }
    router.push({ name: 'index' })

  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <div class="flex flex-col gap-4 p-3">
    <Header :title="$t('screen.reserveAdd.title')" />
    <div class="w-full max-w-xl flex flex-col gap-2 mx-auto lg:mx-0">
      <label class="input input-bordered flex items-center gap-2">
        <IconUser class="w-3" />
        <input v-model="reservation.name" type="text" class="grow" :placeholder="$t('label.name')" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <IconPhone class="w-3" />
        <input v-model="reservation.phone" type="text" class="grow" :placeholder="$t('label.phone')" />
      </label>
      <input v-model="reservation.date" type="date" class="input input-bordered">
      <div class="grid md:grid-cols-2 gap-2">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ $t('label.from') }}</span>
          </div>
          <input v-model="reservation.from" type="time" class="input input-bordered">
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">{{ $t('label.to') }}</span>
          </div>
          <input v-model="reservation.to" type="time" class="input input-bordered">
        </label>
      </div>
      <select v-model="reservation.tableId" class="select select-bordered">
        <option value="">{{ $t('label.selectTable') }}</option>
        <option v-for="table in data?.tables" :key="table._id" :value="table._id">
          {{ table.name[locale || "ru"] }}
        </option>
      </select>
      <button class="btn btn-neutral"
        :disabled="isLoading || !reservation.name || !reservation.phone || !reservation.date || !reservation.from || !reservation.to || !reservation.tableId"
        @click="handleSubmit">
        {{ $t('label.add') }}
      </button>
    </div>
  </div>
</template>