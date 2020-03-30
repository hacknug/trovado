<template>
  <div class="lg:py-24 py-16">
    <BaseContainer>
      <div class="lg:text-center">
        <p class="text-base font-semibold leading-6 tracking-wide text-blue-600 uppercase">How it works?</p>
        <h3 class="sm:text-4xl sm:leading-10 mt-2 text-3xl font-extrabold leading-8 tracking-tight text-gray-900">
          <ClientOnly>
            A <vue-typer :text="['better', 'safer']" initialAction="erasing" /> way to shop during quarantine
          </ClientOnly>
        </h3>
        <p class="lg:mx-auto max-w-2xl mt-4 text-xl leading-7 text-gray-500">
          We want to reduce people’s exposure to the COVID-19 by letting everyone know whether the items they’re looking for are available in their nearest supermarket or not.
        </p>
      </div>

      <div class="lg:mt-16 flex flex-col justify-center mt-10">
        <ul class="md:grid md:grid-cols-1 md:col-gap-8 md:row-gap-10 md:owl:mt-0 owl:mt-10 lg:w-1/3">
          <li v-for="(feature, index) in features" :key="index">
            <div class="flex">
              <div class="flex-shrink-0">
                <div class="flex items-center justify-center w-12 h-12 text-white bg-blue-500 rounded-md">
                  <component v-if="feature.icon" :is="feature.icon" class="w-6 h-6" />
                </div>
              </div>
              <div class="ml-4">
                <h5 class="text-lg font-medium leading-6 text-gray-900">{{ feature.title }}</h5>
                <p class="mt-2 text-base leading-6 text-gray-500">{{ feature.description }}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </BaseContainer>
  </div>
</template>

<script>
import { CalendarIcon, GiftIcon, MapPinIcon, HeartIcon, UsersIcon } from 'vue-feather-icons'

import BaseContainer from '~/components/base/BaseContainer'

export default {
  name: 'HeroFeatures',
  components: {
    BaseContainer,
    VueTyper: () =>
      import ('vue-typer')
      .then(m => m.VueTyper)
      .catch(),
  },
  data () {
    return {
      features: [
        {
          title: 'Explore your neighbourhood',
          description: 'Find supermarkets and pharmacies near your home that offer the products you need.',
          icon: MapPinIcon,
        },
        {
          title: 'Plan ahead',
          description: 'Let us know the items that you need in and your location. We\'ll take care of the rest.',
          icon: CalendarIcon,
        },
        {
          title: 'Go safely to the supermarket!',
          description: 'We\'ll let you know the best time to go so you can avoid the long lines and empty shelves.',
          icon: HeartIcon,
        },
        {
          title: 'Help your community',
          description: 'Update product availability levels from what you’ve seen at your local supermarket.',
          icon: UsersIcon,
        },
        {
          title: 'Unlock shiny rewards',
          description: 'Become a trusted contributor and gain badges by improving the accuracy of your supermarket shelf information.',
          icon: GiftIcon,
        },
      ],
    }
  },
}
</script>
