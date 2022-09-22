import Entity from './entity';
import * as THREE from 'three';

export default class BaseMap extends Entity {

    constructor(app,params) {
        super(app,params);
        this.width = params.width;
        this.height = params.height;
        this.color = params.color;
    }

    load(app) {
        this.setupTerrain();
        return super.load(app);
    }

    setupTerrain() {
                
        // start terrain
        // this.addBasicBox(0,1,1,0,0,0);

        var x = this.width;
        var y = this.height;

        var geometry = new THREE.PlaneGeometry(x,y,5,5);
        var material = new THREE.MeshBasicMaterial({
            color: this.color,
            // side: THREE.FrontSide,
            // vertexColors: THREE.VertexColors,
        });
        var terrain = new THREE.Mesh( geometry, material );	
        terrain.receiveShadow = true;
        terrain.position.add({x: 0, y: 0, z:0 });
        terrain.geometry.rotateX(Math.PI / -2)
        
        this.app.addToMap( terrain, "planes" );

    }

    
}