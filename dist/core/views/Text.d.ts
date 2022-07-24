import { Display } from './Display';
import { Shape } from './Shape';
import { TextProps } from 'types/types';
export declare class Text extends Shape {
    private props;
    point: any;
    constructor(props: TextProps);
    get text(): string;
    set text(text: string);
    draw(ctx: CanvasRenderingContext2D): void;
    change(changeProps: Partial<TextProps>, display: Display): void;
}
