import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
	mode: 'history',
	base: process.env.BASE_URL,
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home
		},
		{
			path: '/haro',
			name: 'haro',
			component: () => import('./views/Haro/Haro.vue')
		},
		{
			path: '/icon',
			name: 'icon',
			component: () => import('./views/Haro/Icon.vue')
		},
		{
			path: '/wave',
			name: 'wave',
			component: () => import('./views/Haro/Wave.vue')
		},
		{
			path: '/responsive',
			name: 'responsive',
			component: () => import('./views/Haro/Responsive.vue')
		},
	]
})
