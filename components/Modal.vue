<script setup lang="ts">
interface Props {
  modelValue: boolean;
}

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<Props>();

const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const modalRef = ref();

const openModal = () => {
  modalRef.value.showModal();
};

const closeModal = () => {
  modalRef.value.close();
  isOpen.value = false;
};

watch(isOpen, (newValue) => {
  if (newValue) {
    openModal();
  } else {
    closeModal();
  }
});
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box">
      <button
        class="btn btn-sm btn-circle absolute top-2 right-2"
        @click="closeModal"
      >
        x
      </button>
      <slot />
    </div>
  </dialog>
</template>
