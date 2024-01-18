<script setup>
const active = ref(1);
const activeDish = ref(1);

setInterval(() => {
  if (active.value === 8) {
    active.value = 0;
  }
  if (activeDish.value === 4) {
    activeDish.value = 0;
  }
  active.value++;
  activeDish.value++;
}, 3000);
</script>

<template>
  <Container class="flex flex-col gap-10">
    <Menu />
    <section class="h-screen w-full flex justify-center items-center">
      <div class="flex flex-col md:flex-row items-center md:items-end">
        <Logo class="max-w-64" animated />
        <div>
          <h1 class="text-4xl font-bold uppercase">
            <span class="text-2xl">Кафе</span>
            <br />
            Имени
            <br />
            Койкого
          </h1>
        </div>
      </div>
    </section>
    <section class="flex flex-col gap-6">
      <h2 class="text-3xl font-bold">
        Кафе имени Койкого. <br />Так, все-таки, кого?
      </h2>
      <div class="max-h-96 overflow-hidden">
        <img
          src="@/assets/images/place0.jpg"
          alt="place0"
          loading="lazy"
          class="object-cover"
        />
      </div>
      <p class="text-lg">
        Кого-то, к кому приходишь в гости, как к доброму другу, кто удивительно
        вкусно накормит, каждый раз приятно удивит, с кем сытный ужин или пара
        бокалов вина пролетят незаметно. Стеклянный купол с панорамным видом на
        город, разнообразное меню и теплый сервис порадуют любого, кто решит
        заглянуть к нам после неспешной прогулки по любимым окрестностям.
      </p>
      <p>Почему же все таки кафе имени КОЙКОГО?</p>

      <div>
        <p>
          Вдохновение пришло к нам после просмотра советского фильма «По
          семейным обстоятельствам», который прославился благодаря данному
          диалогу:
        </p>

        <ul>
          <li>
            — Так. Надо лечить. Вы буфете прифозить февочку ко мне дфа яза в
            нефелю.
          </li>
          <li>— Куда?</li>
          <li>— На улицу Койкого.</li>
          <li>— Койкого это куда?</li>
          <li>— Улица Койкого.</li>
        </ul>
      </div>

      <p>
        «Койкого» - так в старой комедии назвал улицу имени Горького
        картаво-шепелявый логопед.
      </p>

      <p>
        Эта фраза зацепила нас и прекрасно дополнила семейную концепцию нашего
        заведения.
      </p>

      <div class="flex flex-col md:flex-row justify-center gap-6">
        <a class="btn btn-primary w-full md:max-w-xs" href="tel:+79511985779">
          Позвонить
        </a>
      </div>
    </section>
    <section class="grid md:grid-cols-2 gap-6">
      <div class="flex flex-col justify-center gap-6">
        <h2 class="text-3xl">Хочется чего-то нового?</h2>
        <p class="text-lg">
          Мы позаботились о том, чтобы после посещения нашего кафе никто не ушел
          голодным, и именно поэтому уделили особое внимание разработке блюд для
          самых юных гостей
        </p>
        <p class="text-lg">
          А для тех, кто хочет всё и сразу или не может определиться с выбором,
          мы сделали это за вас! Рады представить самое непредсказуемое
          сочетание: ПИЦЦА С ПЕЛЬМЕНЯМИ. Сочная, сытная пицца с домашними
          пельмешками на хрустящем тесте - такого вы точно не ожидали, но
          обещаем, что останетесь в восторге.
        </p>
        <p class="text-lg">
          Вы еще не пробовали? Надо срочно исправлять ситуацию!
        </p>

        <div class="grid grid-cols-2 gap-6">
          <NuxtLink to="/" class="btn btn-primary md:w-auto btn-block">
            Кухня
          </NuxtLink>
          <NuxtLink to="/bar" class="btn btn-primary md:w-auto btn-block">
            Бар
          </NuxtLink>
        </div>
      </div>
      <div class="columns-2 hidden md:block">
        <div class="h-6"></div>
        <div class="avatar w-full mb-4">
          <div class="w-full">
            <img src="@/assets/images/dish2.jpeg" alt="dish2" loading="lazy" />
          </div>
        </div>
        <img src="@/assets/images/dish1.jpeg" alt="dish1" loading="lazy" />
        <img
          src="@/assets/images/dish4.jpeg"
          alt="dish4"
          loading="lazy"
          class="mb-4"
        />
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/dish3.jpeg" alt="dish3" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="md:hidden">
        <div class="avatar w-full" v-if="activeDish === 1">
          <div class="w-full">
            <img
              src="@/assets/images/dish1.jpeg"
              alt="dish1"
              loading="lazy"
              class="object-cover"
            />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activeDish === 2">
          <div class="w-full">
            <img
              src="@/assets/images/dish2.jpeg"
              alt="dish2"
              loading="lazy"
              class="object-cover"
            />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activeDish === 3">
          <div class="w-full">
            <img
              src="@/assets/images/dish3.jpeg"
              alt="dish3"
              loading="lazy"
              class="object-cover"
            />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="activeDish === 4">
          <div class="w-full">
            <img
              src="@/assets/images/dish4.jpeg"
              alt="dish4"
              loading="lazy"
              class="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="grid lg:grid-cols-2 gap-6">
        <div class="lg:order-2 flex flex-col justify-center gap-6">
          <h2 class="text-3xl">А уютно?</h2>
          <p class="text-lg">
            Стильный, современный, говорящий о многом, увлекающий пространством
            и вдохновляющий на новые свершения
          </p>
          <p class="text-lg">
            Интерьер <NuxtLink to="/">кафе ИМЕНИ КОЙКОГО</NuxtLink> не оставит
            ни одного любителя прекрасного, эстета, гурмана стиля и современных
            тенденций равнодушным
          </p>
          <p class="text-lg">
            Приходя к нам в кафе, вы погружаетесь в особую атмосферу. Стеклянный
            купол с панорамным видом на город, разнообразное меню и теплый
            сервис порадуют любого, кто решит заглянуть к нам после неспешной
            прогулки по любимым окрестностям.
          </p>
          <a
            class="btn btn-primary w-full md:max-w-xs"
            href="https://koy-kogo.restoplace.ws/"
            target="_blank"
          >
            Забронировать столик
          </a>
        </div>
        <div class="lg:order-1 columns-2">
          <div class="avatar w-full mb-4">
            <div class="w-full">
              <img src="@/assets/images/place1.jpeg" alt="1" loading="lazy" />
            </div>
          </div>

          <img
            src="@/assets/images/place3.jpeg"
            alt="3"
            loading="lazy"
            class="mb-4"
          />
          <img
            src="@/assets/images/place4.jpeg"
            alt="4"
            loading="lazy"
            class="mb-4"
          />
          <div class="avatar w-full">
            <div class="w-full">
              <img src="@/assets/images/place5.jpeg" alt="5" loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="grid lg:grid-cols-2 gap-6">
      <div class="flex flex-col gap-6">
        <h2 class="text-3xl font-bold">Легко найти?</h2>
        <p class="text-lg">
          Мы всегда рады приветствовать вас в кафе в историческом центре города
          - на всеми известной улице в кой-каком парке.
        </p>
        <p class="text-lg">
          Mы выбрали местечко подальше от шума и суеты каруселей, с видом на
          прекрасную, живописную ротонду. Ах, уже предвкушаем эти роскошные
          закаты на Ижевском пруду, музыкальные вечера и Ваши улыбки...
        </p>
        <p class="text-lg">Наш «дом» — это летний сад или Парк Горького!</p>
        <div class="flex">
          <a class="btn btn-primary w-full md:max-w-xs" href="tel:+79511985779">
            Позвонить
          </a>
        </div>
      </div>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A63ccde52ac73bdd72e9a96d3dfe386069f6869a31541ddf24841c7908d8bc31b&amp;source=constructor"
        width="100%"
        height="400"
        frameborder="0"
      ></iframe>
    </section>
    <section class="flex flex-col gap-6">
      <h2 class="text-3xl font-bold">
        Однажды попробовав – влюбишься навсегда
      </h2>
      <p class="text-lg">
        Выбирайте любую из причин посетить Койкого: встретиться с друзьями за
        завтраком, провести романтический ужин с видом на набережную или просто
        - по семейным обстоятельствам! В любую погоду, мы создадим
        непревзойденную атмосферу, авторскую кухню и дружелюбный сервис.
      </p>

      <div class="md:hidden">
        <div class="avatar w-full" v-if="active === 1">
          <div class="w-full">
            <img src="@/assets/images/people1.jpeg" alt="1" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 2">
          <div class="w-full">
            <img src="@/assets/images/people2.jpeg" alt="2" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 3">
          <div class="w-full">
            <img src="@/assets/images/people3.jpeg" alt="3" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 4">
          <div class="w-full">
            <img src="@/assets/images/people4.jpeg" alt="4" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 5">
          <div class="w-full">
            <img src="@/assets/images/people5.jpeg" alt="5" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 6">
          <div class="w-full">
            <img src="@/assets/images/people6.jpeg" alt="6" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 7">
          <div class="w-full">
            <img src="@/assets/images/people7.jpeg" alt="7" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full" v-else-if="active === 8">
          <div class="w-full">
            <img src="@/assets/images/people8.jpeg" alt="8" loading="lazy" />
          </div>
        </div>
      </div>
      <div class="hidden md:grid md:grid-cols-4 gap-6">
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people1.jpeg" alt="1" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people2.jpeg" alt="2" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people3.jpeg" alt="3" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people4.jpeg" alt="4" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people5.jpeg" alt="5" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people6.jpeg" alt="6" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people7.jpeg" alt="7" loading="lazy" />
          </div>
        </div>
        <div class="avatar w-full">
          <div class="w-full">
            <img src="@/assets/images/people8.jpeg" alt="8" loading="lazy" />
          </div>
        </div>
      </div>
      <p class="text-lg">А вы уже были в нашем стильном пространстве?</p>
      <p class="text-lg">Поделитесь ощущениями и чувствами!</p>
      <a
        class="btn btn-primary capitalize md:max-w-xs"
        href="https://yandex.ru/maps/org/imeni_koykogo/66827419380/?ll=53.197919%2C56.846779&z=16"
        target="_blank"
      >
        Рассказать
      </a>
    </section>
  </Container>
</template>
