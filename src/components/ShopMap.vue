<template>
  <ClientOnly>
    <MapboxMap
      class="w-full h-full"
      :accessToken="token"
      :mapStyle="style"
      :zoom="16"
      :pitch="0"
      :center="center"
      @mb-created="handleInstance"
      @mb-moveend="handleMoving"
    >
      <MapboxGeocoder />
      <MapboxNavigationControl position="bottom-right" />

      <MapboxMarker v-for="{ id, geometry, properties } in features" :key="id" :lngLat="geometry.coordinates" popup>
        <template slot="popup"><pre>{{ properties }}</pre></template>
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
      center: { lng: 2.15899, lat: 41.38879 },
      features: {},

      blacklist: [
        'lodging', 'education', 'food_and_drink', 'public_facilities', 'historic',
        'store_like', 'commercial_services', 'visitor_amenities', 'arts_and_entertainment',
        'motorist', 'park_like', 'sport_and_leisure', 'general', 'building', 'religion',
        'industrial', 'place_like',

        /*  ——— TYPES ———  */
        // 'School', 'Theatre', 'Books', 'Library', 'Park', 'Garden', 'Mobile Phone',
        // 'Drinking Water', 'Marketplace', 'Monument', 'Memorial', 'Community Centre',
        // 'Restaurant', 'Fast Food', 'Cafe', 'Bar', 'Brewery', 'Pub', 'Employment Agency',
        // 'Retail', 'Department Store', 'Confectionery', 'Toys', 'Post Office',
        // 'Bank', 'Hairdresser', 'Dentist', 'Pet', 'Bicycle', 'Social Facility',
        // 'Hotel', 'Hostel', 'Laundry', 'Fabric', 'Parking', 'Optician', 'Shoes',
        // 'Kindergarten', 'Clothes', 'Sports', 'Ice Cream', 'Car Repair', 'Playground',
        // 'Driving School', 'Company', 'Fuel', 'Financial',
      ],

      // TODO: Load via process.env
      token: 'pk.eyJ1IjoiaGFja251ZyIsImEiOiJjazhjMDN2Mm4waDN6M2VtamV3ZmdnMjB4In0.SQvCWv7t6pKfk_HOK_sZQg',
      style: 'mapbox://styles/hacknug/ck8lvwnj912cf1ilbq2wt1sz6',
    }
  },
  methods: {
    flyTo () {
      this.map && this.map.flyTo({ center: this.center })
    },

    async getPlaces (center = this.center) {
      const coords = `${center.lng},${center.lat}`
      const endpoint = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v8/tilequery'
      await fetch(`${endpoint}/${coords}.json?radius=500&limit=50&geometry=point&layers=poi_label&access_token=${this.token}`)
        .then((res) => res.json())
        .then((data) => {
          data.features
            .filter(({ properties }) => !this.blacklist.includes(properties.class))
            .forEach((feature) => this.$set(this.features, feature.id, feature))
        })
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
    },

    handleInstance (mapboxInstance) {
      this.map = mapboxInstance
    },
    handleMoving () {
      this.getPlaces(this.map.getCenter())
    },
  },
  watch: {
    center: {
      immediate: process.isClient,
      handler: function () {
        this.getPlaces()
        this.flyTo()
      },
    },
  },
  async mounted () {
    this.geolocateUser()
  },
}
</script>
