import { RectProps } from './types'
import { Shape } from './Shape'
import { Display } from './Display'
export class Rect extends Shape {
	constructor(private props: RectProps) {
		super()
	}
	draw(ctx: CanvasRenderingContext2D) {
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

	change(changeProps: Partial<RectProps>, display: Display) {
		const { leftTop, width, height, fillColor } = changeProps
		const beforeProps = this.props
		this.props = {
			leftTop: leftTop || beforeProps.leftTop,
			width: width || beforeProps.width,
			height: height || beforeProps.height,
			fillColor: fillColor || beforeProps.fillColor,
		}
		display.redraw()
	}
}
