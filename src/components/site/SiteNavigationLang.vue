<template>
  <div class="flex items-center">
    <span class="relative z-0 inline-flex shadow-sm">
      <select
        v-model="$context.locale"
        class="form-select pr-9 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 block w-full py-2 pl-3 -ml-px text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md"
        ><option v-for="(lang, key) in langs" :key="key" :value="key">{{ lang }}</option>
          <option value="pt" disabled>Portuguese</option>
      </select>
    </span>
  </div>
</template>

<script>
export default {
  name: 'SiteNavigationLang',
  data () {
    return {
      langs: {
        en: 'English',
        es: 'Spanish',
      },
    }
  },
}
</script>
