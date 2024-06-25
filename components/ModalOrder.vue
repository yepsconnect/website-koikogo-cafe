<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<{
  modelValue: boolean;
}>();

// composables
const { menu } = useMenu();
const { order, decrementOrder, incrementOrder, clearOrder } = useOrder();
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

</script>

<template>
  <Modal v-model="isOpen">
    <div class="flex flex-col gap-4">
      <h2 class="text-2xl font-bold">Мой заказ</h2>
      <div v-if="order.length" class="flex flex-col gap-2">
        <div v-for="item in order" :key="item._id" class="flex justify-between gap-2">
          <p class="uppercase text-lg hover:underline cursor-pointer">
            {{ menu.find((x) => x._id === item._id)?.name }}
          </p>
          <div class="flex items-center gap-2">
            <button class="btn btn-xs btn-outline btn-circle" @click="decrementOrder(item._id)">
              -
            </button>
            <div class="w-10">
              <p class="text-center text-lg font-bold">{{ item.count }}</p>
            </div>
            <button class="btn btn-xs btn-outline btn-circle" @click="incrementOrder(item._id)">
              +
            </button>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text-center">Заказ пуст</p>
      </div>
      <div class="flex gap-3">
        <button class="btn flex-1" @click="isOpen = false">Закрыть</button>
        <button class="btn flex-1" @click="clearOrder()">
          Очистить заказ
        </button>
      </div>
    </div>
  </Modal>
</template>