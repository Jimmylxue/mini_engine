export class Shape {
	constructor(public listenerMap = new Map()) {}

	on(eventName, listener) {
		if (this.listenerMap.has(eventName)) {
			this.listenerMap.get(eventName).push(listener.bind(this))
		} else {
			this.listenerMap.set(eventName, [listener.bind(this)])
		}
	}
}
