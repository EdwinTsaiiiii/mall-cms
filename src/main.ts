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
app.use(store)
// app.use() -> install(){} -> 获取当前path -> router.routes -> not-found -> 注册动态路由routes -> 路由守卫（回调函数）
// 解决注册路由快执行于路由守卫的问题，需先调用setupStore注册动态路由，再use router
// 每次刷新页面，都会调用这个函数
setupStore()
app.use(router)

app.mount('#app')
