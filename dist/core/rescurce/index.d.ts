import { TSource } from './type';
declare function getRes(key: string): ImageBitmap | HTMLAudioElement | undefined;
declare function resolveAssets(map: TSource, onProgress: () => void): void;
declare function onLoad(fn: () => void): void;
export declare const RES: {
    getRes: typeof getRes;
    resolve: typeof resolveAssets;
    onLoad: typeof onLoad;
};
export {};
