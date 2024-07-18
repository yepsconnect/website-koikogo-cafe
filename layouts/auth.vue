<script setup lang="ts">
import IconComputer from '@/components/Icon/Computer.vue'
import IconRestaurantTable from '@/components/Icon/RestaurantTable.vue'
import IconMenuRestaurant from '@/components/Icon/MenuRestaurant.vue'
import IconRestaurant02 from '@/components/Icon/Restaurant02.vue'
import IconSettings02 from '@/components/Icon/Settings02.vue'
import IconCheeseCake01 from '@/components/Icon/CheeseCake01.vue'
// composables
const route = useRoute()
const { t } = useI18n()
// state
const sidebar = ref()
// computed
const menu = computed(() => [
  {
    name: 'index',
    icon: IconRestaurantTable,
    label: t('screen.reservation.title'),
  },
  {
    name: 'page',
    icon: IconComputer,
    label: t('screen.page.title'),
  },
  {
    name: 'category',
    icon: IconMenuRestaurant,
    label: t('screen.category.title'),
  },
  {
    name: 'position',
    icon: IconRestaurant02,
    label: t('screen.positions.title'),
  },
  {
    name: 'bakery',
    icon: IconCheeseCake01,
    label: t('screen.bakery.title'),
  },
  {
    name: 'settings',
    icon: IconSettings02,
    label: t('screen.settings.title'),
  },
])
</script>

<template>
  <div class="drawer lg:drawer-open min-h-screen">
    <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col flex-1">
      <main>
        <slot />
      </main>
    </div>
    <div ref=sidebar class="drawer-side">
      <label for="my-drawer-2" aria-label="close sidebar" class="drawer-overlay"></label>

      <ul class="menu gap-1 bg-base-200 text-base-content min-h-full w-80 p-4">
        <ChangeLanguage class="mb-5" />
        <li v-for="item in menu" :key="item.name">
          <NuxtLink :to="{ name: item.name }" :class="{
            'active': route.name === item.name,
          }">
            <component :is="item.icon" class="w-6" :class="{
              'text-white': route.name === item.name
            }"></component>
            {{ item.label }}
          </NuxtLink>
        </li>
      </ul>
    </div>
  </div>
</template>