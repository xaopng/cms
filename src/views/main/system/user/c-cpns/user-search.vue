<template>
  <div class="search">
    <!-- 1. 搜索关键字表单 -->
    <el-form :model="formData" ref="formRef" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名" prop="name">
            <el-input
              v-model="formData.name"
              size="large"
              placeholder="请输入查询的用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名" prop="realname">
            <el-input
              v-model="formData.realname"
              size="large"
              placeholder="请输入查询的用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="用户名" prop="cellphone">
            <el-input
              v-model="formData.cellphone"
              size="large"
              placeholder="请输入查询的用户名"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="状态" prop="enable">
            <el-select
              v-model="formData.enable"
              placeholder="请输入查询的状态"
              style="width: 100%"
              size="large"
            >
              <!-- :value="1" 表示number -->
              <!-- value="1" 表示string -->
              <el-option label="启用" :value="1"></el-option>
              <el-option label="禁用" :value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="创建时间" prop="createAt">
            <el-date-picker
              v-model="formData.createAt"
              type="daterange"
              range-separator="-"
              start-placeholder="开始时间"
              end-placeholder="结束时间"
              size="large"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!-- 2. 搜索重置和查询的按钮 -->
    <div class="btns">
      <el-button size="large" icon="Refresh" @click="handleResetClick"
        >重置</el-button
      >
      <el-button
        size="large"
        type="primary"
        icon="Search"
        @click="handleQueryClick"
        >查询</el-button
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 定义事件
const emit = defineEmits(['queryClick', 'resetClick'])
// 表单数据
const formData = reactive({
  name: '',
  realname: '',
  cellphone: '',
  enable: 1,
  createAt: ''
})

const formRef = ref<Instanceof<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
function handleQueryClick() {
  emit('queryClick', formData)
}
</script>

<style lang="less" scoped>
.search {
  background-color: #fff;
  padding: 20px;

  .el-form-item {
    padding: 20px;
    margin-bottom: 0;
  }

  .btns {
    text-align: right;
    padding: 5px 50px 10px 0;
  }
}
</style>
