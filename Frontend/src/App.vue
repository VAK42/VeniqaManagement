<template>
	<div id="app" class="min-h-screen bg-gray-100 font-sans">
		<notifications position="bottom center" />
		<div v-if="isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-white bg-opacity-80">
			<fingerprintSpinner :animation-duration="1500" :size="150" color="#136a8a" />
		</div><router-view />
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, onMounted, onUnmounted, computed, useStore } from 'vuex'
import { FingerprintSpinner } from 'epic-spinners'
import { eventHub } from '@/utils/eventHub'
export default defineComponent({ name: 'app', components: { FingerprintSpinner }, setup() { const store = useStore(); const refCount = ref(0); const isLoading = ref(false); function setLoading() { refCount.value += 1; isLoading.value = true } function unsetLoading() { if (refCount.value > 0) { refCount.value -= 1; isLoading.value = refCount.value > 0 } } onMounted(async () => { eventHub.on('beforeRequest', setLoading); eventHub.on('requestError', unsetLoading); eventHub.on('afterResponse', unsetLoading); eventHub.on('responseError', unsetLoading); await store.dispatch('authStore/initiateAppSession') }); onUnmounted(() => { eventHub.off('beforeRequest', setLoading); eventHub.off('requestError', unsetLoading); eventHub.off('afterResponse', unsetLoading); eventHub.off('responseError', unsetLoading) }); const isSessionActive = computed(() => (store.getters && (store.getters['authStore/isSessionActive'] as boolean)) || false); return { isLoading, isSessionActive } } })
</script>