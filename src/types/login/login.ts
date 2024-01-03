export interface IAccount {
  name: string;
  password: string;
}

export interface Role {
  id: number;
  name: string;
  intro: string;
  createAt: string;
  updateAt: string;
}

export interface Department {
  id: number;
  name: string;
  createAt: string;
  updateAt: string;
}

export interface IUserInfo {
  id: number;
  name: string;
  cellphone: string;
  createAt: string;
  updateAt: string;
  role: Role;
  department: Department;
}

export interface Children {
  id: number;
  url: string;
  icon?: any;
  name: string;
  sort: number;
  type: number;
  children?: any;
  createAt: string;
  updateAt: string;
}

export interface IUserMenus {
  id: number;
  name: string;
  type: number;
  url: string;
  icon: string;
  sort: number;
  createAt: string;
  updateAt: string;
  children: Children[];
}

export interface ILoginState {
  token: string;
  userInfo: IUserInfo | {};
  userMenus: IUserMenus[];
  permissions: string[];
}
