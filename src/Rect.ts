import { RectProps } from './types'
import { Shape } from './Shape'
import { text } from 'node:stream/consumers'
export class Rect extends Shape {
	constructor(private props: RectProps) {
		super()
	}
	draw(ctx: CanvasRenderingContext2D) {
		const { leftTop, width, height, fillColor = 'skyblue' } = this.props
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = fillColor
		console.log('width', width, 'height', height)
		ctx.fillRect(leftTop.x, leftTop.y, width, height)
		ctx.closePath()
		ctx.restore()
	}

	// 判断鼠标的点是否在图形内部
	isPointInClosedRegion(mouse) {}
}
