export interface IAccount {
  name: string
  password: string
}

export interface IPhoneAccount {
  phone: string
  auth_code: string
}

export interface ILoginResult {
  id: number
  name: string
  token: string
}
