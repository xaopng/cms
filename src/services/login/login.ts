import type { IAccount } from '@/types'
import hyRequest from '..'

export function accountLoginRequest(account: IAccount) {
  return hyRequest.post({
    url: '/login',
    // post请求参数放到data中，get请求url参数放到params中
    data: account
  })
}
export function getUserInfoById(id: number) {
  return hyRequest.get({
    url: `/users/${id}`
  })
}

export function getUserMenusByRoleId(id: number) {
  return hyRequest.get({
    url: `/role/${id}/menu`
  })
}
