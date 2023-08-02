// 动态添加路由
import router from '@/router'
import type { RouteRecordRaw } from 'vue-router'

function loadLocalRoutes() {
  // 1. 动态获取所有路由对象，放到数组中
  // * 路由对象都在独立文件中

  // * 从文件中将所有路由对象先读取到数组中
  const localRoutes: RouteRecordRaw[] = []
  // 1.1 读取router/main当中所有的ts文件
  // import.meta.glob 匹配文件， vite提供的 等同于webpack 的require
  const files: Record<string, any> = import.meta.glob('@/router/main/**/*.ts', {
    eager: true
  })
  // 1.2 将加载出来的route 路由放到数组当中
  for (const key in files) {
    const module = files[key]
    localRoutes.push(module.default)
  }
  return localRoutes
}

// 用于进入/main时（登录，或url进入/main）页面显示为菜单的第一项
// 用在路由守卫哪个地方
export let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]) {
  // 1. load local routes
  const localRoutes = loadLocalRoutes()
  // 2. 根据菜单去匹配正确的路由
  const routes: RouteRecordRaw[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      const route = localRoutes.find((item) => item.path === submenu.url)
      if (route) {
        // 1.给route的顶层菜单增加重定向功能(但是只需要添加一次即可)
        if (!routes.find((item) => item.path === menu.url)) {
          routes.push({ path: menu.url, redirect: route })
        }

        routes.push(route)

        // 记录第一项菜单
        if (!firstMenu) {
          firstMenu = submenu
        }
      }
    }
  }
  return routes
}

export function mapPathToMenu(path: string, userMenus: any[]) {
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        return submenu
      }
    }
  }
}

interface IBreadcrumb {
  path: string
  name: string
}

export function mapPathToBreadcrumbs(
  path: string,
  userMenus: any[]
): IBreadcrumb[] {
  const breadcrumbs: IBreadcrumb[] = []
  for (const menu of userMenus) {
    for (const submenu of menu.children) {
      if (path === submenu.url) {
        breadcrumbs.push({ name: menu.name, path: menu.url })
        breadcrumbs.push({ name: submenu.name, path: submenu.url })
      }
    }
  }
  return breadcrumbs
}
