export class Point2d {
	x: number
	y: number
	constructor(x: number, y: number) {
		this.x = x || 0
		this.y = y || 0
	}
	clone() {
		return this.constructor(this.x, this.y)
	}
	add(v: { x: number; y: number }) {
		this.x += v.x
		this.y += v.y
		return this
	}
	random() {
		this.x = Math.random() * 1800
		this.y = Math.random() * 800
		return this
	}
}
