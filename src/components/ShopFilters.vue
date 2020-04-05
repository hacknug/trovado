<template>
  <div class="flex flex-col flex-1">
    <div v-if="!(center || userLocation)">
      <p>Please allow us to use your geolocation</p>
      <button @click="geolocateUser">Geolocate</button>
    </div>
    <FetchShops v-else :center="center || userLocation" v-slot="{ features, loading }">
      <div class="flex flex-1">

        <div class="owl:mt-5 bg-gray-50 flex-grow w-full max-w-lg p-5 pt-0 border-r border-gray-100 shadow">
          <header class="bg-gray-50 md:flex md:items-center md:justify-between sticky top-0 z-10 p-5 -mx-5 border-b border-gray-200">
            <h2 class="sm:text-3xl sm:leading-9 sm:truncate text-2xl font-bold leading-7 text-gray-900">Closest Shops</h2>
            <p class="sm:text-3xl sm:leading-9 sm:truncate text-2xl font-bold leading-7 text-gray-900">{{ Object.keys(features).length }}</p>
          </header>
          <div v-if="loading" class="m-auto text-center">Loading…</div>
          <div v-else class="owl:mt-5">
            <ShopCard v-for="shop in features" :key="shop.id" :shop="shop" @flyTo="$refs.map.flyTo($event)" />
          </div>
        </div>

        <div class="sticky top-0 w-full max-h-screen">
          <ShopMap ref="map" :shops="features" :center="userLocation" @move="center = $event" @center="center = $event" />
        </div>

      </div>
    </FetchShops>
  </div>
</template>

<script>
import FetchShops from '~/components/FetchShops'
import ShopCard from '~/components/ShopCardMapbox'
import ShopMap from '~/components/ShopMap'

export default {
  name: 'ShopFilters',
  components: { FetchShops, ShopCard, ShopMap },
  data () {
    return {
      center: null,
      userLocation: null,
    }
  },
  methods: {
    makeLngLat: (coords) => ({ lat: coords.latitude, lng: coords.longitude }),
    geolocateUser () {
      if (process.isClient) {
        navigator.permissions.query({ name: 'geolocation' })
          .then((status) => console.info(status))
        navigator.geolocation.getCurrentPosition(
          (position) => this.userLocation = this.makeLngLat(position.coords),
          (error) => console.error(error),
          { enableHighAccuracy: true },
        )
      }
    },
  },
  mounted () {
    this.geolocateUser()
  },
}
</script>

<style lang="postcss" scoped>
  header {
    top: 56px;
    @screen md { top: 64px; }
  }
</style>
