import { login, getUserInfo, getUserDetailById } from '@/api/user'
export default {
  namespaced: true,
  state: {
    token: null,
    userInfo: {},
    hrsaasTime: 0
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
    },
    setHrsaasTime(state, hrsaasTime) {
      state.hrsaasTime = hrsaasTime
    }
  },
  actions: {
    async loginAction({ commit }, data) {
      const res = await login(data)
      commit('setToken', res)
      commit('setHrsaasTime', Date.now())
    },
    async getUserInfoAction({ commit }) {
      const res = await getUserInfo()
      const baseInfo = await getUserDetailById(res.userId)
      const baseResult = { ...res, ...baseInfo }
      commit('setUsetInfo', baseResult)
    },
    // 登出的action
    logout(context) {
    // 删除token
      context.commit('removeToken') // 不仅仅删除了vuex中的 还删除了缓存中的
      // 删除用户资料
      context.commit('removeUserInfo') // 删除用户信息
    }
  }
}
