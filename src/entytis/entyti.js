import * as THREE from 'three';

// gltf

// import { GLTFLoader } from '../utils/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from '../utils/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from '../utils/jsm/utils/RoughnessMipmapper.js';

// fbx

import { FBXLoader } from '../utils/jsm/loaders/FBXLoader.js';

export default class Entyti {
    constructor (app, { name, loaderType, fileName, filePath, scale, actions, position, rotation, moveable, rotationSpeed, animated, animations }) {
        this.app = app;
        this.name = name;
        this.mesh = null;
        this.loaderType = loaderType;
        this.fileName = fileName;
        this.filePath = filePath;
        this.scale = scale;
        this.actionsList = actions || [];
        this.actions = {};
        this.activeAction = null;
        this.position = position;
        this.rotation = rotation;
        this.moveable = moveable ;
        this.animated = animated ;
        this.animationList = animations;
        this.animations = {};
        this.mixer = null;
        this.folders = null;
        
        if  (this.moveable) {
            this.stateMachine = {
                activeState: "idle",
                movement: {
                    idle: true,
                    front: false,
                    back: false,
                    left: false,
                    right: false,
                    speedVector: new THREE.Vector3(0,0,0),
                    walkAceleretion: new THREE.Vector3(1, 0.25, 7.5),
                    runAceleretion: new THREE.Vector3(0,2,0),
                    vectorsList: [],
                }
            }
            this.rotationSpeed = rotationSpeed || Math.PI / 40 ;
            this.decceleration = new THREE.Vector3(-0.0005, -0.0001, -5.0);

        }
        
    }

    load(app) {

        if(this.loaderType && this.fileName) {
            let loader = null;    
            let filePath = "";
            let onload = (mesh) => {
                this.onLoadFile(mesh,app,this);
            }

            // verifica o formato
                // carrega o loader nessesario
            switch(this.loaderType) {
                case "fbx":
                    loader = new FBXLoader();
                    filePath = this.filePath;
                    break;
                default:
                    return;
            }

            // requery o arquivo
            loader.load(filePath + '/' + this.fileName, onload );
        }

        if(this.actionsList.length) {
            for (let index = 0; index < this.actionsList.length; index++) {
                let action = this.actionsList[index];

                if(action.trigger) {
                }

                if(action.keyControl) {

                    app.keyBordController.addEvent(action.keyControl.event,{key: action.keyControl.key },()=>{
                        if(this[action.keyControl.function]){
                            this[action.keyControl.function]();
                        }
                    })

                }
                
            }
        }
        
        app.addEntyti( this );
    }

    addToPanel(app) {
        let panelConfig = this.getPanelConfig();
        app.DebugController.addEntyti({ entyti: this, panelConfig });
    }

    getPanelConfig() {
        return {
            transform: true
        };
    }

    addToScene( item ) {
        this.app.scene.add( item );
    }

    onLoadFile(mesh,app) {

        let chengebleMesh = mesh;

        // scale
        if(this.scale) {
            mesh.scale.setLength(this.scale);
        }

        // rotation
        // if(this.rotation && chengebleMesh) {
            // chengebleMesh.setRotationFromEuler(this.rotation);
        // }

        // this.rotation = chengebleMesh.rotation;
        this.quaternion = mesh.quaternion;
        
        // position
        if(this.postion) {
            // chengebleMesh.position = postionVector;
        }

        this.position = mesh.position;

        // this.mesh = mesh;
        
        // add to the scene
        let id = app.addToMap( mesh , this.name );
        // app.addAnimations(mesh ,id, this.name);
        
        if(this.animated) {
            
            let mixer = new THREE.AnimationMixer( mesh );
            this.mixer = mixer;

            for (let index = 0; index < this.animationList.length; index++) {
                let animation = this.animationList[index];
                
                if(animation._self !== undefined) {
                    
                    let animationAction = mixer.clipAction( mesh.animations[animation._self] );
                    animationAction.enabled = true;
                    this.animations[animation.name] = animationAction;
                    
                } else {
                
                    let filePath = null;
                    let loader = null;
    
                    switch(animation.loaderType) {
                        case "fbx":
                            loader = new FBXLoader();
                            filePath = animation.filePath;
                            break;
                        default:
                            return;
                    }
                    
                    loader.load(filePath + '/' + animation.fileName, (animationloaded) => {
    
                        animationloaded.scale.setScalar(this.scale);
                        
                        let animationAction = mixer.clipAction( animationloaded.animations[0] );
                        animationAction.enabled = true;
                        this.animations[animation.name] = animationAction;
    
                    } );
    
                }                
                
            }

        }
        
    }

    _update(timeInSeconds,deltaSeconds){
        if(this.activeAction){
            this[this.activeAction](timeInSeconds,deltaSeconds);
        }

        if(this.moveable) {
            this.updateMovement(timeInSeconds,deltaSeconds);
        }
        
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