type Point = {
	x: number
	y: number
}

export type BaseShape = {
	fillColor: string
}

export type CircleProps = {
	center: Point
	radius: number
} & BaseShape

export type RectProps = {
	leftTop: Point
	width: number
	height: number
} & BaseShape
