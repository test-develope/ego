import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router/index'
import store from './store'
import './assets/css/reset.css'
import './assets/css/iconfont.css'
import api from './api/index'
//echarts
import * as echarts from 'echarts'

Vue.prototype.$echarts=echarts
Vue.prototype.$api=api

Vue.config.productionTip = false

//持久化
let user=localStorage.getItem('user')
if(user){
  user=JSON.parse(user)
  store.commit('loginModule/setUser',user)
}

new Vue({
  router,
  store,
  beforeCreate(){
    Vue.prototype.$buys=this
  },
  render: h => h(App),
}).$mount('#app')
