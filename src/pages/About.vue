<template>
  <Layout>
    <template slot="bleed">
      <HeroForm />
    </template>
  </Layout>
</template>

<script>
import HeroForm from '~/components/HeroForm'

export default {
  components: { HeroForm },
  metaInfo () {
    return {
      title: this.$t && this.$t('navigation.main.about'),
    }
  },
}
</script>
