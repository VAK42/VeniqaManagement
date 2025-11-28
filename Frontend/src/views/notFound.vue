<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <h1 class="text-9xl font-bold text-gray-800">404</h1>
      <h2 class="text-2xl font-semibold mt-4">Page Not Found</h2>
      <p class="text-gray-600 mt-2">The Page You Are Looking For Might Have Been Removed Or Unavailable.</p>
      <router-link to="/" class="btn btn-primary mt-6 inline-block">Return Home</router-link>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vuex'
export default defineComponent({ name: 'pageNotFound' })
</script>