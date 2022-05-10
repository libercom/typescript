"use strict";
exports.__esModule = true;
exports.EventListener = void 0;
var EventListener = /** @class */ (function () {
    function EventListener() {
        var _this = this;
        this.trigger = function (fn) {
            fn(_this);
        };
        this.log = function () {
            console.log("[".concat(new Date().toLocaleDateString(), "] Some message"));
        };
    }
    return EventListener;
}());
exports.EventListener = EventListener;
