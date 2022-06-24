import { Shape } from './Shape'
import { CircleProps } from './types'

export class Circle extends Shape {
	constructor(private props: CircleProps) {
		super()
	}

	draw(ctx: CanvasRenderingContext2D) {
		const { center, radius, fillColor = 'black' } = this.props
		const { x, y } = center
		ctx.save()
		ctx.beginPath()
		ctx.fillStyle = fillColor
		ctx.arc(x, y, radius, 0, Math.PI * 2)
		ctx.fill()
		ctx.closePath()
		ctx.restore()
	}

	// 判断鼠标的点是否在图形内部
	isPointInClosedRegion(mouse: any) {
		const { center, radius } = this.props
		return mouse.point.distance(center) <= radius * radius
	}
}
