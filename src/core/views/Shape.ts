import TWEEN from '@tweenjs/tween.js'

/**
 * 所有图形的基类
 * */ 
export class Shape {
	public tween: any
	public fn?: () => void

	constructor(public listenerMap = new Map()) {}

	/**
	 * 
	 * @param eventName  keyof HTMLElementEventMap
	 * @param listener 
	 */
	on(eventName: keyof HTMLElementEventMap, listener: () => void) {
		if (this.listenerMap.has(eventName)) {
			this.listenerMap.get(eventName).push(listener.bind(this))
		} else {
			this.listenerMap.set(eventName, [listener.bind(this)])
		}
	}

	initAnimate() {
		TWEEN.update()
	}

	/**
	 * 绑定事件
	 */
	track(fn: () => void) {
		this.fn = fn
	}

	/**
	 * 触发事件
	 */
	trigger() {
		this.fn?.()
	}

	/**
	 * 释放绑定空间
	 */
	release() {
		this.fn = undefined
	}
}

// const shape = new Shape()
