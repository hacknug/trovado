<template>
  <div class="py-10">

    <header>
      <div class="max-w-7xl sm:px-6 lg:px-8 px-4 mx-auto">
        <h1 class="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
      </div>
    </header>

    <main>
      <div class="max-w-7xl sm:px-6 lg:px-8 mx-auto">
        <!-- Replace with your content -->
        <div class="sm:px-0 px-4 py-8">
          <div class="border-4 border-gray-200 border-dashed rounded-lg">
            <slot/>
          </div>
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
