<template>
  <Layout>
    <template slot="bleed">
      <FetchShops :center="center || pageCenter" v-slot="{ features, loading }">
        <ShopFilters
          :shops="features"
          :loading="loading"
          :userLocation="pageCenter"
          @changeCenter="center = $event"
        />
      </FetchShops>
    </template>
  </Layout>
</template>

<script>
import FetchShops from '~/components/FetchShops'
import ShopFilters from '~/components/ShopFilters'

export default {
  components: { FetchShops, ShopFilters },
  metaInfo () {
    return {
      title: this.$t && this.$t('navigation.main.shops'),
    }
  },
  data () {
    return {
      center: null,
      queryCenter: null,
      userLocation: null,
    }
  },
  computed: {
    pageCenter () {
      const q = this.queryCenter && this.queryCenter.split(',')
      return q && q.length > 1 ? { lat: q[1], lng: q[0] } : this.userLocation
    },
  },
  methods: {
    makeLngLat: (coords) => ({ lat: coords.latitude, lng: coords.longitude }),
    geolocateUser () {
      if (process.isClient) {
        // navigator.permissions.query({ name: 'geolocation' })
        //   .then((status) => console.info(status))
        navigator.geolocation.getCurrentPosition(
          (position) => this.userLocation = this.makeLngLat(position.coords),
          (error) => console.error(error),
          { enableHighAccuracy: true },
        )
      }
    },
  },
  watch: {
    $route: {
      immediate: true,
      handler (to, from) {
        this.queryCenter = to.query.q
      },
    },
  },
  mounted () {
    this.geolocateUser()
  },
}
</script>
