<template>
  <div class="flex h-screen bg-gray-100">
    <div class="w-64 bg-white shadow-md">
      <div class="p-6 text-center border-b"><img src="@/assets/logo.png" alt="Logo" class="w-32 mx-auto" /></div>
      <nav class="mt-6">
        <router-link to="/catalog"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 text-gray-700"><font-awesome-icon
            icon="list" class="mr-2" />Catalog</router-link>
        <router-link to="/orders"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 text-gray-700"><font-awesome-icon
            icon="box" class="mr-2" />Orders</router-link>
        <router-link to="/featured"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-200 text-gray-700"><font-awesome-icon
            icon="star" class="mr-2" />Featured</router-link>
      </nav>
    </div>
    <div class="flex-1 flex flex-col overflow-hidden">
      <header class="flex justify-between items-center py-4 px-6 bg-white border-b">
        <div class="flex items-center"></div>
        <div class="flex items-center"><button @click="logout" class="text-gray-600 hover:text-gray-800">Logout</button>
        </div>
      </header>
      <main class="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6"><router-view /></main>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({ name: 'HomeView', setup() { const store = useStore(); const router = useRouter(); const logout = async () => { await store.dispatch('authStore/logout'); router.push('/login') }; return { logout } } })
</script>