export class Shape {
	public x: number = 0
	public y: number = 0
	public width: number = 0
	public height: number = 0
	constructor(public listenerMap = new Map()) {}

	on(eventName: string, listener: () => void) {
		if (this.listenerMap.has(eventName)) {
			this.listenerMap.get(eventName).push(listener.bind(this))
		} else {
			this.listenerMap.set(eventName, [listener.bind(this)])
		}
	}
}
