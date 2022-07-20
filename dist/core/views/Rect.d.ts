import { RectProps } from 'types/types';
import { Shape } from './Shape';
import { Animate } from 'types/AnimateProps';
export declare class Rect extends Shape {
    props: RectProps;
    isAnimating: boolean;
    constructor(props: RectProps);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    bindProps(): void;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointInClosedRegion(mouse: any): boolean;
    change(changeProps: Partial<RectProps>, { duration, repeat, delay, repeatDelay, onComplete, onUpdate, onStop, onRepeat, }: Animate): void;
}
