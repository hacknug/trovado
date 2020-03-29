<template>
  <ClientOnly>
    <MapboxMap
      class="w-full h-full"
      access-token="pk.eyJ1IjoiaGFja251ZyIsImEiOiJjazhjMDN2Mm4waDN6M2VtamV3ZmdnMjB4In0.SQvCWv7t6pKfk_HOK_sZQg"
      map-style="mapbox://styles/mapbox/streets-v11"
      :zoom="14"
      :pitch="0"
      :center="center"
      :bounds="filteredShops && filteredShops.map(({ node: { lat, lng } }) => [lng, lat])"
      :fitBoundsOptions="{ padding: { top: 90, right: 160, bottom: 90, left: 160 } }"
      @mb-created="handleInstance"
    >
      <MapboxGeocoder />
      <MapboxNavigationControl position="bottom-right" />

      <MapboxMarker v-for="{ node } in shops" :key="node.id" :lngLat="[node.lng, node.lat]" popup>
        <LocationPin class="text-blue-600" />
        <template v-slot:popup>
          <p>Hello world!</p>
        </template>
      </MapboxMarker>

    </MapboxMap>
  </ClientOnly>
</template>

<script>
// TODO: Remove `electron` from dependencies (bug @ `@studiometa/vue-mapbox-gl`)
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import LocationPin from '~/components/icon/LocationPin'

export default {
  name: 'ShopMap',
  components: {
    LocationPin,
    MapboxMap: () =>
      import ('@studiometa/vue-mapbox-gl')
      .then(m => m.MapboxMap)
      .catch(),
    MapboxMarker: () =>
      import ('@studiometa/vue-mapbox-gl')
      .then(m => m.MapboxMarker)
      .catch(),
    MapboxNavigationControl: () =>
      import ('@studiometa/vue-mapbox-gl')
      .then(m => m.MapboxNavigationControl)
      .catch(),
    MapboxGeocoder: () =>
      import ('@studiometa/vue-mapbox-gl')
      .then(m => m.MapboxGeocoder)
      .catch(),
  },
  props: {
    shops: {
      type: Array,
      required: true,
    },
    filteredShops: {
      type: Array,
      required: false,
    },
  },
  data () {
    return {
      map: null,
      center: [0, 0],
    }
  },
  methods: {
    handleInstance (mapboxInstance) {
      this.map = mapboxInstance
    },
    flyTo () {
      this.map && this.map.flyTo({ center: this.center })
    },

    geolocateUser () {
      if (process.isClient) {
        navigator.geolocation.getCurrentPosition((position) => {
          this.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
        })
      }
    }
  },
  watch: {
    center: 'flyTo',
  },
  async mounted () {
    !this.filteredShops && this.geolocateUser()
  },
}
</script>
