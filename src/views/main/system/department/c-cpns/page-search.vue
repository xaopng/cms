<template>
  <div class="search">
    <!-- 1. 搜索关键字表单 -->
    <el-form :model="formData" ref="formRef" label-width="80px">
      <el-row>
        <el-col :span="8">
          <el-form-item label="部门名称" prop="name">
            <el-input
              v-model="formData.name"
              size="large"
              placeholder="请输入查询的部门名称"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="领导" prop="leader">
            <el-input
              v-model="formData.leader"
              size="large"
              placeholder="请输入查询的领导"
            ></el-input>
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
  leader: '',
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
