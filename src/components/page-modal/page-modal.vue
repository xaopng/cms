<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="
        isNewRef
          ? modalConfig?.header?.newTitle
          : modalConfig?.header?.editTitle
      "
      width="30%"
      destroy-on-close
      center
    >
      <div class="form">
        <el-form :model="formData" size="large" ref="formRef">
          <template v-for="item in modalConfig.formItems" :key="item.prop">
            <el-form-item v-bind="item">
              <template v-if="item.type === 'selection'">
                <el-select
                  v-model="formData[item.prop]"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                >
                  <template v-for="option in item.options" :key="option.value">
                    <el-option v-bind="option"></el-option>
                  </template>
                </el-select>
              </template>
              <template v-else>
                <el-input
                  v-model="formData[item.prop]"
                  size="large"
                  :placeholder="item.placeholder"
                ></el-input>
              </template>
            </el-form-item>
          </template>
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
interface IProps {
  modalConfig: {
    pageName: string
    header?: {
      newTitle?: string
      editTitle?: string
    }
    formItems: any[]
  }
}
const props = defineProps<IProps>()
const modalConfig = props.modalConfig
const initialData = {}
for (const item of modalConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}

const formData = reactive<any>(initialData)

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
    systemStore.editPageDataAction(
      modalConfig.pageName,
      editData.value.id,
      formData
    )
  } else {
    // 发送请求
    systemStore.newPageDataAction(modalConfig.pageName, formData)
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
