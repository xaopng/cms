import { LOGIN_TOKEN } from '@/global/constants'
import { localCache } from '@/utils/cache'
import { firstMenu } from '@/utils/map-menus'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // 得判断用户是否登录才进行跳转
    {
      path: '/',
      redirect: '/main'
    },
    {
      path: '/login',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/login/LoginView.vue')
    },
    {
      path: '/main',
      // 动态添加路由的时候通过name属性找到这个路由，方便给其添加子路由
      name: 'main',
      component: () => import('../views/main/MainView.vue'),
      // 动态路由，根据登录用户的权限动态添加路由
      children: []
    },
    // 配置一个Not Found页面，对于不存在的路径，转到这个页面
    {
      path: '/:pathMatch(.*)',
      component: () => import('../views/not-found/NotFoundView.vue')
    }
  ]
})

// 导航守卫
// 参数：to（跳转到的位置）from（从哪里跳转）
// 返回值决定导航的路径(不返回或者返回undefined，默认跳转)
// 举个例子：/ => /login
// to: /login from / 返回值: /abc
router.beforeEach((to, from) => {
  // 只有登录成功（token）才能进入main页面
  const token = localCache.getCache(LOGIN_TOKEN)
  if (to.path.startsWith('/main') && !token) {
    return '/login'
  }
  // 进入/main时，默认显示第一项菜单的页面
  if (to.path === '/main') {
    console.log('firstMenu', firstMenu)
    return firstMenu?.url
  }
})

export default router
