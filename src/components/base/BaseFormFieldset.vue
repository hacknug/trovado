<template>
  <fieldset>
    <div class="owl:mt-6 flex flex-col">
      <slot />
      <span v-if="description" class="text-sm">{{ description }}</span>
    </div>
  </fieldset>
</template>

<script>
export default {
  name: 'BaseFormFieldset',
  props: {
    description: {
      type: String,
      required: false,
    },
  },
}
</script>
