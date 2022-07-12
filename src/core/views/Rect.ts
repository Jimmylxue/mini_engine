import { RectProps, TShape } from 'types/types'
import { Shape } from './Shape'
import { Display } from './Display'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { Animate } from 'types/AnimateProps'
import { checkInRegin } from '@utils/pointCheck'
export class Rect extends Shape {
	// private tween: any
	public isAnimating: boolean = false

	constructor(public props: RectProps) {
		super()
		this.bindProps()
	}

	get x(): number {
		return this.props.leftTop.x
	}

	get y(): number {
		return this.props.leftTop.y
	}

	get width(): number {
		return this.props.width
	}

	get height(): number {
		return this.props.height
	}

	bindProps() {
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
		return checkInRegin(TShape.RECT, mouse, this)
	}

	change(
		changeProps: Partial<RectProps>,
		{
			duration = 2000,
			repeat = 0,
			delay = 0,
			repeatDelay,
			onComplete,
			onUpdate,
			onStop,
			onRepeat,
		}: Animate // duration: number,
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
					onUpdate?.()
				}
			)
			.onComplete(() => {
				this.isAnimating = false
				onComplete?.()
			})
			.onStop(() => {
				onStop?.()
			})
			.onRepeat(() => {
				onRepeat?.()
			})
			.start()
			.delay(delay)
			.repeatDelay(repeatDelay || 1000)
			.repeat(repeat)
		// display.redraw()
	}
}
