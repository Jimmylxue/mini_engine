import { Image } from '..'

export function checkHit(rectA: Image, rectB: Image) {
	return !(
		rectA.x + rectA.width < rectB.x ||
		rectB.x + rectB.width < rectA.x ||
		rectA.y + rectA.height < rectB.y ||
		rectB.y + rectB.height < rectA.y
	)
}
