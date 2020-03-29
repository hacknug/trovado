<template>
  <ClientOnly>
    <mapbox-map
      class="w-full h-full"
      access-token="pk.eyJ1IjoiaGFja251ZyIsImEiOiJjazhjMDN2Mm4waDN6M2VtamV3ZmdnMjB4In0.SQvCWv7t6pKfk_HOK_sZQg"
      map-style="mapbox://styles/mapbox/streets-v11"
      :zoom="14"
      :pitch="60"
      :center="center"
      :trackUserLocation="true"
      @mb-created="handleInstance"
      ><mapbox-navigation-control position="bottom-right" />
      <mapbox-marker v-for="{ node } in shops" :key="node.id" :lngLat="[node.lng, node.lat]" popup>
        <template v-slot:popup>
          <p>Hello world!</p>
        </template>
      </mapbox-marker>
    </mapbox-map>
  </ClientOnly>
</template>

<script>
export default {
  name: 'ShopMap',
  components: {
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
  },
  props: {
    shops: {
      type: Array,
      required: true,
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
    this.geolocateUser()
  },
}
</script>
