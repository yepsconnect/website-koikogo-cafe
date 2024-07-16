<script setup lang="ts">
import IconVK from "./Icon/VK.vue"

const { t } = useI18n();
const socials = [
  {
    label: t('label.vk'),
    value: "vk",
    icon: IconVK,
    link: "https://vk.com/imeny_koykogo"
  },
]
</script>

<template>
  <footer class="bg-base-200 text-base-content p-10">
    <Container class="footer ">
      <NuxtLink to="/">
        <aside>
          <Logo class="w-20" />
          <p class="text-lg">
            {{ $t('name[0]') }} {{ $t('name[1]') }} {{ $t('name[2]') }}
            <br />
          </p>
        </aside>
      </NuxtLink>
      <nav>
        <h6 class="footer-title">{{ $t('label.services') }}</h6>
        <NuxtLink :to="{ name: 'menu' }" class="link link-hover">{{ $t('screen.index.title') }}</NuxtLink>
        <NuxtLink :to="{ name: 'bar' }" class="link link-hover">{{ $t('screen.bar.title') }}</NuxtLink>
        <NuxtLink :to="{ name: 'banquet' }" class="link link-hover">{{ $t('screen.banquet.menuTitle') }}</NuxtLink>
      </nav>
      <nav>
        <h6 class="footer-title">{{ $t('label.company') }}</h6>
        <NuxtLink :to="{ name: 'index' }" class="link link-hover">{{ $t('screen.about.title') }}</NuxtLink>
        <NuxtLink :to="{ name: 'events' }" class="link link-hover">{{ $t('screen.banquet.shortTitle') }}</NuxtLink>
      </nav>
      <nav>
        <h6 class="footer-title">{{ $t('label.legal') }}</h6>
        <a class="link link-hover" target="_blank" href="/privacy-policy.pdf">{{ $t('label.privacyPolicy') }}</a>
      </nav>
      <nav>
        <h6 class="footer-title">{{ $t('label.socials') }}</h6>
        <div class="grid grid-flow-col gap-4">
          <a v-for="social in socials" :key="social.value" :href="social.link" :title="social.value" target="_blank"
            class="flex items-center gap-2">
            <component :is="social.icon" class="w-8 fill-current hover:fill-primary cursor-pointer" />
          </a>
        </div>
      </nav>
    </Container>
  </footer>

</template>
