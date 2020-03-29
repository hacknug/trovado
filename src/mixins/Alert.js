export const alert = {
  data () {
    return {
      alertOptions: {
        ok: { type: 'success', message: 'all good', color: 'green' },
        no: { type: 'error', message: 'oopsie-doo', color: 'red' },
        yo: { type: 'info', message: 'hey listen!', color: 'blue' },
      },
    }
  },
  methods: {
    alert (type, message) {
      const color = this.alertOptions[type].color

      this.$toast.open({
        ...this.alertOptions[type],
        message: message || this.alertOptions[type].message,
        customClass: `text-${color}-800 bg-${color}-200 boder-${color}-800`,
      })
    },
  },
}
