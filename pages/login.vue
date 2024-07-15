<script setup lang="ts">
// composables
const router = useRouter();
const { setAuth } = useAuth();
// state
const email = ref('');
const password = ref('');
const isLoading = ref(false);

// methods
const handleSubmit = async () => {
  try {
    isLoading.value = true;

    const response = await $fetch<{
      ok: boolean,
      token: string,
      message: string
    }>('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        email: email.value.toLowerCase().trim(),
        password: password.value.trim()
      })
    });

    if (!response.ok) {
      return alert(response.message);
    }

    setAuth(response.token);
    router.push({ name: 'index' });
  } catch (error) {
    console.error('Login error:', error);
    alert('An error occurred during login. Please try again.');
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen px-3 flex flex-col items-center justify-center">
    <div class="flex flex-col gap-2 w-full max-w-md">
      <h1 class="text-2xl font-bold">{{ $t('page.login.title') }}</h1>
      <label class="input input-bordered flex items-center gap-2">
        <IconMail class="w-4" />
        <input v-model="email" type="text" class="grow" :placeholder="$t('email')" autocomplete="email"
          aria-label="Email" />
      </label>
      <label class="input input-bordered flex items-center gap-2">
        <IconKey class="w-4" />
        <input v-model="password" type="password" class="grow" :placeholder="$t('password')"
          autocomplete="current-password" aria-label="Password" />
      </label>
      <button class="btn btn-neutral w-full" @click="handleSubmit" :disabled="isLoading || !email || !password">
        <template v-if="isLoading">
          <span class="loading loading-bars"></span>
        </template>
        <template v-else>
          {{ $t('login') }}
        </template>
      </button>
      <!-- TODO: create recovery process -->
      <!-- <button class="btn btn-outline">
        {{ $t('recoverAccess') }}
      </button> -->
    </div>
  </div>
</template>
