import State from './BaseState';

export default class WalkingState extends State {

    animationFowardName = "Character|walking";
    animationBackwardName = "Character|t-pose";
    animationFoward = null;
    animationBackward = null;
    animationFowardPlaying = false;
    animationBackwardPlaying = false;

    constructor(machine) {
        super(machine);
    }

    verifyAnimationName(animationName) {
        // return false;
        return this.animationFowardName === animationName ||  this.animationBackwardName === animationName;
    }

    entangleAnimation(animations) {
        for (var i = 0; i < animations.length; i++) {
            let animation = animations[i];

            if (this.animationBackwardName === animation._clip.name) {
                this.animationBackward = animation;
            }

            if (this.animationFowardName === animation._clip.name) {
                this.animationFoward = animation;
            }
        }
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

    leave() {
        if (this.active) {
            this.fowardAnimation(false);
            this.backwardAnimation(false);
        }

        this.active = false;
    }

    fowardAnimation(on) {
        // activate respective animation
        if (this.animationFoward) {
            
            if (on && !this.animationFowardPlaying) {
                this.animationFowardPlaying = true;
                this.animationFoward.play();
            } 

            if (!on && this.animationFowardPlaying) {
                this.animationFowardPlaying = false;
                this.animationFoward.stop();
            }
        }
    }

    backwardAnimation(on) {
        // activate respective animation
        if (this.animationBackward) {
            if (on && !this.animationBackwardPlaying) {
                this.animationBackwardPlaying = true;
                this.animationBackward.play();
            } 

            if (!on && this.animationBackwardPlaying) {
                this.animationBackwardPlaying = false;
                this.animationBackward.stop();
            }
        }
    }
}