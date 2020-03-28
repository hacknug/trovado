<template>
  <Layout>
    <template slot="bleed">
      <HeroMap />
      <ShopList :shops="$page.shops.edges" />
    </template>
  </Layout>
</template>

<page-query>
  query {
    shops: allMercadona (limit: 3) {
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
