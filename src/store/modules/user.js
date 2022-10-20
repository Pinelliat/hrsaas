import { login, getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {}
  },
  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
    setUsetInfo(state, userInfo) {
      state.userInfo = userInfo
    },
    removeToken(state) {
      state.token = null
    },
    removeUserInfo(state) {
      state.userInfo = {}
    }
  },
  actions: {
    async loginAction({ commit }, data) {
      const res = await login(data)
      commit('setToken', res)
    },
    async getUserInfoAction({ commit }) {
      const res = await getUserInfo()
      const baseInfo = await getUserDetailById(res.userId)
      const baseResult = { ...res, ...baseInfo }
      commit('setUsetInfo', baseResult)
    }
  }
}
