import * as THREE from 'three';
import BaseMachine from '../BaseMachine.js'

export default class CharacterMachine extends BaseMachine {

	speedVector = new THREE.Vector3(0,0,0);
	walkAceleretion = new THREE.Vector3(1, 0.25, 7.5);
	runAceleretion = new THREE.Vector3(0,2,0);
	decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
	rotationSpeed = Math.PI / 40 ;

	update(s,t) {
		const intents = this.app.inputSystem.getIntents();
		// aplay movements states
		const speed = this.speedVector;
		// create decceleration
		const frameDecceleration = new THREE.Vector3(
		    speed.x * this.decceleration.x,
		    speed.y * this.decceleration.y,
		    speed.z * this.decceleration.z
		);
		frameDecceleration.multiplyScalar(s);
		frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
		    Math.abs(frameDecceleration.z), Math.abs(speed.z));
		// aplay decceleration
		speed.add(frameDecceleration);

		let _Q = new THREE.Quaternion();
		let _A = new THREE.Vector3();
		let _R = this.entity.quaternion.clone();                    

		let walkAceleretion = this.walkAceleretion;
		let acc = walkAceleretion.clone();

		// if (this._input._keys.shift) {
		//     acc.multiplyScalar(2.0);
		// }

		// if (this._stateMachine._currentState.Name == 'dance') {
		//     acc.multiplyScalar(0.0);
		// }
		
		// quarternius corretion

		if (intents.forward) {
		    speed.z += acc.z * s;
		}

		if (intents.backward) {
		    speed.z -= acc.z * s;
		}

		if (intents.left) {
		    _A.set(0, 1, 0);
		    _Q.setFromAxisAngle(_A, 4.0 * Math.PI * s * walkAceleretion.y);
		    _R.multiply(_Q);
		}

		if (intents.right) {
		    _A.set(0, 1, 0);
		    _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * s * walkAceleretion.y);
		    _R.multiply(_Q);
		}

		this.entity.quaternion.copy(_R);

		const forward = new THREE.Vector3(0, 0, 1);
		forward.applyQuaternion(this.entity.quaternion); 
		forward.normalize();

		const sideways = new THREE.Vector3(1, 0, 0);
		sideways.applyQuaternion(this.entity.quaternion);
		sideways.normalize();

		sideways.multiplyScalar(speed.y * s);
		forward.multiplyScalar(speed.z * s);

		this.entity.position.add(forward);
		this.entity.position.add(sideways);

		// aplay other interactions
	    this.updateAnimation(deltaSeconds);

	}

	updateAnimation(deltaSeconds) {
	    if(this.mixer) {
	        this.mixer.update( deltaSeconds );
	    }
	}

}