<template>
  <div class="relative overflow-hidden" style="height: 50vh;">
    <div class="lg:block lg:absolute lg:inset-0 hidden">
      <svg class="left-1/2 absolute top-0 transform translate-x-64 -translate-y-8" width="640" height="784" fill="none" viewBox="0 0 640 784">
        <defs>
          <pattern id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047" x="118" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect y="72" width="640" height="640" class="text-gray-50" fill="currentColor" />
        <rect x="118" width="404" height="784" fill="url(#9ebea6f4-a1f5-4d96-8c4e-4c2abf658047)" />
      </svg>
    </div>

    <BaseContainer class="md:py-16 lg:py-20 w-full h-full py-12">
      <div class="flex flex-col justify-center h-full">
        <ClientOnly>
          <h2 class="sm:text-4xl sm:leading-10 lg:w-1/2 flex flex-col text-3xl font-extrabold leading-9 tracking-tight">
            <span class="text-gray-900">Need <vue-typer :text="items" :shuffle="true" initialAction="erasing" />?</span>
            <span class="text-blue-600">Check the availability of your closest shops and pharmacies.</span>
            <!-- <span class="text-blue-600">Optimise your supermarket &amp; pharmacy visit during the COVID-19 quarantine.</span> -->
          </h2>
        </ClientOnly>
        <p class="mt-3 text-lg leading-7 text-gray-500">
          Find everything you need and reduce unnecessary movements to risk areas.
        </p>
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
    }
  },
  methods: {
    handleSubmit (event) {
      this.$router.push({
        path: 'shops',
        params: { zipcode: this.zipCode },
        query: { zipcode: this.zipCode },
      })
    },
  },
}
</script>
