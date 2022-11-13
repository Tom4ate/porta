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
            panelConfig: null,
            stateMachinePanel: null,
            // position: {},
        };

        return super(app,baseObject);            
    }

    getPanelConfig() {
        this.panelConfig = {
            // "locate" : () => {
            //     console.log("locate")
            // }
        }
        
        return this.panelConfig;
    }

    // Debug panel config
    createPanel(folder) {
        folder.open();

        // state machine debug config
        this.stateMachinePanel = {
            states: [],
            stateMachine: this.stateMachine,

            updateStates() {
                for (let i = 0; i < this.states.length; i++) {
                    let state = this.states[i];
                    let stateClass = this[state + "_class"];
                    let controller = this[state + "_controller"];
                    let controllerWeight = this[state + "_controller_weight"];

                    if (stateClass) {
                        if (controller) {
                            controller.setValue(stateClass.active);
                        }
                        if (controllerWeight) {
                            controllerWeight.setValue(stateClass.animationWeight);
                        }
                    }
                }
            }
        }

        // create the state machine folder
        let stateMachineFolder = folder.addFolder("State Machine");
        stateMachineFolder.open();

        // entengle the states to the folder
        for(let state in this.stateMachine.moveStates) {
            this.stateMachinePanel[state] = false;
            this.stateMachinePanel[state+" Weight"] = 0;

            let controller = stateMachineFolder
            .add( this.stateMachinePanel , state);

            let controllerWeight = stateMachineFolder
            .add( this.stateMachinePanel , state+" Weight", 0, 1, 0.01);

            this.stateMachinePanel[state + "_controller"] = controller;
            this.stateMachinePanel[state + "_controller_weight"] = controllerWeight;
            this.stateMachinePanel[state + "_class"] = this.stateMachine.moveStates[state];
            this.stateMachinePanel.states.push(state);
        }

        return this.stateMachinePanel;
    }

}

