import axios from '@/plugins/axios'
import proxyUrls from '@/constants/proxyUrls'
type AnyObj = Record<string, unknown>
type CommitFn = (mutation: string, payload?: unknown) => void
type ActionCtx = { commit: CommitFn; dispatch?: (action: string) => void }
interface State { categories: AnyObj[] }
export default { namespaced: true, state: { categories: [] } as State, actions: { async getCategories({ commit }: ActionCtx) { try { const { data } = await axios.get(proxyUrls.allCategories); commit('setCategories', data) } catch (err) { throw err } }, async addCategory({ dispatch }: ActionCtx, category: AnyObj) { try { await axios.post(proxyUrls.addCategory, category); dispatch?.('getCategories') } catch (err) { console.log('Error', err); throw err } }, async editCategory({ dispatch }: ActionCtx, category: AnyObj) { try { await axios.put(proxyUrls.editCategory, category); dispatch?.('getCategories') } catch (err) { console.log('Error', err); throw err } } }, mutations: { setCategories(state: State, payload: AnyObj[]) { state.categories = payload } }, getters: { getCategories: (state: State) => state.categories } }