import { Display, Rect, Circle, Image, Text } from './core';
declare const _default: {
    Display: typeof Display;
    Rect: typeof Rect;
    Circle: typeof Circle;
    Image: typeof Image;
    Text: typeof Text;
    RES: {
        getRes: (key: string) => ImageBitmap | HTMLAudioElement | undefined;
        resolve: (map: import("./core/rescurce/type").TSource, onProgress: () => void) => void;
        onLoad: (fn: () => void) => void;
    };
};
export default _default;
