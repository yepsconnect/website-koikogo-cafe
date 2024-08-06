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
  background: linear-gradient(90deg, #820042 0%, #C30B52 100%);
}

.btn-primary.btn-outline {
  background: none;
  cursor: pointer;
}

.btn-primary:disabled {
  background: #cecece;
  color: #ffffff
}

.active {
  background: linear-gradient(90deg, #820042 0%, #C30B52 100%);
}

* {
  scroll-behavior: smooth;
}

textarea {
  font-size: 16px !important;
}
</style>