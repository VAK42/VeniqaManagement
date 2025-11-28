<template>
  <div class="p-4">
    <form @submit.prevent="submitProduct" class="space-y-4 max-w-md">
      <div>
        <label class="block font-medium">Name</label>
        <input v-model="productName" type="text" required class="input-field w-full" />
      </div>
      <div>
        <label class="block font-medium">Price</label>
        <input v-model.number="productPrice" type="number" required class="input-field w-full" />
      </div>
      <div>
        <label class="block font-medium">Image</label>
        <input ref="fileInput" type="file" @change="handleFile" accept="image/*" class="w-full" />
      </div>
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary">Add Product</button>
      </div>
    </form>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vuex'
import axios from '@/plugins/axios'
import { useRouter } from 'vue-router'
export default defineComponent({ name: 'AddProduct', setup() { const productName = ref(''); const productPrice = ref(0); const fileInput = ref(null); const fileData = ref(null); const router = useRouter(); const handleFile = (e: Event) => { const target = e.target as HTMLInputElement; const f = target.files && target.files[0]; if (f) fileData.value = f }; const submitProduct = async () => { try { const form = new FormData(); form.append('name', productName.value); form.append('price', String(productPrice.value)); if (fileData.value) form.append('image', fileData.value); const { data } = await axios.post('/catalog', form, { headers: { 'Content-Type': 'multipart/form-data' } }); console.log('Product Added', data); router.push('/') } catch (err) { console.log('Error', err) } }; return { productName, productPrice, fileInput, handleFile, submitProduct } } })
</script>