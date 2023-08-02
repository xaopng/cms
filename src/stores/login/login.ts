import { defineStore } from 'pinia'
import {
  accountLoginRequest,
  getUserInfoById,
  getUserMenusByRoleId
} from '@/services/login/login'
import type { IAccount } from '@/types'
import { localCache } from '@/utils/cache'
import router from '@/router'
import { LOGIN_TOKEN, USER_MENUS, USRE_INFO } from '@/global/constants'
import type { RouteRecordRaw } from 'vue-router'
import { mapMenusToRoutes } from '@/utils/map-menus'
import { useMainStore } from '@/stores/main/main.ts'

interface ILoginState {
  token: string
  userInfo: any
  userMenus: any
}

export const useLoginStore = defineStore('login', {
  // 如何指定state的类型
  state: (): ILoginState => ({
    token: localCache.getCache(LOGIN_TOKEN) ?? '',
    userInfo: localCache.getCache(USRE_INFO) ?? {},
    userMenus: localCache.getCache(USER_MENUS) ?? []
  }),
  actions: {
    async loginaccountAction(account: IAccount) {
      // 登录账号，获取token信息
      const loginRes = await accountLoginRequest(account)
      const id = loginRes.data.id
      this.token = loginRes.data.token
      localCache.setCache(LOGIN_TOKEN, this.token)

      // 获取登录用户的详细信息（role信息）
      // 这一步之前需要将token保存到storage中
      const userInfoRes = await getUserInfoById(id)
      const userInfo = userInfoRes.data
      this.userInfo = userInfo

      // 根据用户的角色获取用户的权限
      const userMenusRes = await getUserMenusByRoleId(this.userInfo.role.id)
      const userMenus = userMenusRes.data
      this.userMenus = userMenus

      // 进行本地缓存
      localCache.setCache(USRE_INFO, userInfo)
      localCache.setCache(USER_MENUS, userMenus)

      // 获取所有角色和部门
      const mainStore = useMainStore()
      mainStore.fetchEntireRolesAndDepartmentsAction()

      // 动态添加路由
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => router.addRoute('main', route))
      // 页面跳转（main页面）
      router.push('/main')
    },
    loadLocalCache() {
      const token = localCache.getCache(LOGIN_TOKEN)
      const userInfo = localCache.getCache(USRE_INFO)
      const userMenus = localCache.getCache(USER_MENUS)
      if (token && userInfo && userMenus) {
        // 获取所有角色和部门
        const mainStore = useMainStore()
        mainStore.fetchEntireRolesAndDepartmentsAction()
        // 动态添加路由
        const routes = mapMenusToRoutes(userMenus)
        routes.forEach((route) => router.addRoute('main', route))
      }
    }
  }
})
