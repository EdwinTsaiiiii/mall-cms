import { createApp } from 'vue'
import { globalResgister } from './global'

import 'normalize.css/normalize.css'
import './assets/css/index.css'

import App from './App.vue'
import router from './router'
import store from './store'
import { setupStore } from './store'

const app = createApp(App)

app.use(globalResgister)
app.use(router)
app.use(store)
// 每次刷新页面，都会调用这个函数
setupStore()

app.mount('#app')
