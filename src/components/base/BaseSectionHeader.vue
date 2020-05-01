<template functional>
  <header class="owl:mt-2">
    <h1 class="sm:text-3xl sm:leading-9 text-2xl font-extrabold leading-8 text-gray-900">{{ props.title }}</h1>
    <div v-if="slots.subtitle" class=""><slot name="subtitle" /></div>
  </header>
</template>

<script>
export default {
  name: 'BaseSectionHeader',
}
</script>
