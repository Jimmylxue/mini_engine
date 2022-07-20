import { Shape } from './Shape';
import { ImageProps } from 'types/types';
import { Display } from './Display';
export declare class Image extends Shape {
    private props;
    private loadStatus;
    constructor(props: ImageProps);
    get x(): number;
    get y(): number;
    get width(): number;
    get height(): number;
    bindProps(): void;
    draw(ctx: CanvasRenderingContext2D): void;
    isPointInClosedRegion(mouse: any): boolean;
    change(changeProps: Partial<ImageProps>, display: Display): void;
}
