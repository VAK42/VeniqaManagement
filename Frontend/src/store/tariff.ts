import axios from '@/plugins/axios'
import proxyUrls from '@/constants/proxyUrls'
type AnyObj = Record<string, unknown>
type CommitFn = (mutation: string, payload?: unknown) => void
type ActionCtx = { commit: CommitFn; dispatch?: (action: string) => void }
interface State { tariffs: AnyObj[] }
export default { namespaced: true, state: { tariffs: [] } as State, actions: { async getTariffs({ commit }: ActionCtx) { try { const { data } = await axios.get(proxyUrls.allTariffs); commit('setTariffs', data) } catch (err) { throw err } }, async addTariff({ dispatch }: ActionCtx, tariff: AnyObj) { try { await axios.post(proxyUrls.addTariff, tariff); dispatch?.('getTariffs') } catch (err) { console.log('Error', err); throw err } }, async editTariff({ dispatch }: ActionCtx, tariff: AnyObj) { try { await axios.put(proxyUrls.editTariff, tariff); dispatch?.('getTariffs') } catch (err) { console.log('Error', err); throw err } } }, mutations: { setTariffs(state: State, payload: AnyObj[]) { state.tariffs = payload } }, getters: { getTariffs: (state: State) => state.tariffs } }