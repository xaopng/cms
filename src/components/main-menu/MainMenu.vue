<template>
  <div class="main-menu">
    <div class="logo">
      <img class="img" src="@/assets/img/logo.svg" alt="" />
      <h2 class="title" v-show="!isFold">vue3-ts-cms</h2>
    </div>
    <div class="menu">
      <el-menu
        :default-active="activeMenu"
        :collapse="isFold"
        text-color="#b7bdc3"
        active-text-color="#fff"
        background-color="#001529"
      >
        <template v-for="item in userMenus" :key="item.id">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <!-- 字符串转组件 => 动态组件 -->
                <component :is="item.icon.split('-icon-')[1]"></component>
              </el-icon>
              <span>{{ item.name }}</span>
            </template>

            <template v-for="iten in item.children" :key="iten.id">
              <el-menu-item
                :index="iten.id + ''"
                @click="handleMenuItemClick(iten)"
              >
                <span>{{ iten.name }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <!-- <el-sub-menu>
          <template #title>
            <el-icon><Monitor /></el-icon>
            <span>系统总览</span>
          </template>
          <el-menu-item>核心技术</el-menu-item>
          <el-menu-item>商品统计</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><Setting /></el-icon>
            <span>系统管理</span>
          </template>
          <el-menu-item>用户管理</el-menu-item>
          <el-menu-item>部门管理</el-menu-item>
          <el-menu-item>菜单管理</el-menu-item>
          <el-menu-item>角色管理</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><Goods /></el-icon>
            <span>商品中心</span>
          </template>
          <el-menu-item>商品类别</el-menu-item>
          <el-menu-item>商品信息</el-menu-item>
        </el-sub-menu>
        <el-sub-menu>
          <template #title>
            <el-icon><ChatLineRound /></el-icon>
            <span>随便聊聊</span>
          </template>
          <el-menu-item>你的故事</el-menu-item>
          <el-menu-item>故事列表</el-menu-item>
        </el-sub-menu> -->
      </el-menu>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'
import { useLoginStore } from '@/stores/login/login'
import { useRoute } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'
import { computed } from 'vue'
// 定义props
defineProps({
  isFold: {
    type: Boolean,
    default: false
  }
})

// 获取动态菜单
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
// 监听item的点击
function handleMenuItemClick(item: any) {
  const url = item.url
  router.push(url)
}

// 初始化默认菜单项
const route = useRoute()

const activeMenu = computed(() => {
  const defaultMenu = mapPathToMenu(route.path, userMenus)
  return defaultMenu.id + ''
})
</script>

<style lang="less" scoped>
.main-menu {
  background-color: #001529;
  height: 100%;
}

.logo {
  display: flex;
  height: 28px;
  padding: 12px 7px 8px;
  // flex-direction: row;
  align-items: center;
  overflow: hidden;

  .img {
    height: 100%;
    margin: 0 10px;
  }

  .title {
    font-size: 16px;
    font-weight: 700;
    color: white;
    // 不换行
    white-space: nowrap;
  }
}

.el-menu {
  border-right: none;
  user-select: none;
}

.el-sub-menu {
  .el-menu-item {
    padding-left: 50px !important;
    background-color: #0c2135;
  }

  .el-menu-item:hover {
    color: #fff;
  }

  .el-menu-item.is-active {
    background-color: #0a60bd;
  }
}
</style>
