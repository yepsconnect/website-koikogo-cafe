<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<{
  modelValue: boolean;
  product: Product | undefined;
}>();
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

//composables
const { addToOrder } = useOrder();
const { t } = useI18n();
// state
const count = ref(1);

// methods
const handleSubmit = () => {
  if (!props.product) return;
  addToOrder(props.product._id, count.value);
  isOpen.value = false;
  count.value = 1;
};
</script>

<template>
  <Modal v-model="isOpen">
    <div v-if="product">
      <div class="flex justify-center">
        <div class="avatar w-full mb-2">
          <div class="rounded-xl bg-gray-200 w-full">
            <img
              v-if="product.images && product.images[0]"
              :src="`https://koikogo.cafe/positions/${product.images[0]}`"
              loading="lazy"
            />
            <img
              v-else
              src="https://multimedia.properati.com.co/properati/images/no-image-placeholder.png"
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <h2 class="uppercase text-lg font-bold">
        {{ product.name }}
      </h2>
      <p v-if="product?.description" class="text-sm text-gray-500">
        {{ product.description }}
      </p>
      <div class="flex items-center justify-between gap-2">
        <p class="text-sm">
          <span class="text-lg font-bold">{{ product?.price }} р</span>
          {{ product?.output }}
        </p>
        <div class="flex items-center justify-between gap-2">
          <button
            class="btn btn-sm btn-circle btn-glass"
            :disabled="count < 2"
            @click="count--"
          >
            <IconRemove01 class="w-3" />
          </button>
          <div>{{ count }} {{ t("label.pieces") }}</div>
          <button class="btn btn-sm btn-circle btn-glass" @click="count++">
            <IconAdd01 class="w-3" />
          </button>
        </div>
      </div>
      <div class="mt-4 flex justify-between gap-2">
        <button class="btn btn-sm btn-outline flex-1" @click="isOpen = false">
          {{ t("label.close") }}
        </button>
        <button class="btn btn-sm btn-neutral flex-1" @click="handleSubmit">
          {{ t("label.add") }}
        </button>
      </div>
    </div>
  </Modal>
</template>
