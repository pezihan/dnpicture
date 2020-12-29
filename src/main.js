import Vue from 'vue'
import App from './App'
import request from './utils/request'

Vue.config.productionTip = false

// 挂载封装的网络请求封装函数
Vue.prototype.request = request;

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
