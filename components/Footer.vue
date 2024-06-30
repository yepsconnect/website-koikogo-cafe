<script setup lang="ts">
import IconTelegram from "../components/IconTelegram.vue"
import IconViber from "../components/IconViber.vue"
import IconVK from "../components/IconVK.vue"
import IconWhatsApp from "../components/IconWhatsApp.vue"

const config = useRuntimeConfig();
const { t } = useI18n();
const socials = [
  {
    label: t('label.vk'),
    value: "vk",
    icon: IconVK,
    link: "https://vk.com/imeny_koykogo"
  },
  {
    label: t('label.telegram'),
    value: "telegram",
    icon: IconTelegram,
    link: "https://t.me/+79511985779"
  },
  {
    label: t('label.whatsup'),
    value: "whatsapp",
    icon: IconWhatsApp,
    link: "https://wa.me/79511985779"
  },
  {
    label: t('label.viber'),
    value: "viber",
    icon: IconViber,
    link: "viber://chat?number=79511985779"
  },
]

function formatPhoneNumber(phoneNumber: string): string {
  if (!phoneNumber) {
    return ""
  }
  const match = phoneNumber.match(/^\+7(\d{3})(\d{3})(\d{2})(\d{2})$/);

  if (match) {
    const [, areaCode, firstPart, secondPart, thirdPart] = match;
    return `+7 (${areaCode}) ${firstPart}-${secondPart}-${thirdPart}`;
  } else {
    throw new Error("Invalid phone number format");
  }
}
</script>

<template>
  <footer class="py-5 border-t flex flex-col items-center gap-3 justify-center">
    <Container class="w-full flex flex-col items-center gap-3">
      <div class="flex flex-col md:flex-row justify-between items-center gap-2 w-full">
        <a v-for="social in socials" :key="social.value" :href="social.link" :title="social.value" target="_blank"
          class="flex items-center gap-2">
          <component :is="social.icon" />
          {{ social.label }}
        </a>

      </div>
      <div class="flex flex-col md:flex-row justify-around items-center gap-2 w-full">
        <a :href="`tel:${config.PHONE_NUMBER}`" target="_blank" rel="noreferrer noopener"
          class="flex items-center gap-2">
          <svg width="24px" class="button__icon" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M7.8992 16.1003C1.71202 9.91313 2.10865 5.13406 4.93707 3.01274C5.14328 2.85808 5.34662 2.70651 5.5471 2.55803L5.54708 2.55801C6.21282 2.06494 7.15221 2.20492 7.64528 2.87065C7.65431 2.88285 7.66316 2.89518 7.67182 2.90765L9.24358 5.1703C9.68111 5.80017 9.57306 6.65862 8.99309 7.16042L7.5696 8.39207C7.08994 8.80708 6.92316 9.47893 7.15306 10.0701C7.61299 11.2527 8.56171 12.5628 9.9992 14.0003C11.4365 15.4376 12.7462 16.3861 13.9284 16.8457L13.9284 16.8456C14.5195 17.0755 15.1913 16.9087 15.6062 16.429L16.838 15.0054C17.3398 14.4254 18.1983 14.3173 18.8281 14.7549L21.0936 16.3286C21.774 16.8012 21.9424 17.7359 21.4697 18.4163C21.4614 18.4284 21.4528 18.4403 21.4441 18.4521C21.2953 18.6533 21.1434 18.8573 20.9884 19.0641C18.8671 21.8925 14.0864 22.2875 7.8992 16.1003Z"
              class="fill-current"></path>
          </svg>
          {{ formatPhoneNumber(config.PHONE_NUMBER) }}
        </a>
      </div>
      <a href="https://t.me/yepsconnect" target="_blank">
        Created by Dmitry Kungurov
      </a>
    </Container>
  </footer>
</template>
