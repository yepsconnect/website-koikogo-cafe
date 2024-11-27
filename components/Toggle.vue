<script setup lang="ts">
const emit = defineEmits(["update:modelValue", "blur"]);
const props = defineProps<{
  modelValue: boolean;
  label?: string;
  info?: string;
}>();

const checkboxValue = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});
</script>

<template>
  <label class="form-control">
    <label class="label cursor-pointer justify-start gap-2">
      <input
        v-model="checkboxValue"
        type="checkbox"
        class="toggle toggle-neutral"
        @blur="$emit('blur')"
      />
      <span class="label-text">
        {{ label }}
        <slot />
      </span>
    </label>
    <slot name="content" />
    <div v-if="info" class="label">
      <span class="label-text-alt text-gray-400">
        {{ info }}
      </span>
    </div>
  </label>
</template>
