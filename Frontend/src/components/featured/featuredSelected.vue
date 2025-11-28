<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h5 class="font-bold">All Designs For <span class="text-blue-600">{{ section }}</span></h5>
      <button class="text-green-500 font-bold hover:underline" @click="showAddDesign = true">+ Add A New Design</button>
    </div>
    <div v-if="featuredDesigns.length > 0" class="space-y-4">
      <button class="btn btn-primary btn-sm mb-4" @click="saveFeatured">Save All</button>
      <div v-for="(design, index) in featuredDesigns" :key="index"
        class="bg-gray-50 p-4 rounded shadow-sm border border-gray-200">
        <div class="flex justify-between items-center">
          <span class="font-bold">{{ design.config?.name || `Design ${index + 1}` }}</span>
          <span class="text-sm text-gray-600">Type: {{ design.config?.designType }}</span>
          <div class="space-x-4"><button class="text-green-600 hover:underline"
              @click="editTrigger(design)">Edit</button><button class="text-red-600 hover:underline"
              @click="removeDesign(index)">Remove</button></div>
        </div>
        <div class="mt-2 flex gap-2">
          <div v-for="prod in design.products" :key="prod.id"
            class="flex items-center gap-2 border p-1 rounded bg-white"><img :src="prod.detailedImageUrls?.[0]"
              class="w-8 h-8 object-cover rounded" /><span class="text-xs">{{ prod.name }}</span></div>
        </div>
      </div>
    </div>
    <div v-else class="text-center text-gray-500 py-10">No Featured Images Exist</div>
    <div v-if="showAddDesign" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white p-6 rounded shadow-lg">
        <h3 class="font-bold mb-4">Add/Edit Design (Placeholder)</h3>
        <p>Implement FeaturedAddDesign.vue Logic Here</p><button class="btn btn-secondary mt-4"
          @click="showAddDesign = false">Close</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, watch, useStore } from 'vuex'
import { notify } from '@kyvg/vue3-notification'
import _ from 'lodash'
export default defineComponent({ name: 'featuredSelected', props: { section: { type: String, required: true } }, setup(props: { section: string }) { const store = useStore(); const showAddDesign = ref(false); type Product = { id: string; name?: string; detailedImageUrls?: string[] }; type Design = { config?: { name?: string; designType?: string }; products: Product[] }; const featuredDesigns = ref([] as Design[]); const loadDesigns = () => { const getter = (store.getters && (store.getters['featuredStore/getDesignsByName'] as unknown)) as ((name: string) => unknown) | undefined; const designs = getter ? (getter(props.section) as unknown) : []; featuredDesigns.value = _.cloneDeep(designs) as Design[] }; watch(() => props.section, loadDesigns, { immediate: true }); const saveFeatured = async () => { try { const dispatch = (store.dispatch as unknown) as ((action: string, payload?: unknown) => Promise<unknown>); await dispatch('featuredStore/save', { section: props.section, featuredDesigns: featuredDesigns.value }); notify({ type: 'success', text: 'Saved Successfully' }) } catch (error) { console.log('Error', error); notify({ type: 'error', text: 'Save Failed' }) } }; const removeDesign = (index: number) => { featuredDesigns.value.splice(index, 1) }; const editTrigger = (design: Design) => { console.log('Edit', design) }; return { showAddDesign, featuredDesigns, saveFeatured, removeDesign, editTrigger } } })
</script>