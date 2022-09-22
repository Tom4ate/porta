import * as THREE from 'three';
import BaseMachine from '../BaseMachine.js'
import Idle from './States/Idle.js'
import Walking from './States/Walking.js'
import Runing from './States/Runing.js'
import Turning from './States/Turning.js'

export default class CharacterMachine extends BaseMachine {

	speedVector = new THREE.Vector3(0,0,0);
	walkAceleretion = new THREE.Vector3(1, 0.25, 7.5);
	runAceleretion = new THREE.Vector3(0,2,0);
	decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);
	rotationSpeed = Math.PI / 40 ;

	constructor(app) {
		super(app);
		this.activeMoveState = new Idle(this);
		this.moveStates = {
			idle: this.activeMoveState,
			walking: new Walking(this),
			runing: new Runing(this),
			turning: new Turning(this),
		};
		this.actionStates = {

		}
	}

	update(s,t) {
		this.updateMovement(s,t);
		this.updateActions(s,t);
	    this.updateAnimation(s);
	}

	// aplay movements states
	updateMovement(s,t) {
		const intents = this.app.inputSystem.getIntents();
		const speed = this.speedVector;
        const rotation = this.entity.quaternion.clone();
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

		// aplay the states

		const forward = new THREE.Vector3(0, 0, 1);
		forward.applyQuaternion(this.entity.quaternion); 
		forward.normalize();

		const sideways = new THREE.Vector3(1, 0, 0);
		sideways.applyQuaternion(this.entity.quaternion);
		sideways.normalize();

		sideways.multiplyScalar(speed.y * s);
		forward.multiplyScalar(speed.z * s);

		this.entity.quaternion.copy(rotation);
		this.entity.position.add(forward);
		this.entity.position.add(sideways);
	}

	updateActions() {}

	updateAnimation(deltaSeconds) {
	    if(this.mixer) {
	        this.mixer.update( deltaSeconds );
	    }
	}

}