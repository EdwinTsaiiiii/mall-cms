export interface ILoginState {
  token: string
  userInfo: any
  userMenus: Array<IUserMenus>
  permissions: string[]
}

interface IUserMenus {
  id: number
  name: string
  type: number
  url: string
  icon: string
  sort: number
  children: Array<IUserMenus>
}
