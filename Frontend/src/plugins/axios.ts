import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { eventHub } from '@/utils/eventHub'
const baseUrl = 'http://localhost:3000'
const instance: AxiosInstance = axios.create({ baseURL: baseUrl, withCredentials: true })
function isPlainObject(val: unknown): val is Record<string, unknown> { return val !== null && typeof val === 'object' && !Array.isArray(val) && !(val instanceof Date) }
function snakeToCamel(val: unknown): unknown { if (Array.isArray(val)) return val.map(snakeToCamel); if (!isPlainObject(val)) return val; const out: Record<string, unknown> = {}; Object.keys(val).forEach(k => { const newKey = k.replace(/_([a-z0-9])/g, (_: string, c: string) => c.toUpperCase()); out[newKey] = snakeToCamel((val as Record<string, unknown>)[k]) }); return out }
instance.interceptors.request.use((conf: InternalAxiosRequestConfig) => { eventHub.emit('beforeRequest'); const token = localStorage.getItem('accessToken'); if (token && conf.headers) { (conf.headers as Record<string, string>).Authorization = `Bearer ${token}` } return conf }, (error: AxiosError) => { eventHub.emit('requestError'); return Promise.reject(error) })
instance.interceptors.response.use((response: AxiosResponse) => { eventHub.emit('afterResponse'); if (response && response.data) response.data = snakeToCamel(response.data); return response }, (error: AxiosError) => { eventHub.emit('responseError'); return Promise.reject(error) })
export default instance