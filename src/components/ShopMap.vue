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
      <MapboxMarker v-for="{ id, geometry, properties } in shops" :key="id" :lngLat="geometry.coordinates" popup>
        <template slot="popup"><pre>{{ { id, geometry, properties } }}</pre></template>
        <LocationPin :class="[
          'block',
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
import { GeolocateControl, NavigationControl } from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css'

import LocationPin from '~/components/icon/LocationPin'

export default {
  name: 'ShopMap',
  components: {
    LocationPin,
    ...Object.fromEntries(['MapboxMap', 'MapboxMarker', 'MapboxLayer']
      .map((entry) => [entry, () => import ('@studiometa/vue-mapbox-gl').then(m => m[entry]).catch()])),
  },
  props: {
    shops: {
      type: [Array, Object],
      required: false,
    },
    center: {
      type: Array,
      required: false,
      default: () => [ 0, 0 ],
    },
  },
  data () {
    return {
      map: null,
      token: process.env.GRIDSOME_MAPBOX_TOKEN,
      style: 'mapbox://styles/hacknug/ck8lvwnj912cf1ilbq2wt1sz6',
    }
  },
  methods: {
    flyTo (center) {
      this.map && this.map.flyTo({ center })
    },

    handleInstance (mapboxInstance) {
      this.map = mapboxInstance
      this.map.addControl(new NavigationControl({
      }), 'top-right')
      this.map.addControl(new GeolocateControl({
        positionOptions: { enableHighAccuracy: true },
        trackUserLocation: true,
      }), 'top-right')
    },
    handleMoving () {
      const center = this.map.getCenter()
      this.$emit('move', [center.lng, center.lat])
    },
  },
}
</script>

<style lang="postcss">
  .mapboxgl-ctrl-attrib-inner,
  .mapboxgl-ctrl-logo { @apply hidden !important; }
</style>
