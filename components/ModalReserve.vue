<script setup lang="ts">
import { formatPhoneNumber } from "~/services/phoneService";

const emit = defineEmits(["update:modelValue", "show-order"]);
const props = defineProps<{
  modelValue: boolean;
}>();
// compodsbles
const { phone } = useConfig()
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <Modal v-model="isOpen">
    <div class="flex flex-col gap-4">
      <h2 class="text-xl font-bold text-center">
        {{ $t('modal.reservation.title') }}
      </h2>
      <p class="text-lg text-gray-500 text-center max-w-xs mx-auto">
        {{ $t('modal.reservation.info') }}
        <a :href="`tel:${phone}`" class="link link-hover link-primary">{{ formatPhoneNumber(phone) }}</a>
      </p>
      <a :href="`tel:${phone}`" class="btn btn-neutral">
        <IconPhone class="w-3 fill-white" />
        {{ $t('label.call') }}
      </a>
    </div>

  </Modal>
</template>