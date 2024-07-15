<template>
  <div>
    <Container class="py-8 flex flex-col gap-4 items-start">
      <h2 class="text-2xl font-bold">{{ $t('screen.banquet.title') }}</h2>
      <p class="text-lg">{{ $t('screen.banquet.text[0]') }}</p>
      <p class="text-lg">{{ $t('screen.banquet.text[1]') }}</p>
      <button class="btn">{{ $t('screen.banquet.btnReserve') }}</button>
    </Container>
    <Container class="py-8 flex flex-col gap-4 items-start">
      <h2 class="text-2xl font-bold">{{ $t('screen.banquet.menu.title') }}</h2>
      <p class="text-lg">{{ $t('screen.banquet.menu.text') }}</p>
      <button class="btn">{{ $t('screen.banquet.menu.btn') }}</button>
    </Container>
  </div>
</template>