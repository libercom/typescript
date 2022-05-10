import { EventCallback, EventListener, IGreeting } from "./module";

// class, interface, enum

interface Boo {
    boo: (props: string) => void;
}

class Animal implements Boo {
    boo = (props: string) => console.log(props);
}

enum Colors {
    Red,
    Black,
    Blue,
}

const cat = new Animal();
cat.boo("boo");

console.log(Colors.Blue);

// type

type role = "admin" | "user";

class User implements IGreeting {
    private id: number;
    protected name: string;
    public role: role;

    constructor(name: string, role: role) {
        this.name = name;
        this.role = role;
    }

    greet = (name: string) => {
        console.log(
            `Hello, my name is ${this.name}. You are ${name}? Nice to meet you!`
        );
    };

    getId = (): number => this.id;
}

class BetterUser extends User {
    constructor(name: string, role: role) {
        super(name, role);
    }

    getRole = () => {
        console.log(`I am ${this.role} of this server!`);
    };
}

const user1 = new User("Anton", "admin");
user1.greet("Ivan");

// this context

const clickEventListener = new EventListener();

class Component {
    clicked: number = 0;

    handleClick: EventCallback = function (e: EventListener) {
        e.log();
        this.clicked += 1;
    };

    render = () => {
        clickEventListener.trigger(this.handleClick.bind(this));
    };
}

const component = new Component();

component.render();
component.render();

console.log(component.clicked);

// generics

class Stack<T> {
    container: T[];
    size: number;

    constructor() {
        this.container = [];
        this.size = 0;
    }

    push = (element: T) => {
        this.container.push(element);
        this.size++;
    };

    pop = (): T | undefined => {
        return this.container.pop();
    };

    peek = (): T | undefined => {
        return this.container[this.size - 1];
    };
}

const stack = new Stack<number>();

stack.push(1);
stack.push(3);
console.log(stack.peek());

// generic function

const PseudoReact = (() => {
    let hooks: any[] = [];
    let idx: number = 0;

    const useState = <T>(initialValue: T) => {
        const state: T = hooks[idx] || initialValue;
        const _idx = idx;

        const setState = (newValue: T) => {
            hooks[_idx] = newValue;
        };

        const result: [T, (newValue: T) => void] = [state, setState];
        idx++;

        return result;
    };

    const useEffect = (cb, deps) => {
        const oldDeps = hooks[idx];
        let hasChanged = true;

        if (oldDeps) {
            hasChanged = deps.some((dep, i) => !Object.is(dep, oldDeps[i]));
        }

        if (hasChanged) cb();
        hooks[idx] = deps;
        idx++;
    };

    const render = (component) => {
        idx = 0;
        const c = new component();
        c.render();
        return c;
    };

    return { useState, render, useEffect };
})();

const SomeComponent = () => {
    const [count, setCount] = PseudoReact.useState<number>(0);
    const [text, setText] = PseudoReact.useState<string>("");

    PseudoReact.useEffect(() => {
        console.log("count has changed");
    }, [count]);

    return {
        render: () => console.log({ count, text }),
        increase: () => setCount(count + 1),
        change: () => setText(text + "a"),
    };
};

let app = PseudoReact.render(SomeComponent);
app.increase();
app.change();
app = PseudoReact.render(SomeComponent);
app.change();
app.increase();
app = PseudoReact.render(SomeComponent);

// decorator

const log = (target: any, propertyKey: string) => {
    let currentValue = target[propertyKey];

    Object.defineProperty(target, propertyKey, {
        get: () => currentValue,
        set: (newValue) => {
            console.log("hey");
            currentValue = newValue;
        },
    });
};

class DecoratorExample {
    @log
    name: string = "johnny";
}

let d = new DecoratorExample();
d.name = "ion";

// computing types

type ButtonClass = "danger" | "success" | "wrong" | "submit";
type BigButtonClass = `${ButtonClass}-big`;
type AllButtonClass = ButtonClass | BigButtonClass;
type ExcludeTypes<T, U> = T extends U ? never : T;
type ButtonClassNoSubmit = ExcludeTypes<ButtonClass, "submit">;

type OtherUser = { name: string };
type UserRole = { role: role };

type CustomUser = OtherUser & UserRole;
