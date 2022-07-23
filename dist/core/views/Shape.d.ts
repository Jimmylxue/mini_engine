export declare class Shape {
    listenerMap: Map<any, any>;
    tween: any;
    fnArr?: () => void;
    constructor(listenerMap?: Map<any, any>);
    on(eventName: string, listener: () => void): void;
    initAnimate(): void;
    track(fn: () => void): void;
    trigger(): void;
    release(): void;
}
