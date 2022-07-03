import { Rect } from './Rect'
import { Point2d } from './Point'
import { EVENT_ARR } from './types'

export class Display {
	constructor(
		private canvas: HTMLElement,
		private ctx: CanvasRenderingContext2D,
		private allShapes = new Set<Rect>()
	) {
		this.bindEvent()
	}

	bindEvent() {
		EVENT_ARR.forEach(eventName => {
			this.canvas.addEventListener(eventName, this.handleEvent(eventName))
		})
	}

	handleEvent(name: string) {
		return (event: any) => {
			event = this.getNewEvent(event)
			this.allShapes.forEach((shape: Rect) => {
				const listeners = shape.listenerMap.get(name)
				if (
					listeners &&
					shape.isPointInClosedRegion(event) &&
					!event.isStopBubble
				) {
					listeners.forEach((listener: (e: any) => void) => listener(event))
				}
			})
		}
	}

	getNewEvent(event: any) {
		const point = new Point2d(event.offsetX, event.offsetY)
		return {
			point,
			isStopBubble: false,
			...event,
		}
	}

	add(shape: any) {
		shape.draw(this.ctx)
		this.allShapes.add(shape)
	}

	remove(shape: any) {
		this.allShapes.delete(shape)
		this.clearCanvas()
		this.redraw()
		// this.allShapes.splice()
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
