import Entyti from 'porta/src/entytis/entyti';
import playerData from 'porta/database/player';
import mapsData from 'porta/database/maps';
import lightsData from 'porta/database/lights';
import * as THREE from 'three';

var red = 0xf40404;
var blue = 0x40df4;
var green = 0x4f41b;
var gray = 0xcccccc;

export default class Store {
    constructor() {
        // this.player = {}
        // this.map = {}
        this.entytis = this.loadDatabase({
            player: playerData,
            maps: mapsData,
            lights: lightsData
        });
    }

    loadDatabase(objects) {
        let result = {};

        for (let type in objects) {
            let fetchFunc = objects[type];   
            result[type] = fetchFunc();
        }
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