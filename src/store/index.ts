import { createStore, Store, useStore as useVuexStore  } from 'vuex'
import login from './login/login'
import { IRootState,IStoreType } from './types'

const store = createStore<IRootState>({
  state() {
    return {
      name: 'edwin',
      age: 18
    }
  },
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    login
  }
})

export function setupStore() {
  store.dispatch('login/loadLocalLogin')
}

// 二次封装store，在组件中采用自己定义的store，这样可以自己规定store传入的类型
export function useStore(): Store<IStoreType>{
  return useVuexStore()
}
export default store
