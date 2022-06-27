import { Rect } from './Rect'
import { Shape } from './Shape'
import { Point2d } from './Point'

export const move = 'mousemove'
export const click = 'mousedown'
export const clickUp = 'mouseup'
export const touchMove = 'touchmove'

export class Display {
	constructor(
		private canvas: HTMLElement,
		private ctx,
		private allShapes: any[] = []
	) {
		this.bindEvent()
	}

	bindEvent() {
		this.canvas.addEventListener(click, this.handleEvent(click))
		this.canvas.addEventListener(clickUp, this.handleEvent(clickUp))
		this.canvas.addEventListener(touchMove, this.handleEvent(touchMove))
		// this.canvas.addEventListener(move, this.handleEvent(move))
	}

	handleEvent(name) {
		return event => {
			event = this.getNewEvent(event)
			this.allShapes.forEach((shape: Rect) => {
				const listeners = shape.listenerMap.get(name)
				if (
					listeners &&
					shape.isPointInClosedRegion(event) &&
					!event.isStopBubble
				) {
					listeners.forEach(listener => listener(event))
				}
			})
		}
	}

	getNewEvent(event) {
		console.log('event~', event)
		const point = new Point2d(event.offsetX, event.offsetY)
		return {
			point,
			isStopBubble: false,
			...event,
		}
	}

	add(shape: any) {
		shape.draw(this.ctx)
		this.allShapes.push(shape)
	}

	// 清除画布
	clearCanvas() {
		this.ctx.clearRect(0, 0, 500, 500)
	}

	// 重新回话
	redraw() {
		this.clearCanvas()
		this.allShapes.forEach(shape => shape.draw(this.ctx))
	}
}
