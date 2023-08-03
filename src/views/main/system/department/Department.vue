<template>
  <div class="department">
    <page-search
      @query-click="handleQueryClick"
      @reset-click="handleResetClick"
    />
    <page-content
      ref="contentRef"
      @edit-click="handleEditClick"
      @new-click="handleNewClick"
    />
    <page-modal ref="modalRef" />
  </div>
</template>

<script setup lang="ts" name="department">
import PageSearch from './c-cpns/page-search.vue'
import PageContent from './c-cpns/page-content.vue'
import { ref } from 'vue'
import pageModal from './c-cpns/page-modal.vue'
const contentRef = ref<InstanceType<typeof PageContent>>()
function handleQueryClick(queryInfo: any) {
  contentRef.value?.fetchPageListData(queryInfo)
}
function handleResetClick() {
  contentRef.value?.fetchPageListData()
}

const modalRef = ref<InstanceType<typeof pageModal>>()
function handleEditClick(itemData: any) {
  modalRef.value?.setDialogVisible(false, itemData)
}
function handleNewClick() {
  modalRef.value?.setDialogVisible()
}
</script>

<style scoped>
.department {
}
</style>
