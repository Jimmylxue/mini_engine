import { Display } from './Display'
import { Shape } from './Shape'
import { TextProps } from 'types/types'
import { display } from '.'

export class Text extends Shape {
	public point: any
	constructor(private props: TextProps) {
		super()
		this.point = {
			x: props.x,
			y: props.y,
		}
	}

	get text() {
		return this.props.text
	}

	set text(text: string) {
		this.change({ text }, display)
	}

	draw(ctx: CanvasRenderingContext2D) {
		const { x, y, text, type, color = '#000', size = 20 } = this.props
		ctx.save()
		ctx.font = size + 'px serif'
		if (type === 'stroke') {
			ctx.strokeStyle = color
			ctx.strokeText(text, x, y)
		} else {
			ctx.fillStyle = color
			ctx.fillText(text, x, y)
		}
		ctx.restore()
	}

	change(changeProps: Partial<TextProps>, display: Display) {
		const { x, y, text, type, color, size } = changeProps
		const beforeProps = this.props
		this.props = {
			x: x || beforeProps.x,
			y: y || beforeProps.y,
			text: text || beforeProps.text,
			type: type || beforeProps.type,
			color: color || beforeProps.color,
			size: size || beforeProps.size,
		}
		display.redraw()
	}
}
