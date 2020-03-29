<template>
  <div class="sm:mx-auto sm:w-full sm:max-w-md mt-8">
    <div class="sm:rounded-lg sm:px-10 owl:mt-8 px-4 py-8 bg-white shadow">

      <header v-if="$slots.title || $slots.description" class="sm:mx-auto sm:w-full sm:max-w-md">
        <img class="w-auto h-12 mx-auto mb-6" src="https://tailwindui.com/img/logos/workflow-mark-on-white.svg" alt="Workflow" />
        <h2 v-if="$slots.title" class="text-3xl font-extrabold leading-9 text-center text-gray-900"><slot name="title" /></h2>
        <p v-if="$slots.description" class="max-w mt-2 text-sm leading-5 text-center text-gray-600"><slot name="description" /></p>
      </header>

      <slot />

    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseCard',
}
</script>
