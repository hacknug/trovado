<template>
  <Layout>
    <template slot="bleed">
      <FetchShops :center="center || userLocation" v-slot="{ features, loading }">
        <ShopFilters
          :shops="filterShops(features)"
          :loading="loading"
          :userLocation="userLocation"
          @changeCenter="center = $event"
          @updateTerms="shopTypeTerms = $event"
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
      userLocation: null,

      shopTypeTerms: [ 'food_and_drink_stores', 'medical' ],
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

    filterShops (shops = {}) {
      return Object.fromEntries(Object.entries(shops).filter(([id, shop]) => {
        return this.shopTypeTerms.includes(shop.properties.class)
      }))
    },
  },
  mounted () {
    this.geolocateUser()
  },
}
</script>
