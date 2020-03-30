<template>
  <Layout>
    <template slot="bleed">
      <HeroSearch class="bg-white" />
      <HeroFeatures class="bg-gray-50" />
      <ShopList class="bg-gray-100" :shops="$page.shopList.edges" />
    </template>
  </Layout>
</template>

<page-query>
  query {
    shopList: allShop (limit: 6, filter: { lt: { ne: 0 } }) {
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
  }
</page-query>

<script>
import HeroSearch from '~/components/HeroSearch'
import HeroFeatures from '~/components/HeroFeatures'
import ShopList from '~/components/ShopList'

export default {
  components: { HeroSearch, HeroFeatures, ShopList },
  metaInfo: {
    title: 'Home',
  },
}
</script>
