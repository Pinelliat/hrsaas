import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
import router from '@/router'
// 定义超时时间
const TimeOut = 3600

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})
function isCheckTimeOut() {
  const currentTime = Date.now()
  const timeStamp = currentTime - store.getters.hrsaasTime
  return timeStamp / 1000 > TimeOut
}
// 添加请求拦截器
service.interceptors.request.use(function(config) {
  // 在发送请求之前做些什么
  if (store.getters.token) {
    if (isCheckTimeOut()) {
      store.dispatch('user/logout') // 登出操作
      // 跳转到登录页
      router.push('/login')
      return Promise.reject(new Error('token超时了'))
    }

    config.headers['Authorization'] = 'Bearer ' + store.getters.token
  }
  return config
}, function(error) {
  // 对请求错误做些什么
  console.log('error', error)
  return Promise.reject(error)
})

// 响应拦截器
service.interceptors.response.use(response => {
  // axios默认加了一层data
  const { success, message, data } = response.data
  //   要根据success的成功与否决定下面的操作
  if (success) {
    return data
  } else {
    // 业务已经错误了 还能进then ? 不能 ！ 应该进catch
    Message.error(message) // 提示错误消息
    return Promise.reject(new Error(message))
  }
}, error => {
  console.log(error.response)
  if (error && error.response && error.response.status === 401) {
    // Message.error('token超时了')
    store.dispatch('user/logout') // 登出action 删除token
    router.push('/login')
  } else {
    Message.error(error.message) // 提示错误信息
  }
  return Promise.reject(error) // 返回执行错误 让当前的执行链跳出成功 直接进入 catch
})

export default service
