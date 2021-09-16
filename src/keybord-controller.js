
export default class keyBordController {

    constructor() {
        this.keypress = [];
        this.keydown = [];
        this.keyup = [];
        this.click = [];

        this.setupEventsListners();
    }
    
    setupEventsListners() {
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

        let keyMap = this[type];

        if(!keyMap) {
            return;
        }

        for (let index = 0; index < keyMap.length; index++) {
            const action = keyMap[index];
            
            if(action.key == event.key) {
                action.callBack(event);
            } else if(action.keyArray && action.keyArray.includes(event.key)) {
                action.callBack(event);
            } 
        }
        
    }

    addEvent(type = null,options = null, callBack = null){

        if(!type || !callBack) {
            return;
        }

        if(!options) {
            options = {};
        }

        if((this[type] === undefined || !Array.isArray(this[type]) ) && type !== "click") {
            return;
        }
        
        if(Array.isArray(options.key)) {
            options.keyArray = options.key;
            delete options.key;
        }
        
        this[type].push( {
            ...options,
            type,
            callBack
        });

    }
    
}