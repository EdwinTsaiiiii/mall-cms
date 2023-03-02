import SelfRequest from '../index'
import { IAccount,  ILoginResult } from './types'
import { IDataType } from '../types'

enum LoginAPI {
  AccountLogin = '/login',
  LoginUserInfo = '/users/',
  userInfo = '/role/' // 用法：role/id/menu
}

export function accountLoginRequest(account: IAccount) {
  return SelfRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account,
    showLoading: false
  })
}

export function requestUserInfoById(id: number) {
  return SelfRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id,
    showLoading: false
  })
}

export function requestUserMenuByRoleId(id: number) {
  return SelfRequest.get<IDataType>({
    url: LoginAPI.userInfo + id + '/menu'
  })
}
