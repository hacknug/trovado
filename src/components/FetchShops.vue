<script>
export default {
  name: 'FetchShops',
  props: {
    center: {
      type: Array,
      required: false,
    }
  },
  data () {
    return {
      features: {},
      loading: true,
      blacklist: {
        class: [
          'lodging', 'education', 'food_and_drink', 'public_facilities', 'historic',
          'store_like', 'commercial_services', 'visitor_amenities', 'arts_and_entertainment',
          'motorist', 'park_like', 'sport_and_leisure', 'general', 'building', 'religion',
          'industrial', 'place_like', 'landmark',
        ],
        types: [
          'School', 'Theatre', 'Books', 'Library', 'Park', 'Garden', 'Mobile Phone',
          'Drinking Water', 'Marketplace', 'Monument', 'Memorial', 'Community Centre',
          'Restaurant', 'Fast Food', 'Cafe', 'Bar', 'Brewery', 'Pub', 'Employment Agency',
          'Retail', 'Department Store', 'Confectionery', 'Toys', 'Post Office',
          'Bank', 'Hairdresser', 'Dentist', 'Pet', 'Bicycle', 'Social Facility',
          'Hotel', 'Hostel', 'Laundry', 'Fabric', 'Parking', 'Optician', 'Shoes',
          'Kindergarten', 'Clothes', 'Sports', 'Ice Cream', 'Car Repair', 'Playground',
          'Driving School', 'Company', 'Fuel', 'Financial',
        ],
      },
    }
  },
  render () {
    return this.$scopedSlots.default({
      features: this.features,
      loading: this.loading,
    })
  },
  methods: {
    async fetchFeatures () {
      if (this.center && this.center.length) {
        const endpoint = 'https://api.mapbox.com/v4/mapbox.mapbox-terrain-v2,mapbox.mapbox-streets-v8/tilequery'

        await fetch(`${endpoint}/${this.center.join(',')}.json?radius=500&limit=50&geometry=point&layers=poi_label&access_token=${process.env.GRIDSOME_MAPBOX_TOKEN}`)
          .then((response) => response.json())
          .then((response) => {
            this.response = response.features
              .filter(({ properties }) => !this.blacklist.class.includes(properties.class))
              .filter(({ properties }) => !this.blacklist.types.includes(properties.types))
              .forEach((feature) => feature.properties.name && this.$set(this.features, feature.id, feature))
            this.loading = false
          })
      }
    },
  },
  watch: {
    center: 'fetchFeatures',
  },
  async mounted () {
    this.fetchFeatures()
  },
}
</script>
