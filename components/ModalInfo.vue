<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<{
  modelValue: boolean;
  position: Position | undefined;
}>();
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

//composables
const { addToOrder } = useOrder();
const { t, locale } = useI18n();
// state
const count = ref(1);



// methods
const handleSubmit = () => {
  if (!props.position) return;
  addToOrder(props.position._id, count.value)
  isOpen.value = false
  count.value = 1
}
</script>

<template>
  <Modal v-model="isOpen">
    <div v-if="position">
      <div class="flex justify-center">
        <div class="avatar w-full mb-2">
          <div class="rounded-xl bg-gray-200 w-full">
            <img v-if="position.image" :src="position.image" loading="lazy" class="w-full" />
            <img v-else src="https://multimedia.properati.com.co/properati/images/no-image-placeholder.png"
              loading="lazy" />
          </div>
        </div>
      </div>
      <h2 class="uppercase text-lg font-bold">{{ position?.title[locale] || position?.title['ru'] }}</h2>
      <p v-if="position?.description" class="text-sm text-gray-500">{{ position.description[locale] ||
        position.description['ru'] }}
      </p>
      <div class="flex items-center justify-between gap-2">
        <p class="text-sm">
          <span class="text-lg font-bold">{{ position?.price }} р</span>
          {{ position?.unit }}
        </p>
        <div class="flex items-center justify-between gap-2">
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
