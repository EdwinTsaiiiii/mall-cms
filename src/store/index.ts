import { createStore } from 'vuex'
import login from './login/login'
import { IRootState } from './types'

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

export function setupStore(){
  store.dispatch('login/loadLocalLogin')
}

export default store
