import Entyti from './entyti';

var red = 0xf40404;
var blue = 0x40df4;
var green = 0x4f41b;
var gray = 0xcccccc;

export default class Store {
    constructor() {
        this.player = {
            name: "player",
            loaderType: "fbx",
            fileName: "Witch.fbx",
            // position: {},
            scale:0.015,
            actions: [
                {
                    name: "stop",
                    keyControl: {
                        key: "w",
                        event: "keyup",
                        function: "stop",
                    },
                },
                {
                    name: "walkFowerd",
                    keyControl: {
                        key: "w",
                        event: "keypress",
                        function: "walkFowerd",
                    },
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