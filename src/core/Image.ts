import { Shape } from './Shape'
import { ImageProps } from '../types/types'
import { Display } from './Display'
import BaseError, { ErrorType, error } from './error'

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

	isPointInClosedRegion(mouse: any) {
		const { x, y } = mouse?.point || mouse
		const { leftTop, width, height } = this.props
		const { x: minX, y: minY } = leftTop
		const maxX = minX + width
		const maxY = minY + height
		if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
			return true
		}
		return false
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
