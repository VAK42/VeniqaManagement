<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="w-full max-w-md bg-white rounded-lg shadow-md p-8">
      <div v-if="isReset">
        <h2 class="text-2xl font-bold mb-6 text-center">Reset Password</h2>
        <div class="mb-4"><label class="block text-gray-700 text-sm font-bold mb-2">New Password</label><input
            v-model="password" type="password" class="input-field" placeholder="Enter New Password" /></div>
        <div class="mb-6"><label class="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label><input
            v-model="confirmPassword" type="password" class="input-field" placeholder="Confirm Password" /></div>
        <button @click="resetPassword" class="w-full btn btn-primary">Reset Password</button>
      </div>
      <div v-else>
        <h2 class="text-2xl font-bold mb-6 text-center text-red-600">Invalid Token</h2>
        <p class="text-center text-gray-600 mb-4">The Link Is Invalid Or Expired.</p>
        <router-link to="/login" class="block text-center text-blue-600 hover:underline">Return To Login</router-link>
      </div>
    </div>
  </div>

</template>
<script lang="ts">
import { defineComponent, ref, onMounted } from 'vuex'
import axios from '@/plugins/axios'
import proxyUrls from '@/constants/proxyUrls'
import { notify } from '@kyvg/vue3-notification'
import { useRouter } from 'vue-router'
type AnyObj = Record<string, unknown>
export default defineComponent({ name: 'PasswordConfirmationView', props: { token: { type: String, required: true } }, setup(props: { token: string }) { const isReset = ref(false); const password = ref(''); const confirmPassword = ref(''); const router = useRouter(); onMounted(async () => { try { const { data } = await axios.get(`${proxyUrls.validateResetToken}/${props.token}`); const d = data as unknown as AnyObj; if (d.isValid === true) { isReset.value = true } else { notify({ type: 'error', text: 'Token Invalid Or Expired' }) } } catch (err) { console.log('Error', err); notify({ type: 'error', text: 'Error Validating Token' }) } }); const resetPassword = async () => { if (password.value !== confirmPassword.value) { notify({ type: 'error', text: 'Passwords Do Not Match' }); return } try { await axios.post(proxyUrls.resetPassword, { token: props.token, newPassword: password.value }); notify({ type: 'success', text: 'Password Reset Successful' }); router.push('/login') } catch (err) { console.log('Error', err); notify({ type: 'error', text: 'Error Resetting Password' }) } }; return { isReset, password, confirmPassword, resetPassword } } })
</script>