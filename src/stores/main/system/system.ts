import {
  deleteUserById,
  editUserData,
  newUserData,
  postPageListData,
  postUserListData,
  deletePageDataById,
  editPageData,
  newPageData
} from '@/services/main/system/system'
import { defineStore } from 'pinia'
import type { ISystemState } from './type'
const useSystemStore = defineStore('system', {
  state: (): ISystemState => ({
    userList: [],
    userListTotalCount: 0,
    pageList: [],
    pageListTotalCount: 0
  }),
  actions: {
    async postUserListAction(queryInfo: any) {
      const userlistRes = await postUserListData(queryInfo)
      const { list, totalCount } = userlistRes.data
      this.userList = list
      this.userListTotalCount = totalCount
    },
    async deleteUserByIdAction(id: number) {
      // 发送删除请求
      const res = await deleteUserById(id)
      // 重新请求数据
      this.postUserListAction({ size: 10, offset: 0 })
      return res
    },
    async newUserDataAction(userInfo: any) {
      // 发送请求
      const res = await newUserData(userInfo)
      // 重新请求数据
      this.postUserListAction({ size: 10, offset: 0 })
    },
    async editUserDataAction(id: number, userInfo: any) {
      // 发送编辑用户信息请求
      const editRes = await editUserData(id, userInfo)
      // 重新加载数据
      this.postUserListAction({ size: 10, offset: 0 })
    },

    async postPageListDataAction(pageName: string, queryInfo: any) {
      const res = await postPageListData(pageName, queryInfo)
      const { list, totalCount } = res.data
      this.pageList = list
      this.pageListTotalCount = totalCount
    },

    async deletePageDataByIdAction(pageName: string, id: number) {
      // 发送删除请求
      const res = await deletePageDataById(pageName, id)
      // 重新请求数据
      this.postPageListDataAction(pageName, { size: 10, offset: 0 })
    },

    async editPageDataAction(pageName: string, id: number, pageInfo: any) {
      const res = await editPageData(pageName, id, pageInfo)
      this.postPageListDataAction(pageName, { size: 10, offset: 0 })
    },
    async newPageDataAction(pageName, pageInfo) {
      const res = await newPageData(pageName, pageInfo)
      this.postPageListDataAction(pageName, { size: 10, offset: 0 })
    }
  }
})

export { useSystemStore }
