import { RectProps } from '../types/types';
import { Shape } from './Shape';
export declare class Rect extends Shape {
    private props;
    private tween;
    isAnimating: boolean;
    constructor(props: RectProps);
    initAnimate(): void;
    bindProps(): void;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointInClosedRegion(mouse: any): boolean;
    change(changeProps: Partial<RectProps>, duration: number, repeat?: number, onComplete?: () => void): void;
}
