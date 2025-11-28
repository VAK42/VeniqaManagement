<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow text-center">
      <div v-if="loading">Verifying...</div>
      <div v-else-if="success">
        <h2 class="text-2xl font-bold text-green-600 mb-4">Email Confirmed!</h2>
        <router-link to="/login" class="btn btn-primary">Go To Login</router-link>
      </div>
      <div v-else>
        <h2 class="text-2xl font-bold text-red-600 mb-4">Verification Failed</h2>
        <p>The Token Is Invalid Or Expired.</p>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vuex'
export default defineComponent({ name: 'EmailConfirmationView', setup() { const loading = ref(false); const success = ref(true); return { loading, success } } })
</script>