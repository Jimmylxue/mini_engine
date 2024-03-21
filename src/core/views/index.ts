import { Display } from './Display'

export { Display } from './Display'
export { Circle } from './Circle'
export { Image } from './Image'
export { Rect } from './Rect'
export { Text } from './Text'

export let display: Display

/**
 * 创建 舞台  传递 canvas 的id
 */
export function createDisplay({
	id
}: {
	id?: string
} = {id : 'snow-engine'}) {
	if (!display) {
		display = new Display(id!)
	}
	return display
}
