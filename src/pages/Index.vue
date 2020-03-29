<template>
  <Layout>
    <template slot="bleed">
      <HeroSearch />
      <HeroForm />
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
  }
</page-query>

<script>
import HeroSearch from '~/components/HeroSearch'
import HeroForm from '~/components/HeroForm'
import ShopList from '~/components/ShopList'

export default {
  components: { HeroSearch, HeroForm, ShopList },
  metaInfo: {
    title: 'Home',
  },
}
</script>
