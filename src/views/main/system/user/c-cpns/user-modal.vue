<template>
  <div class="modal">
    <el-dialog
      v-model="dialogVisible"
      title="新建用户"
      width="30%"
      destroy-on-close
      center
    >
      <div class="form">
        <el-form :model="formData" size="large">
          <el-form-item label="用户名" label-width="80px">
            <el-input v-model="formData.name" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="真实姓名" label-width="80px">
            <el-input
              v-model="formData.realname"
              placeholder="请输入真实姓名"
            />
          </el-form-item>
          <el-form-item label="密码" label-width="80px">
            <el-input
              v-model="formData.password"
              placeholder="请输入密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="手机号码" label-width="80px">
            <el-input
              v-model="formData.cellphone"
              placeholder="请输入手机号码"
            />
          </el-form-item>
          <el-form-item label="角色" label-width="80px">
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
          <el-form-item label="部门" label-width="80px">
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
          <el-button type="primary" @click="dialogVisible = false">
            确定
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { useMainStore } from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { ref, reactive } from 'vue'

const formData = reactive({
  name: '',
  realname: '',
  password: '',
  cellphone: '',
  roleId: '',
  departmentId: ''
})

// 定义内部属性
const dialogVisible = ref(false)
// 定义设置 dialogVisible 的方法
function setDialogVisible() {
  dialogVisible.value = true
}
// 获取role/department数据
const mainStroe = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStroe)

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
