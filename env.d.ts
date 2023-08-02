/// <reference types="vite/client" />

// 配置vue文件模块

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  const component: DefineComponent
  export default component
}
// 让编辑器认识mjs文件，将它当作一个模块
declare module '*.mjs'
