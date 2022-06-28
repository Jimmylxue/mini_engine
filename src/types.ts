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
