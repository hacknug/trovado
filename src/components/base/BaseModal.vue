<template>
  <!-- <div x-data="{ open: true }" x-show="open" class="sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center fixed inset-x-0 bottom-0 px-4 pb-6">
    <div x-show="open" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0" x-transition:enter-end="opacity-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100" x-transition:leave-end="opacity-0" class="fixed inset-0 transition-opacity">
      <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
    </div>

    <div x-show="open" x-transition:enter="ease-out duration-300" x-transition:enter-start="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" x-transition:enter-end="opacity-100 translate-y-0 sm:scale-100" x-transition:leave="ease-in duration-200" x-transition:leave-start="opacity-100 translate-y-0 sm:scale-100" x-transition:leave-end="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" class="sm:max-w-sm sm:w-full sm:p-6 px-4 pt-5 pb-4 overflow-hidden transition-all transform bg-white rounded-lg shadow-xl">
      <div>
        <div class="flex items-center justify-center w-12 h-12 mx-auto bg-blue-100 rounded-full">
          <svg class="w-6 h-6 text-blue-600" stroke="currentColor" fill="none" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
          </svg>
        </div>
        <div class="sm:mt-5 mt-3 text-center">
          <h3 class="text-lg font-medium leading-6 text-gray-900">
            Payment successful
          </h3>
          <div class="mt-2">
            <p class="text-sm leading-5 text-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur amet labore.
            </p>
          </div>
        </div>
      </div>
      <div class="sm:mt-6 mt-5">
        <span class="flex w-full rounded-md shadow-sm">
          <button @click="open = false; setTimeout(() => open = true, 1000)" type="button" class="hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue sm:text-sm sm:leading-5 inline-flex justify-center w-full px-4 py-2 text-base font-medium leading-6 text-white transition duration-150 ease-in-out bg-blue-600 border border-transparent rounded-md shadow-sm">
            Go back to dashboard
          </button>
        </span>
      </div>
    </div>
  </div> -->

  <div
    ref="modal"
    tabindex="0"
    class="sm:inset-0 sm:p-0 sm:flex sm:items-center sm:justify-center fixed inset-x-0 bottom-0 z-50 px-4 pb-6"
    @keydown.esc="$emit('close')"
  >
    <transition
      enter-active-class="duration-300 ease-out"
      enter-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-class="opacity-100"
      leave-to-class="opacity-0"
      ><div class="absolute inset-0 bg-gray-500 opacity-75" />
    </transition>

    <button class="bg-black-75 backdrop-blur absolute inset-0 z-0 w-full h-full" @click="$emit('close')" aria-label="Close Modal" />
    <div class="children:pointer-events-auto owl:mt-4 relative z-10 flex flex-col items-center w-full max-h-full px-4 py-16 m-auto pointer-events-none">
      <slot />
    </div>

  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  mounted () {
    this.$refs.modal?.focus()
  },
}
</script>
