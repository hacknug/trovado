<template>
  <Layout>
    <template slot="bleed">
      <ShopFilters />
      <!-- <HeroMap :shops="$page.heroMap.edges" :filteredShops="filteredShops" /> -->
      <!-- <ShopList :shops="$page.pagedShops.edges" /> -->
      <!-- <BasePager :pageInfo="$page.pagedShops.pageInfo" /> -->
    </template>
  </Layout>
</template>

<page-query>
  query ($page: Int) {
    pagedShops: allShop (perPage: 20, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          id
          path

          country: p
          province: pv
          state: lc
          address: dr
          zipcode: cp
          phone: tf

          lat: lt
          lng: lg

          parking: pk
          date: fap

          # in
          # fi
          # fs
        }
      }
    }
    heroMap: allShop (filter: { lt: { ne: 0 } }) {
      edges {
        node {
          id

          country: p
          province: pv
          state: lc
          address: dr
          zipcode: cp
          phone: tf

          lat: lt
          lng: lg

          parking: pk
          date: fap

          # in
          # fi
          # fs
        }
      }
    }
  }
</page-query>

<script>
import BasePager from '~/components/base/BasePager'
import HeroMap from '~/components/HeroMap'
import ShopList from '~/components/ShopList'
import ShopFilters from '~/components/ShopFilters'

export default {
  components: { BasePager, HeroMap, ShopList, ShopFilters },
  metaInfo: {
    title: 'Shops',
  },
  computed: {
    filteredShops () {
      const { zipcode } = this.$route.query || this.$route.params
      return zipcode && this.$page.heroMap.edges.filter(({ node }) => node.zipcode === zipcode)
    },
  },
}
</script>
