<template>
  <Layout>
    <template slot="bleed">
      <HeroMap :shops="$page.allShops.edges" />
      <ShopList :shops="$page.shops.edges" />
    </template>
  </Layout>
</template>

<page-query>
  query {
    shops: allMercadona (limit: 3, filter: { lt: { ne: 0 } }) {
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
    allShops: allMercadona (filter: { lt: { ne: 0 } }) {
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
    title: 'Home'
  },
}
</script>
