<template>
  <Layout>
    <template slot="bleed">
      <HeroMap :shops="filteredShops" />
      <ShopList :shops="$page.pagedShops.edges" />
      <BasePager :pageInfo="$page.pagedShops.pageInfo" />
    </template>
  </Layout>
</template>

<page-query>
  query ($page: Int) {
    pagedShops: allShop (perPage: 6, page: $page) @paginate {
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

export default {
  components: { BasePager, HeroMap, ShopList },
  metaInfo: {
    title: 'Shops',
  },
  computed: {
    filteredShops () {
      const { zipcode } = this.$route.query || this.$route.params
      return zipcode
        ? this.$page.heroMap.edges.filter(({ node }) => node.zipcode === zipcode)
        : this.$page.heroMap.edges
    },
  },
}
</script>
