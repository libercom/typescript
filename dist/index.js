"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
var module_1 = require("./module");
var Animal = /** @class */ (function () {
    function Animal() {
        this.boo = function (props) { return console.log(props); };
    }
    return Animal;
}());
var Colors;
(function (Colors) {
    Colors[Colors["Red"] = 0] = "Red";
    Colors[Colors["Black"] = 1] = "Black";
    Colors[Colors["Blue"] = 2] = "Blue";
})(Colors || (Colors = {}));
var cat = new Animal();
cat.boo("boo");
console.log(Colors.Blue);
var User = /** @class */ (function () {
    function User(name, role) {
        var _this = this;
        this.greet = function (name) {
            console.log("Hello, my name is ".concat(_this.name, ". You are ").concat(name, "? Nice to meet you!"));
        };
        this.getId = function () { return _this.id; };
        this.name = name;
        this.role = role;
    }
    return User;
}());
var BetterUser = /** @class */ (function (_super) {
    __extends(BetterUser, _super);
    function BetterUser(name, role) {
        var _this = _super.call(this, name, role) || this;
        _this.getRole = function () {
            console.log("I am ".concat(_this.role, " of this server!"));
        };
        return _this;
    }
    return BetterUser;
}(User));
var user1 = new User("Anton", "admin");
user1.greet("Ivan");
// this context
var clickEventListener = new module_1.EventListener();
var Component = /** @class */ (function () {
    function Component() {
        var _this = this;
        this.clicked = 0;
        this.handleClick = function (e) {
            e.log();
            this.clicked += 1;
        };
        this.render = function () {
            clickEventListener.trigger(_this.handleClick.bind(_this));
        };
    }
    return Component;
}());
var component = new Component();
component.render();
component.render();
console.log(component.clicked);
// generics
var Stack = /** @class */ (function () {
    function Stack() {
        var _this = this;
        this.push = function (element) {
            _this.container.push(element);
            _this.size++;
        };
        this.pop = function () {
            return _this.container.pop();
        };
        this.peek = function () {
            return _this.container[_this.size - 1];
        };
        this.container = [];
        this.size = 0;
    }
    return Stack;
}());
var stack = new Stack();
stack.push(1);
stack.push(3);
console.log(stack.peek());
// generic function
var PseudoReact = (function () {
    var hooks = [];
    var idx = 0;
    var useState = function (initialValue) {
        var state = hooks[idx] || initialValue;
        var _idx = idx;
        var setState = function (newValue) {
            hooks[_idx] = newValue;
        };
        var result = [state, setState];
        idx++;
        return result;
    };
    var useEffect = function (cb, deps) {
        var oldDeps = hooks[idx];
        var hasChanged = true;
        if (oldDeps) {
            hasChanged = deps.some(function (dep, i) { return !Object.is(dep, oldDeps[i]); });
        }
        if (hasChanged)
            cb();
        hooks[idx] = deps;
        idx++;
    };
    var render = function (component) {
        idx = 0;
        var c = new component();
        c.render();
        return c;
    };
    return { useState: useState, render: render, useEffect: useEffect };
})();
var SomeComponent = function () {
    var _a = PseudoReact.useState(0), count = _a[0], setCount = _a[1];
    var _b = PseudoReact.useState(""), text = _b[0], setText = _b[1];
    PseudoReact.useEffect(function () {
        console.log("count has changed");
    }, [count]);
    return {
        render: function () { return console.log({ count: count, text: text }); },
        increase: function () { return setCount(count + 1); },
        change: function () { return setText(text + "a"); }
    };
};
var app = PseudoReact.render(SomeComponent);
app.increase();
app.change();
app = PseudoReact.render(SomeComponent);
app.change();
app.increase();
app = PseudoReact.render(SomeComponent);
// decorator
var log = function (target, propertyKey) {
    var currentValue = target[propertyKey];
    Object.defineProperty(target, propertyKey, {
        get: function () { return currentValue; },
        set: function (newValue) {
            console.log("hey");
            currentValue = newValue;
        }
    });
};
var DecoratorExample = /** @class */ (function () {
    function DecoratorExample() {
        this.name = "johnny";
    }
    __decorate([
        log
    ], DecoratorExample.prototype, "name");
    return DecoratorExample;
}());
var d = new DecoratorExample();
d.name = "ion";
