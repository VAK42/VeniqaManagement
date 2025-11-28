<template>
  <div class="p-6 bg-white min-h-screen">
    <div class="flex justify-between items-center mb-6"><button @click="$emit('cancel')"
        class="text-blue-600 flex items-center"><font-awesome-icon icon="chevron-left" class="mr-2" />Back</button>
      <h2 class="text-2xl font-bold">Manage Images</h2><button @click="finish" class="btn btn-primary">Done</button>
    </div>
    <div class="border-2 border-dashed border-gray-300 p-6 text-center rounded mb-6"><label
        class="cursor-pointer block"><span class="text-blue-600 font-bold">Upload Images</span><input type="file"
          multiple @change="handleFileUpload" class="hidden" accept="image/*" /></label></div>
    <div class="grid grid-cols-3 gap-4">
      <div v-for="(img, index) in localImages" :key="index" class="relative border rounded overflow-hidden h-32"><img
          :src="img.url" class="w-full h-full object-cover" /><button @click="removeImage(index)"
          class="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">×</button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref } from 'vuex'
interface LocalImage { url: string; file?: File }
export default defineComponent({ name: 'managePhoto', props: { detailedUrls: { type: Array as () => string[], default: () => [] } }, emits: ['cancel', 'update-images'], setup(props: { detailedUrls?: string[] }, { emit }: { emit: (event: 'update-images' | 'cancel', payload?: unknown) => void }) { const localImages = ref([] as LocalImage[]); if (props.detailedUrls) props.detailedUrls.forEach((url: string) => { localImages.value.push({ url }) }); const handleFileUpload = (event: Event) => { const target = event.target as HTMLInputElement; const files = target.files; if (files) { for (let i = 0; i < files.length; i++) { const file = files.item(i); if (!file) continue; localImages.value.push({ url: URL.createObjectURL(file), file }) } } }; const removeImage = (index: number) => { localImages.value.splice(index, 1) }; const finish = () => { const files = localImages.value.map(img => img.file).filter((f): f is File => f !== undefined); emit('update-images', files); emit('cancel') }; return { localImages, handleFileUpload, removeImage, finish } } })
</script>