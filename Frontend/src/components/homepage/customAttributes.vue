<template>
	<div id="custom-attribute">
		<div class="mt-4"></div>
		<addAttributeForm @add="addNewAttribute" />
		<table class="w-full text-sm mt-4 border-collapse" v-if="attributes.length > 0">
			<thead>
				<tr class="bg-gray-100 text-left">
					<th class="p-2">Name</th>
					<th class="p-2">Key</th>
					<th class="p-2">Type</th>
					<th class="p-2">Values</th>
					<th class="p-2">Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(attrib, aind) in attributes" :key="aind" class="border-b">
					<td class="p-2">{{ attrib.name }}</td>
					<td class="p-2">{{ attrib.key }}</td>
					<td class="p-2">{{ attrib.type }}</td>
					<td class="p-2" v-if="attrib.type === 'Colors'">{{ extractColorValues(attrib) }}</td>
					<td class="p-2" v-else>{{ attrib.values ? attrib.values.join(' , ') : '' }}</td>
					<td class="p-2"><a class="text-red-500 cursor-pointer"><font-awesome-icon icon="trash"
								@click="deleteAttribute(aind)" /></a></td>
				</tr>
			</tbody>
		</table>
		<div class="flex justify-end mt-4 space-x-2"><button class="btn btn-primary"
				@click="cancel()">Cancel</button><button class="btn btn-success" :disabled="attributes.length <= 0"
				@click="save()">Save</button></div>
	</div>
</template>
<script lang="ts">
import { defineComponent, reactive, watch } from 'vuex'
import _ from 'lodash'
import { attributes } from '@/constants/constants'
import { notify } from '@kyvg/vue3-notification'
import addAttributeForm from '@/components/homepage/addAttributeForm.vue'
interface AttributeValue { name?: string | null; hexValue?: string }
interface FormValues { name?: string; key?: string; type?: string; values?: Array<AttributeValue | string> }
export default defineComponent({ name: 'customAttribute', components: { addAttributeForm }, props: { propValue: { type: Array as () => FormValues[], required: true } }, setup(props, { emit }) { const attributesState = reactive({ attributes: [] } as { attributes: FormValues[] }); const init = () => { if (props.propValue && (props.propValue as FormValues[]).length > 0) { attributesState.attributes = _.cloneDeep(props.propValue as FormValues[]) } else { attributesState.attributes = [] } }; init(); watch(() => props.propValue, init, { immediate: true }); function addNewAttribute(attrib: FormValues) { attributesState.attributes.push(attrib) } function deleteAttribute(ind: number) { attributesState.attributes.splice(ind, 1) } function extractColorValues(attribute: FormValues) { const vals = attribute.values as Array<AttributeValue> | undefined; return (vals || []).map(v => v && (v as AttributeValue).name).filter(Boolean).join(' , ') } function cancel() { attributesState.attributes = []; emit('cancel') } function save() { if (validateForms()) { let isTrue = true; for (let i = 0; i < attributesState.attributes.length; i += 1) { const obj = attributesState.attributes[i]; if (!obj || !Array.isArray(obj.values) || obj.values.length <= 1) { isTrue = false; break } } if (!isTrue) { notify({ type: 'error', text: 'You Have To Have At Least 2 Options For Each Attribute' }); return } emit('save', attributesState.attributes) } else { notify({ type: 'error', text: 'None Of The Fields Above Can Be Empty.' }) } } function validateForms(): boolean { for (let i = 0; i < attributesState.attributes.length; i += 1) { const attr = attributesState.attributes[i]; if (!attr || attr.name == null || (attr.name as string).length === 0 || attr.type == null || (attr.type as string).length === 0 || attr.key == null || (attr.key as string).length === 0 || attr.values == null || (attr.values as Array<unknown>).length === 0) { return false } if ((attr.type as string) === attributes.color) { for (let j = 0; j < (attr.values as Array<AttributeValue>).length; j += 1) { const obj = (attr.values as Array<AttributeValue>)[j]; if (!obj || obj.hexValue == null || obj.name == null || (obj.name as string).trim().length === 0) return false } } } return true } return { attributes: attributesState.attributes, addNewAttribute, deleteAttribute, extractColorValues, cancel, save, validateForms } } })
</script>