<script setup lang="ts">
const router = useRouter()

const availablePages = router.options.routes.filter(x => x.meta?.layout === 'menu')
</script>

<template>
  <div class="w-full max-w-lg flex flex-col gap-2 mt-10">
    <select class="select select-bordered">
      <option value="" disabled>{{ $t('label.select') }}</option>
      <option v-for="route in availablePages" :key="route.name" :value="route.name">
        {{ $t(`screen.${route.name?.toString()}.title`) }}
      </option>
    </select>
    <button class="btn btn-neutral">{{ $t('label.add') }}</button>
  </div>
</template>