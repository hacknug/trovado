<template>
  <span class="inline-flex rounded-md shadow-sm">

    <button
      :type="type"
      :class="[
        'inline-flex justify-center items-center w-full font-medium border',
        'transition ease-in-out duration-150',
        'focus:outline-none',
        size === 'xs' && 'px-2.5 py-1.5 text-xs leading-4 rounded',
        size === 'sm' && 'px-3 py-2 text-sm leading-4 rounded-md',
        size === 'md' && 'px-4 py-2 text-sm leading-5 rounded-md',
        size === 'lg' && 'px-4 py-2 text-base leading-6 rounded-md',
        size === 'xl' && 'px-6 py-3 text-base leading-6 rounded-md',
        variant === 'primary' && 'text-white bg-green-600 hover:bg-green-500 active:bg-green-700 border-transparent focus:border-green-700 focus:outline-none focus:shadow-outline-green',
        variant === 'secondary' && 'text-gray-700 hover:text-gray-500 active:text-gray-800 bg-white active:bg-gray-50 border-gray-300 focus:border-blue-300 focus:shadow-outline-blue',
      ]"
      ><slot />
    </button>

  </span>
</template>

<script>
export default {
  name: 'BaseButton',
  props: {
    variant: {
      type: String,
      required: false,
      default: 'primary',
    },
    size: {
      type: String,
      required: false,
      default: 'md',
    },
    type: {
      type: String,
      required: false,
      default: 'button',
    },
  },
}
</script>
