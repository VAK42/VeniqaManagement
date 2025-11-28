import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import Login from '@/views/login.vue'
import Home from '@/views/home.vue'
import MainPage from '@/components/homepage/mainPage.vue'
import Featured from '@/views/featured.vue'
import OrderView from '@/views/orderview.vue'
import OrdersMainPage from '@/components/orders/ordersMainPage.vue'
import OrderDetail from '@/components/orders/orderDetail.vue'
import EmailConfirmation from '@/views/emailConfirmation.vue'
import PasswordConfirmation from '@/views/passwordConfirmation.vue'
import PageNotFound from '@/views/notFound.vue'
import PermissionConsts from '@/constants/permissions'
const routes: Array<RouteRecordRaw> = [{ path: '/login', name: 'login', component: Login }, { path: '/email-confirmation/:token', name: 'emailConfirmation', component: EmailConfirmation, props: true }, { path: '/password-reset/:token', name: 'passwordReset', component: PasswordConfirmation, props: true }, { path: '/', component: Home, meta: { requiresAuth: true }, children: [{ path: '', component: MainPage }, { path: 'catalog', name: 'catalog', component: MainPage }, { path: 'orders', component: OrderView, meta: { [PermissionConsts.superAdmin]: true }, children: [{ path: '', name: 'ordersMain', component: OrdersMainPage }, { path: 'detail', name: 'orderDetail', component: OrderDetail }] }, { path: 'featured', component: Featured, meta: { [PermissionConsts.superAdmin]: true } }] }, { path: '/:pathMatch(.*)*', name: 'pageNotFound', component: PageNotFound }]
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })
router.beforeEach((to, from, next) => { const token = localStorage.getItem('accessToken'); if (to.matched.some(r => r.meta.requiresAuth) && !token) { next('/login') } else { next() } })
export default router