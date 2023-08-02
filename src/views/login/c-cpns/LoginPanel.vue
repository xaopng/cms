<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
    <div class="tabs">
      <el-tabs type="border-card" stretch v-model="activeName">
        <!-- 账号登录panel -->
        <el-tab-pane name="account">
          <template #label>
            <div class="label">
              <el-icon><UserFilled /></el-icon>
              <span class="text">账号登录</span>
            </div>
          </template>
          <PanelAccount ref="accountRef"></PanelAccount>
        </el-tab-pane>
        <!-- 手机登录panel -->
        <el-tab-pane name="phone">
          <template #label>
            <div class="label">
              <el-icon><Iphone /></el-icon>
              <span class="text">手机登录</span>
            </div>
          </template>
          <PanelPhone></PanelPhone>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="controls">
      <el-checkbox v-model="isRemPwd" label="记住密码" size="large" />
      <el-link type="primary">忘记密码</el-link>
    </div>
    <el-button
      class="login-btn"
      type="primary"
      size="large"
      @click="handleLoginBtnClick"
      >立即登录</el-button
    >
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import PanelAccount from './PanelAccount.vue'
import PanelPhone from './PanelPhone.vue'
import { localCache } from '@/utils/cache'

const activeName = ref('account')
const isRemPwd = ref<boolean>(localCache.getCache('isRemPwd') ?? false)
// 实时存储 记住密码的值
watch(isRemPwd, (newValue) => {
  localCache.setCache('isRemPwd', newValue)
})
// InstanceType<typeof PanelAccount 表示由PanelAccount这个对象的构造器构造出的实例
const accountRef = ref<InstanceType<typeof PanelAccount>>()

function handleLoginBtnClick() {
  if (activeName.value === 'account') {
    // 获取子组件实例
    // 调用方法
    // 记住密码
    // 子组件才知道账号密码，所以要让子组件知道是否记住密码
    accountRef.value?.loginAction(isRemPwd.value)
  } else {
    console.log('手机登录')
  }
}
</script>

<style lang="less" scoped>
.login-panel {
  width: 330px;

  .title {
    text-align: center;
  }

  .tabs {
    margin-top: 10px;

    .label {
      .text {
        margin-left: 5px;
      }
    }
  }

  .controls {
    margin-top: 12px;
    display: flex;
    justify-content: space-between;
  }

  .login-btn {
    width: 100%;
    margin-top: 10px;
  }
}
</style>
