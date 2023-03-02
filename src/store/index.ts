import { createStore, Store, useStore as useVuexStore } from 'vuex'
import login from './login/login'
import system from './main/system/system'
import dashboard from './main/analysis/dashboard'
import { getPageListData } from '@/service/main/system/system'
import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'edwin',
      age: 18,
      entireDepartment: [],
      entireRole: [],
      entireMenu: []
    }
  },
  mutations: {
    changeEntireDepartment(state, list) {
      state.entireDepartment = list
    },
    changeEntireRole(state, list) {
      state.entireRole = list
    },
    changeEntireMenu(state, list) {
      state.entireMenu = list
    }
  },
  actions: {
    async getInitialDataAction({ commit }) {
      // 请求部门角色数据
      const departmentResult = await getPageListData('/department/list', {
        offset: 0,
        size: 1000
      })
      const { list: department } = departmentResult.data
      const roleResult = await getPageListData('/role/list', {
        offset: 0,
        size: 1000
      })
      const { list: roleList } = roleResult.data
      const menuListResult = await getPageListData('/menu/list', {})
      const { list: menuList } = menuListResult.data
      // 保存数据
      commit('changeEntireDepartment', department)
      commit('changeEntireRole', roleList)
      commit('changeEntireMenu', menuList)
    }
  },
  getters: {},
  modules: {
    login,
    system,
    dashboard
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 二次封装store，在组件中采用自己定义的store，这样可以自己规定store传入的类型
export function useStore(): Store<IStoreType> {
  return useVuexStore()
}
export default store
