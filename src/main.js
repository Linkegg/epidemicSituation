// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 引入字体图标
import './assets/icon/iconfont.css'

// 引入eacharts
import echarts from 'echarts';
import 'echarts/map/js/china';
Vue.prototype.$echarts = echarts;

// 引入 axios
import axios from 'axios'
Vue.prototype.$axios = axios    //全局注册，使用方法为:this.$axios

Vue.config.productionTip = false

Vue.use(ElementUI);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  render: h => h(App)
})
