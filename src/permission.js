// 1. 权限拦截处理逻辑需要放在路由的前置守卫里处理

// 2. 首先判断有无token
//  2.1 token 存在 说明 处于登录状态
//    2.1.1 判断是否跳转至登录页面，是的话 跳首页 否则 直接跳转 页面A（直接放行 next()）
//  2.2 token 不存在 说明 不处于登录状态
//    2.2.1 判断一下 是否处于白名单 是的话 直接跳转至页面A（直接放行 next()） 否则 跳转到登录页

import router from '@/router'
import store from '@/store'

const whiteList = ['/login', '/404']

router.beforeEach(function(to, from, next) {
  if (store.getters.token) { // 处于登录状态
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
      next()
    } else {
      next('/login')
    }
  }
})
