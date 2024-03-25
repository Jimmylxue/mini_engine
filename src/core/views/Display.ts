import { Rect } from './Rect'
import { Point2d } from './Point'
import { BASE_EVENT_ARR } from 'types/types'

export class Display {
	private animateTimer: number = 0
	private canvas: HTMLElement
	private ctx: CanvasRenderingContext2D
	public fnArr?: () => void
	public _x:number = 0
	public _y:number = 0
	public _width:number = 0
	public _height:number = 0
	constructor(
		id:string,
		/**
		 * 存放所有的 canvas 画布内的元素
		 */
		private allShapes = new Set<Rect>()
	) {
		this.canvas = document.getElementById(id)!
		this.ctx = (this.canvas as HTMLCanvasElement).getContext('2d')!
		this._width = this.canvas.clientWidth
		this._height = this.canvas.clientHeight
		this.bindBaseEvent()
		this.star()
	}

	star() {
		const animate = () => {
			let hasMoving = false
			this.allShapes.forEach(shape => {
				shape?.initAnimate?.()
				shape?.trigger?.()
				if (shape.isAnimating) {
					hasMoving = true
				}
			})
			if (hasMoving) {
				// 性能优化 - 尽量的减少 绘画次数
				this.redraw()
			}
			this.redraw()
			this.trigger()
			this.animateTimer = requestAnimationFrame(animate)
			// setTimeout(() => {
			// 	cancelAnimationFrame(this.animateTimer)
			// }, 2000)
			// cancelAnimationFrame(this.animateTimer)
		}

		animate()
	}

	/**
	 * 为 canvas 绑定 基础的事件
	 */
	bindBaseEvent() {
		BASE_EVENT_ARR.forEach(eventName => {
			this.canvas.addEventListener(eventName, this.handleEvent(eventName))

		})
	}

	/**
	 * 分发每一个事件：核心是先事件先触达至 canvas 再判断 是否在元素身份上，再做分发
	 * @param name keyof HTMLElementEventMap
	 * @returns 
	 */
	handleEvent(name: keyof HTMLElementEventMap) {
		return (event: any) => {
			event = this.createNewEvent(event)
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

	/**
	 * 创建一个通用的 点击 事件对象
	 * @param event 
	 * @returns 
	 */
	createNewEvent(event: any) {
		const point = new Point2d(event.offsetX, event.offsetY)
		return {
			point,
			isStopBubble: false,
			...event,
		}
	}

	/**
	 * 往舞台添加元素
	 */
	add(shape: any) {
		shape.draw(this.ctx)
		this.allShapes.add(shape)
	}

	/**
	 * 舞台清空元素
	 */
	remove(shape: any) {
		this.allShapes.delete(shape)
		this.clearCanvas()
		this.redraw()
		// shape?.release()
	}

	/**
	 * 清除画布
	 */
	clearCanvas() {
		this.ctx.clearRect(this._x, this._y, this._width, this._height)
	}

	/**
	 * 重新绘画
	 * 每次画面会更新都是 清除 -> 重绘的结果
	 */
	redraw() {
		const showRedraw = this.checkShouldRedraw()
		if(!showRedraw){
			return
		}
		this.clearCanvas()
		this.allShapes.forEach(shape => {
			shape.draw(this.ctx)
		})
	}

	/**
	 * 判断是否需要重绘
	 */
	checkShouldRedraw(){
		return !![...this.allShapes].find(shape=>shape.isAnimating)
	}

	/**
	 * 绑定事件
	 */
	track(fn: () => void) {
		this.fnArr = fn
	}

	/**
	 * 触发事件
	 */
	trigger() {
		this.fnArr?.()
	}

	/**
	 * 释放绑定空间
	 */
	release() {
		this.fnArr = () => {}
	}
}
