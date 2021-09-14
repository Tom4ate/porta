import * as THREE from 'three';

// gltf

import { GLTFLoader } from './utils/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './utils/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from './utils/jsm/utils/RoughnessMipmapper.js';

// fbx

import { FBXLoader } from './utils/jsm/loaders/FBXLoader.js';

export default class Entyti {
    constructor ({ name, loaderType, fileName, scale, actions, position, rotation }) {
        this.name = name;
        this.mesh = null;
        this.loaderType = loaderType;
        this.fileName = fileName;
        this.scale = scale;
        this.actionsList = actions || [];
        this.actions = {};
        this.activeAction = null;
        this.position = position;
        this.rotation = rotation;
    }

    load(app) {

        if(this.loaderType && this.fileName) {
            var loader = null;    
            var filePath = "";
            let onload = (mesh) => {
                this.onLoadFile(mesh,app,this);
            }

            // verifica o formato
                // carrega o loader nessesario
            switch(this.loaderType) {
                case "fbx":
                    loader = new FBXLoader();
                    filePath = "models/characters/FBX/";
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

    onLoadFile(mesh,app) {

        let chengebleMesh = mesh;
        
        if(mesh.isGroup) { 
            chengebleMesh = mesh.children[1].children[0]; 
        }

        // scale
        if(this.scale) {
            mesh.scale.setLength(this.scale);
        }

        // rotation
        if(this.rotation) {
            // chengebleMesh.rotation = rotationVector;
        }

        this.rotation = chengebleMesh.rotation;
        
        // position
        if(this.postion) {
            // chengebleMesh.position = postionVector;
        }

        this.position = chengebleMesh.position;

        // this.mesh = mesh;
        
        // add to the scene
        let id = app.addToMap( mesh , this.name );
        app.addAnimations(mesh ,id, this.name);
        
    }

    _update(){
        if(this.activeAction){
            this[this.activeAction]();
        }
    }
    
    walkFowerd(){
        this.activeAction = "walkFowerd";
        console.log(this.position.y);
        this.position.setY(this.position.y + 0.1);
        console.log(this.position);
    }

    stop() {
        this.activeAction = null;
        console.log("stop")
    }
    
}