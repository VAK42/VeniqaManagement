<template>
	<div>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div class="space-y-4">
				<div class="flex flex-col"><label class="font-bold text-gray-700">Enter Attribute Name</label><input
						v-model="formValues.name" type="text" class="input-field" /></div>
				<div class="flex flex-col"><label class="font-bold text-gray-700">Enter Type</label><select
						v-model="formValues.type" class="input-field" @change="typeChanged">
						<option v-for="type in allDataTypes" :key="type" :value="type">{{ type }}</option>
					</select></div>
				<div class="flex flex-col"><label class="font-bold text-gray-700">Enter Key</label><input
						v-model="formValues.key" type="text" class="input-field" /></div>
			</div>
			<div class="bg-gray-50 p-4 rounded">
				<p class="font-bold mb-2">Add Values</p>
				<div v-if="formValues.type === 'Colors'" class="space-y-2 max-h-48 overflow-y-auto">
					<div v-for="(val, vind) in formValues.values" :key="vind" class="flex items-center space-x-2"><input
							v-model="val.name" placeholder="Color Name" class="input-field flex-grow" /><input v-model="val.hexValue"
							type="color" class="h-10 w-10 p-0 border-0" /><button class="text-red-500"
							@click="deleteLine(vind)"><font-awesome-icon icon="trash" /></button></div>
					<button class="btn btn-primary text-sm mt-2" @click="addLine">Add New Value</button>
				</div>
				<div v-else><vue3-tags-input :tags="formValues.values" @on-tags-changed="handleTagsChanged" /></div>
			</div>
		</div>
		<div class="mt-4"><button class="btn btn-success" :disabled="checkAllStates" @click="addAttribute">Add
				Attribute</button></div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, computed } from 'vuex'
import cloneDeep from 'lodash/cloneDeep'
import productAttribDto from '@/dto/productattribute.json'
import Vue3TagsInput from 'vue3-tags-input'
interface AttributeValue { name?: string | null; hexValue?: string }
interface FormValues { name?: string; key?: string; type?: string; values?: Array<AttributeValue | string> }
export default defineComponent({ name: 'addAttributeForm', components: { Vue3TagsInput }, setup(_, { emit }) { const initial = cloneDeep(productAttribDto) as unknown as FormValues; const formValues = reactive({ ...(initial || {}) } as FormValues); const allDataTypes = ['Toggle', 'Array', 'Colors'] as string[]; function addAttribute() { const replica = cloneDeep(formValues) as FormValues; emit('add', replica); resetForm() } function resetForm() { const fresh = cloneDeep(productAttribDto) as unknown as FormValues; Object.assign(formValues, fresh) } function typeChanged() { if (formValues && Array.isArray(formValues.values)) { formValues.values = [] } } function deleteLine(ind: number) { if (formValues && Array.isArray(formValues.values)) { formValues.values.splice(ind, 1) } } function addLine() { if (formValues && Array.isArray(formValues.values)) { (formValues.values as Array<AttributeValue>).push({ name: null, hexValue: '#000000' }) } } function handleTagsChanged(tags: Array<{ text: string }>) { if (formValues) { formValues.values = tags.map(t => t.text) } } const checkAllStates = computed(() => { return !(formValues && formValues.name && formValues.key && formValues.type) }); return { formValues, allDataTypes, addAttribute, resetForm, typeChanged, deleteLine, addLine, handleTagsChanged, checkAllStates } } })
</script>