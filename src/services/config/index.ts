// 1.区分开发环境和生产环境
// export const BASE_URL = 'http://coderwhy.dev:8000'
// export const BASE_URL = 'http://codercba.prod:8000'

// 2.代码逻辑判断, 判断当前环境
// vite默认提供的环境变量
// console.log(import.meta.env.MODE)
// console.log(import.meta.env.DEV) // 是否开发环境
// console.log(import.meta.env.PROD) // 是否生产环境
// console.log(import.meta.env.SSR) // 是否是服务器端渲染(server side render)

// coderwhy老师的服务器过期了，源地址不能访问了，现在网上有一些写了这些接口的项目：
// https://github.com/zep03/koa-coderhub/blob/main/CoderHub%E6%8E%A5%E5%8F%A3%E6%96%87%E6%A1%A3.md
// https://github.com/mafqla/imooc-api
// 这里找到了coderwhy老师最新的后端地址：https://www.52pojie.cn/thread-1753481-3-1.html
let BASE_URL = ''
if (import.meta.env.PROD) {
  BASE_URL = 'http://codercba.prod:8000'
} else {
  // BASE_URL = 'http://coderwhy.dev:8000'
  // BASE_URL = 'http://codercba.dev:5000'
  BASE_URL = 'http://codercba.com:5000'
}

// 3.通过创建.env文件直接创建变量
// console.log(import.meta.env.VITE_URL)

export const TIME_OUT = 10000
export { BASE_URL }
