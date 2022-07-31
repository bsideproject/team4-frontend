import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)

import store from '../store/index'
app.use(store)

import axios from 'axios'
import VueAxios from 'vue-axios'
app.use(VueAxios, axios)



app.mount('#app')