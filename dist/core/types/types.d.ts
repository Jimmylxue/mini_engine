declare type Point = {
    x: number;
    y: number;
};
export declare type BaseShape = {
    fillColor: string;
};
export declare type SizeBase = {
    width: number;
    height: number;
};
export declare type CircleProps = {
    center: Point;
    radius: number;
} & BaseShape;
export declare type RectProps = {
    leftTop: Point;
} & BaseShape & SizeBase;
export declare type ImageProps = {
    source: string;
    leftTop: Point;
} & SizeBase;
export declare type TextProps = {
    text: string;
    type: 'fill' | 'stroke';
    color?: string;
    size: number | string;
} & Point;
export declare const MOUSE_MOVE = "mousemove";
export declare const MOUSE_DOWN = "mousedown";
export declare const MOUSE_UP = "mouseup";
export declare const TOUCH_MOVE = "touchmove";
export declare const EVENT_ARR: string[];
export declare enum TShape {
    RECT = 0,
    Image = 1,
    Circle = 2
}
export {};
