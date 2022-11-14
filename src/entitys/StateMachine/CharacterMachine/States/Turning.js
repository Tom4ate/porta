import State from './BaseState';
import * as THREE from 'three';

export default class TurningState extends State {

    animationRightName = "Character|right turn 90";
    animationLeftName = "Character|left turn 90";
    animationRight = null;
    animationLeft = null;
    animationRightPlaying = false;
    animationLeftPlaying = false;
    
    constructor(machine) {
        super(machine);
        // is movement true
        // update player position
    }
    
    verifyAnimationName(animationName) {
        // return false;
        return this.animationRightName === animationName ||  this.animationLeftName === animationName;
    }

    entangleAnimation(animations) {
        for (var i = 0; i < animations.length; i++) {
            let animation = animations[i];

            if (this.animationLeftName === animation._clip.name) {
                this.animationLeft = animation;
                animation.setLoop(THREE.LoopPingPong);
            }
            
            if (this.animationRightName === animation._clip.name) {
                this.animationRight = animation;
                animation.setLoop(THREE.LoopPingPong);
            }
        }
    }
    
    verifyState(intents) {
        return intents.left || intents.right;
    }
    
    update( s, t, { speed, rotation, intents }) {
        let acc = this.machine.walkAceleretion.clone();
        let _Q = new THREE.Quaternion();
        let _A = new THREE.Vector3();

        if(intents.fast) {
            acc.multiplyScalar(2.0);
        }

        if(!intents.left || !intents.right) {
            this.rightAnimation(intents.right);
            this.leftAnimation(intents.left);
            
            if (intents.left) {
                _A.set(0, 1, 0);
                _Q.setFromAxisAngle(_A, 4.0 * Math.PI * s * acc.y);
                rotation.multiply(_Q);
            }
        
            if (intents.right) {
                _A.set(0, 1, 0);
                _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * s * acc.y);
                rotation.multiply(_Q);
            }
        } else {
            this.rightAnimation(false);
            this.leftAnimation(false);   
        }
        
    }

    leave() {
        if (this.active) {
            this.rightAnimation(false);
            this.leftAnimation(false);
        }

        this.active = false;
    }

    rightAnimation(on) {
        // activate respective animation
        if (this.animationRight) {
            if (on && !this.animationRightPlaying) {
                this.animationRightPlaying = true;
                this.animationRight.play();
            } 

            if (!on && this.animationRightPlaying) {
                this.animationRightPlaying = false;
                this.animationRight.stop();
            }
        }
    }

    leftAnimation(on) {
        // activate respective animation
        if (this.animationLeft) {
            if (on && !this.animationLeftPlaying) {
                this.animationLeftPlaying = true;
                this.animationLeft.play();
            } 

            if (!on && this.animationLeftPlaying) {
                this.animationLeftPlaying = false;
                this.animationLeft.stop();
            }
        }
    }

}