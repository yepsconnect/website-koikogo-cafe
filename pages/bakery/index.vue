<script setup lang="ts">
import moment from 'moment';

definePageMeta({
  middleware: 'auth',
  layout: 'auth'
});
// composables
const modal = ref(false)
const { token } = useAuth()
const { data } = useFetch<{
  bakery: Bakery[]
}>("/api/bakery")

const handleSubmit = async (id: string, status: string) => {
  try {
    const response = await $fetch<{
      ok: boolean,
      message: string
    }>(`/api/bakery/${id}`, {
      method: 'PUT',
      headers: {
        authorization: token.value!
      },
      body: JSON.stringify({ status }),
    })
    if (!response.ok) {
      return alert(response.message);
    }
    alert("Статус изменен");
    const candidate = data.value?.bakery.find(x => x._id === id)
    if (!candidate) return;
    candidate.status = status
  } catch (error) {
    alert(error)
  }
}

const selectedItem = ref()
const openModal = (item: Bakery) => {
  selectedItem.value = item
  modal.value = true
}

const handleChange = async () => {
  try {
    const response = await $fetch<{
      ok: boolean,
      message: string
    }>(`/api/bakery/${selectedItem.value._id}`, {
      method: 'PUT',
      headers: {
        authorization: token.value!
      },
      body: JSON.stringify({ date: selectedItem.value.date }),
    })
    if (!response.ok) {
      return alert(response.message);
    }
    alert("Заказ перенесен");
    const candidate = data.value?.bakery.find(x => x._id === selectedItem.value._id)
    if (!candidate) return;
    candidate.date = selectedItem.value.date
    selectedItem.value = null
    modal.value = false
  } catch (error) {
    alert(error)
  }
}
</script>

<template>
  <div class="p-3">
    <Header :title="$t('screen.bakery.title')" />
    <div v-if="data" class="flex flex-col gap-4">
      <div v-for="item in data.bakery" class="p-3 border rounded">
        <div class="flex items-start justify-between mb-4">
          <div>
            <h2 class="text-xl">{{ item.name }}</h2>
            <p>{{ item.phone }}</p>
          </div>
          <div class="text-end">
            <p>Дата {{ moment(item.date).format("DD.MM") }}</p>
            <p>Время {{ item.time }}</p>
          </div>
        </div>

        <div class="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <template v-if="item.deliveryType === 'pickup'">
              <p class="text-lg">Самовывоз</p>
              <p class="text-lg">{{ item.pickupAddress }}</p>
            </template>
            <template v-else-if="item.deliveryType === 'delivery'">
              <p class="text-lg">Доставка</p>
              <p class="text-lg"> {{ item.city }}, {{ item.street }}, {{ item.house }}, {{
                item.flat }}, {{ item.apartment }}</p>
            </template>
          </div>

          <div class="flex gap-2">
            <button v-if="item.status === 'new'" class="btn btn-success" @click="handleSubmit(item._id, 'approved')">
              {{ $t('label.confirm') }}
            </button>
            <button v-else-if="item.status === 'approved'" class="btn btn-warning"
              @click="handleSubmit(item._id, 'progress')">
              Начать производство
            </button>
            <button v-else-if="item.status === 'progress'" class="btn btn-primary"
              @click="handleSubmit(item._id, 'pending')">
              Готов
            </button>
            <button v-else-if="item.status === 'pending'" class="btn btn-primary"
              @click="handleSubmit(item._id, 'delivered')">
              Передать в доставку
            </button>
            <button v-else-if="item.status === 'delivered'" class="btn btn-primary"
              @click="handleSubmit(item._id, 'completed')">
              Доставлено
            </button>
            <template v-if="item.status !== 'reject'">
              <button v-if="item.status !== 'new'" class="btn btn-primary" @click="openModal(item)">
                Перенести
              </button>
              <button class="btn btn-error" @click="handleSubmit(item._id, 'reject')">
                {{ $t('label.reject') }}
              </button>
            </template>
          </div>
        </div>

      </div>
    </div>
    <Modal v-model="modal">
      <div v-if="selectedItem" class="flex flex-col gap-2">
        <input v-model="selectedItem.date" type="date" class="input input-bordered" />
        <button class="btn btn-primary" @click="handleChange">
          Перенести
        </button>
        <button class="btn btn-outline" @click="modal = false">
          Отменить
        </button>
      </div>
    </Modal>
  </div>
</template>