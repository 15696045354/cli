import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import request from '@/utils/request'
import util from '@/utils/util'

const app = createApp(App)
app.config.globalProperties.request = request
app.config.globalProperties.util = util
app.use(store).use(router).mount('#app')
