<template>
  <div class="relative rounded-md shadow-sm">
    <input
      v-bind="inputProps"
      @input="$emit('input', $event.target[eventProp])"
    />
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  props: {
    value: {
      required: true,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    placeholder: {
      type: String,
      required: false,
    },
    isDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    eventProp () {
      return this.type === 'checkbox' ? 'checked' : 'value'
    },
    inputProps () {
      return {
        class: this.className,
        type: this.type,
        placeholder: this.placeholder || this.defaultPlaceholder,
        readonly: this.isDisabled,
        ...(this.type === 'checkbox'
          ? { checked: this.value }
          : { value: this.value }
        ),
      }
    },

    className () {
      return [
        'form-input block w-full sm:text-sm sm:leading-5 focus:outline-none focus:shadow-outline-green focus:border-green-400',
        // this.type === 'checkbox' ? 'form-checkbox w-11 h-11' : 'form-input max-w-full',
        // this.isDisabled ? 'bg-white-125 cursor-not-allowed opacity-50' : '',
      ]
    },
    defaultPlaceholder () {
      return this.type === 'email' ? 'stay.safe@home.com'
        : this.type === 'password' ? 'Type Password' : false
    },
  },
}
</script>
