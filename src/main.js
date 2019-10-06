import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './assets/icon/sprite.svg'

Vue.config.productionTip = false

// 原文链接：https://blog.csdn.net/u011166225/article/details/84873591
// requires and returns all modules that match
const requireAll = requireContext => requireContext.keys().map(requireContext);
// import all svg
const req = require.context('./assets/icon', true, /\.svg$/);
requireAll(req);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')