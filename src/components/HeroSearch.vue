<template>
  <div class="relative flex overflow-hidden" style="min-height: 50vh;">
    <div class="lg:block lg:absolute lg:inset-0 hidden">
      <span class="left-1/2 absolute top-0 transform translate-x-64 -translate-y-8">
        <svg class="" width="640" height="784" fill="none" viewBox="0 0 640 784">
          <defs>
            <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
            </pattern>
          </defs>
          <rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
          <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
        </svg>
        <figure class="-translate-y-1/8 -translate-x-1/6 absolute top-0 transform">
          <g-image class="w-10/12" src="~/assets/img/cart.png" alt="Shopping cartio" />
        </figure>
      </span>
    </div>

    <BaseContainer class="md:py-16 lg:py-20 w-full h-full py-12 my-auto">

      <div class="lg:hidden z-0 mb-8">
          <figure class="translate-x-1/4 translate-y-1/12 transform">
            <g-image class="h-72 w-auto -mt-20" src="~/assets/img/cart.png" alt="Shopping cart" />
          </figure>
      </div>

      <div class="lg:w-1/2 relative z-10 flex flex-col justify-center h-full">
        <ClientOnly>
          <h2 class="sm:text-4xl sm:leading-10 flex flex-col text-3xl font-extrabold leading-9 tracking-tight">
            <span class="text-gray-900">Need <vue-typer :text="items" :shuffle="true" initialAction="erasing" />?</span>
            <span class="text-blue-600">{{ $t && $t('components.HeroSearch.title')[1] }}</span>
            <!-- <span class="text-blue-600">Optimise your supermarket &amp; pharmacy visit during the COVID-19 quarantine.</span> -->
          </h2>
        </ClientOnly>
        <p class="mt-3 text-lg leading-7 text-gray-500">{{ $t && $t('components.HeroSearch.description') }}</p>
        <form class="flex mt-8" @submit.prevent="handleSubmit">
          <!-- <BaseInput v-model="zipCode" placeholder="Enter your zip-code" aria-label="Zipcode" required /> -->
          <input
            required
            v-model="zipCode"
            placeholder="Enter your ZIP Code"
            aria-label="Enter your ZIP Code"
            class="focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:max-w-xs w-full px-5 py-3 text-base leading-6 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md appearance-none"
          />
          <div class="flex-shrink-0 ml-3 rounded-md shadow">
            <BaseButton size="xl" type="submit">Search</BaseButton>
          </div>
        </form>
        <div v-if="suggestions" class="mt-8">
          <dl class="owl:mt-2 owl:mr-4 owl:-ml-2 flex flex-wrap">
            <dt class="w-full mb-1 text-gray-500">Suggestions</dt>
            <dd v-for="(suggestion, index) in suggestions" :key="index" class="text-sm font-medium leading-5">
              <g-link :to="`/shops?q=${suggestion}`" class="inline-flex items-center px-2.5 py-0.5 rounded-md bg-gray-100 text-gray-800">{{ suggestion }}</g-link>
            </dd>
          </dl>
        </div>
      </div>
    </BaseContainer>

  </div>
</template>

<script>
import BaseContainer from '~/components/base/BaseContainer'
import BaseButton from '~/components/base/BaseButton'
import BaseInput from '~/components/base/BaseInput'

export default {
  name: 'HeroSearch',
  components: {
    BaseContainer, BaseButton, BaseInput,
    VueTyper: () =>
      import ('vue-typer')
      .then(m => m.VueTyper)
      .catch(),
  },
  data () {
    return {
      zipCode: '',
      items: ['toilet paper', 'pasta', 'yeast', 'bread', 'rice', 'flour', 'hand sanitiser', 'cleaning products'],
      cities: new Set(),
      postitions: new Set(),
      zipcodes: new Set(),
    }
  },
  computed: {
    suggestions () {
      return [ ...this.zipcodes, ...this.postitions, ...this.cities ]
    },
  },
  methods: {
    handleSubmit (event) {
      // TODO: Save query in userData
      this.$router.push({
        path: 'shops',
        params: { q: this.zipCode },
        query: { q: this.zipCode },
      })
    },
  },
  mounted () {
    fetch('/api/userGeo')
      .then((response) => response.json())
      .then((data) => data.forEach((res) => {
        this.cities = new Set(this.cities.add(res.city))
        this.postitions = new Set(this.postitions.add(`${res.longitude},${res.latitude}`))
        this.zipcodes = new Set(this.zipcodes.add(res.postal))
      }))
  },
}
</script>
