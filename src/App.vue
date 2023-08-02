<template>
  <div class="app">
    <!-- 国际化，让element plus的组件按照计算机本地的语言显示 -->
    <el-config-provider :locale="zhCn">
      <RouterView></RouterView>
    </el-config-provider>
  </div>
</template>
<script setup lang="ts">
import { RouterView } from 'vue-router'
// 编辑器不认识.mjs结尾的文件，需要在env.d.ts中声明
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
</script>
<style scoped>
.app {
  /* 让app容器沾满整个窗口 */
  width: 100vw;
  height: 100vh;
}
</style>
