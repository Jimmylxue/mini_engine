/**
 * 通用错误处理
 */
export declare enum ErrorType {
    ConfigError = 1,
    RenderError = 2,
    SourceError = 3,
    SOURCE_NOT_FOUND = 4
}
export declare const warn: (msg: string) => void;
export declare const error: (msg: string) => void;
export default class BaseError extends Error {
    constructor(type: number, msg: string);
}
