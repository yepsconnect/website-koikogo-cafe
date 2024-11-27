<template>
  <Html lang="ru">
    <Body>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

<style>
.btn-primary {
  background: linear-gradient(90deg, #820042 0%, #c30b52 100%);
}

.btn-primary:disabled {
  background: #cecece;
  color: #ffffff;
}

.active {
  background: linear-gradient(90deg, #820042 0%, #c30b52 100%);
}
</style>
