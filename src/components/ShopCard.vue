<template>
  <div class="relative z-0 flex flex-col self-start overflow-hidden leading-5 bg-white rounded-lg shadow-lg">

    <div @click="open = !open" class="sm:flex-row flex flex-col items-start justify-between flex-1 p-4">

      <div class="relative flex-1 w-full max-w-full">
        <header class="owl:ml-2 flex w-full max-w-full">
          <div class="flex flex-col-reverse flex-1 truncate">
            <h3 class="text-xl font-semibold leading-7 text-gray-900 truncate">{{ shop.properties.name }}</h3>
            <p :class="className.label">{{ shop.properties.type }}</p>
          </div>
          <div class="owl:ml-1 flex-none">
            <BaseButton v-tippy content="Show in map" @click.native.stop="$emit('flyTo', shop.geometry.coordinates)" variant="secondary" size="xs">
              <MapPinIcon class="group-hover:opacity-100 w-4 h-4 opacity-50 stroke-current" />
            </BaseButton>
            <BaseButton v-tippy content="Add to favorites" @click.native.stop="handleEdit('favourites', shop)" variant="secondary" size="xs">
              <BookmarkIcon class="w-4 h-4 stroke-current" :class="[isFavourite ? 'opacity-75 text-red-700 fill-current' : 'group-hover:opacity-100 opacity-50']" />
            </BaseButton>
          </div>
        </header>

        <div class="flex items-end justify-between w-full mt-4">
          <dl class="text-sm">
            <div class="owl:mt-1 flex flex-col">
              <dt class="owl:ml-1 flex items-center text-gray-400">
                <BarChart2Icon class="w-5 h-5" />
                <span>Stock Levels:</span>
              </dt>
              <dd class="font-medium">
                <button
                  class="owl:ml-1 inline-flex items-center px-2.5 py-0.5 rounded-md font-medium leading-5 focus:outline-none focus:shadow-outline-blue"
                  :class="classNames[averageLabels[average]]"
                  aria-label="See Details"
                  ><span>{{ averageLabels[average] }}</span>
                  <ChevronDownIcon class="w-5 h-5" :class="[open && 'transform rotate-180']" />
                </button>
              </dd>
            </div>
          </dl>

          <BaseButton @click.native.stop="!user ? SET_AUTH_INTENT('Sign Up') : $emit('bookTime', shop)" variant="secondary" size="sm">
            <template slot="icon"><CalendarIcon class="w-5 h-5 text-blue-600 stroke-current" /></template> Save your Timeslot
          </BaseButton>

        </div>
      </div>

    </div>

    <div v-if="open" class="bg-gray-50 sm:px-6 owl:mt-8 flex flex-col px-4 py-6 border-t-2 border-gray-100">

      <p class="w-full"><small class="text-lg">Updated yesterday by
        <span class="bg-gray-300-25 hover:bg-gray-100 focus:bg-gray-100 px-2 py-1 rounded">
          <code class="font-mono">concerned_citizen</code>
        </span>
      </small></p>

      <div class="w-full">
        <dl class="grid grid-cols-1 row-gap-1 col-gap-12">
          <div class="owl:ml-2 flex justify-between text-sm" v-for="({ availability, product }, key) in (newStock || currentStock)" :key="key">
            <dt class="owl:ml-1 flex items-center text-gray-500">{{ product }}</dt>
            <dd :class="classNames[availability]" class="owl:ml-1 flex items-center leading-none text-right">
              <button :class="[ ...className.button, availability === min && 'opacity-50 cursor-not-allowed']" :disabled="availability === min"
                @click="changeStockLevel(key, -1)"><MinusIcon class="w-4 h-4 text-gray-300" /></button>
              <span class="w-24 px-2 py-1 text-right bg-white border border-gray-200 rounded">{{ availability }}</span>
              <button :class="[ ...className.button, availability === max && 'opacity-50 cursor-not-allowed']" :disabled="availability === max"
                @click="changeStockLevel(key, +1)"><PlusIcon class="w-4 h-4 text-gray-300" /></button>
            </dd>
          </div>
        </dl>
      </div>

      <div class="owl:mt-2 pt-6 text-center border-t border-gray-200">
        <span class="text-sm text-blue-500">Have you been here recently?</span>
        <div class="owl:ml-2 flex justify-center">
          <BaseButton v-if="edit" @click.native="newStock = null; edit = false" variant="secondary" size="md">Cancel</BaseButton>
          <BaseButton v-if="edit" @click.native="updateStock" variant="primary" size="md">Update</BaseButton>
          <BaseButton v-if="!edit" @click.native="newStock = currentStock; edit = true" variant="secondary" size="md">Update Stock
            <template slot="icon">
              <EditIcon class="w-5 h-5 text-gray-400 stroke-current" />
            </template>
          </BaseButton>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import deepmerge from 'deepmerge'
import { mapState, mapMutations, mapActions } from 'vuex'
import { BarChart2Icon, BookmarkIcon, CalendarIcon, ChevronDownIcon, EditIcon, MapPinIcon, MinusIcon, PlusIcon } from 'vue-feather-icons'

import BaseButton from '~/components/base/BaseButton'

const { db } = process.isClient ? require('~/firebase') : import('~/firebase')
const places = db && db.collection('places')

export default {
  name: 'ShopCard',
  components: {
    BaseButton,
    BarChart2Icon,
    BookmarkIcon,
    CalendarIcon,
    ChevronDownIcon,
    EditIcon,
    MapPinIcon,
    MinusIcon,
    PlusIcon,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    shop: {
      type: Object,
      required: true,
    },
  },
  firestore () {
    return {
      place: places.doc(this.id),
    }
  },
  data () {
    return {
      open: false,
      edit: false,
      place:  null,
      newStock: null,
      average: 0,
      sum: null,

      recipe: {
        stocks: [ 'no info', 'sold out', '1-10 qty', '10-30 qty', '+30 qty' ],
        items: [
          'Fruit', 'Vegetables', 'Rice', 'Pasta', 'Bread', 'Flour', 'Yeast',
          'Toilet Paper', 'Hand Sanitiser', 'Cleaning Products',
        ],
      },
    }
  },
  computed: {
    ...mapState(['user', 'userData']),

    min () {
      return [...this.recipe.stocks].shift()
    },
    max () {
      return [...this.recipe.stocks].pop()
    },

    remoteStock () {
      return Object.fromEntries(Object.entries(this.place ? this.place.stock : {})
        .sort((a, b) => this.recipe.items.indexOf(a[1].product) - this.recipe.items.indexOf(b[1].product)))
    },
    currentStock () {
      return (this.place && this.place.stock) ? this.remoteStock : this.mockStock
    },

    isFavourite () {
      return this.userData && this.userData.favourites && this.userData.favourites[this.shop.id]
    },

    averageLabels () {
      return [ 'Unknown', 'None', 'Low', 'Medium', 'High' ]
    },
    className () {
      return {
        label: [
          'inline-flex items-center text-xs font-medium leading-4 uppercase tracking-wider',
          this.shop.properties.class === 'food_and_drink_stores' ? 'text-blue-800'
            : this.shop.properties.class === 'medical' ? 'text-green-800' : 'text-gray-800',
        ],
        button: [
          !this.edit && 'invisible',
          'flex flex-none bg-white border border-gray-200 rounded-full',
          'focus:outline-none focus:shadow-outline-blue',
        ],
      }
    },
    classNames () {
      return {
        'Unknown': 'text-gray-800 bg-gray-100',
        'None': 'text-gray-800 bg-gray-100',
        'Low': 'text-red-800 bg-red-100',
        'Medium': 'text-yellow-800 bg-yellow-100',
        'High': 'text-green-800 bg-green-100',

        'no info': 'text-gray-400',
        'sold out': 'text-black-400',
        '1-10 qty': 'text-red-400',
        '10-30 qty': 'text-yellow-400',
        '+30 qty': 'text-green-400',
      }
    },

    mockStock () {
      return Object.fromEntries(this.recipe.items.map((item) => {
        return [this.$options.filters.camel(item), {
          product: item,
          availability: this.min,
        }]
      }))
    }
  },
  methods: {
    ...mapMutations(['SET_AUTH_INTENT']),
    ...mapActions(['UPDATE_USER_DOC']),

    changeStockLevel (item, increment) {
      const stocks = this.recipe.stocks
      const stock = this.newStock || this.remoteStock
      const getNewLevel = (avail, inc) => stocks[stocks.indexOf(avail) + inc]
      const newLevel = getNewLevel((stock && stock[item]
        ? stock[item].availability : stocks[0]), increment)
        || stocks[0]

      this.newStock = deepmerge.all([
        this.mockStock,
        this.newStock || {},
        { [item]: { availability: newLevel } },
      ])
    },

    async updateStock () {
      const data = deepmerge(this.place || {}, { ...this.shop, stock: this.newStock })
      this.$firestoreRefs.place[this.place ? 'update' : 'set'](data)
        .then(() => console.log('place updated'))
        .then(() => this.edit = false)
    },
    async handleEdit (type, shop) {
      if (this.user) {
        const data = { ...this.userData }
        if (!data[type]) data[type] = {}

        const favs = data[type]
        const index = favs.hasOwnProperty(shop.id)

        if (favs.hasOwnProperty(shop.id)) delete favs[shop.id]
        else favs[shop.id] = shop

        await this.UPDATE_USER_DOC({ ...data, [type]: favs })
      } else {
        this.SET_AUTH_INTENT('Sign Up')
      }
    },
  },
  watch: {
    id (id) {
      this.$bind('place', places.doc(id))
    },
  },
}
</script>
