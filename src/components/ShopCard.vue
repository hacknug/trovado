<template>
  <div class="flex flex-col overflow-hidden rounded-lg shadow-lg">

    <div class="flex-shrink-0">
      <img class="object-cover w-full h-48" src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1679&q=80" alt="" />
    </div>

    <div class="flex flex-col justify-between flex-1 p-6 bg-white">
      <div class="flex-1">
        <p class="text-sm font-medium leading-5 text-indigo-600">
          <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium leading-4 bg-green-100 text-green-800 uppercase">
            {{ shop.country === 'ES' ? 'Spain' : shop.country === 'PT' ? 'Portugal' : shop.country }}
          </span>
        </p>
        <g-link :to="shop.path" class="block">
          <h3 class="mt-2 text-xl font-semibold leading-7 text-gray-900">{{ shop.address }}</h3>
          <p class="mt-3 text-base leading-6 text-gray-500">{{ shop.state }} ({{ shop.province }})<br />{{ shop.zipcode }}</p>
        </g-link>
      </div>
      <div class="flex items-center mt-6">
        <div class="flex-shrink-0">
          <a href="#">
            <img class="w-10 h-10 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
          </a>
        </div>
        <div class="ml-3">
          <p class="text-sm font-medium leading-5 text-gray-900">Mercadona</p>
          <dl class="flex text-sm leading-5 text-gray-500">
            <div class="owl:ml-1 flex items-center">
              <dt>
                <span class="sr-only">Phone Number</span>
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
              </dt>
              <dd>
                <a class="hover:underline" :href="shop.phone|phone(shop.country)">
                  {{ shop.phone|phone(shop.country, 'INTERNATIONAL') }}
                </a>
              </dd>
            </div>
          </dl>
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
