<template>
  <div class="p-4">
    <div class="card">
      <div class="card-header">
        <h4 class="text-lg font-semibold">Featured Section</h4>
      </div>
      <div class="card-body">
        <div class="flex border-b mb-4">
          <button v-for="(section, sid) in sections" :key="sid" @click="currentSection = section"
            :class="['px-4 py-2 font-medium', currentSection === section ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500 hover:text-gray-700']">{{
              section.toUpperCase() }}</button>
        </div>
        <div>
          <featuredSelected :section="currentSection" v-if="currentSection" />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed, onMounted, useStore } from 'vuex'
import FeaturedSelected from '@/components/featured/featuredSelected.vue'
export default defineComponent({ name: 'FeaturedView', components: { FeaturedSelected }, setup() { const store = useStore(); const currentSection = ref(''); const sections = computed(() => ((store.getters && (store.getters['featuredStore/sections'] as unknown)) as string[])); onMounted(async () => { try { await store.dispatch('featuredStore/getAllFeaturedList'); if (sections.value.length > 0) { currentSection.value = sections.value[0] } } catch (error) { console.log('Error', error) } }); return { sections, currentSection } } })
</script>