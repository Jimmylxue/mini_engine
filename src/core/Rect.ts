import { RectProps } from '../types/types'
import { Shape } from './Shape'
import { Display } from './Display'
import TWEEN, { Tween } from '@tweenjs/tween.js'
export class Rect extends Shape {
	private tween: any
	public isAnimating: boolean = false
	constructor(private props: RectProps) {
		super()
		this.bindProps()
	}

	initAnimate() {
		TWEEN.update()
	}

	bindProps() {
		this.x = this.props.leftTop.x
		this.y = this.props.leftTop.y
		this.width = this.props.width
		this.height = this.props.height

		this.tween = new Tween({
			x: this.props.leftTop.x,
			y: this.props.leftTop.y,
			width: this.props.width,
			height: this.props.height,
		})
	}

	draw(ctx: CanvasRenderingContext2D) {
		// this.initAnimate()
		const { leftTop, width, height, fillColor = 'skyblue' } = this.props
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = fillColor
		ctx.fillRect(leftTop.x, leftTop.y, width, height)
		ctx.closePath()
		ctx.restore()
	}
	// 判断点击的点是否在图形内部
	isPointInClosedRegion(mouse: any) {
		const { x, y } = mouse.point || mouse
		const { leftTop, width, height } = this.props
		const { x: minX, y: minY } = leftTop
		const maxX = minX + width
		const maxY = minY + height
		if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
			return true
		}
		return false
	}

	change(
		changeProps: Partial<RectProps>,
		duration: number,
		repeat: number = 1,
		onComplete?: () => void
	) {
		const { leftTop, width, height, fillColor } = changeProps
		const beforeProps = this.props
		const changeProp = {
			// leftTop: leftTop || beforeProps.leftTop,
			x: leftTop?.x || beforeProps.leftTop.x,
			y: leftTop?.y || beforeProps.leftTop.y,
			width: width || beforeProps.width,
			height: height || beforeProps.height,
			fillColor: fillColor || beforeProps.fillColor,
		}
		console.log('change!!')
		this.tween
			.to(changeProp, 3000)
			.easing(TWEEN.Easing.Linear.None)
			.onUpdate(
				(position: { x: number; y: number; width: number; height: number }) => {
					this.props = {
						leftTop: {
							x: position.x,
							y: position.y,
						},
						width: position.width,
						height: position.height,
						fillColor: this.props.fillColor,
					}
					this.isAnimating = true
				}
			)
			.onComplete(() => {
				this.isAnimating = false
				onComplete?.()
			})
			.start()
			.repeat(repeat)
		console.log('333')
		// display.redraw()
	}
}
