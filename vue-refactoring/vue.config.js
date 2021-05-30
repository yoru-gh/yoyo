const path = require('path')

function resolve(dir) {
	return path.join(__dirname, '.', dir)
}

module.exports = {
	chainWebpack: config => {
		config.module.rules.delete("svg"); //重点:删除默认配置中处理svg,
		//const svgRule = config.module.rule('svg')
		//svgRule.uses.clear()
		config.module
		.rule('svg-sprite-loader')
		.test(/\.svg$/)
		.include
		.add(resolve('src/assets/icon')) // 处理svg目录
		.end()
		.use('svg-sprite-loader')
		.loader('svg-sprite-loader')
		.options({
			// symbolId 配置 sprite.svg 文件里每个 symbol 的 id 前缀，会默认添加一个 sprite_
			symbolId: '[name]'
		})
	},
	configureWebpack: () => ({}),
	// devServer: {
	// 	// 指定端口号
	// 	port: 8888
	// }
}