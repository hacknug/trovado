<template>
  <Layout>
    <template slot="bleed">
      <ShopList :shops="$page.shops.edges" />
    </template>
  </Layout>
</template>

<page-query>
  query {
    shops: allMercadona {
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
import ShopList from '~/components/ShopList'

export default {
  components: { ShopList },
  metaInfo: {
    title: 'Shops'
  },
}
</script>
