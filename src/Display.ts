import { Shape } from './Shape'

export class Canvas {
	constructor(private canvas, private ctx, private allShapes: any[] = []) {}

	add(shape: any) {
		shape.draw(this.ctx)
		this.allShapes.push(shape)
	}
}
