import TWEEN from '@tweenjs/tween.js'

// 所有图形的基类
export class Shape {
	public tween: any
	public fnArr?: () => void
	constructor(public listenerMap = new Map()) {}
	on(eventName: string, listener: () => void) {
		if (this.listenerMap.has(eventName)) {
			this.listenerMap.get(eventName).push(listener.bind(this))
		} else {
			this.listenerMap.set(eventName, [listener.bind(this)])
		}
	}

	initAnimate() {
		TWEEN.update()
	}

	track(fn: () => void) {
		this.fnArr = fn
	}

	trigger() {
		this.fnArr?.()
	}
}
