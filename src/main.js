import Vue from 'vue' // 引入vue
import 'normalize.css/normalize.css' // 重置样式 它让不同的浏览器在渲染网页元素的时候形式更统一

import ElementUI from 'element-ui' // 引入elementUI
import 'element-ui/lib/theme-chalk/index.css' // 引入elementUI 样式
import locale from 'element-ui/lib/locale/lang/en' // 引入 语言包

import '@/styles/index.scss' // 引入global scss

import App from './App' // 引入根组件
import store from './store' // 引入store
import router from './router' // 引入router

import '@/icons' // 引入图标
import '@/permission' // 引入 权限控制

// set ElementUI lang to EN
Vue.use(ElementUI, { locale }) // 全局注册 ElementUI，并且 语言 采用英语

// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
