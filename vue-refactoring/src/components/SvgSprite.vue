// Svg Sprite 图标组件
<template>
    <span :class="className">
		<svg>
			<use :xlink:href="iconId"></use>
		</svg>
	</span>
</template>

<script>
export default {
	name: 'IconSprite',
	props: {
		iconName: {
			type: String,
			required: true
		},
		className: {
			type: String,
			default: ''
		}
	},
	computed: {
		iconId() {
			return `#sprite_icon-${this.iconName}`
		}
	}
}
</script>