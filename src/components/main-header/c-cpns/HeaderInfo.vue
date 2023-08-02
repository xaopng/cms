<template>
  <div class="header-info">
    <!-- 1. 操作图标 -->
    <div class="operation">
      <span>
        <el-icon><Message></Message></el-icon>
      </span>
      <span>
        <span class="dot"></span>
        <el-icon><ChatDotRound /></el-icon>
      </span>
      <span>
        <el-icon><Search /></el-icon>
      </span>
    </div>
    <!-- 2. 个人信息 -->
    <div class="info">
      <el-dropdown>
        <span class="user-info">
          <el-avatar
            :size="30"
            src="https://upload.jianshu.io/users/upload_avatars/1102036/c3628b478f06.jpeg"
          />
          <span class="name">coderwhy</span>
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="handleExitClick">
              <span>
                <el-icon><CircleClose /></el-icon>
                <span>退出系统</span>
              </span>
            </el-dropdown-item>
            <el-dropdown-item>Action 2</el-dropdown-item>
            <el-dropdown-item>Action 3</el-dropdown-item>
            <el-dropdown-item disabled>Action 4</el-dropdown-item>
            <el-dropdown-item divided>Action 5</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { localCache } from '@/utils/cache'
import { LOGIN_TOKEN } from '@/global/constants'
// 获取router的两种方式

// 方式1
// import router from '@/router'

// 方式2(推荐)
import { useRouter } from 'vue-router'
const router = useRouter()

// 退出登录逻辑
function handleExitClick() {
  // 删除token
  localCache.removeCache(LOGIN_TOKEN)
  // 跳回到login页面
  router.push('/login')
}
</script>

<style lang="less" scoped>
.header-info {
  display: flex;
  align-items: center;
}

.operation {
  display: inline-flex;
  margin-right: 20px;

  span {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 35px;

    &:hover {
      background: #f2f2f2;
    }

    i {
      font-size: 20px;
    }

    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      z-index: 10;
      width: 6px;
      height: 6px;
      background: red;
      border-radius: 100%;
    }
  }
}

.info {
  .user-info {
    display: flex;
    align-items: center;
    cursor: pointer;

    .name {
      margin-left: 5px;
    }
  }
}

.info {
  // :global()是设置全局样式，相当于在根元素html中写样式，作用于全局
  // 为什么不适用:deep()呢？因为这个类渲染在 #app 元素外面，使用 :deep 方式选不到这个类
  // 对于子组件的根元素上的类是可以直接选的，也就是说不使用:deep 方法也能选（前提是子组件渲染在我们书写的对应位置，不是第一种情况）
  // 如果选择子组件非根元素，则使用 :deep()
  :global(.el-dropdown-menu__item) {
    line-height: 36px !important;
    padding: 6px 22px;
  }
}
</style>
