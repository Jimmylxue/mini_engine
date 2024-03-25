import { Shape } from './Shape'
import { ImageProps, TShape } from 'types/types'
import { Display } from './Display'
import BaseError, { ErrorType } from '../error'
import TWEEN,{ Tween } from '@tweenjs/tween.js'
import { checkInRegin } from '@utils/pointCheck'
import { display } from '.'
import { checkHit } from '@utils/index'
import { Animate } from 'types/AnimateProps'

enum ImgStatus {
	PENDING,
	RESOLVE,
	REJECT,
}

export class Image extends Shape {
	private loadStatus: ImgStatus = ImgStatus.PENDING
	public isAnimating: boolean = false

	constructor(private props: ImageProps) {
		super()
		this.bindProps()
	}

	get x() {
		return this.props.leftTop.x
	}

	set x(x: number) {
		this.change({ leftTop: { x: x, y: this.y } }, display)
	}

	get y() {
		return this.props.leftTop.y
	}

	set y(y: number) {
		this.change({ leftTop: { x: this.x, y } }, display)
	}

	get width() {
		return this.props.width
	}

	set width(width: number) {
		this.change({ width }, display)
	}

	get height() {
		return this.props.height
	}

	set height(height: number) {
		this.change({ height }, display)
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
		if(!this.isAnimating){
			return
		}
		const {
			leftTop: { x, y },
			width,
			height,
			source,
		} = this.props
		if (this.loadStatus === ImgStatus.PENDING) {
			setTimeout(() => {
				this.draw(ctx)
				return
			}, 300)
		} else if (this.loadStatus === ImgStatus.REJECT) {
			throw new BaseError(
				ErrorType.SourceError,
				'Image resource failed to load'
			)
		} else {
			ctx.drawImage(source as unknown as ImageBitmap, x, y, width, height)
		}
		ctx.drawImage(source as unknown as ImageBitmap, x, y, width, height)
	}

	/**
	 * 判断点击的点是否在图形内部
	 * @param mouse 
	 * @returns 
	 */
	isPointInClosedRegion(mouse: any): boolean {
		return checkInRegin(TShape.Image, mouse, this)
	}

	change(changeProps: Partial<ImageProps>, display: Display) {
		const { leftTop, width, height, source } = changeProps
		const beforeProps = this.props
		this.props = {
			leftTop: leftTop || beforeProps.leftTop,
			width: width || beforeProps.width,
			height: height || beforeProps.height,
			source: source || beforeProps.source,
		}
		display.redraw()
	}

	changes(changeProps: Partial<ImageProps>, {
		duration = 2000,
		repeat = 0,
		delay = 0,
		repeatDelay,
		onComplete,
		onUpdate,
		onStop,
		onRepeat,
	}: Animate // duration: number
	) {
		const { leftTop, width, height, source } = changeProps
		const beforeProps = this.props
		const changeProp = {
			x:leftTop?.x||beforeProps.leftTop.x,
			y: leftTop?.y || beforeProps.leftTop.y,
			width: width || beforeProps.width,
			height: height || beforeProps.height,
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
						source:this.props.source
						// source:position.source
					}
					this.isAnimating = true
					onUpdate?.()
				}
			)
			.onComplete(() => {
				this.isAnimating = false
				onComplete?.()
				console.log('完成了~')
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
	}

	intersects(shape: Image) {
		return checkHit(this, shape)
	}
}
