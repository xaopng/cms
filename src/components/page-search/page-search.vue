<template>
  <div class="search">
    <!-- 1. 搜索关键字表单 -->
    <el-form :model="formData" ref="formRef" label-width="80px">
      <el-row>
        <template v-for="item in searchConfig.formItems" :key="item.prop">
          <template v-if="item.type === 'input'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-input
                  v-model="formData[item.prop]"
                  size="large"
                  :placeholder="item.placeholder"
                ></el-input>
              </el-form-item>
            </el-col>
          </template>
          <template v-else-if="item.type === 'date-picker'">
            <el-col :span="8">
              <el-form-item :label="item.label" :prop="item.prop">
                <el-date-picker
                  :v-model="formData[item.prop]"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="large"
                ></el-date-picker>
              </el-form-item>
            </el-col>
          </template>
        </template>
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
interface IProps {
  searchConfig: {
    pageName: string
    formItems: any[]
  }
}
const props = defineProps<IProps>()
// 获取搜索组件配置
const searchConfig = props.searchConfig
// 初始化表单字段
const initialData: any = {}
for (const item of searchConfig.formItems) {
  initialData[item.prop] = item.initialValue ?? ''
}

// 表单数据
const formData = reactive<any>(initialData)

// 定义事件
const emit = defineEmits(['queryClick', 'resetClick'])

const formRef = ref<InstanceType<typeof ElForm>>()
function handleResetClick() {
  formRef.value?.resetFields()
  emit('resetClick')
}
function handleQueryClick() {
  console.log('formData', formData)
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
