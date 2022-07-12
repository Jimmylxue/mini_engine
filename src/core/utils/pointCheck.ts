import { TShape } from 'types/types'
import { Circle, Image, Rect } from '@views/index'

function checkRect(mouse: any, shape: Rect | Image): boolean {
	const { x, y } = mouse.point || mouse
	const { x: minX, y: minY, width, height } = shape as Rect
	const maxX = minX + width
	const maxY = minY + height
	if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
		return true
	}
	return false
}

function checkCircle(mouse: any, shape: Circle): boolean {
	const { center, radius } = shape
	return mouse.point.distance(center) <= radius * radius
}

export function checkInRegin(
	ShapeType: TShape,
	mouse: any,
	shape: Rect | Image | Circle
): boolean {
	switch (ShapeType) {
		case TShape.RECT:
		case TShape.Image:
			return checkRect(mouse, shape as Rect)
		case TShape.Circle:
			return checkCircle(mouse, shape as Circle)
	}
}
