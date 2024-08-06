<script setup lang="ts">
import CardCakeTraditional from '../CardCakeTraditional.vue';

const order = ref<CakeOrder[]>([])
const selectedCake = ref<CakeOrder | null>(null)
const visible = ref(false)
const cakes = [
  {
    title: "Манговый медовик",
    description: "",
  },
  {
    title: "Наполеон малиновый",
    description: ""
  },
  {
    title: "Меренговый рулет",
    description: ""
  },
  {
    title: "Торт Эстерхази",
    description: ""
  },
  {
    title: "Торт Красный бархат",
    description: ""
  },
  {
    title: "Торт Шоколадно-банановый",
    description: ""
  },
  {
    title: "Торт Сникерс",
    description: ""
  },
  {
    title: "Чизкейк с ягодным соусом",
    description: ""
  },
  {
    title: "Шоколадный чизкейк",
    description: ""
  },
  {
    title: "Чизкейк с малиной",
    description: ""
  },
  {
    title: "Торт Трюфель",
    description: ""
  },
  {
    title: "Торт три шоколада",
    description: ""
  },
  {
    title: "Дизайн торта",
    description: "Стоимость дизайна дополнительных элементов определяется индивидуально. Просто укажите ваши пожелания в комментарии при оформлении заявки и мы сориентируем вас по стоимости и подберем идеальный вариант декора",
    price: "0*"
  },
]

const addToOrder = (cake: CakeOrder) => {
  selectedCake.value = cake
  visible.value = true
}

</script>

<template>
  <section>
    <h2 class="text-xl font-bold">Традиционные торты на заказ</h2>
    <pre>{{ order }}</pre>
    <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      <CardCakeTraditional v-for="cake in cakes" :key="cake.title" :cake="cake" :order="order" @on-add="addToOrder" />
    </div>
    <Modal v-model="visible">
      <div v-if="selectedCake" class="flex flex-col gap-3">
        <h2 class="text-xl font-bold">Заказ торта {{ selectedCake?.title }}</h2>
        <p>{{ selectedCake?.description || 'Нет описания' }}</p>
        <div class="flex justify-between gap-2">
          <p><strong>Размер:</strong> {{ selectedCake?.weight }}</p>
          <p><strong>Цена:</strong> {{ selectedCake?.price }}₽</p>
        </div>
        <p v-if="selectedCake?.filling"><strong>Начинка:</strong> {{ selectedCake?.filling }}</p>
        <textarea v-model="selectedCake.comment" class="textarea textarea-bordered"
          placeholder="Здесь вы можете указать ваши пожелания по дизайну торта или задать вопрос, и мы сориентируем вас по стоимости и подберем идеальный вариант декора."
          rows="4"></textarea>
        <button class=" btn btn-primary"
          @click="visible = false, order.push(selectedCake), selectedCake = null">Добавить
          в заказ</button>
        <button class="btn btn-outline" @click="visible = false, selectedCake = null">Отменить</button>
      </div>
    </Modal>
  </section>
</template>