import { Display } from './Display';
export { Display } from './Display';
export { Circle } from './Circle';
export { Image } from './Image';
export { Rect } from './Rect';
export { Text } from './Text';
export declare let display: Display;
export declare function createDisplay({ canvas, ctx, }: {
    canvas: HTMLElement;
    ctx: CanvasRenderingContext2D;
}): Display;
