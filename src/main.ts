import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import ROUTE from '@/constants/route.json'
window.ROUTE = ROUTE

import { router } from './router/index'
app.use(router)

import store from './store/index'
app.use(store)

import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios)

import Datepicker from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'
app.component('Datepicker', Datepicker)

import BottomSheet from '@components/common/BottomSheet.vue'
app.component('BottomSheet', BottomSheet)

import 'vue-toast-notification/dist/theme-sugar.css'

app.mount('#app')
