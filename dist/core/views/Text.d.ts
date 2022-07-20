import { Display } from './Display';
import { Shape } from './Shape';
import { TextProps } from 'types/types';
export declare class Text extends Shape {
    private props;
    text: string;
    point: any;
    constructor(props: TextProps);
    draw(ctx: CanvasRenderingContext2D): void;
    change(changeProps: Partial<TextProps>, display: Display): void;
}
