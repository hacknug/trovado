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
import { mapState } from 'vuex'

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
    }
  },
  computed: {
    ...mapState(['userLocation']),

    pageCenter () {
      const query = this.queryCenter && this.queryCenter.split(',')
      return query && query.length > 1 ? query : this.userLocation
    },
  },
  methods: {
    async geolocateUser () {
      if (process.isClient && !this.userLocation.length) {
        this.$store.dispatch('GET_USER_LOCATION')
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
