import { createApp } from 'vue'
import appComponent from './App.vue'
import router from './router'
import store from './store/store'
import './assets/css/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon as fontAwesomeIconComponent } from '@fortawesome/vue-fontawesome'
import notifications from '@kyvg/vue3-notification'
import datePickerComponent from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
import toggleButtonComponent from '@vueform/toggle'
import '@vueform/toggle/themes/default.css'
import axiosInstance from './plugins/axios'
library.add(fas)
const app = createApp(appComponent)
app.use(router)
app.use(store)
app.use(notifications)
app.component('fontAwesomeIcon', fontAwesomeIconComponent)
app.component('datePicker', datePickerComponent)
app.component('toggleButton', toggleButtonComponent)
app.config.globalProperties.$axios = axiosInstance
app.mount('#app')