<template>
  <div class="p-4" v-if="order">
    <div class="flex items-center mb-4">
      <button @click="$router.back()" class="mr-2 text-blue-600"><font-awesome-icon icon="chevron-left" /> Back</button>
      <h3 class="text-2xl font-bold">Order Details #{{ order.id }}</h3>
    </div>
    <div class="bg-white p-6 rounded shadow mb-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h5 class="font-bold border-b pb-2 mb-2">Status</h5>
          <span class="px-3 py-1 rounded-full bg-blue-100 text-blue-800 font-bold">{{ order.status }}</span>
        </div>
        <div class="text-right" v-if="order.status === 'RECEIVED'"><button class="btn btn-success mr-2"
            @click="confirmOrder">Confirm Order</button><button class="btn btn-danger"
            @click="cancelOrder">Cancel</button></div>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
        <div>
          <h5 class="font-bold border-b pb-2 mb-2">Shipping Address</h5>
          <p>{{ order.shippingAddress?.firstName }} {{ order.shippingAddress?.lastName }}</p>
          <p>{{ order.shippingAddress?.addressLine1 }}</p>
          <p>{{ order.shippingAddress?.city }}, {{ order.shippingAddress?.country }}</p>
        </div>
        <div>
          <h5 class="font-bold border-b pb-2 mb-2">User Info</h5>
          <p>Email: {{ order.userEmail }}</p>
        </div>
      </div>
    </div>
    <h5 class="font-bold text-lg mb-2">Items</h5>
    <div class="space-y-2">
      <div v-for="(item, i) in order.items" :key="i" class="bg-white p-4 rounded shadow border">
        <div class="flex justify-between"><span class="font-bold">{{ item.product?.name || 'Unknown Product'
        }}</span><span>Qty: {{ item.counts }}</span></div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, useStore } from 'vuex'
type AnyObj = Record<string, unknown>
import { useRouter } from 'vue-router'
import { notify } from '@kyvg/vue3-notification'
export default defineComponent({ name: 'OrderDetailView', setup() { const store = useStore(); const router = useRouter(); const order = computed(() => (store.getters && (store.getters['orderStore/openOrder'] as unknown)) as AnyObj | null); if (!order.value) { router.push('/orders') } const confirmOrder = async () => { try { await store.dispatch('orderStore/confirmOrder'); notify({ type: 'success', text: 'Order Confirmed' }) } catch (e) { console.log('Error', e); notify({ type: 'error', text: 'Error Confirming Order' }) } }; const cancelOrder = async () => { if (confirm('Cancel This Order?')) { const id = (order.value as unknown as AnyObj).id as string | undefined; if (id) await store.dispatch('orderStore/cancelOrder', id); router.push('/orders') } }; return { order, confirmOrder, cancelOrder } } })
</script>