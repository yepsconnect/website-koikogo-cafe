<template>
  <div>
    <div class="w-full flex justify-center items-center py-12 lg:py-48">
      <div class="flex flex-col md:flex-row items-center md:items-end">
        <LogoMenu class="max-w-64" animated />
        <div>
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">{{ $t('name[0]') }}</span>
            <br />
            {{ $t('name[1]') }}
            <br />
            {{ $t('name[2]') }}
          </h1>
          <br>
          <p class="text-xl uppercase">
            {{ $t("screen.banquet.menu.title") }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>