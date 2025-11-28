<template>
  <div class="p-4">
    <h3 class="text-2xl font-bold mb-4">Orders</h3>
    <div class="flex border-b mb-4 overflow-x-auto">
      <button v-for="tab in tabs" :key="tab.value" @click="currentStatus = tab.value"
        :class="['px-4 py-2 whitespace-nowrap', currentStatus === tab.value ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500']">{{
          tab.title
        }}</button>
    </div>
    <div class="bg-white shadow rounded overflow-hidden">
      <table class="min-w-full">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="order in orders" :key="order.id">
            <td class="px-6 py-4 whitespace-nowrap">{{ order.id }}</td>
            <td class="px-6 py-4 whitespace-nowrap"><span
                class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">{{
                  order.status }}</span></td>
            <td class="px-6 py-4 whitespace-nowrap">${{ order.paymentInfo?.[0]?.amountInUsd?.amount || '0.00' }}</td>
            <td class="px-6 py-4 whitespace-nowrap"><button class="btn btn-success btn-sm"
                @click="openOrder(order)">Open</button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, useStore } from 'vuex'
import { useRouter } from 'vue-router'
export default defineComponent({ name: 'ordersMainPage', setup() { const store = useStore(); const router = useRouter(); const currentStatus = ref('RECEIVED'); const tabs = [{ title: 'Received', value: 'RECEIVED' }, { title: 'Confirmed', value: 'CONFIRMED' }, { title: 'In Progress', value: 'IN-PROGRESS' }, { title: 'Completed', value: 'COMPLETED' }, { title: 'Cancelled', value: 'CANCELLED' }]; const orders = computed(() => (store.getters && (store.getters['orderStore/orders'] as unknown)) as unknown[]); const fetchOrders = async () => { await store.dispatch('orderStore/getOrdersByStatus', currentStatus.value) }; watch(currentStatus, fetchOrders); onMounted(fetchOrders); type Order = { id: string; status?: string; paymentInfo?: Array<{ amountInUsd?: { amount?: number } }> }; const openOrder = async (order: Order) => { await store.dispatch('orderStore/openOrderDetail', order); router.push({ name: 'orderDetail' }) }; return { tabs, currentStatus, orders, openOrder } } })
</script>