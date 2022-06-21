import { RectProps } from './types'
import { Shape } from './Shape'
export class Rect extends Shape {
	constructor(private props: RectProps) {
		super()
	}
	draw(ctx: any) {}

	// 判断鼠标的点是否在图形内部
	isPointInClosedRegion(mouse) {}
}
