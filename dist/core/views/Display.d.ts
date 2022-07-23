import { Rect } from './Rect';
export declare class Display {
    private canvas;
    private ctx;
    private allShapes;
    private animateTimer;
    fnArr?: () => void;
    constructor(canvas: HTMLElement, ctx: CanvasRenderingContext2D, allShapes?: Set<Rect>);
    star(): void;
    bindEvent(): void;
    handleEvent(name: string): (event: any) => void;
    getNewEvent(event: any): any;
    add(shape: any): void;
    remove(shape: any): void;
    clearCanvas(): void;
    redraw(): void;
    track(fn: () => void): void;
    trigger(): void;
    release(): void;
}
