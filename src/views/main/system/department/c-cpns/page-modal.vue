<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建部门' : '编辑部门'"
      width="30%"
      destroy-on-close
      center
    >
      <div class="form">
        <el-form :model="formData" size="large" ref="formRef">
          <el-form-item label="部门名称" label-width="80px" prop="name">
            <el-input v-model="formData.name" placeholder="请输入部门名称" />
          </el-form-item>
          <el-form-item label="部门领导" label-width="80px">
            <el-input v-model="formData.leader" placeholder="请输入部门领导" />
          </el-form-item>
          <el-form-item label="上级部门" label-width="80px" prop="parentId">
            <el-select
              v-model="formData.parentId"
              placeholder="请选择上级部门"
              style="width: 100%"
            >
              <template v-for="item in entireDepartments" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main/main'
import { useSystemStore } from '@/stores/main/system/system'
import { ElForm } from 'element-plus'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'

const formData = reactive<any>({
  name: '',
  leader: '',
  parentId: ''
})

// 定义内部属性
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
// 定义设置 dialogVisible 的方法
function setDialogVisible(isNew: boolean = true, itemData: any = {}) {
  dialogVisible.value = true
  isNewRef.value = isNew
  if (!isNew) {
    editData.value = itemData
    for (const key in formData) {
      formData[key] = itemData[key]
    }
  } else {
    editData.value = null
  }
}
// 获取role/department数据
const mainStroe = useMainStore()
const systemStore = useSystemStore()
const { entireDepartments } = storeToRefs(mainStroe)

// 新建/编辑用户逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
function handleConfirmClick() {
  // 隐藏modal
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.editPageDataAction('department', editData.value.id, formData)
  } else {
    // 发送请求
    systemStore.newPageDataAction('department', formData)
  }
  // 重置数据
  for (const key in formData) {
    formData[key] = ''
  }
}
// 暴露属性和方法
defineExpose({
  setDialogVisible
})
</script>

<style lang="less" scoped>
.form {
  padding: 0 20px;
}
</style>
