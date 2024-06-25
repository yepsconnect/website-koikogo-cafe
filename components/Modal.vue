<script setup lang="ts">
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: boolean;
}>();

// state
const modalRef = ref();
// computed
const isOpen = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
onMounted(() => {
  modalRef.value.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});

// watch
watch(isOpen, (newValue) => {
  if (newValue) {
    openModal();
  } else {
    closeModal();
  }
});

// method
const openModal = () => {
  modalRef.value.showModal();
};

const closeModal = () => {
  modalRef.value.close();
  isOpen.value = false;
};
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <slot />
    </div>
  </dialog>
</template>
