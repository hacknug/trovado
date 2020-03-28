<template>
  <div class="bg-gray-50 lg:py-24 py-16 overflow-hidden">
    <div class="sm:px-6 lg:px-8 lg:max-w-screen-xl relative max-w-xl px-4 mx-auto">

      <svg class="lg:block left-full -translate-y-1/4 absolute hidden transform -translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
        <defs>
          <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
          </pattern>
        </defs>
        <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
      </svg>

      <div class="relative">
        <h3 class="sm:text-4xl sm:leading-10 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900">
          <ClientOnly>
            A <vue-typer :text="['better', 'safer']" initialAction="erasing" /> way to shop during quarantine
          </ClientOnly>
        </h3>
        <p class="max-w-3xl mx-auto mt-4 text-xl leading-7 text-center text-gray-500">
          Queremos reducir el número de gente que baja al supermercado, poniéndose en riesgo, informándote de la disponibilidad de los productos más esenciales.
        </p>
      </div>

      <div class="sm:rounded-lg relative mt-12 overflow-hidden bg-white shadow">
        <div class="h-96 sm:p-6 px-4 py-5">
          <ClientOnly>
            <mapbox-map
              style="position: absolute;"
              class="sm:rounded-lg absolute inset-0 w-full h-full"
              access-token="pk.eyJ1IjoiaGFja251ZyIsImEiOiJjazhjMDN2Mm4waDN6M2VtamV3ZmdnMjB4In0.SQvCWv7t6pKfk_HOK_sZQg"
              map-style="mapbox://styles/mapbox/streets-v11"
              :center="center"
              :trackUserLocation="true"
              @mb-created="handleInstance"
            />
          </ClientOnly>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import 'mapbox-gl/dist/mapbox-gl.css';

export default {
  name: 'HeroMap',
  components: {
    VueTyper: () =>
      import ('vue-typer')
      .then(m => m.VueTyper)
      .catch(),
    MapboxMap: () =>
      import ('@studiometa/vue-mapbox-gl')
      .then(m => m.MapboxMap)
      .catch(),
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
