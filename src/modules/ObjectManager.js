import { FBXLoader } from '../utils/jsm/loaders/FBXLoader.js';
import * as THREE from 'three';

export default class ObjectManager {

	constructor(app) {
		this.app = app;
	}

	loadFile(type,path,{ scale }) {
		return new Promise((resolve, reject) => {		
			let loader = null;

			// find the loader 
			switch(type) {
			    case "fbx":
			        loader = new FBXLoader();
			        break;
			    default:
			        return;
			}

			// make a https request for the file
			loader.load( path, (mesh) => {

			    // resize
			    if(scale) {
			        mesh.scale.setLength(scale);
			    }

			    // Aplay the default values

			    // rotation
			    // if(this.rotation && chengebleMesh) {
			        // chengebleMesh.setRotationFromEuler(this.rotation);
			    // }

			    const quaternion = mesh.quaternion;
			    
			    // position
			    // if(this.postion) {
			        // mesh.position = postionVector;
			    // }
			    const position = mesh.position;

			    // add to the scene
			    let id = this.app.addToMap( mesh , this.name );
			    // app.addAnimations(mesh ,id, this.name);

			    resolve({
			    	id,
			    	quaternion,
			    	position,
			    	mesh
				});
			});
		})
	}

	loadAnimations(mesh) {
	    const mixer = new THREE.AnimationMixer( mesh );
	    let animations = [];

	    // load all mesh animations
	    for (let index = 0; index < mesh.animations.length; index++) {
	    	const animation = mesh.animations[index];
            const animationAction = mixer.clipAction( animation );

            // enebled and return to entity
            animationAction.enabled = true;
            animations.push(animationAction);
	    }

	    return {mixer, animations};
	}
}