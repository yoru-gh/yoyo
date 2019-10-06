<!-- 图标组件 -->
<!-- <svg-icon class="组件 class" icon-name="图标名称"/> -->
<template>
	<span :class="className">
		<svg>
			<use :xlink:href="iconClass"></use>
		</svg>
	</span>
</template>

<script>
	export default {
		name: 'SvgIcon',
		props: {
			iconName: {
				type: String,
				required: true,
			},
			className: {
				type: String,
				default: ''
			}
		},
		data () {
			return {

			}
		},
		computed: {
			iconClass () {
				return `#sprite_icon-${this.iconName}`
			}
		},
	}
</script>