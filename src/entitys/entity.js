import * as THREE from 'three';

// gltf

// import { GLTFLoader } from '../utils/jsm/loaders/GLTFLoader.js';
// import { RGBELoader } from '../utils/jsm/loaders/RGBELoader.js';
// import { RoughnessMipmapper } from '../utils/jsm/utils/RoughnessMipmapper.js';

// fbx

import ObjectManager from '../modules/ObjectManager.js'

export default class Entity {
    constructor (app, { name, loaderType, fileName, filePath, scale, actions, position, rotation, moveable, rotationSpeed, animated, animations, stateMachine }) {
        this.loaded = false;
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
        this.moveable = moveable;
        this.animated = animated;
        this.animations = {};
        this.stateMachine = stateMachine;
        this.mixer = null;
        this.folders = null;
    }

    load(app) {
        return new Promise((resolve,reject) => {

            // attach the state machine to the entity
            if (this.stateMachine) {
                this.stateMachine.entangleEntity(this);
            }

            // load animations and meshes
            if(this.loaderType && this.fileName) {
                const loader = new ObjectManager(app); 
                loader.loadFile(
                    this.loaderType,
                    this.filePath + '/' + this.fileName,
                    {
                        scale: this.scale
                    },
                ).then(
                    ({ quaternion, position, mesh }) => {
                        console.log(mesh);
                        this.quaternion = quaternion;
                        this.position = position;
                        this.mesh = mesh;

                        if(this.animated) {
                            let { animations, mixer } = loader.loadAnimations(mesh)
                            this.mixer = mixer;
                            this.animations = animations;
                        }

                        if (this.stateMachine) {
                            this.stateMachine.entangleActions();
                        }
                        resolve(this);
                    }
                );
            } else {
                resolve(this);
            }
        });
    }

    addToPanel(app) {
        let panelConfig = this.getPanelConfig();
        app.DebugController.addEntity({ entity: this, panelConfig });
    }

    getPanelConfig() {
        return {
            transform: true
        };
    }

    addToScene( item ) {
        this.app.scene.add( item );
    }

    _update(timeInSeconds,deltaSeconds){
        // update entity components

        if(this.stateMachine) {
            this.stateMachine.update(timeInSeconds,deltaSeconds);
        }
        
    }

}