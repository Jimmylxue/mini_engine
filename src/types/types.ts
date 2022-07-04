type Point = {
	x: number
	y: number
}

export type BaseShape = {
	fillColor: string
}

export type SizeBase = {
	width: number
	height: number
}

export type CircleProps = {
	center: Point
	radius: number
} & BaseShape

export type RectProps = {
	leftTop: Point
} & BaseShape &
	SizeBase

export type ImageProps = {
	source: string
	leftTop: Point
} & SizeBase

export type TextProps = {
	text: string
	type: 'fill' | 'stroke'
	color?: string
	size: number | string
} & Point

export const MOUSE_MOVE = 'mousemove'
export const MOUSE_DOWN = 'mousedown'
export const MOUSE_UP = 'mouseup'
export const TOUCH_MOVE = 'touchmove'

export const EVENT_ARR = [MOUSE_MOVE, MOUSE_DOWN, MOUSE_UP, TOUCH_MOVE]
