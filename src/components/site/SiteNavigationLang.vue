<template>
  <div class="flex items-center">
    <span class="relative z-0 inline-flex rounded-md shadow-sm">
      <select
        v-model="currentLocale" @change="localeChanged"
        class="form-select pr-9 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 block w-full py-2 pl-3 text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white border border-gray-300 rounded-md"
        ><option value="ca" disabled>Català</option>
        <option v-for="locale in availableLocales" :key="locale" :value="locale">{{ langs[locale] || locale }}</option>
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
      currentLocale: this.$i18n.locale.toString(),
      availableLocales: this.$i18n.availableLocales,
      langs: {
        en: 'English',
        es: 'Spanish',
      },
    }
  },
  methods: {
    localeChanged () {
      this.$router.push({
        path: this.$tp(this.$route.path, this.currentLocale, true)
      })
    },
  },
}
</script>
