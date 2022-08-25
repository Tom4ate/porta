import Entyti from './entytis/entyti';
import Player from './entytis/player';
import BaseLight from './entytis/BaseLight';
import BaseMap from './entytis/BaseMap';
import playerData from './database/player';
import mapsData from './database/maps';
import lightsData from './database/lights';
import * as THREE from 'three';

var red = 0xf40404;
var blue = 0x40df4;
var green = 0x4f41b;
var gray = 0xcccccc;

export default class Store {
    
    constructor(app) {
        // this.player = {}
        // this.map = {}
        this.entytis = this.loadDatabase(app,{
            player: playerData,
            maps: mapsData,
            lights: lightsData
        });
    }

    loadDatabase(app,objects) {
        let result = {};

        for (let type in objects) {
            let fetchFunc = objects[type];   
            let data = fetchFunc();

            result[type] = [];

            if(data.length) {
                for (let i = 0; i < data.length; i++) {
                    let entyti = data[i];
                    result[type].push(this.bootEntyti(app,entyti));
                }
            } else {
                result[type].push(this.bootEntyti(app,data));
            }
            
        }

        return result;
    }
    
    getMap() {
        return this.map;
    }
    
    getPlayer() {
        return this.entytis["player"][0];
    }
    
    getEntytis() {
        let entytis = this.entytis;
        let responce = [];

        for(let type in entytis) {
            for (let i = 0; i < entytis[type].length; i++) {
                responce.push(entytis[type][i])                
            }
        }

        return responce;
    }
    
    bootEntyti(app,data) {
        switch(data.entyti_type) {
            case "player":
                return new Player(app,data);
            case "ambient-light":
                return new BaseLight(app,data);
            case "base-map":
                return new BaseMap(app,data);
            default:
                return new Entyti(app,data);
        }
        // new Entyti(entyti)
    }
}