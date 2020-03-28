import { parsePhoneNumberFromString } from 'libphonenumber-js'

import DefaultLayout from '~/layouts/Default.vue'

export default function (Vue, { router, head, isClient }) {
  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout)

  Vue.filter('phone', (number, country, format = 'RFC3966') => {
    return parsePhoneNumberFromString(number, country).format(format)
  })
}
