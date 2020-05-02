<template>
  <div class="relative rounded-md shadow-sm">

    <div v-if="$slots.icon" :class="className.position" class="left-0">
      <span :class="className.size"><slot name="icon" /></span>
    </div>

    <input
      ref="input"
      v-bind="inputProps"
      @input="$emit('input', $event.target[eventProp])"
      @focus="$emit('focus', $refs.input)"
    />

    <div v-if="type === 'search' && value" :class="className.position" class="right-0">
      <button @click="clear" :class="className.size" class="hover:text-gray-700 focus:outline-none focus:shadow-outline-blue flex items-center justify-center p-1 -m-1 text-xs leading-none text-gray-500 bg-gray-100 rounded-full pointer-events-auto">✕</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
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
    size: {
      type: String,
      required: false,
      default: 'md',
    },
  },
  computed: {
    eventProp () {
      return this.type === 'checkbox' ? 'checked' : 'value'
    },
    inputProps () {
      return {
        ...this.$attrs,
        type: this.type,
        placeholder: this.placeholder || this.defaultPlaceholder,
        'aria-label': this.placeholder || this.defaultPlaceholder,
        ...(this.type === 'checkbox' ? { checked: this.value } : { value: this.value }),
        readonly: this.isDisabled,
        class: [
          // TODO: Use `form-input` utilities
          this.size === 'md' && 'px-3 py-2 text-sm leading-5',
          this.size === 'md' && this.$slots.icon && 'pl-10 pr-3',
          // this.size === 'md' && 'form-input sm:leading-5',
          this.size === 'xl' && 'px-5 py-3 text-base leading-6',
          this.size === 'xl' && this.$slots.icon && 'pl-14 pr-5',

          'block w-full text-gray-900 bg-white placeholder-gray-500 focus:placeholder-gray-400',
          'border border-gray-300 focus:border-blue-300 rounded-inherit',
          'focus:outline-none focus:shadow-outline-blue transition duration-150 ease-in-out appearance-none',

          // this.type === 'checkbox' ? 'form-checkbox w-11 h-11' : 'form-input max-w-full',
          this.isDisabled && 'cursor-not-allowed opacity-50',
        ],
      }
    },

    className () {
      return {
        size: [
          this.size === 'md' && 'w-5 h-5',
          this.size === 'xl' && 'w-6 h-6',
        ],
        position: [
          this.size === 'md' && this.$slots.icon && 'px-3',
          this.size === 'xl' && this.$slots.icon && 'px-5',
          'absolute inset-y-0 pointer-events-none',
          'flex items-center text-gray-400',
          // 'border border-transparent',
        ],
      }
    },
    defaultPlaceholder () {
      return this.type === 'email' ? 'stay.safe@home.com'
        : this.type === 'password' ? 'Type Password' : false
    },
  },
  methods: {
    clear () {
      this.$emit('input', '')
      this.$emit('clear', '')
      this.$nextTick(() => {
        this.$refs.input.focus()
      })
    },
  },
}
</script>
