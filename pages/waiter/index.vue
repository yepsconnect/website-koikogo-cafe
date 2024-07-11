<script setup lang="tsx">
const { data } = useFetch<{
  ok: boolean
  dishes: Dish[]
}>('/api/dish?available=true')
// state
const modal = ref(false)
const selectedTab = ref('menu')
const selectedDish = ref<Dish>()
const searchQuery = ref('')

const order = ref<{
  [key: string]: number
}>({})

const dishes = computed(() => {
  if (!data.value?.dishes) return []
  return data.value.dishes
    .filter((dish) => dish.title['ru'].toLowerCase().includes(searchQuery.value.toLowerCase()))
})

const orderDishes = computed(() => {
  if (!data.value?.dishes) return []
  return data.value.dishes.filter((dish) => order.value[dish._id] !== undefined);
});

const decrement = (id: string) => {
  order.value[id]--
  if (order.value[id] <= 0) delete order.value[id]
}

const openModal = (dish: Dish) => {
  selectedDish.value = dish
  modal.value = true
}
</script>

<template>
  <div class="flex flex-col gap-2 p-3">
    <h1 class="text-2xl">Формирование заказа</h1>
    <input v-model="searchQuery" type="text" class="input input-bordered w-full" placeholder="Название позиции">
    <div role="tablist" class="tabs tabs-boxed">
      <div role="tab" class="tab" :class="{
        'tab-active': selectedTab === 'menu',
      }" @click="selectedTab = 'menu'">
        Меню
      </div>
      <div role="tab" class="tab" :class="{
        'tab-active': selectedTab === 'order',
      }" @click="selectedTab = 'order'">
        Заказ
      </div>
    </div>
    <template v-if="selectedTab === 'menu'">
      <div v-for="item in dishes" class="p-2 border rounded flex items-center justify-between" :class="{
        'bg-gray-100': !item.isAvailable
      }">
        <div>
          <p class="text-lg link link-hover" @click="openModal(item)">{{ item.title['ru'] }}</p>
          <p :class="{
            'text-red-500': !item.isAvailable,
            'text-green-500': item.isAvailable,
          }">{{ item.isAvailable ? 'Доступно' : "В стопе" }}</p>
        </div>
        <div v-if="order[item._id]" class="flex items-center gap-2">
          <button class="btn btn-sm btn-square" @click="decrement(item._id)">
            <IconMinus class="w-3" />
          </button>
          {{ order[item._id] }}
          <button class="btn btn-sm btn-square" @click="order[item._id]++">
            <IconPlus class="w-3" />
          </button>
        </div>
        <button v-else class="btn btn-sm btn-square" @click="order[item._id] = 1" :disabled="!item.isAvailable">
          <IconPlus v-if="item.isAvailable" class="w-3" />
          <IconLock v-else class="w-3" />
        </button>
      </div>
      <div v-if="!dishes.length" class="flex items-center justify-center py-20">
        <p>Пусто</p>
      </div>
    </template>
    <template v-else>
      <template v-if="orderDishes.length">
        <div v-for="item in orderDishes" class="p-2 border rounded flex items-center justify-between" :class="{
          'bg-gray-100': !item.isAvailable
        }">
          <p class="text-lg link link-hover" @click="openModal(item)">{{ item.title['ru'] }}</p>
          <div v-if="order[item._id]" class="flex items-center gap-2">
            <button class="btn btn-sm btn-square" @click="decrement(item._id)">
              <IconMinus class="w-3" />
            </button>
            {{ order[item._id] }}
            <button class="btn btn-sm btn-square" @click="order[item._id]++">
              <IconPlus class="w-3" />
            </button>
          </div>
        </div>
        <button class="btn btn-neutral" @click="order = {}">Очистить</button>
      </template>

      <div v-else class="flex items-center justify-center py-20">
        <p>Пусто</p>
      </div>
    </template>
    <Modal v-model="modal">
      <div v-if="selectedDish" class="flex flex-col gap-4">
        <p class="text-xl">{{ selectedDish.title['ru'] }}</p>
        <p v-if="!selectedDish.isAvailable" class="text-red-500 text-center">В данный момент позиция недоступна для
          заказа
        </p>
        <p v-if="selectedDish.description">{{ selectedDish.description['ru'] }}</p>
        <div v-if="order[selectedDish._id]" class="flex items-center gap-2">
          <button class="btn btn-square" @click="decrement(selectedDish._id)">
            <IconMinus class="w-3" />
          </button>
          <p class="flex-1 text-center">
            {{ order[selectedDish._id] }}
          </p>
          <button class="btn btn-square" @click="order[selectedDish._id]++">
            <IconPlus class="w-3" />
          </button>
        </div>
        <button v-else class="btn btn-primary" @click="order[selectedDish._id] = 1"
          :disabled="!selectedDish.isAvailable">
          Добавить в заказ
        </button>
        <button class="btn btn-outline" @click="modal = false">Закрыть</button>
      </div>
    </Modal>
  </div>
</template>