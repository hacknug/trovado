<template>
  <section>
    <div class="owl:mt-16 container pt-24 pb-32">

      <BaseSectionHeader v-if="title" :title="title" />

      <slot />

      <footer v-if="$slots.footer" class="owl:ml-6 flex justify-center w-full max-w-2xl px-6 mx-auto">
        <slot name="footer" />
      </footer>

    </div>
  </section>
</template>

<script>
import BaseSectionHeader from '~/components/base/BaseSectionHeader'

export default {
  name: 'BaseSection',
  components: { BaseSectionHeader },
  props: {
    title: {
      type: String,
      required: false,
    },
  },
}
</script>
