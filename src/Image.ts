import { Shape } from './Shape'
import { ImageProps } from './types'
import a from './a.png'
// console.log('aaaa', a)

export class CImage extends Shape {
	constructor(private props: ImageProps) {
		super()
	}
	draw(ctx: CanvasRenderingContext2D) {
		console.log('cc')
		const {
			leftTop: { x, y },
			width,
			height,
			source,
		} = this.props
		const img = document.createElement('img')
		img.src = source
		img.onload = function () {
			ctx.drawImage(img, x, y, width, height)
			console.log('emd')
		}
	}
}
