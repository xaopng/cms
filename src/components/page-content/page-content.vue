<template>
  <div class="content">
    <div class="header">
      <h3 class="title">{{ contentConfig?.header?.title ?? '数据列表' }}</h3>
      <el-button type="primary" @click="handleNewBtnClick">{{
        contentConfig?.header?.btnTitle ?? '新建数据'
      }}</el-button>
    </div>
    <div class="table">
      <el-table border :data="pageList">
        <template v-for="item in contentConfig?.columnList" :key="item.prop">
          <template v-if="item.type === 'timer'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                {{ formatUTC(scope.row[item.prop]) }}
              </template>
            </el-table-column>
          </template>
          <template v-else-if="item.type === 'operation'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <el-button
                  type="primary"
                  icon="Edit"
                  size="small"
                  text
                  @click="handleEditBtnClick(scope.row)"
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
          </template>
          <template v-else-if="item.type === 'custom'">
            <el-table-column align="center" v-bind="item">
              <template #default="scope">
                <slot :name="item.prop" :prop="item.prop" v-bind="scope"></slot>
              </template>
            </el-table-column>
          </template>
          <template v-else>
            <el-table-column align="center" v-bind="item" />
          </template>
        </template>
      </el-table>
    </div>
    <div class="pagination">
      <el-pagination
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        :page-sizes="[10, 20, 30]"
        size="small"
        layout="sizes, prev, pager, next, jumper, total"
        :total="pageListTotalCount"
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
interface IProps {
  contentConfig: {
    pageName: string
    header?: {
      title?: string
      btnTitle?: string
    }
    columnList: any[]
  }
}
const props = defineProps<IProps>()

// 获取页面配置
const contentConfig = props.contentConfig
const pageName = contentConfig.pageName

// 定义事件
const emit = defineEmits(['newClick', 'editClick'])

// 请求用户数据
const systemStore = useSystemStore()
const currentPage = ref(1)
const pageSize = ref(10)
fetchPageListData()
// 展示页面数据
const { pageList, pageListTotalCount } = storeToRefs(systemStore)
// 分页相关数据

function handleCurrentChange() {
  fetchPageListData()
}
function handleSizeChange() {
  fetchPageListData()
}
// 定义函数,用于请求页面数据
function fetchPageListData(queryInfo: any = {}) {
  console.log('queryInfo', queryInfo)
  // 获取size/offset
  const size = pageSize.value
  const offset = (currentPage.value - 1) * size

  const pageInfo = {
    size,
    offset
  }

  const info = { ...pageInfo, ...queryInfo }

  // 发送网络请求
  systemStore.postPageListDataAction(pageName, info)
}
// 将函数暴露出去
defineExpose({
  fetchPageListData
})

// 新建/删除/编辑页面数据操作
function handleDeleteBtnClick(id: number) {
  // 调用systemStore中的删除方法
  systemStore.deletePageDataByIdAction(pageName, id)
}
function handleNewBtnClick() {
  emit('newClick')
}

function handleEditBtnClick(itemData: any) {
  emit('editClick', itemData)
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
