<template>
  <form class="owl:mt-8 w-full max-w-md">

    <slot />

    <div v-if="$slots.submit" class="owl:mt-6">
      <slot name="submit" />
    </div>

  </form>
</template>

<script>
export default {
  name: 'BaseForm',
}
</script>
