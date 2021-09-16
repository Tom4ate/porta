import Entyti from './entyti';
import * as THREE from 'three';

var red = 0xf40404;
var blue = 0x40df4;
var green = 0x4f41b;
var gray = 0xcccccc;

export default class Store {
    constructor() {
        this.player = {
            name: "player",
            loaderType: "fbx",
            // fileName: "mremireh_o_desbiens.fbx",
            // filePath: "models/",
            fileName: "Witch.fbx",
            filePath: "models/characters/FBX/",
            // position: {},
            scale:0.015,
            moveable: true,
            animated: true,
            rotation: new THREE.Euler(Math.PI / 2,Math.PI,0) ,
            actions: [
                
                {
                    name: "walkFowerd",
                    keyControl: {
                        key: "w",
                        event: "keypress",
                        function: "walkFowerd",
                    },
                },
                {
                    name: "walkBackwards",
                    keyControl: {
                        key: "s",
                        event: "keypress",
                        function: "walkBackwards",
                    },
                },
                
                {
                    name: "turnLeft",
                    keyControl: {
                        key: "a",
                        event: "keypress",
                        function: "turnLeft",
                    },
                },
                
                {
                    name: "turnRight",
                    keyControl: {
                        key: "d",
                        event: "keypress",
                        function: "turnRight",
                    },
                },
                {
                    name: "stopFowerd",
                    keyControl: {
                        key: "w",
                        event: "keyup",
                        function: "stopFowerd",
                    },
                },
                {
                    name: "stopBackwards",
                    keyControl: {
                        key: "s",
                        event: "keyup",
                        function: "stopBackwards",
                    },
                },
                
                {
                    name: "stopTurnLeft",
                    keyControl: {
                        key: "a",
                        event: "keyup",
                        function: "stopTurnLeft",
                    },
                },
                
                {
                    name: "stopTurnRight",
                    keyControl: {
                        key: "d",
                        event: "keyup",
                        function: "stopTurnRight",
                    },
                },
            ],
            animations: [
                {
                    name: "walk",
                    fileName: "Walk.fbx",
                    filePath: "models/animations/",
                    loaderType: "fbx"
                }
            ]
        }

        this.map = {
            width: 200,
            height: 200,
            color: green
        }

        this.entytis = [

        ];
    }

    getMap() {
        return this.map;
    }
    
    getPlayer() {
        return new Entyti(this.player);
    }
    
    getEntytis() {
        let entytis = this.entytis;
        var responce = [];

        for (let index = 0; index < entytis.length; index++) {
            let entyti = entytis[index];
            
            responce.push(new Entyti(entyti));
        }

        return responce;
    }
    
}