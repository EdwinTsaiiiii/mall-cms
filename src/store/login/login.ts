import { Module } from 'vuex'

import {
  accountLoginRequest,
  requestUserInfoById,
  requestUserMenuByRoleId
} from '@/service/login/login'
import { IAccount, IPhoneAccount } from '@/service/login/types'
import { ILoginState } from './types'
import { IRootState } from '../types'
import LocalCache from '@/utils/cache'
import { mapMenusToRoutes, mapMenusToPermission } from '@/utils/map-menus'
import router from '@/router'

// S => state 类型, R => root类型
const loginModule: Module<ILoginState, IRootState> = {
  namespaced: true,
  state() {
    return {
      token: '',
      userInfo: '',
      userMenus: [],
      permissions: []
    }
  },
  mutations: {
    // mutation最好不要有异步操作
    changeToken(state, token: string) {
      state.token = token
    },
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
      // userMenus映射到routes里面
      // 将routes 添加到
      const routes = mapMenusToRoutes(userMenus)
      routes.forEach((route) => {
        // 注意要注册在main下
        router.addRoute('main', route)
      })
      const permissions = mapMenusToPermission(userMenus)
      state.permissions = permissions
    }
  },
  actions: {
    // 加载本地登录数据，防止刷新时产生丢失
    loadLocalLogin({ commit, dispatch }) {
      const token = LocalCache.getCache('token')
      if (token) {
        commit('changeToken', token)
        // 发送初始化请求（完整的角色与部门）
        dispatch('getInitialDataAction', null, { root: true })
      }
      const userInfo = LocalCache.getCache('userInfo')
      if (userInfo) {
        commit('changeUserInfo', userInfo)
      }
      const userMenus = LocalCache.getCache('userMenus')
      if (userMenus) {
        commit('changeUserMenus', userMenus)
      }
    },
    // 账号密码登录
    async accountLoginAction({ commit, dispatch }, payload: IAccount) {
      // 1.实现登录逻辑
      const loginResult = await accountLoginRequest(payload)
      const { id, token } = loginResult.data
      commit('changeToken', token)
      LocalCache.setCache('token', token)

      // 发送初始化请求（完整的角色与部门）
      dispatch('getInitialDataAction', null, { root: true })

      // 2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      LocalCache.setCache('userInfo', userInfo)

      // 3.请求用户菜单
      const userMenusResult = await requestUserMenuByRoleId(userInfo.role.id)
      const userMenus = userMenusResult.data
      console.log(userMenus)
      commit('changeUserMenus', userMenus)
      LocalCache.setCache('userMenus', userMenus)

      // 4.跳到首页
      router.push('/main')
    },
    // 手机号登录
    phoneLoginAction({ commit }, payload: IPhoneAccount) {
      alert('暂不支持手机登录服务！')
    }
  },
  getters: {}
}

export default loginModule
