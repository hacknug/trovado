<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">

    <div class="flex-shrink-0">
      <img class="object-cover w-full h-48" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt="" />
    </div>

    <div class="flex flex-col justify-between flex-1 p-6 bg-white">
      <div class="flex-1">
        <p class="text-sm font-medium leading-5 text-indigo-600">
          <a href="#" class="hover:underline">
            {{ shop.id }}
          </a>
        </p>
        <a href="#" class="block">
          <h3 class="mt-2 text-xl font-semibold leading-7 text-gray-900">Mercadona</h3>
          <p class="mt-3 text-base leading-6 text-gray-500">
            {{ shop.country }}<br />
            {{ shop.province }}<br />
            {{ shop.state }}<br />
            {{ shop.address }}<br />
            {{ shop.zipcode }}<br />
            {{ shop.phone }}<br />
          </p>
        </a>
      </div>
      <div class="flex items-center mt-6">
        <div class="flex-shrink-0">
          <a href="#">
            <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </a>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium leading-5 text-gray-900">
            <a href="#" class="hover:underline">Mercadona</a>
          </p>
          <div class="flex text-sm leading-5 text-gray-500">
            <time datetime="2020-03-16">{{ shop.date }}</time>
            <span class="mx-1">&middot;</span>
            <span>6 min read</span>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'ShopCard',
  props: {
    shop: {
      type: Object,
      required: true,
    },
  },
}
</script>
