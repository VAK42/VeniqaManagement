<template>
	<div class="w-full p-4">
		<div class="bg-white rounded shadow-md overflow-hidden mb-4">
			<div class="px-6 py-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
				<h4 class="text-lg font-semibold">Catalog</h4>
				<button v-if="permissionGranted" @click="addProduct" class="btn btn-success">+ Add Catalog</button>
			</div>
			<div class="p-6">
				<div class="mb-4 flex justify-between">
					<input v-model="searchQuery" @keyup.enter="fetchProducts" class="input-field w-1/3" type="text"
						placeholder="Search Catalogs" />
				</div>
				<div class="overflow-x-auto">
					<table class="min-w-full bg-white">
						<thead>
							<tr class="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
								<th class="py-3 px-6 text-left">Image</th>
								<th class="py-3 px-6 text-left">Name</th>
								<th class="py-3 px-6 text-left">SKU</th>
								<th class="py-3 px-6 text-left">Price</th>
								<th class="py-3 px-6 text-left">Store</th>
								<th class="py-3 px-6 text-left">Status</th>
								<th class="py-3 px-6 text-center">Actions</th>
							</tr>
						</thead>
						<tbody class="text-gray-600 text-sm font-light">
							<tr v-for="product in products" :key="product.id" class="border-b border-gray-200 hover:bg-gray-100">
								<td class="py-3 px-6 text-left">
									<div class="flex items-center">
										<img :src="product.thumbnailUrls?.[0] || ''"
											class="w-10 h-10 rounded-full border border-gray-200" />
									</div>
								</td>
								<td class="py-3 px-6 text-left font-medium">{{ product.name }}</td>
								<td class="py-3 px-6 text-left">{{ product.storeSku }}</td>
								<td class="py-3 px-6 text-left">${{ product.price.amount }}</td>
								<td class="py-3 px-6 text-left">{{ product.store }}</td>
								<td class="py-3 px-6 text-left">
									<span :class="product.active ? 'bg-green-200 text-green-600' : 'bg-red-200 text-red-600'"
										class="py-1 px-3 rounded-full text-xs">{{ product.active ? 'Active' : 'Inactive' }}</span>
								</td>
								<td class="py-3 px-6 text-center">
									<div class="flex item-center justify-center">
										<button @click="editProduct(product)"
											class="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
											<font-awesome-icon icon="edit" />
										</button>
										<button @click="deleteProduct(product.id)"
											class="w-4 mr-2 transform hover:text-red-500 hover:scale-110">
											<font-awesome-icon icon="trash" />
										</button>
									</div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<addProduct v-if="isAddView" :data="editProductData" @cancelTrigger="isAddView = false" />
	</div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted, useStore } from 'vuex'
import addProduct from '@/components/homepage/addProduct.vue'
type AnyObj = Record<string, unknown>
interface Product { id?: string | number; thumbnailUrls?: string[]; name?: string; storeSku?: string; price?: { amount?: number }; store?: string; active?: boolean }
export default defineComponent({ name: 'mainPage', components: { addProduct }, setup() { const store = useStore(); const searchQuery = ref(''); const isAddView = ref(false); const editProductData = ref(null as AnyObj | null); const products = computed(() => { const val = (store.getters && (store.getters['adminStore/allProducts'] as Product[] | undefined)) || []; return val }); const permissions = computed(() => { const val = (store.getters && (store.getters['authStore/permissions'] as string[] | undefined)) || []; return val }); const permissionGranted = computed(() => { return permissions.value.includes('superAdmin') || permissions.value.includes('catalogManage') }); async function fetchProducts() { await store.dispatch('adminStore/getAllProducts', { searchTerm: searchQuery.value }) } function addProductFn() { editProductData.value = null; isAddView.value = true } function editProduct(product: AnyObj) { editProductData.value = product; isAddView.value = true } async function deleteProduct(id: string) { if (confirm('Are You Sure?')) { await store.dispatch('adminStore/deleteProduct', id) } } onMounted(async () => { await fetchProducts(); await store.dispatch('adminStore/getReferenceData') }); return { searchQuery, isAddView, editProductData, products, permissionGranted, fetchProducts, addProduct: addProductFn, editProduct, deleteProduct } } })
</script>