<template>
  <Layout>
    <template slot="bleed">
      <ShopCollection :shops="$page.pagedShops.edges" />
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
import ShopCollection from '~/components/ShopCollection'

export default {
  components: { BasePager, ShopCollection },
  metaInfo () {
    return {
      title: this.$t && this.$t('navigation.main.all_shops'),
    }
  },
}
</script>
