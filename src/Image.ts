import { Shape } from './Shape'
import { ImageProps } from './types'

export class CImage extends Shape {
	constructor(private props: ImageProps) {
		super()
	}
	draw(ctx: CanvasRenderingContext2D) {
		const {
			leftTop: { x, y },
			width,
			height,
			source,
		} = this.props
		const img = document.createElement('img')
		img.src = source
		ctx.drawImage(img, x, y, width, height)
	}
}
