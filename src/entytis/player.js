import Entyti from './entyti';
import * as THREE from 'three';

export default class Player extends Entyti {
    constructor(app,dataObject) {
        let baseObject = {
            ...dataObject,
            scale:0.05,
            moveable: true,
            animated: true,
            rotation: new THREE.Euler(Math.PI / 2,Math.PI,0) ,
            // position: {},
        };

        return super(app,baseObject);            
    }

    // Debug panel config
    getPanelConfig() {
        return {
            "Show Position": () => {
                console.log("Ações do player",this);
            }
        };
    }

    
    // default animations
    // getAnimations() {}

    // default action
    // getActions() {}
    
}

