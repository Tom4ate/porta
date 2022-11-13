
/**
 * 
 * Passive sistem for ser input and interactions
 * 
 * */
export default class inputSystem {

    intents = {
        foward: false,
        backward: false,
        right: false,
        left: false,
        slow: false,
        fast: false,
        jump: false
    };

    // load and configured by device and user
    keyMap = [
    {
        // key: "w",
        keyCode: 87,
        toggle: "foward"
    },{
        // key: "s",
        keyCode: 83,
        toggle: "backward"
    },{
        // key: "a",
        keyCode: 65,
        toggle: "left"
    },{
        // key: "d",
        keyCode: 68,
        toggle: "right"
    },{
        keyCode: 32, // space
        toggle: "jump"
    },{
        // state: "ctrlKey",
        key: "Control",
        toggle: "slow"
    },{
        // state: "shiftKey",
        key: "Shift",
        toggle: "fast"
    }];

    constructor() {
        this.setupEventsListners();
    }
    
    getIntents() {
        return this.intents;
    }

    // track the keyboard events
    setupEventsListners() {
        // could be by device
        document.addEventListener("keypress",(event) => {
            this._hendleEvent("keypress",event);
        });
        document.addEventListener("keydown",(event) => {
            this._hendleEvent("keydown",event);
        });
        document.addEventListener("keyup",(event) => {
            this._hendleEvent("keyup",event);
        });
        document.addEventListener("click",(event) => {
            this._hendleEvent("click",event);
        });
    }

    _hendleEvent(type,event) {
        const on = type === "keydown" || type === "keypress";

        // console.log("type,event",type,event);

        for (let index = 0; index < this.keyMap.length; index++) {
            const item = this.keyMap[index];
            const sameKey = item.key && item.key == event.key;
            const sameKeyCode = item.keyCode && item.keyCode == event.keyCode;

            if(sameKey || sameKeyCode) {
                if(item.toggle) {
                    this.intents[item.toggle] = on;
                }
            }
        }
    }

}