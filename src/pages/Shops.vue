<template>
  <Layout>
    <template slot="bleed">
      <ShopFilters />
    </template>
  </Layout>
</template>

<script>
import ShopFilters from '~/components/ShopFilters'

export default {
  components: { ShopFilters },
  metaInfo () {
    return {
      title: this.$t && this.$t('navigation.main.shops'),
    }
  },
}
</script>
