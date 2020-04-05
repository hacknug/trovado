<template>
  <ClientOnly>
    <MapboxMap
      class="w-full h-full"
      :accessToken="token"
      :mapStyle="style"
      :zoom="17"
      :pitch="0"
      :center="center"
      @mb-created="handleInstance"
      @mb-moveend="handleMoving"
    >
      <MapboxGeocoder types="poi" :enableEventLogging="false" />
      <MapboxNavigationControl position="bottom-right" />

      <MapboxMarker v-for="{ id, geometry, properties } in shops" :key="id" :lngLat="geometry.coordinates" popup>
        <template slot="popup"><pre>{{ { id, geometry, properties } }}</pre></template>
        <LocationPin :class="[
          properties.class === 'food_and_drink_stores' ? 'text-blue-600'
          : properties.class === 'medical' ? 'text-green-600'
          : 'text-gray-600',
        ]" />
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
    MapboxLayer: () =>
      import ('@studiometa/vue-mapbox-gl')
      .then(m => m.MapboxLayer)
      .catch(),
  },
  props: {
    shops: {
      type: [Array, Object],
      required: false,
    },
    center: {
      type: Object,
      required: false,
    },
  },
  data () {
    return {
      map: null,

      // TODO: Load via process.env
      token: 'pk.eyJ1IjoiaGFja251ZyIsImEiOiJjazhjMDN2Mm4waDN6M2VtamV3ZmdnMjB4In0.SQvCWv7t6pKfk_HOK_sZQg',
      style: 'mapbox://styles/hacknug/ck8lvwnj912cf1ilbq2wt1sz6',
    }
  },
  methods: {
    flyTo (center) {
      this.map && this.map.flyTo({ center })
    },

    handleInstance (mapboxInstance) {
      this.map = mapboxInstance
    },
    handleMoving () {
      this.$emit('move', this.map.getCenter())
    },
  },
}
</script>

<style lang="postcss">
  .mapboxgl-ctrl-attrib-inner,
  .mapboxgl-ctrl-logo { @apply hidden !important; }
</style>
