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

// change esc key to close modal
onMounted(() => {
  modalRef.value.addEventListener("keydown", (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeModal();
    }
  });
});
</script>

<template>
  <dialog ref="modalRef" class="modal modal-bottom sm:modal-middle">
    <div class="modal-box relative">
      <slot />
    </div>
  </dialog>
</template>
