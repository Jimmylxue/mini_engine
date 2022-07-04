export declare class Point2d {
    x: number;
    y: number;
    constructor(x: number, y: number);
    clone(): any;
    add(v: {
        x: number;
        y: number;
    }): this;
    random(): this;
}
