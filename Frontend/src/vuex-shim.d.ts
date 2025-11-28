declare module 'lodash'
declare module 'eslint-plugin-oxlint'
declare module 'vuex'
declare module '@vuepic/vue-datepicker'
declare module 'vue3-tags-input'
declare module '*.vue' { import type { DefineComponent } from 'vue'; const component: DefineComponent<Record<string, unknown>, Record<string, unknown>, unknown>; export default component }
declare module 'epic-spinners' { export const FingerprintSpinner: unknown }
declare module '*.json' { const value: unknown; export default value }
declare module '@vue/runtime-core' { interface ComponentCustomProperties { $store: Record<string, unknown> } }
declare module 'vuex' { import type { Ref, ComputedRef } from 'vue'; export function useStore(): unknown; export function defineComponent(options: unknown): unknown; export function ref<T = unknown>(value: T): Ref<T>; export function reactive<T extends object>(state: T): T; export function computed<T>(getter: () => T): ComputedRef<T>; export function watch(...args: unknown[]): unknown }