<template>
  <div class="panel-account">
    <el-form
      ref="formRef"
      status-icon
      :model="account"
      size="large"
      :rules="accountRules"
    >
      <el-form-item label="账号" prop="name">
        <el-input v-model="account.name" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="account.password" show-password />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { type FormRules, type ElForm, ElMessage } from 'element-plus'
import { useLoginStore } from '@/stores/login/login'
import type { IAccount } from '@/types/index'
import { localCache } from '@/utils/cache'

const CACHE_NAME = 'name'
const CACHE_PASSWORD = 'password'

// 表单数据
const account = reactive<IAccount>({
  name: localCache.getCache(CACHE_NAME) ?? '',
  password: localCache.getCache(CACHE_PASSWORD) ?? ''
})
// 校验规则
const accountRules: FormRules = {
  name: [
    {
      message: '必须输入账号信息~',
      required: true,
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '必须是6-20位数字或字母组成~',
      required: true,
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      trigger: 'blur',
      message: '必须输入密码信息~'
    },
    {
      message: '必须是3位以上数字或字母~',
      trigger: 'blur',
      required: true,
      pattern: /^[a-z0-9]{3,}$/
    }
  ]
}

// 执行账号登录逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
const loginStore = useLoginStore()
function loginAction(isRemPwd: boolean) {
  formRef.value?.validate((valid) => {
    if (valid) {
      // 获取用户名和密码
      const name = account.name
      const password = account.password

      // 发送网络请求
      loginStore.loginaccountAction({ name, password }).then((res) => {
        // 判断是否记住密码
        if (isRemPwd) {
          localCache.setCache(CACHE_NAME, name)
          localCache.setCache(CACHE_PASSWORD, password)
        } else {
          localCache.removeCache(CACHE_NAME)
          localCache.removeCache(CACHE_PASSWORD)
        }
      })
    } else {
      // 校验失败进行提示
      // 使用ElMessage需要引入样式
      ElMessage.error('Oops，请您输入正确的个时候再进行登录~~')
    }
  })
}
// 将方法暴露出去
defineExpose({
  loginAction
})
</script>

<style lang="less" scoped>
.panel-account {
  color: red;
}
</style>
