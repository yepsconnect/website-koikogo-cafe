<script setup lang="ts">
// composables
const { setAuth } = useAuth()
const router = useRouter()
// state
const email = ref()
const password = ref()
const isLoading = ref(false)

// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true

    const response = await $fetch<{
      ok: boolean,
      token: string
      message: string
    }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value.toLowerCase().trim(),
        password: password.value.trim()
      })
    })
    if (!response.ok) {
      return alert(response.message)
    }
    setAuth(response.token)
    router.push({ name: "dashboard" });
  } catch (error) {
    alert(error)
  } finally {
    isLoading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen px-3 flex flex-col">
    <div class=" flex-1 flex justify-center items-center">
      <div class="flex flex-col gap-2 w-full max-w-md">
        <p class="text-2xl font-bold">Авторизация</p>
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path
              d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
            <path
              d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
          </svg>
          <input v-model="email" type="text" class="grow" placeholder="Электронная почта" />
        </label>
        <label class="input input-bordered flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="h-4 w-4 opacity-70">
            <path fill-rule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clip-rule="evenodd" />
          </svg>
          <input v-model="password" type="password" class="grow" placeholder="Пароль" />
        </label>
        <button class=" btn btn-neutral w-full" @click="handleSubmit" :disabled="isLoading">Войти</button>
        <NuxtLink :to="{ name: 'register' }" class=" btn btn-neutral btn-outline w-full">Нет аккаунта</NuxtLink>
      </div>
    </div>
  </div>
</template>