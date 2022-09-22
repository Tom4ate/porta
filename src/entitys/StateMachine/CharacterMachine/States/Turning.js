import State from './BaseState';
import * as THREE from 'three';

export default class TurningState extends State {
    constructor(machine) {
        super(machine);
        // is movement true
        // update player position
    }
    
    verifyState(intents) {
        return intents.left || intents.right;
    }
    
    update( s, t, { speed, rotation, intents }) {
        let acc = this.machine.walkAceleretion.clone();
        let _Q = new THREE.Quaternion();
        let _A = new THREE.Vector3();

        if(!intents.left || !intents.right) {
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
        }
        
    }

}