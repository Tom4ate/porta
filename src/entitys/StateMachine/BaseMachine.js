
export default class StateMachine {

    constructor() {
        // boot states
        // manage states and transactions
        this.entity = null;
    }

    entangleActions() {}
    
    entangleEntity(entity) {
        this.entity = entity;
    }

    // // aplay any state machine
    // if  (this.moveable) {
    //     this.stateMachine = {
    //         activeState: "idle",
    //         movement: {
    //             idle: true,
    //             front: false,
    //             back: false,
    //             left: false,
    //             right: false,
    //             speedVector: new THREE.Vector3(0,0,0),
    //             walkAceleretion: new THREE.Vector3(1, 0.25, 7.5),
    //             runAceleretion: new THREE.Vector3(0,2,0),
    //             vectorsList: [],
    //         }
    //     }
    //     this.rotationSpeed = rotationSpeed || Math.PI / 40 ;
    //     this.decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);

    // }

}