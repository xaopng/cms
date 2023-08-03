export interface ISystemState {
  userList: IUser[]
  userListTotalCount: number
  pageList: any[]
  pageListTotalCount: number
}

export interface IUser {
  id: number
  name: string
  realname: string
  cellphone: number
  enable: number
  departmentId: number
  roleId: number
  createAt: string
  updateAt: string
}
