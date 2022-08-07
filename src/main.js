import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App);

import ROUTE from '@/constants/route.json'
window.ROUTE = ROUTE

import { router } from './router/index';
app.use(router);

import store from './store/index'
app.use(store)

import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios)


app.mount('#app')