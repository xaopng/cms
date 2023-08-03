<template>
  <div class="user">
    <user-search
      @queryClick="handleQueryClick"
      @resetClick="handleResetClick"
    ></user-search>
    <user-content
      ref="userContentRef"
      @new-click="handleNewClick"
      @edit-click="handleEditClick"
    ></user-content>
    <user-modal ref="userModalRef"></user-modal>
  </div>
</template>

<script setup lang="ts">
import UserSearch from './c-cpns/user-search.vue'
import UserContent from './c-cpns/user-content.vue'
import UserModal from './c-cpns/user-modal.vue'

// 处理搜索表单事件
const userContentRef = ref<InstanceType<typeof UserContent>>()
function handleQueryClick(queryInfo: any) {
  userContentRef.value?.fetchUserListData(queryInfo)
}
function handleResetClick() {
  userContentRef.value?.fetchUserListData()
}

// 新建/编辑用户操作
const userModalRef = ref<InstanceType<typeof UserModal>>()
function handleNewClick() {
  userModalRef.value?.setDialogVisible()
}
function handleEditClick(itemData) {
  userModalRef.value?.setDialogVisible(false, itemData)
}
</script>

<style lang="less" scoped>
.user {
  // 这两个样式组合能让子元素上边两个角是圆角，下边是直角
  // 暂时不知道是为什么
  border-radius: 8px;
  overflow: hidden;
}
</style>
