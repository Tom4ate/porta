import Entity from '../entitys/entity';
import Player from '../entitys/player';
import BaseLight from '../entitys/BaseLight';
import BaseMap from '../entitys/BaseMap';
import playerData from '../database/player';
import mapsData from '../database/maps';
import lightsData from '../database/lights';
import * as THREE from 'three';

var red = 0xf40404;
var blue = 0x40df4;
var green = 0x4f41b;
var gray = 0xcccccc;

export default class Store {
    
    constructor(app) {
        // this.player = {}
        // this.map = {}
        this.entitys = this.loadDatabase(app,{
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
                    let entity = data[i];
                    result[type].push(this.bootEntity(app,entity));
                }
            } else {
                result[type].push(this.bootEntity(app,data));
            }
            
        }

        return result;
    }
    
    getMap() {
        return this.map;
    }
    
    getPlayer() {
        return this.entitys["player"][0];
    }
    
    getEntitys() {
        let entitys = this.entitys;
        let responce = [];

        for(let type in entitys) {
            for (let i = 0; i < entitys[type].length; i++) {
                responce.push(entitys[type][i])                
            }
        }

        return responce;
    }
    
    bootEntity(app,data) {
        switch(data.entity_type) {
            case "player":
                return new Player(app,data);
            case "ambient-light":
                return new BaseLight(app,data);
            case "base-map":
                return new BaseMap(app,data);
            default:
                return new Entity(app,data);
        }
        // new Entity(entity)
    }
}