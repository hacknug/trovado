<template>
  <div class="py-10">

    <header v-if="$slots.header">
      <div class="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
        <h1 class="text-3xl font-bold leading-tight text-gray-900"><slot name="header" /></h1>
      </div>
    </header>

    <main>
      <div v-if="$slots.bleed" class="-my-10">
        <slot name="bleed" />
      </div>

      <div v-if="$slots.default" class="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <!-- Replace with your content -->
        <div class="sm:px-0 px-4 py-8">
          <slot/>
        </div>
        <!-- /End replace -->
      </div>
    </main>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="postcss">
  html {
    font-size: 14px;
    @screen md { font-size: 16px; }
  }
</style>
