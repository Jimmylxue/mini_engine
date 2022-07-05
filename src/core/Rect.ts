import { RectProps } from '../types/types'
import { Shape } from './Shape'
import { Display } from './Display'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { Animate } from '../types/AnimateProps'
export class Rect extends Shape {
	private tween: any
	public isAnimating: boolean = false
	public fnArr?: () => void
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

	track(fn: () => void) {
		this.fnArr = fn
	}

	trigger() {
		this.fnArr?.()
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
		{ duration = 1000, repeat = 0, delay = 0, repeatDelay, onComplete }: Animate // duration: number,
	) {
		const { leftTop, width, height, fillColor } = changeProps
		const beforeProps = this.props
		const changeProp = {
			x: leftTop?.x || beforeProps.leftTop.x,
			y: leftTop?.y || beforeProps.leftTop.y,
			width: width || beforeProps.width,
			height: height || beforeProps.height,
			fillColor: fillColor || beforeProps.fillColor,
		}
		this.tween
			.to(changeProp, duration)
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
			.delay(delay)
			.repeatDelay(repeatDelay || 1000)
			.repeat(3)
		// display.redraw()
	}
}
