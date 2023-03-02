import { Module } from 'vuex'
import type { IRootState } from '@/store/types'
import type { ISystemState } from './types'
import {
  deletePageData,
  getPageListData,
  createPageData,
  editPageData
} from '@/service/main/system/system'
import { ElMessage } from 'element-plus'

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0,
      goodsList: [],
      goodsCount: 0,
      menuList: [],
      menuCount: 0
    }
  },
  mutations: {
    changeUsersList(state, userslist: any[]) {
      state.usersList = userslist
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, roleList: any[]) {
      state.roleList = roleList
    },
    changeRoleCount(state, roleCount: number) {
      state.roleCount = roleCount
    },
    changeGoodsList(state, goodsList: any[]) {
      state.goodsList = goodsList
    },
    changeGoodsCount(state, goodsCount: number) {
      state.goodsCount = goodsCount
    },
    changeMenuList(state, menuList: any[]) {
      state.menuList = menuList
    },
    changeMenuCount(state, menuCount: number) {
      state.menuCount = menuCount
    }
  },
  actions: {
    // 获取数据
    async getPageListAction({ commit }, payload: any) {
      // 获取url
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // 发送对应请求
      const pageResult = await getPageListData(pageUrl, payload.queryInfo)
      // 将数据写入页面中
      const { list, totalCount } = pageResult.data
      const changePageName =
        pageName.slice(0, 1).toUpperCase() + pageName.slice(1)
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
    },
    // 删除数据
    async deletePageDataAction({ dispatch }, payload: any) {
      // 获取pageName和id
      const { pageName, id } = payload
      const pageUrl = `/${pageName}/${id}`
      // 发送网络请求
      await deletePageData(pageUrl)
      ElMessage({
        type: 'success',
        message: '删除成功！'
      })
      // 重新请求最新数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 添加数据
    async createPageDataAction({ dispatch }, payload: any) {
      // 创建数据的请求
      const { pageName, newData } = payload
      const pageUrl = `/${pageName}`
      await createPageData(pageUrl, newData)
      ElMessage({
        type: 'success',
        message: '添加成功！'
      })
      // 请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    },
    // 编辑数据
    async editPageDataAction({ dispatch }, payload: any) {
      // 编辑数据的请求
      const { pageName, editData, id } = payload
      const pageUrl = `/${pageName}/${id}`
      await editPageData(pageUrl, editData)
      ElMessage({
        type: 'success',
        message: '编辑成功！'
      })
      // 请求最新的数据
      dispatch('getPageListAction', {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10
        }
      })
    }
  },
  getters: {
    pageListData(state) {
      return (pageName: string) => (state as any)[`${pageName}List`]
    },
    pageListCount(state) {
      return (pageName: string) => (state as any)[`${pageName}Count`]
    }
  }
}
export default systemModule
