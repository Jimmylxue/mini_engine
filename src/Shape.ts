export class Shape {
	constructor(private listenerMap = new Map()) {}

	on(eventName, listener) {
		if (this.listenerMap.has(eventName)) {
			this.listenerMap.get(eventName).push(listener)
		} else {
			this.listenerMap.set(eventName, [listener])
		}
	}
}