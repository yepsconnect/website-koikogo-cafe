<script setup lang="ts">
const menu = ref<Dish[]>([])

const { token } = useAuth()

const handleSubmit = async (dish: Dish) => {
  try {

    const response = await $fetch<{
      ok: boolean;
    }>("/api/dish", {
      method: 'POST',
      headers: {
        Authorization: token.value!
      },
      body: JSON.stringify({
        dish: dish
      })
    });
    if (response.ok) {
      currentIndex.value++
    }

  } catch (error) {
    console.error(error);
  }
};

const currentIndex = ref<number | null>(null);

watch(currentIndex, val => {
  handleSubmit(menu[val])
})
onMounted(() => {
  currentIndex.value = 0;
})
</script>

<template>
  <p>{{ currentIndex + 1 }}</p>
  <p>{{ menu.length }}</p>
</template>