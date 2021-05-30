import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

// requires and returns all modules that match
// 全局导入 svg sprite
const requireAll = requireContext => requireContext.keys().map(requireContext);
const req = require.context('./assets/icon', true, /\.svg$/);
requireAll(req);

new Vue({
	router,
	store,
	render: h => h(App)
}).$mount('#app')
