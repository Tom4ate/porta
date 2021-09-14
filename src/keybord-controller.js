
export default class keyBordController {

    constructor() {
        this.keypress = [];
        this.keydown = [];
        this.keyup = [];

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
            }
        }
        
    }

    addEvent(type = null,options = null, callBack = null){

        if(!type || !callBack) {
            return;
        }

        if(!options) {
            options = null;
        }

        if(this[type] === undefined || !Array.isArray(this[type])) {
            return;
        }
        
        this[type].push( {
            ...options,
            type,
            callBack
        });

    }
    
}