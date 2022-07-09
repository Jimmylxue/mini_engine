import { Shape } from './Shape'
import { ImageProps, TShape } from 'types/types'
import { Display } from './Display'
import BaseError, { ErrorType, error } from '../error'
import TWEEN, { Tween } from '@tweenjs/tween.js'
import { checkInRegin } from '@utils/pointCheck'

enum ImgStatus {
	PENDING,
	RESOLVE,
	REJECT,
}

export class Image extends Shape {
	private img: HTMLImageElement
	private loadStatus: ImgStatus = ImgStatus.PENDING
	constructor(private props: ImageProps) {
		super()
		this.img = document.createElement('img')
		this.img.src = props.source
		this.img.onload = () => {
			this.loadStatus = ImgStatus.RESOLVE
		}
		this.img.onerror = () => {
			this.loadStatus = ImgStatus.REJECT
		}
		this.bindProps()
	}

	get x() {
		return this.props.leftTop.x
	}

	get y() {
		return this.props.leftTop.y
	}

	get width() {
		return this.props.width
	}

	get height() {
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
			ctx.drawImage(this.img, x, y, width, height)
		}
	}

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
}