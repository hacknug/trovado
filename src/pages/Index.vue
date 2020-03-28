<template>
  <Layout>
    <template slot="bleed">

      <div class="bg-gray-50 lg:py-24 py-16 overflow-hidden">
        <div class="sm:px-6 lg:px-8 lg:max-w-screen-xl relative max-w-xl px-4 mx-auto">

          <svg class="lg:block left-full -translate-y-1/4 absolute hidden transform -translate-x-1/2" width="404" height="784" fill="none" viewBox="0 0 404 784">
            <defs>
              <pattern id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
              </pattern>
            </defs>
            <rect width="404" height="784" fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)" />
          </svg>

          <div class="relative">
            <h3 class="sm:text-4xl sm:leading-10 text-3xl font-extrabold leading-8 tracking-tight text-center text-gray-900">
              <ClientOnly>
                A <vue-typer :text="['better', 'safer']" initialAction="erasing" /> way to shop during quarantine
              </ClientOnly>
            </h3>
            <p class="max-w-3xl mx-auto mt-4 text-xl leading-7 text-center text-gray-500">
              Queremos reducir el número de gente que baja al supermercado, poniéndose en riesgo, informándote de la disponibilidad de los productos más esenciales.
            </p>
          </div>

        </div>
      </div>

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
import ShopList from '~/components/ShopList'

export default {
  components: {
    ShopList,
    VueTyper: () =>
      import ('vue-typer')
      .then(m => m.VueTyper)
      .catch(),
  },
  metaInfo: {
    title: 'Home'
  },
}
</script>
