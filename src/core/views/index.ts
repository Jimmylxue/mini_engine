import { Display } from './Display'

export { Display } from './Display'
export { Circle } from './Circle'
export { Image } from './Image'
export { Rect } from './Rect'
export { Text } from './Text'

export let display: Display

export function createDisplay({
	canvas,
	ctx,
}: {
	canvas: HTMLElement
	ctx: CanvasRenderingContext2D
}) {
	if (!display) {
		display = new Display(canvas, ctx)
	}
	return display
}
