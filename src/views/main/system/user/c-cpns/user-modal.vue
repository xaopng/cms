<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      :title="isNewRef ? '新建用户' : '编辑用户'"
      width="30%"
      destroy-on-close
      center
    >
      <div class="form">
        <el-form :model="formData" size="large" ref="formRef">
          <el-form-item label="用户名" label-width="80px" prop="name">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" label-width="80px">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item
            v-if="isNewRef"
            label="密码"
            label-width="80px"
            prop="realname"
          >
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" label-width="80px" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="角色" label-width="80px" prop="roleId">
            <el-select
              v-model="formData.roleId"
              placeholder="请选择角色"
              style="width: 100%"
            >
              <template v-for="item in entireRoles" :key="item.id">
                <el-option :label="item.name" :value="item.id"></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="部门" label-width="80px" prop="departmentId">
            <el-select
              v-model="formData.departmentId"
              placeholder="请选择部门"
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
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 定义内部属性
const dialogVisible = ref(false)
const isNewRef = ref(true)
const editData = ref()
// 定义设置 dialogVisible 的方法
function setDialogVisible(isNew: boolean = true, itemData: any) {
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
const { entireRoles, entireDepartments } = storeToRefs(mainStroe)

// 新建/编辑用户逻辑
const formRef = ref<InstanceType<typeof ElForm>>()
function handleConfirmClick() {
  // 隐藏modal
  dialogVisible.value = false
  if (!isNewRef.value && editData.value) {
    systemStore.editUserDataAction(editData.value.id, formData)
  } else {
    // 发送请求
    systemStore.newUserDataAction(formData)
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
