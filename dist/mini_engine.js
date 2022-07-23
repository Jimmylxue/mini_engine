(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["mini_engine"] = factory();
	else
		root["mini_engine"] = factory();
})(self, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDisplay = exports.Text = exports.Rect = exports.Image = exports.Circle = void 0;
var views_1 = __webpack_require__(2);
Object.defineProperty(exports, "Circle", ({ enumerable: true, get: function () { return views_1.Circle; } }));
Object.defineProperty(exports, "Image", ({ enumerable: true, get: function () { return views_1.Image; } }));
Object.defineProperty(exports, "Rect", ({ enumerable: true, get: function () { return views_1.Rect; } }));
Object.defineProperty(exports, "Text", ({ enumerable: true, get: function () { return views_1.Text; } }));
Object.defineProperty(exports, "createDisplay", ({ enumerable: true, get: function () { return views_1.createDisplay; } }));
__exportStar(__webpack_require__(15), exports);


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createDisplay = exports.display = exports.Text = exports.Rect = exports.Image = exports.Circle = exports.Display = void 0;
const Display_1 = __webpack_require__(3);
var Display_2 = __webpack_require__(3);
Object.defineProperty(exports, "Display", ({ enumerable: true, get: function () { return Display_2.Display; } }));
var Circle_1 = __webpack_require__(6);
Object.defineProperty(exports, "Circle", ({ enumerable: true, get: function () { return Circle_1.Circle; } }));
var Image_1 = __webpack_require__(10);
Object.defineProperty(exports, "Image", ({ enumerable: true, get: function () { return Image_1.Image; } }));
var Rect_1 = __webpack_require__(13);
Object.defineProperty(exports, "Rect", ({ enumerable: true, get: function () { return Rect_1.Rect; } }));
var Text_1 = __webpack_require__(14);
Object.defineProperty(exports, "Text", ({ enumerable: true, get: function () { return Text_1.Text; } }));
function createDisplay({ canvas, ctx, }) {
    if (!exports.display) {
        exports.display = new Display_1.Display(canvas, ctx);
    }
    return exports.display;
}
exports.createDisplay = createDisplay;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Display = void 0;
const Point_1 = __webpack_require__(4);
const types_1 = __webpack_require__(5);
class Display {
    constructor(canvas, ctx, allShapes = new Set()) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.allShapes = allShapes;
        this.animateTimer = 0;
        this.bindEvent();
        this.star();
    }
    star() {
        const animate = () => {
            let hasMoving = false;
            this.allShapes.forEach(shape => {
                var _a, _b;
                (_a = shape === null || shape === void 0 ? void 0 : shape.initAnimate) === null || _a === void 0 ? void 0 : _a.call(shape);
                (_b = shape === null || shape === void 0 ? void 0 : shape.trigger) === null || _b === void 0 ? void 0 : _b.call(shape);
                if (shape.isAnimating) {
                    hasMoving = true;
                }
            });
            if (hasMoving) {
                // 性能优化 - 尽量的减少 绘画次数
                this.redraw();
            }
            this.redraw();
            this.trigger();
            this.animateTimer = requestAnimationFrame(animate);
            // setTimeout(() => {
            // 	cancelAnimationFrame(this.animateTimer)
            // }, 2000)
            // cancelAnimationFrame(this.animateTimer)
        };
        animate();
    }
    bindEvent() {
        types_1.EVENT_ARR.forEach(eventName => {
            this.canvas.addEventListener(eventName, this.handleEvent(eventName));
        });
    }
    handleEvent(name) {
        return (event) => {
            event = this.getNewEvent(event);
            this.allShapes.forEach((shape) => {
                const listeners = shape.listenerMap.get(name);
                if (listeners &&
                    shape.isPointInClosedRegion(event) &&
                    !event.isStopBubble) {
                    listeners.forEach((listener) => listener(event));
                }
            });
        };
    }
    getNewEvent(event) {
        const point = new Point_1.Point2d(event.offsetX, event.offsetY);
        return Object.assign({ point, isStopBubble: false }, event);
    }
    add(shape) {
        shape.draw(this.ctx);
        this.allShapes.add(shape);
    }
    remove(shape) {
        this.allShapes.delete(shape);
        this.clearCanvas();
        this.redraw();
        // shape?.release()
    }
    // 清除画布
    clearCanvas() {
        this.ctx.clearRect(0, 0, 375, 667);
    }
    // 重新绘画
    redraw() {
        this.clearCanvas();
        this.allShapes.forEach(shape => {
            shape.draw(this.ctx);
        });
    }
    track(fn) {
        this.fnArr = fn;
    }
    trigger() {
        var _a;
        (_a = this.fnArr) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    release() {
        this.fnArr = () => { };
    }
}
exports.Display = Display;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Point2d = void 0;
class Point2d {
    constructor(x, y) {
        this.x = x || 0;
        this.y = y || 0;
    }
    clone() {
        return this.constructor(this.x, this.y);
    }
    add(v) {
        this.x += v.x;
        this.y += v.y;
        return this;
    }
    random() {
        this.x = Math.random() * 1800;
        this.y = Math.random() * 800;
        return this;
    }
}
exports.Point2d = Point2d;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TShape = exports.EVENT_ARR = exports.TOUCH_MOVE = exports.MOUSE_UP = exports.MOUSE_DOWN = exports.MOUSE_MOVE = void 0;
exports.MOUSE_MOVE = 'mousemove';
exports.MOUSE_DOWN = 'mousedown';
exports.MOUSE_UP = 'mouseup';
exports.TOUCH_MOVE = 'touchmove';
exports.EVENT_ARR = [exports.MOUSE_MOVE, exports.MOUSE_DOWN, exports.MOUSE_UP, exports.TOUCH_MOVE];
var TShape;
(function (TShape) {
    TShape[TShape["RECT"] = 0] = "RECT";
    TShape[TShape["Image"] = 1] = "Image";
    TShape[TShape["Circle"] = 2] = "Circle";
})(TShape = exports.TShape || (exports.TShape = {}));


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Circle = void 0;
const Shape_1 = __webpack_require__(7);
const types_1 = __webpack_require__(5);
const pointCheck_1 = __webpack_require__(9);
class Circle extends Shape_1.Shape {
    constructor(props) {
        super();
        this.props = props;
    }
    draw(ctx) {
        const { center, radius, fillColor = 'black' } = this.props;
        const { x, y } = center;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }
    // 判断鼠标的点是否在图形内部
    isPointInClosedRegion(mouse) {
        return (0, pointCheck_1.checkInRegin)(types_1.TShape.Circle, mouse, this);
    }
    get center() {
        return this.props.center;
    }
    get radius() {
        return this.props.radius;
    }
}
exports.Circle = Circle;


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Shape = void 0;
const tween_js_1 = __importDefault(__webpack_require__(8));
// 所有图形的基类
class Shape {
    constructor(listenerMap = new Map()) {
        this.listenerMap = listenerMap;
    }
    on(eventName, listener) {
        if (this.listenerMap.has(eventName)) {
            this.listenerMap.get(eventName).push(listener.bind(this));
        }
        else {
            this.listenerMap.set(eventName, [listener.bind(this)]);
        }
    }
    initAnimate() {
        tween_js_1.default.update();
    }
    track(fn) {
        this.fnArr = fn;
    }
    trigger() {
        var _a;
        (_a = this.fnArr) === null || _a === void 0 ? void 0 : _a.call(this);
    }
    release() {
        this.fnArr = undefined;
    }
}
exports.Shape = Shape;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Easing": () => (/* binding */ Easing),
/* harmony export */   "Group": () => (/* binding */ Group),
/* harmony export */   "Interpolation": () => (/* binding */ Interpolation),
/* harmony export */   "Sequence": () => (/* binding */ Sequence),
/* harmony export */   "Tween": () => (/* binding */ Tween),
/* harmony export */   "VERSION": () => (/* binding */ VERSION),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "getAll": () => (/* binding */ getAll),
/* harmony export */   "nextId": () => (/* binding */ nextId),
/* harmony export */   "now": () => (/* binding */ now$1),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "removeAll": () => (/* binding */ removeAll),
/* harmony export */   "update": () => (/* binding */ update)
/* harmony export */ });
/**
 * The Ease class provides a collection of easing functions for use with tween.js.
 */
var Easing = {
    Linear: {
        None: function (amount) {
            return amount;
        },
    },
    Quadratic: {
        In: function (amount) {
            return amount * amount;
        },
        Out: function (amount) {
            return amount * (2 - amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount;
            }
            return -0.5 * (--amount * (amount - 2) - 1);
        },
    },
    Cubic: {
        In: function (amount) {
            return amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount + 2);
        },
    },
    Quartic: {
        In: function (amount) {
            return amount * amount * amount * amount;
        },
        Out: function (amount) {
            return 1 - --amount * amount * amount * amount;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount;
            }
            return -0.5 * ((amount -= 2) * amount * amount * amount - 2);
        },
    },
    Quintic: {
        In: function (amount) {
            return amount * amount * amount * amount * amount;
        },
        Out: function (amount) {
            return --amount * amount * amount * amount * amount + 1;
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return 0.5 * amount * amount * amount * amount * amount;
            }
            return 0.5 * ((amount -= 2) * amount * amount * amount * amount + 2);
        },
    },
    Sinusoidal: {
        In: function (amount) {
            return 1 - Math.cos((amount * Math.PI) / 2);
        },
        Out: function (amount) {
            return Math.sin((amount * Math.PI) / 2);
        },
        InOut: function (amount) {
            return 0.5 * (1 - Math.cos(Math.PI * amount));
        },
    },
    Exponential: {
        In: function (amount) {
            return amount === 0 ? 0 : Math.pow(1024, amount - 1);
        },
        Out: function (amount) {
            return amount === 1 ? 1 : 1 - Math.pow(2, -10 * amount);
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            if ((amount *= 2) < 1) {
                return 0.5 * Math.pow(1024, amount - 1);
            }
            return 0.5 * (-Math.pow(2, -10 * (amount - 1)) + 2);
        },
    },
    Circular: {
        In: function (amount) {
            return 1 - Math.sqrt(1 - amount * amount);
        },
        Out: function (amount) {
            return Math.sqrt(1 - --amount * amount);
        },
        InOut: function (amount) {
            if ((amount *= 2) < 1) {
                return -0.5 * (Math.sqrt(1 - amount * amount) - 1);
            }
            return 0.5 * (Math.sqrt(1 - (amount -= 2) * amount) + 1);
        },
    },
    Elastic: {
        In: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return -Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
        },
        Out: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            return Math.pow(2, -10 * amount) * Math.sin((amount - 0.1) * 5 * Math.PI) + 1;
        },
        InOut: function (amount) {
            if (amount === 0) {
                return 0;
            }
            if (amount === 1) {
                return 1;
            }
            amount *= 2;
            if (amount < 1) {
                return -0.5 * Math.pow(2, 10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI);
            }
            return 0.5 * Math.pow(2, -10 * (amount - 1)) * Math.sin((amount - 1.1) * 5 * Math.PI) + 1;
        },
    },
    Back: {
        In: function (amount) {
            var s = 1.70158;
            return amount * amount * ((s + 1) * amount - s);
        },
        Out: function (amount) {
            var s = 1.70158;
            return --amount * amount * ((s + 1) * amount + s) + 1;
        },
        InOut: function (amount) {
            var s = 1.70158 * 1.525;
            if ((amount *= 2) < 1) {
                return 0.5 * (amount * amount * ((s + 1) * amount - s));
            }
            return 0.5 * ((amount -= 2) * amount * ((s + 1) * amount + s) + 2);
        },
    },
    Bounce: {
        In: function (amount) {
            return 1 - Easing.Bounce.Out(1 - amount);
        },
        Out: function (amount) {
            if (amount < 1 / 2.75) {
                return 7.5625 * amount * amount;
            }
            else if (amount < 2 / 2.75) {
                return 7.5625 * (amount -= 1.5 / 2.75) * amount + 0.75;
            }
            else if (amount < 2.5 / 2.75) {
                return 7.5625 * (amount -= 2.25 / 2.75) * amount + 0.9375;
            }
            else {
                return 7.5625 * (amount -= 2.625 / 2.75) * amount + 0.984375;
            }
        },
        InOut: function (amount) {
            if (amount < 0.5) {
                return Easing.Bounce.In(amount * 2) * 0.5;
            }
            return Easing.Bounce.Out(amount * 2 - 1) * 0.5 + 0.5;
        },
    },
};

var now;
// Include a performance.now polyfill.
// In node.js, use process.hrtime.
// eslint-disable-next-line
// @ts-ignore
if (typeof self === 'undefined' && typeof process !== 'undefined' && process.hrtime) {
    now = function () {
        // eslint-disable-next-line
        // @ts-ignore
        var time = process.hrtime();
        // Convert [seconds, nanoseconds] to milliseconds.
        return time[0] * 1000 + time[1] / 1000000;
    };
}
// In a browser, use self.performance.now if it is available.
else if (typeof self !== 'undefined' && self.performance !== undefined && self.performance.now !== undefined) {
    // This must be bound, because directly assigning this function
    // leads to an invocation exception in Chrome.
    now = self.performance.now.bind(self.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
    now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
    now = function () {
        return new Date().getTime();
    };
}
var now$1 = now;

/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tween
 */
var Group = /** @class */ (function () {
    function Group() {
        this._tweens = {};
        this._tweensAddedDuringUpdate = {};
    }
    Group.prototype.getAll = function () {
        var _this = this;
        return Object.keys(this._tweens).map(function (tweenId) {
            return _this._tweens[tweenId];
        });
    };
    Group.prototype.removeAll = function () {
        this._tweens = {};
    };
    Group.prototype.add = function (tween) {
        this._tweens[tween.getId()] = tween;
        this._tweensAddedDuringUpdate[tween.getId()] = tween;
    };
    Group.prototype.remove = function (tween) {
        delete this._tweens[tween.getId()];
        delete this._tweensAddedDuringUpdate[tween.getId()];
    };
    Group.prototype.update = function (time, preserve) {
        if (time === void 0) { time = now$1(); }
        if (preserve === void 0) { preserve = false; }
        var tweenIds = Object.keys(this._tweens);
        if (tweenIds.length === 0) {
            return false;
        }
        // Tweens are updated in "batches". If you add a new tween during an
        // update, then the new tween will be updated in the next batch.
        // If you remove a tween during an update, it may or may not be updated.
        // However, if the removed tween was added during the current batch,
        // then it will not be updated.
        while (tweenIds.length > 0) {
            this._tweensAddedDuringUpdate = {};
            for (var i = 0; i < tweenIds.length; i++) {
                var tween = this._tweens[tweenIds[i]];
                var autoStart = !preserve;
                if (tween && tween.update(time, autoStart) === false && !preserve) {
                    delete this._tweens[tweenIds[i]];
                }
            }
            tweenIds = Object.keys(this._tweensAddedDuringUpdate);
        }
        return true;
    };
    return Group;
}());

/**
 *
 */
var Interpolation = {
    Linear: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.Linear;
        if (k < 0) {
            return fn(v[0], v[1], f);
        }
        if (k > 1) {
            return fn(v[m], v[m - 1], m - f);
        }
        return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);
    },
    Bezier: function (v, k) {
        var b = 0;
        var n = v.length - 1;
        var pw = Math.pow;
        var bn = Interpolation.Utils.Bernstein;
        for (var i = 0; i <= n; i++) {
            b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
        }
        return b;
    },
    CatmullRom: function (v, k) {
        var m = v.length - 1;
        var f = m * k;
        var i = Math.floor(f);
        var fn = Interpolation.Utils.CatmullRom;
        if (v[0] === v[m]) {
            if (k < 0) {
                i = Math.floor((f = m * (1 + k)));
            }
            return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);
        }
        else {
            if (k < 0) {
                return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
            }
            if (k > 1) {
                return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
            }
            return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);
        }
    },
    Utils: {
        Linear: function (p0, p1, t) {
            return (p1 - p0) * t + p0;
        },
        Bernstein: function (n, i) {
            var fc = Interpolation.Utils.Factorial;
            return fc(n) / fc(i) / fc(n - i);
        },
        Factorial: (function () {
            var a = [1];
            return function (n) {
                var s = 1;
                if (a[n]) {
                    return a[n];
                }
                for (var i = n; i > 1; i--) {
                    s *= i;
                }
                a[n] = s;
                return s;
            };
        })(),
        CatmullRom: function (p0, p1, p2, p3, t) {
            var v0 = (p2 - p0) * 0.5;
            var v1 = (p3 - p1) * 0.5;
            var t2 = t * t;
            var t3 = t * t2;
            return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (-3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;
        },
    },
};

/**
 * Utils
 */
var Sequence = /** @class */ (function () {
    function Sequence() {
    }
    Sequence.nextId = function () {
        return Sequence._nextId++;
    };
    Sequence._nextId = 0;
    return Sequence;
}());

var mainGroup = new Group();

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var Tween = /** @class */ (function () {
    function Tween(_object, _group) {
        if (_group === void 0) { _group = mainGroup; }
        this._object = _object;
        this._group = _group;
        this._isPaused = false;
        this._pauseStart = 0;
        this._valuesStart = {};
        this._valuesEnd = {};
        this._valuesStartRepeat = {};
        this._duration = 1000;
        this._initialRepeat = 0;
        this._repeat = 0;
        this._yoyo = false;
        this._isPlaying = false;
        this._reversed = false;
        this._delayTime = 0;
        this._startTime = 0;
        this._easingFunction = Easing.Linear.None;
        this._interpolationFunction = Interpolation.Linear;
        this._chainedTweens = [];
        this._onStartCallbackFired = false;
        this._id = Sequence.nextId();
        this._isChainStopped = false;
        this._goToEnd = false;
    }
    Tween.prototype.getId = function () {
        return this._id;
    };
    Tween.prototype.isPlaying = function () {
        return this._isPlaying;
    };
    Tween.prototype.isPaused = function () {
        return this._isPaused;
    };
    Tween.prototype.to = function (properties, duration) {
        // TODO? restore this, then update the 07_dynamic_to example to set fox
        // tween's to on each update. That way the behavior is opt-in (there's
        // currently no opt-out).
        // for (const prop in properties) this._valuesEnd[prop] = properties[prop]
        this._valuesEnd = Object.create(properties);
        if (duration !== undefined) {
            this._duration = duration;
        }
        return this;
    };
    Tween.prototype.duration = function (d) {
        this._duration = d;
        return this;
    };
    Tween.prototype.start = function (time) {
        if (this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.add(this);
        this._repeat = this._initialRepeat;
        if (this._reversed) {
            // If we were reversed (f.e. using the yoyo feature) then we need to
            // flip the tween direction back to forward.
            this._reversed = false;
            for (var property in this._valuesStartRepeat) {
                this._swapEndStartRepeatValues(property);
                this._valuesStart[property] = this._valuesStartRepeat[property];
            }
        }
        this._isPlaying = true;
        this._isPaused = false;
        this._onStartCallbackFired = false;
        this._isChainStopped = false;
        this._startTime = time !== undefined ? (typeof time === 'string' ? now$1() + parseFloat(time) : time) : now$1();
        this._startTime += this._delayTime;
        this._setupProperties(this._object, this._valuesStart, this._valuesEnd, this._valuesStartRepeat);
        return this;
    };
    Tween.prototype._setupProperties = function (_object, _valuesStart, _valuesEnd, _valuesStartRepeat) {
        for (var property in _valuesEnd) {
            var startValue = _object[property];
            var startValueIsArray = Array.isArray(startValue);
            var propType = startValueIsArray ? 'array' : typeof startValue;
            var isInterpolationList = !startValueIsArray && Array.isArray(_valuesEnd[property]);
            // If `to()` specifies a property that doesn't exist in the source object,
            // we should not set that property in the object
            if (propType === 'undefined' || propType === 'function') {
                continue;
            }
            // Check if an Array was provided as property value
            if (isInterpolationList) {
                var endValues = _valuesEnd[property];
                if (endValues.length === 0) {
                    continue;
                }
                // handle an array of relative values
                endValues = endValues.map(this._handleRelativeValue.bind(this, startValue));
                // Create a local copy of the Array with the start value at the front
                _valuesEnd[property] = [startValue].concat(endValues);
            }
            // handle the deepness of the values
            if ((propType === 'object' || startValueIsArray) && startValue && !isInterpolationList) {
                _valuesStart[property] = startValueIsArray ? [] : {};
                // eslint-disable-next-line
                for (var prop in startValue) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property][prop] = startValue[prop];
                }
                _valuesStartRepeat[property] = startValueIsArray ? [] : {}; // TODO? repeat nested values? And yoyo? And array values?
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._setupProperties(startValue, _valuesStart[property], _valuesEnd[property], _valuesStartRepeat[property]);
            }
            else {
                // Save the starting value, but only once.
                if (typeof _valuesStart[property] === 'undefined') {
                    _valuesStart[property] = startValue;
                }
                if (!startValueIsArray) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
                }
                if (isInterpolationList) {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _valuesStartRepeat[property] = _valuesEnd[property].slice().reverse();
                }
                else {
                    _valuesStartRepeat[property] = _valuesStart[property] || 0;
                }
            }
        }
    };
    Tween.prototype.stop = function () {
        if (!this._isChainStopped) {
            this._isChainStopped = true;
            this.stopChainedTweens();
        }
        if (!this._isPlaying) {
            return this;
        }
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        this._isPlaying = false;
        this._isPaused = false;
        if (this._onStopCallback) {
            this._onStopCallback(this._object);
        }
        return this;
    };
    Tween.prototype.end = function () {
        this._goToEnd = true;
        this.update(Infinity);
        return this;
    };
    Tween.prototype.pause = function (time) {
        if (time === void 0) { time = now$1(); }
        if (this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = true;
        this._pauseStart = time;
        // eslint-disable-next-line
        this._group && this._group.remove(this);
        return this;
    };
    Tween.prototype.resume = function (time) {
        if (time === void 0) { time = now$1(); }
        if (!this._isPaused || !this._isPlaying) {
            return this;
        }
        this._isPaused = false;
        this._startTime += time - this._pauseStart;
        this._pauseStart = 0;
        // eslint-disable-next-line
        this._group && this._group.add(this);
        return this;
    };
    Tween.prototype.stopChainedTweens = function () {
        for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
            this._chainedTweens[i].stop();
        }
        return this;
    };
    Tween.prototype.group = function (group) {
        this._group = group;
        return this;
    };
    Tween.prototype.delay = function (amount) {
        this._delayTime = amount;
        return this;
    };
    Tween.prototype.repeat = function (times) {
        this._initialRepeat = times;
        this._repeat = times;
        return this;
    };
    Tween.prototype.repeatDelay = function (amount) {
        this._repeatDelayTime = amount;
        return this;
    };
    Tween.prototype.yoyo = function (yoyo) {
        this._yoyo = yoyo;
        return this;
    };
    Tween.prototype.easing = function (easingFunction) {
        this._easingFunction = easingFunction;
        return this;
    };
    Tween.prototype.interpolation = function (interpolationFunction) {
        this._interpolationFunction = interpolationFunction;
        return this;
    };
    Tween.prototype.chain = function () {
        var tweens = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            tweens[_i] = arguments[_i];
        }
        this._chainedTweens = tweens;
        return this;
    };
    Tween.prototype.onStart = function (callback) {
        this._onStartCallback = callback;
        return this;
    };
    Tween.prototype.onUpdate = function (callback) {
        this._onUpdateCallback = callback;
        return this;
    };
    Tween.prototype.onRepeat = function (callback) {
        this._onRepeatCallback = callback;
        return this;
    };
    Tween.prototype.onComplete = function (callback) {
        this._onCompleteCallback = callback;
        return this;
    };
    Tween.prototype.onStop = function (callback) {
        this._onStopCallback = callback;
        return this;
    };
    /**
     * @returns true if the tween is still playing after the update, false
     * otherwise (calling update on a paused tween still returns true because
     * it is still playing, just paused).
     */
    Tween.prototype.update = function (time, autoStart) {
        if (time === void 0) { time = now$1(); }
        if (autoStart === void 0) { autoStart = true; }
        if (this._isPaused)
            return true;
        var property;
        var elapsed;
        var endTime = this._startTime + this._duration;
        if (!this._goToEnd && !this._isPlaying) {
            if (time > endTime)
                return false;
            if (autoStart)
                this.start(time);
        }
        this._goToEnd = false;
        if (time < this._startTime) {
            return true;
        }
        if (this._onStartCallbackFired === false) {
            if (this._onStartCallback) {
                this._onStartCallback(this._object);
            }
            this._onStartCallbackFired = true;
        }
        elapsed = (time - this._startTime) / this._duration;
        elapsed = this._duration === 0 || elapsed > 1 ? 1 : elapsed;
        var value = this._easingFunction(elapsed);
        // properties transformations
        this._updateProperties(this._object, this._valuesStart, this._valuesEnd, value);
        if (this._onUpdateCallback) {
            this._onUpdateCallback(this._object, elapsed);
        }
        if (elapsed === 1) {
            if (this._repeat > 0) {
                if (isFinite(this._repeat)) {
                    this._repeat--;
                }
                // Reassign starting values, restart by making startTime = now
                for (property in this._valuesStartRepeat) {
                    if (!this._yoyo && typeof this._valuesEnd[property] === 'string') {
                        this._valuesStartRepeat[property] =
                            // eslint-disable-next-line
                            // @ts-ignore FIXME?
                            this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
                    }
                    if (this._yoyo) {
                        this._swapEndStartRepeatValues(property);
                    }
                    this._valuesStart[property] = this._valuesStartRepeat[property];
                }
                if (this._yoyo) {
                    this._reversed = !this._reversed;
                }
                if (this._repeatDelayTime !== undefined) {
                    this._startTime = time + this._repeatDelayTime;
                }
                else {
                    this._startTime = time + this._delayTime;
                }
                if (this._onRepeatCallback) {
                    this._onRepeatCallback(this._object);
                }
                return true;
            }
            else {
                if (this._onCompleteCallback) {
                    this._onCompleteCallback(this._object);
                }
                for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
                    // Make the chained tweens start exactly at the time they should,
                    // even if the `update()` method was called way past the duration of the tween
                    this._chainedTweens[i].start(this._startTime + this._duration);
                }
                this._isPlaying = false;
                return false;
            }
        }
        return true;
    };
    Tween.prototype._updateProperties = function (_object, _valuesStart, _valuesEnd, value) {
        for (var property in _valuesEnd) {
            // Don't update properties that do not exist in the source object
            if (_valuesStart[property] === undefined) {
                continue;
            }
            var start = _valuesStart[property] || 0;
            var end = _valuesEnd[property];
            var startIsArray = Array.isArray(_object[property]);
            var endIsArray = Array.isArray(end);
            var isInterpolationList = !startIsArray && endIsArray;
            if (isInterpolationList) {
                _object[property] = this._interpolationFunction(end, value);
            }
            else if (typeof end === 'object' && end) {
                // eslint-disable-next-line
                // @ts-ignore FIXME?
                this._updateProperties(_object[property], start, end, value);
            }
            else {
                // Parses relative end values with start as base (e.g.: +10, -3)
                end = this._handleRelativeValue(start, end);
                // Protect against non numeric properties.
                if (typeof end === 'number') {
                    // eslint-disable-next-line
                    // @ts-ignore FIXME?
                    _object[property] = start + (end - start) * value;
                }
            }
        }
    };
    Tween.prototype._handleRelativeValue = function (start, end) {
        if (typeof end !== 'string') {
            return end;
        }
        if (end.charAt(0) === '+' || end.charAt(0) === '-') {
            return start + parseFloat(end);
        }
        else {
            return parseFloat(end);
        }
    };
    Tween.prototype._swapEndStartRepeatValues = function (property) {
        var tmp = this._valuesStartRepeat[property];
        var endValue = this._valuesEnd[property];
        if (typeof endValue === 'string') {
            this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(endValue);
        }
        else {
            this._valuesStartRepeat[property] = this._valuesEnd[property];
        }
        this._valuesEnd[property] = tmp;
    };
    return Tween;
}());

var VERSION = '18.6.4';

/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */
var nextId = Sequence.nextId;
/**
 * Controlling groups of tweens
 *
 * Using the TWEEN singleton to manage your tweens can cause issues in large apps with many components.
 * In these cases, you may want to create your own smaller groups of tweens.
 */
var TWEEN = mainGroup;
// This is the best way to export things in a way that's compatible with both ES
// Modules and CommonJS, without build hacks, and so as not to break the
// existing API.
// https://github.com/rollup/rollup/issues/1961#issuecomment-423037881
var getAll = TWEEN.getAll.bind(TWEEN);
var removeAll = TWEEN.removeAll.bind(TWEEN);
var add = TWEEN.add.bind(TWEEN);
var remove = TWEEN.remove.bind(TWEEN);
var update = TWEEN.update.bind(TWEEN);
var exports = {
    Easing: Easing,
    Group: Group,
    Interpolation: Interpolation,
    now: now$1,
    Sequence: Sequence,
    nextId: nextId,
    Tween: Tween,
    VERSION: VERSION,
    getAll: getAll,
    removeAll: removeAll,
    add: add,
    remove: remove,
    update: update,
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (exports);



/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkInRegin = void 0;
const types_1 = __webpack_require__(5);
function checkRect(mouse, shape) {
    const { x, y } = mouse.point || mouse;
    const { x: minX, y: minY, width, height } = shape;
    const maxX = minX + width;
    const maxY = minY + height;
    if (x >= minX && x <= maxX && y >= minY && y <= maxY) {
        return true;
    }
    return false;
}
function checkCircle(mouse, shape) {
    const { center, radius } = shape;
    return mouse.point.distance(center) <= radius * radius;
}
function checkInRegin(ShapeType, mouse, shape) {
    switch (ShapeType) {
        case types_1.TShape.RECT:
        case types_1.TShape.Image:
            return checkRect(mouse, shape);
        case types_1.TShape.Circle:
            return checkCircle(mouse, shape);
    }
}
exports.checkInRegin = checkInRegin;


/***/ }),
/* 10 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Image = void 0;
const Shape_1 = __webpack_require__(7);
const types_1 = __webpack_require__(5);
const error_1 = __importStar(__webpack_require__(11));
const tween_js_1 = __webpack_require__(8);
const pointCheck_1 = __webpack_require__(9);
const _1 = __webpack_require__(2);
const index_1 = __webpack_require__(12);
var ImgStatus;
(function (ImgStatus) {
    ImgStatus[ImgStatus["PENDING"] = 0] = "PENDING";
    ImgStatus[ImgStatus["RESOLVE"] = 1] = "RESOLVE";
    ImgStatus[ImgStatus["REJECT"] = 2] = "REJECT";
})(ImgStatus || (ImgStatus = {}));
class Image extends Shape_1.Shape {
    constructor(props) {
        super();
        this.props = props;
        this.loadStatus = ImgStatus.PENDING;
        this.bindProps();
    }
    get x() {
        return this.props.leftTop.x;
    }
    set x(x) {
        this.change({ leftTop: { x: x, y: this.y } }, _1.display);
    }
    get y() {
        return this.props.leftTop.y;
    }
    set y(y) {
        this.change({ leftTop: { x: this.x, y } }, _1.display);
    }
    get width() {
        return this.props.width;
    }
    set width(width) {
        this.change({ width }, _1.display);
    }
    get height() {
        return this.props.height;
    }
    set height(height) {
        this.change({ height }, _1.display);
    }
    bindProps() {
        this.tween = new tween_js_1.Tween({
            x: this.props.leftTop.x,
            y: this.props.leftTop.y,
            width: this.props.width,
            height: this.props.height,
        });
    }
    draw(ctx) {
        const { leftTop: { x, y }, width, height, source, } = this.props;
        if (this.loadStatus === ImgStatus.PENDING) {
            setTimeout(() => {
                this.draw(ctx);
                return;
            }, 300);
        }
        else if (this.loadStatus === ImgStatus.REJECT) {
            throw new error_1.default(error_1.ErrorType.SourceError, 'Image resource failed to load');
        }
        else {
            ctx.drawImage(source, x, y, width, height);
        }
        ctx.drawImage(source, x, y, width, height);
    }
    isPointInClosedRegion(mouse) {
        return (0, pointCheck_1.checkInRegin)(types_1.TShape.Image, mouse, this);
    }
    change(changeProps, display) {
        const { leftTop, width, height, source } = changeProps;
        const beforeProps = this.props;
        this.props = {
            leftTop: leftTop || beforeProps.leftTop,
            width: width || beforeProps.width,
            height: height || beforeProps.height,
            source: source || beforeProps.source,
        };
        display.redraw();
    }
    intersects(shape) {
        // console.log('aaaa')
        return (0, index_1.checkHit)(this, shape);
    }
}
exports.Image = Image;


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports) => {


/**
 * 通用错误处理
 */
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.error = exports.warn = exports.ErrorType = void 0;
var ErrorType;
(function (ErrorType) {
    ErrorType[ErrorType["ConfigError"] = 1] = "ConfigError";
    ErrorType[ErrorType["RenderError"] = 2] = "RenderError";
    ErrorType[ErrorType["SourceError"] = 3] = "SourceError";
    ErrorType[ErrorType["SOURCE_NOT_FOUND"] = 4] = "SOURCE_NOT_FOUND";
})(ErrorType = exports.ErrorType || (exports.ErrorType = {}));
const warn = (msg) => {
    console.warn(msg);
};
exports.warn = warn;
const error = (msg) => {
    console.error(msg);
};
exports.error = error;
class BaseError extends Error {
    constructor(type, msg) {
        super();
        // this.message = value;
        switch (type) {
            case ErrorType.ConfigError:
                this.name = ErrorType[ErrorType.ConfigError];
                this.message = msg;
                break;
            case ErrorType.RenderError:
                this.name = ErrorType[ErrorType.RenderError];
                this.message = msg;
                break;
            case ErrorType.SourceError:
                this.name = ErrorType[ErrorType.SourceError];
                this.message = msg;
                break;
        }
    }
}
exports["default"] = BaseError;


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.checkHit = void 0;
function checkHit(rectA, rectB) {
    return !(rectA.x + rectA.width < rectB.x ||
        rectB.x + rectB.width < rectA.x ||
        rectA.y + rectA.height < rectB.y ||
        rectB.y + rectB.height < rectA.y);
}
exports.checkHit = checkHit;


/***/ }),
/* 13 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Rect = void 0;
const types_1 = __webpack_require__(5);
const Shape_1 = __webpack_require__(7);
const tween_js_1 = __importStar(__webpack_require__(8));
const pointCheck_1 = __webpack_require__(9);
class Rect extends Shape_1.Shape {
    constructor(props) {
        super();
        this.props = props;
        // private tween: any
        this.isAnimating = false;
        this.bindProps();
    }
    get x() {
        return this.props.leftTop.x;
    }
    get y() {
        return this.props.leftTop.y;
    }
    get width() {
        return this.props.width;
    }
    get height() {
        return this.props.height;
    }
    bindProps() {
        this.tween = new tween_js_1.Tween({
            x: this.props.leftTop.x,
            y: this.props.leftTop.y,
            width: this.props.width,
            height: this.props.height,
        });
    }
    draw(ctx) {
        // this.initAnimate()
        const { leftTop, width, height, fillColor = 'skyblue' } = this.props;
        ctx.save();
        ctx.beginPath();
        ctx.fillStyle = fillColor;
        ctx.fillRect(leftTop.x, leftTop.y, width, height);
        ctx.closePath();
        ctx.restore();
    }
    // 判断点击的点是否在图形内部
    isPointInClosedRegion(mouse) {
        return (0, pointCheck_1.checkInRegin)(types_1.TShape.RECT, mouse, this);
    }
    change(changeProps, { duration = 2000, repeat = 0, delay = 0, repeatDelay, onComplete, onUpdate, onStop, onRepeat, } // duration: number,
    ) {
        const { leftTop, width, height, fillColor } = changeProps;
        const beforeProps = this.props;
        const changeProp = {
            x: (leftTop === null || leftTop === void 0 ? void 0 : leftTop.x) || beforeProps.leftTop.x,
            y: (leftTop === null || leftTop === void 0 ? void 0 : leftTop.y) || beforeProps.leftTop.y,
            width: width || beforeProps.width,
            height: height || beforeProps.height,
            fillColor: fillColor || beforeProps.fillColor,
        };
        this.tween
            .to(changeProp, duration)
            .easing(tween_js_1.default.Easing.Linear.None)
            .onUpdate((position) => {
            this.props = {
                leftTop: {
                    x: position.x,
                    y: position.y,
                },
                width: position.width,
                height: position.height,
                fillColor: this.props.fillColor,
            };
            this.isAnimating = true;
            onUpdate === null || onUpdate === void 0 ? void 0 : onUpdate();
        })
            .onComplete(() => {
            this.isAnimating = false;
            onComplete === null || onComplete === void 0 ? void 0 : onComplete();
        })
            .onStop(() => {
            onStop === null || onStop === void 0 ? void 0 : onStop();
        })
            .onRepeat(() => {
            onRepeat === null || onRepeat === void 0 ? void 0 : onRepeat();
        })
            .start()
            .delay(delay)
            .repeatDelay(repeatDelay || 1000)
            .repeat(repeat);
        // display.redraw()
    }
}
exports.Rect = Rect;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Text = void 0;
const Shape_1 = __webpack_require__(7);
class Text extends Shape_1.Shape {
    constructor(props) {
        super();
        this.props = props;
        this.text = props.text;
        this.point = {
            x: props.x,
            y: props.y,
        };
    }
    draw(ctx) {
        const { x, y, text, type, color = '#000', size = 20 } = this.props;
        ctx.save();
        ctx.font = size + 'px serif';
        if (type === 'stroke') {
            ctx.strokeStyle = color;
            ctx.fillText(text, x, y);
        }
        else {
            ctx.fillStyle = color;
            ctx.strokeText(text, x, y);
        }
        ctx.restore();
    }
    change(changeProps, display) {
        const { x, y, text, type, color, size } = changeProps;
        const beforeProps = this.props;
        this.props = {
            x: x || beforeProps.x,
            y: y || beforeProps.y,
            text: text || beforeProps.text,
            type: type || beforeProps.type,
            color: color || beforeProps.color,
            size: size || beforeProps.size,
        };
        display.redraw();
    }
}
exports.Text = Text;


/***/ }),
/* 15 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RES = void 0;
const error_1 = __importStar(__webpack_require__(11));
const utils_1 = __webpack_require__(16);
const await_to_js_1 = __importDefault(__webpack_require__(17));
let sourceSuccessFn;
let progressFn;
let sourceCount = 0;
const source2map = new Map();
function getRes(key) {
    if (source2map.has(key)) {
        // console.log('key', key)
        return source2map.get(key);
    }
    throw new error_1.default(error_1.ErrorType.SOURCE_NOT_FOUND, `${key} resource is not found`);
}
function analyzeImageRes(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const [error, bitmap] = yield (0, await_to_js_1.default)((0, utils_1.createImgBitmap)(source.url));
        if (error) {
            throw new error_1.default(error_1.ErrorType.SourceError, `${source.key} resource failed to load`);
        }
        bindRes(source, bitmap);
    });
}
function analyzeSoundRes(source) {
    return __awaiter(this, void 0, void 0, function* () {
        const [error, bitmap] = yield (0, await_to_js_1.default)((0, utils_1.CreateSoundRes)(source.url));
        if (error) {
            throw new error_1.default(error_1.ErrorType.SourceError, `${source.key} resource failed to load`);
        }
        bindRes(source, bitmap);
    });
}
function bindRes(source, bitmap) {
    source2map.set(source.key, bitmap);
    progressFn && progressFn(source2map.size, sourceCount);
    if (source2map.size === sourceCount) {
        sourceSuccessFn && sourceSuccessFn();
    }
}
function resolveAssets(map, onProgress) {
    sourceCount = map.length;
    map.forEach(source => {
        switch (source.type) {
            case 'image':
                analyzeImageRes(source);
                break;
            case 'sound':
                analyzeSoundRes(source);
        }
    });
    progressFn = onProgress;
}
function onLoad(fn) {
    sourceSuccessFn = fn;
}
exports.RES = {
    getRes,
    resolve: resolveAssets,
    onLoad,
};


/***/ }),
/* 16 */
/***/ (function(__unused_webpack_module, exports) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.CreateSoundRes = exports.createImgBitmap = void 0;
var SourceStatus;
(function (SourceStatus) {
    SourceStatus[SourceStatus["PENDING"] = 0] = "PENDING";
    SourceStatus[SourceStatus["RESOLVE"] = 1] = "RESOLVE";
    SourceStatus[SourceStatus["REJECT"] = 2] = "REJECT";
})(SourceStatus || (SourceStatus = {}));
function createImgBitmap(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield createImageBitmap(img, 0, 0, img.width, img.height);
                resolve(res);
            });
        };
        img.onerror = function () {
            reject(SourceStatus.REJECT);
        };
    });
}
exports.createImgBitmap = createImgBitmap;
function CreateSoundRes(url) {
    return new Promise((resolve, reject) => {
        const audio = new Audio();
        audio.autoplay = true;
        audio.src = url;
        // audio标签不支持 onload事件，但是支持一个 oncanplaythrough 事件
        audio.oncanplaythrough = function () {
            resolve(audio);
        };
        audio.onerror = function () {
            reject(SourceStatus.REJECT);
        };
    });
}
exports.CreateSoundRes = CreateSoundRes;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "to": () => (/* binding */ to)
/* harmony export */ });
/**
 * @param { Promise } promise
 * @param { Object= } errorExt - Additional Information you can pass to the err object
 * @return { Promise }
 */
function to(promise, errorExt) {
    return promise
        .then(function (data) { return [null, data]; })
        .catch(function (err) {
        if (errorExt) {
            Object.assign(err, errorExt);
        }
        return [err, undefined];
    });
}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (to);
//# sourceMappingURL=await-to-js.es5.js.map


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
const core_1 = __webpack_require__(1);
exports["default"] = {
    createDisplay: core_1.createDisplay,
    Rect: core_1.Rect,
    Circle: core_1.Circle,
    Image: core_1.Image,
    Text: core_1.Text,
    RES: core_1.RES,
};

})();

__webpack_exports__ = __webpack_exports__["default"];
/******/ 	return __webpack_exports__;
/******/ })()
;
});