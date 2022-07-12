export type Animate = {
	duration?: number // 动画过度时长
	repeat?: number
	delay?: number // 延时时间
	repeatDelay?: number // 重复时差
	onComplete?: () => void
	onUpdate?: () => void
	onStop?: () => void
	onRepeat?: () => void
}
