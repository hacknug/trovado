<template>
  <Layout>
    <template slot="bleed">
      <HeroMap :shops="$page.heroMap.edges" />
      <ShopList :shops="$page.shopList.edges" />
    </template>
  </Layout>
</template>

<page-query>
  query {
    shopList: allShop (limit: 3, filter: { lt: { ne: 0 } }) {
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
import HeroMap from '~/components/HeroMap'
import ShopList from '~/components/ShopList'

export default {
  components: { HeroMap, ShopList },
  metaInfo: {
    title: 'Home',
  },
}
</script>
