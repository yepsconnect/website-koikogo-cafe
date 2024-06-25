<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<{
  modelValue: boolean;
  dish: Dish | undefined;
}>();

//composables
const { addToOrder } = useOrder();
const { t } = useI18n();
// state
const count = ref(1);

// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

// methods
const handleSubmit = () => {
  if (!props.dish) return;
  addToOrder(props.dish._id, count.value)
  isOpen.value = false
  count.value = 1
}
</script>

<template>
  <Modal v-model="isOpen">
    <div v-if="dish" class="mt-2">
      <div class="flex justify-center">
        <div class="avatar w-full max-w-64 mx-auto mb-2">
          <div class="rounded-xl bg-gray-200">
            <img v-if="dish.image" :src="dish.image" loading="lazy" />
            <img v-else src="https://multimedia.properati.com.co/properati/images/no-image-placeholder.png"
              loading="lazy" />
          </div>
        </div>
      </div>
      <h2 class="uppercase text-lg font-bold">{{ dish?.name }}</h2>
      <p v-if="dish?.description" class="text-sm text-gray-500">{{ dish.description }}</p>
      <p v-if="dish?.type" class="text-sm text-gray-600">
        <template v-for="(item, index) in dish.type">
          {{ item
          }}<template v-if="index !== dish.type.length - 1">, </template>
        </template>
      </p>
      <p class="text-sm">
        <span class="text-lg font-bold">{{ dish?.price }} р</span>
        {{ dish?.portion_size }} {{ dish?.unit }}
      </p>
      <div class="mt-4 flex flex-col gap-4">
        <div class="flex items-center justify-between">
          <button class="btn btn-sm btn-circle btn-glass" :disabled="count < 2" @click="count--">
            -
          </button>
          <div>{{ count }} {{ t("label.pieces") }}</div>
          <button class="btn btn-sm btn-circle btn-glass" @click="count++">+</button>
        </div>
      </div>
      <div class="mt-4 flex justify-between gap-2">
        <button class="btn btn-sm btn-outline flex-1" @click="isOpen = false">
          {{ t('label.close') }}
        </button>
        <button class="btn btn-sm btn-neutral flex-1" @click="handleSubmit">
          {{ t('label.add') }}
        </button>
      </div>
    </div>
  </Modal>
</template>
