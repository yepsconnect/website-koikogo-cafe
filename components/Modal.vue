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
        class="btn btn-ghost btn-sm btn-circle absolute top-2 right-2"
        @click="closeModal"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z"
            class="fill-current"
            fill-opacity="0.54"
          />
        </svg>
      </button>
      <slot />
    </div>
  </dialog>
</template>
