<template>
  <Layout>
    <template slot="bleed">
      <ShopList :shops="$page.pagedShops.edges" />
      <BasePager :pageInfo="$page.pagedShops.pageInfo" />
    </template>
  </Layout>
</template>

<page-query>
  query ($page: Int) {
    pagedShops: allShop (perPage: 12, page: $page) @paginate {
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
  }
</page-query>

<script>
import BasePager from '~/components/base/BasePager'
import ShopList from '~/components/ShopList'

export default {
  components: { BasePager, ShopList },
  metaInfo: {
    title: 'Shops',
  },
}
</script>
