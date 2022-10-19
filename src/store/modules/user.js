import { login } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    }
  },
  actions: {
    async loginAction({ commit }, data) {
      const res = await login(data)
      console.log(res)
      commit('setToken', res)
    }
  }
}
