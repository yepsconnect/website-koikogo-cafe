<script setup lang="ts">
import moment from 'moment';

const dropdown = ref()
const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: string;
  min: string;
  date?: string;
  times: string[];
}>();
const selectedTime = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const filteredTimes = computed(() => {
  if (props.min === props.times.at(-1)) {
    return []
  }
  if (!props.date || props.date === moment().format("YYYY-MM-DD")) {
    return props.times.filter((time) => time > props.min || time === props.times.at(-1))
  }
  return props.times
})

const handleSubmit = (time: string) => {
  emit('update:modelValue', time)
  dropdown.value.removeAttribute('open')
}
</script>

<template>
  <details ref="dropdown" class="dropdown">
    <summary tabindex="0" role="button" class="btn w-full">
      {{ selectedTime }}
    </summary>
    <div tabindex="0" class="dropdown-content card z-[1] w-64 p-2 shadow bg-white">

      <div v-if="filteredTimes.length" class="grid grid-cols-4 gap-2">
        <div v-for="time in filteredTimes" :key="time"
          class="p-1 border rounded flex items-center justify-center hover:bg-gray-100 cursor-pointer" :class="{
            'border-primary': selectedTime === time,
          }" @click="handleSubmit(time)">
          {{ time }}
        </div>
      </div>
    </div>
  </details>
</template>