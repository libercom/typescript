export interface IGreeting {
    greet: (name: string) => void;
}

export type EventCallback = (e?: EventListener) => void;

export interface IEventListener {
    trigger: (fn: EventCallback) => void;
    log: () => void;
}

export class EventListener implements IEventListener {
    trigger = (fn: EventCallback) => {
        fn(this);
    };

    log = () => {
        console.log(`[${new Date().toLocaleDateString()}] Some message`);
    };
}
