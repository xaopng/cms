import hyRequest from '@/services'

export function postUserListData(queryInfo: any) {
  return hyRequest.post({
    url: '/users/list',
    data: queryInfo
  })
}

export function deleteUserById(id: number) {
  return hyRequest.delete({
    url: `/users/${id}`
  })
}

export function getEntireRoles() {
  return hyRequest.post({
    url: 'role/list'
  })
}

export function getEntireDepartments() {
  return hyRequest.post({
    url: '/department/list'
  })
}
