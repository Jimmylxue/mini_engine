export declare class Shape {
    listenerMap: Map<any, any>;
    x: number;
    y: number;
    width: number;
    height: number;
    constructor(listenerMap?: Map<any, any>);
    on(eventName: string, listener: () => void): void;
}
