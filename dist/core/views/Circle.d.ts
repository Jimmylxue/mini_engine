import { Shape } from './Shape';
import { CircleProps } from 'types/types';
export declare class Circle extends Shape {
    private props;
    constructor(props: CircleProps);
    draw(ctx: CanvasRenderingContext2D): void;
    isPointInClosedRegion(mouse: any): boolean;
    get center(): {
        x: number;
        y: number;
    };
    get radius(): number;
}
