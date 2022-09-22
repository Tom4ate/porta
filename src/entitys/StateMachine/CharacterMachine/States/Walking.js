import State from './BaseState';

export default class WalkingState extends State {
    constructor(machine) {
        super(machine);
    }

    verifyState(intents) {
        return intents.foward || intents.backward;
    }

    update( s, t, { speed, rotation, intents }) {
        let acc = this.machine.walkAceleretion.clone();

        if(!intents.backward || !intents.foward) {
            this.fowardAnimation(intents.foward);
            this.backwardAnimation(intents.backward);

            if(intents.foward) {
                speed.z += acc.z * s;
            }
            
            if (intents.backward) {
                speed.z -= acc.z * s;
            }
        } else {
            this.fowardAnimation(false);
            this.backwardAnimation(false);
        }
    }

    fowardAnimation() {
        // activate ani
    }

    backwardAnimation() {

    }
}