import 'normalize.css'
import '@/assets/css/index.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import registerIcons from './global/register-icons'
import store from './stores'
// import ElementPlus from 'element-plus'

// 引入组件库样式：

// 1. 引入所有element-plus组件的样式
// import 'element-plus/dist/index.css'

// 2. 引入ElMessage和ElLoading等组件的样式
// import 'element-plus/theme-chalk/el-message.css'

// 3. 插件自动引入样式：https://github.com/vbenjs/vite-plugin-style-import
// vite-plugin-style-import 依赖consola包：npm install consola -D

const app = createApp(App)

app.use(store)
app.use(router)
// app.use(ElementPlus)
// use传入函数时，这个函数会自动调用，并且给函数传入参数app
app.use(registerIcons)

app.mount('#app')
