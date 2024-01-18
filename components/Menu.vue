<template>
  <div class="fixed top-16 right-2 dropdown dropdown-end z-50">
    <div tabindex="0" role="button" class="btn btn-circle m-1">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
        />
      </svg>
    </div>
    <ul
      tabindex="0"
      class="dropdown-content z-[1] menu p-2 shadow bg-base-200 rounded-box w-52"
    >
      <li><NuxtLink :to="{ name: 'about' }">О заведении</NuxtLink></li>
      <li></li>
      <li><NuxtLink to="/">Основное меню</NuxtLink></li>
      <li><NuxtLink :to="{ name: 'bar' }">Карта бара</NuxtLink></li>
    </ul>
  </div>
</template>
