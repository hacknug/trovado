import PortalVue from 'portal-vue'
import { firestorePlugin } from 'vuefire'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-default.css'

import { parsePhoneNumberFromString } from 'libphonenumber-js'

import store from '~/store'
import DefaultLayout from '~/layouts/Default.vue'

const { getCurrentUser } = process.isClient ? require('~/firebase') : import('~/firebase')

export default function (Vue, { appOptions, router, head, isClient }) {
  Vue.use(PortalVue)
  Vue.use(firestorePlugin)
  Vue.use(VueToast)

  Vue.component('Layout', DefaultLayout)

  Vue.filter('camel', (string) => string.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, chr) => chr.toUpperCase()))
  Vue.filter('phone', (number, country, format = 'RFC3966') => parsePhoneNumberFromString(number, country).format(format))

  appOptions.store = store
  appOptions.i18n.setLocaleMessage('en', require('./locales/en.json'))
  appOptions.i18n.setLocaleMessage('es', require('./locales/es.json'))

  head.meta = head.meta.filter((meta) => meta.key !== 'viewport')
  head.meta.push({
    key: 'viewport',
    name: 'viewport',
    content: 'width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover',
  })

  router.beforeEach(async (to, from, next) => {
    const requiresAuth = to.matched.some(record => record.path.includes('/user/'))

    if (isClient && requiresAuth && !await getCurrentUser()) {
      next('/') // TODO: Redirect to /user/login page
    } else {
      next()
    }
  })
}
