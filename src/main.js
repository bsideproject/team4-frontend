import { createApp } from 'vue'
import { router } from './router'; // 라우터 추가

import App from './App.vue'

// Create Vue Instance
const app = createApp(App);

app.use(router); // 사용 설정

app.mount('#app');