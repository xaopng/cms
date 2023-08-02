import { deleteUserById, postUserListData } from '@/services/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userListTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userlistRes = await postUserListData(queryInfo)
      const { list, totalCount } = userlistRes.data
      this.userList = list
      console.log('list', list)
      this.userListTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 发送删除请求
      const res = await deleteUserById(id)
      // 重新请求数据
      this.postUserListAction({ size: 10, offset: 0 })
      return res
    }
  }
})

export { useSystemStore }
