<template>
  <div>
    <q-carousel
      v-model="slide"
      swipeable
      animated
      :padding="padding"
      :vertical="vertical"
      :arrows="arrows"
      :navigation="navigation"
      :navigation-position="navPos"
      height="300px"
      class="bg-purple text-white rounded-borders"
    >
    <q-carousel-slide :name="1" img-src="https://cdn.quasar.dev/img/mountains.jpg" />
      <q-carousel-slide :name="2" img-src="https://cdn.quasar.dev/img/parallax1.jpg" />
      <q-carousel-slide :name="3" img-src="https://cdn.quasar.dev/img/parallax2.jpg" />
      <q-carousel-slide :name="4" img-src="https://cdn.quasar.dev/img/quasar.jpg" />
    </q-carousel>
  </div>
</template>

<script>
import { ref, watch } from 'vue'

export default {
  name: 'CarouselSlide',

  setup () {
    const navPos = ref('bottom')
    const vertical = ref(false)

    watch(vertical, val => {
      navPos.value = val === true
        ? 'right'
        : 'bottom'
    })

    return {
      padding: ref(true),
      vertical,
      arrows: ref(true),
      navigation: ref(true),

      navPos,
      navigationPositions: [
        { value: 'top', label: 'top' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom (default)' },
        { value: 'left', label: 'left' }
      ],

      slide: ref('style'),
      lorem: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo.'
    }
  }
}
</script>
