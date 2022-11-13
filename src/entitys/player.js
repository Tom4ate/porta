import Entity from './entity';
import CharacterMachine from './StateMachine/CharacterMachine/Machine.js'
import * as THREE from 'three';

export default class Player extends Entity {
    constructor(app,dataObject) {
        let baseObject = {
            ...dataObject,
            scale:0.05,
            moveable: true,
            animated: true,
            hasPanel: true,
            stateMachine: new CharacterMachine(app),
            rotation: new THREE.Euler(Math.PI / 2,Math.PI,0) ,
            // position: {},
        };

        return super(app,baseObject);            
    }

    // Debug panel config
    createPanel(foler) {
        console.log("folder",folder);
        // let playerFolder = folder.addFolder("");
        let positionFolder = folder.addFolder("Position and direction");

        let Ox = this.idealOffset.x;
        let Oy = this.idealOffset.y;
        let Oz = this.idealOffset.z;
        let Lx = this.idealLookat.x;
        let Ly = this.idealLookat.y;
        let Lz = this.idealLookat.z;
        
        console.log("this.speed",this.speed)

        let settings = {
            "speed" : this.speed,
            // "offset step y" : Oy,
            // "offset step z" : Oz,
            // "lookat step x" : Lx,
            // "lookat step y" : Ly,
            // "lookat step z" : Lz,
        }

        let max = this.speed * 2;
        let min = 0.001;
        let step = 0.001;

        positionFolder
        .add( settings, "speed",min,max, step)
        .onChange((value) => {
            console.log("value",value);
            // this.speed = value;
        });

        return {
            "player settings": () => {
                console.log("Ações do player",this);
            },
        };
    }

    
    // default animations
    // getAnimations() {}

    // default action
    // getActions() {}
    
}

