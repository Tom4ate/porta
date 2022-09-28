
export default class StateMachine {

    constructor(app) {
        // boot states
        // manage states and transactions
        this.app = app;
        this.entity = null;
    }

    entangleActions() {
        const animations = this.entity.animations;
        const states = Object.values(this.states);

        for (var i = 0; i < states.length; i++) {
            let state = states[i];
            let stateAnimations = animations.filter((animation) => {
                // console.log("animation._clip.name",animation._clip.name);
                return state.verifyAnimationName(animation._clip.name);
            })

            if (stateAnimations) {
                state.entangleAnimation(stateAnimations);
            }
        }

        // entangle mixer
        if (this.entity) {
            this.mixer = this.entity.mixer;
        }
    }
    
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