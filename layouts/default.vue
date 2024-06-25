<template>
  <div class="flex flex-col min-h-screen">
    <div class="fixed top-8 w-full flex justify-between px-6">
      <ChangeLanguage />
      <Menu />
    </div>
    <main class="flex-1">
      <slot />
    </main>
    <Footer class="mt-10" />
  </div>
</template>
