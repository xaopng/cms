<template>
  <div class="header-crumb">
    <el-breadcrumb separator-icon="CaretRight">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="item.path">{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useLoginStore } from '@/stores/login/login'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
const route = useRoute()
const loginStore = useLoginStore()
const userMenus = loginStore.userMenus
const breadcrumbs = computed(() => {
  return mapPathToBreadcrumbs(route.path, userMenus)
})
</script>

<style lang="less" scoped>
.header-crumb {
}
</style>
