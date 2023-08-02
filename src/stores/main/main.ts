import { getEntireRoles } from '@/services/main/system/system'
import { defineStore } from 'pinia'

interface IMainState {
  entireRoles: any[]
  entireDepartments: any[]
}
const useMainStore = defineStore('main', {
  state: (): IMainState => ({
    entireRoles: [],
    entireDepartments: []
  }),
  actions: {
    async fetchEntireRolesAndDepartmentsAction() {
      const rolesRes = await getEntireRoles()
      const departmentsRes = await getEntireRoles()
      this.entireRoles = rolesRes.data.list
      this.entireDepartments = departmentsRes.data.list
    }
  }
})

export { useMainStore }
