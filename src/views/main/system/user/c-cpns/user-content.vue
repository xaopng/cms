<template>
  <div class="content">
    <div class="header">
      <h3 class="title">用户列表</h3>
      <el-button type="primary" @click="handleNewBtnClick">新建用户</el-button>
    </div>
    <div class="table">
      <el-table border :data="userList">
        <el-table-column align="center" width="40px" type="selection" />
        <el-table-column
          align="center"
          width="60px"
          type="index"
          label="序号"
        />
        <el-table-column
          align="center"
          width="120px"
          label="用户名"
          prop="name"
        />
        <el-table-column
          align="center"
          width="100px"
          label="真实姓名"
          prop="realname"
        />
        <el-table-column
          align="center"
          width="150px"
          label="手机号码"
          prop="cellphone"
        />
        <el-table-column align="center" width="60px" label="状态" prop="enable">
          <template #default="scope">
            <el-button
              size="small"
              :type="scope.row.enable ? 'success' : 'danger'"
              plain
            >
              {{ scope.row.enable ? '启用' : '禁用' }}
            </el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="创建时间" prop="createAt">
          <template #default="scope">
            {{ formatUTC(scope.row.createAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" label="更新时间" prop="updateAt">
          <template #default="scope">
            {{ formatUTC(scope.row.updateAt) }}
          </template>
        </el-table-column>
        <el-table-column align="center" width="150px" label="操作">
          <template #default="scope">
            <el-button type="primary" icon="Edit" size="small" text
              >编辑</el-button
            >
            <el-button
              type="danger"
              icon="Delete"
              size="small"
              text
              @click="handleDeleteBtnClick(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        small="small"
        layout="sizes, prev, pager, next, jumper, total"
        :total="userListTotalCount"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSystemStore } from '@/stores/main/system/system'
import { storeToRefs } from 'pinia'
import { formatUTC } from '@/utils/format.ts'

// 定义事件
const emit = defineEmits(['newClick'])

// 请求用户数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchUserListData()
// 展示用户数据
const { userList, userListTotalCount } = storeToRefs(systemStore)
// 分页相关数据

function handleCurrentChange() {
  fetchUserListData()
}
function handleSizeChange() {
  fetchUserListData()
}
// 定义函数,用于请求用户数据
function fetchUserListData(queryInfo: any = {}) {
  // 获取size/offset
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  const pageInfo = {
    size,
    offset
  }

  const info = { ...pageInfo, ...queryInfo }

  // 发送网络请求
  systemStore.postUserListAction(info)
}
// 将函数暴露出去
defineExpose({
  fetchUserListData
})

// 删除用户相关逻辑
function handleDeleteBtnClick(id: number) {
  // 调用systemStore中的删除方法
  systemStore.deleteUserByIdAction(id)
}
// 新建用户操作
function handleNewBtnClick() {
  emit('newClick')
}
</script>

<style lang="less" scoped>
.content {
  background-color: #fff;
  margin-top: 20px;
  padding: 20px;

  .header {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1px;

    .title {
      font-size: 22px;
    }
  }
  .table {
    margin-top: 5px;
    :deep(.el-button--small) {
      margin-left: 0;
      padding: 5px 8px;
    }
  }

  .pagination {
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
  }
}
</style>
