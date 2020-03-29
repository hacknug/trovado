<template>
  <label class="owl:mt-1">
    <span class="block text-sm font-medium leading-5 text-gray-700">{{ label }}</span>
    <slot />
  </label>
</template>

<script>
export default {
  name: 'BaseFormControl',
  props: {
    label: {
      type: String,
      required: true,
    },
  },
}
</script>
