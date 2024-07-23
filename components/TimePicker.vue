<script setup lang="ts">
import moment from 'moment';

const emit = defineEmits(["update:modelValue"]);
const props = defineProps<{
  modelValue: string;
  date: string; // 'YYYY-MM-DD'
  times: string[]; // ['10:00', '10:30', '11:00', '11:30' ...]
}>();
const selectedTime = computed({
  get: () => props.modelValue,
  set: (value) => emit("update:modelValue", value),
});

const filteredTimes = computed(() => {
  const currentDate = moment();
  const inputDate = moment(props.date, 'YYYY-MM-DD');

  if (currentDate.isAfter(inputDate, 'day')) {
    return [];
  }

  if (currentDate.isSame(inputDate, 'day')) {
    const currentTime = currentDate.add(30, 'minutes').format('HH:mm');
    return props.times.filter(time => time > currentTime);
  }

  return props.times;
});
</script>

<template>
  <select v-model="selectedTime" class="select select-bordered">
    <option :value="null">{{ $t('label.select') }}</option>
    <option v-for="time in filteredTimes" :key="time" :value="time">
      {{ time }}
    </option>
  </select>
</template>