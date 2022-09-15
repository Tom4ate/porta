import BaseMachine from '../BaseMachine.js'

export default class CharacterMachine extends BaseMachine {

	// constructor() {}

	update() {
		
	}

	updateMovement(timeInSeconds,deltaSeconds) {
	    // vectors calculation

	    // self movement 
	    if(this.stateMachine && this.position) {
	        
	        let speed = this.stateMachine.movement.speedVector;
	        let decceleration = this.decceleration;

	        let frameDecceleration = new THREE.Vector3(
	            speed.x * decceleration.x,
	            speed.y * decceleration.y,
	            speed.z * decceleration.z
	        );
	        frameDecceleration.multiplyScalar(timeInSeconds);
	        frameDecceleration.z = Math.sign(frameDecceleration.z) * Math.min(
	            Math.abs(frameDecceleration.z), Math.abs(speed.z));

	        speed.add(frameDecceleration);

	        let _Q = new THREE.Quaternion();
	        let _A = new THREE.Vector3();
	        let _R = this.quaternion.clone();                    

	        let walkAceleretion = this.stateMachine.movement.walkAceleretion;
	        let acc = walkAceleretion.clone();

	        // if (this._input._keys.shift) {
	        //     acc.multiplyScalar(2.0);
	        // }

	        // if (this._stateMachine._currentState.Name == 'dance') {
	        //     acc.multiplyScalar(0.0);
	        // }
	        
	        // quarternius corretion

	        if (this.stateMachine.movement.front) {
	            speed.z += acc.z * timeInSeconds;
	        }

	        if (this.stateMachine.movement.back) {
	            speed.z -= acc.z * timeInSeconds;
	        }

	        if (this.stateMachine.movement.left) {
	            _A.set(0, 1, 0);
	            _Q.setFromAxisAngle(_A, 4.0 * Math.PI * timeInSeconds * walkAceleretion.y);
	            _R.multiply(_Q);
	        }

	        if (this.stateMachine.movement.right) {
	            _A.set(0, 1, 0);
	            _Q.setFromAxisAngle(_A, 4.0 * -Math.PI * timeInSeconds * walkAceleretion.y);
	            _R.multiply(_Q);
	        }

	        this.quaternion.copy(_R);

	        const forward = new THREE.Vector3(0, 0, 1);
	        forward.applyQuaternion(this.quaternion); 
	        forward.normalize();

	        const sideways = new THREE.Vector3(1, 0, 0);
	        sideways.applyQuaternion(this.quaternion);
	        sideways.normalize();

	        sideways.multiplyScalar(speed.y * timeInSeconds);
	        forward.multiplyScalar(speed.z * timeInSeconds);

	        this.position.add(forward);
	        this.position.add(sideways);

	    }

	    this.updateAnimation(deltaSeconds);
	    
	}
	
	walkFowerd(){ 
	    if(this.moveable) {
	        this.animations.walk.play()
	        // this.animations.idle.stop()
	        this.stateMachine.movement.front = true;
	    }
	}

	walkBackwards(){ 
	    if(this.moveable) {
	        this.stateMachine.movement.back = true;
	    }
	}

	turnLeft(){ 
	    if(this.moveable) {
	        this.stateMachine.movement.left = true;
	    }
	}

	turnRight(){ 
	    if(this.moveable) {
	        this.stateMachine.movement.right = true;
	    }
	}

	stopFowerd(){ 
	    if(this.moveable) {
	        this.animations.walk.stop()
	        // this.animations.idle.play()
	        this.stateMachine.movement.front = false;
	    }
	}

	stopBackwards(){ 
	    if(this.moveable) {
	        this.stateMachine.movement.back = false;
	    }
	}

	stopTurnLeft(){ 
	    if(this.moveable) {
	        this.stateMachine.movement.left = false;
	    }
	}

	stopTurnRight(){ 
	    if(this.moveable) {
	        this.stateMachine.movement.right = false;
	    }
	}

	punch() {
	    // this.animations.punch.play()
	}

	updateAnimation(deltaSeconds) {
	    if(this.mixer) {
	        this.mixer.update( deltaSeconds );
	    }
	}

}