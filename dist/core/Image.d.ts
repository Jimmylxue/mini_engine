import { Shape } from './Shape';
import { ImageProps } from '../types/types';
import { Display } from './Display';
export declare class Image extends Shape {
    private props;
    private img;
    private loadStatus;
    constructor(props: ImageProps);
    draw(ctx: CanvasRenderingContext2D): void;
    isPointInClosedRegion(mouse: any): boolean;
    change(changeProps: Partial<ImageProps>, display: Display): void;
}
