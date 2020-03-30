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
  metaInfo: {
    title: 'About',
  },
}
</script>
