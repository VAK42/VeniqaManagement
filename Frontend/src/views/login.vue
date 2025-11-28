<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <div class="text-center mb-6">
        <h2 class="text-2xl font-bold text-red-600">Admin Login</h2>
      </div>
      <form @submit.prevent="login">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="email">Email</label>
          <input v-model="email" class="input-field" id="email" type="email" placeholder="Enter Email" required>
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-bold mb-2" for="password">Password</label>
          <input v-model="password" class="input-field" id="password" type="password" placeholder="Enter Password"
            required>
        </div>
        <button type="submit" class="w-full btn bg-red-600 hover:bg-red-700">Login</button>
      </form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'
export default defineComponent({ name: 'LoginView', setup() { const store = useStore(); const router = useRouter(); const email = ref(''); const password = ref(''); const login = async () => { try { await store.dispatch('authStore/login', { email: email.value, password: password.value }); notify({ type: 'success', text: 'Login Successful' }); router.push('/') } catch (err) { console.log('Error', err); notify({ type: 'error', text: 'Login Failed' }) } }; return { email, password, login } } })
</script>