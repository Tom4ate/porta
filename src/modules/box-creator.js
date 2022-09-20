import * as THREE from 'three';

export default class addBasicBox {

    constructor(app) {
        this.renderer = null;

    }
    
    addNormalBox( height = null,width = null,depth = null, x = null, y = null, z = null, options = null ) {
        let color = false; 

        // default box
        if(!options) {
            options = {};
        }

        // 0.2, 0.2, 0.2
        var geometry = new THREE.BoxGeometry( width, height, depth );
        var material = new THREE.MeshNormalMaterial();
        var mesh = new THREE.Mesh( geometry, material );	

        if	(x === 0 || x) {
            mesh.position.x = x;
        }
        
        if	(y === 0 || y) {
            mesh.position.y = y;
        }

        if	(z === 0 || z) {
            mesh.position.z = z;
        }

        if(options.color) {
            // console.log(material.color,mesh.color);
            // material.color.set(options.color);
        }

        return mesh
    }
    
    addBasicBox( height = null,width = null,depth = null, x = null, y = null, z = null, options = null ) {

        // default box
        if(!options) {
            options = {};
        }

        // 0.2, 0.2, 0.2
        var geometry = new THREE.BoxGeometry( width, height, depth );
        var material = new THREE.MeshBasicMaterial(options);
        var mesh = new THREE.Mesh( geometry, material );	

        if	(x === 0 || x) {
            mesh.position.x = x;
        }
        
        if	(y === 0 || y) {
            mesh.position.y = y;
        }

        if	(z === 0 || z) {
            mesh.position.z = z;
        }

        if(options.color) {
            material.color.set(options.color)
        }

        return mesh;
    }

    createNoisedBox() {

        var terrainShape = new THREE.Shape();

        terrainShape.moveTo( 0,  0 );

        // terrainShape.bezierCurveTo( 1,  1, 1, 0, 0, 0 );

        console.log(terrainShape);
        
        var geometry = new THREE.ShapeGeometry( terrainShape );
        var material = new THREE.MeshBasicMaterial({
            color: red,
            // side: THREE.FrontSide,
            // vertexColors: THREE.VertexColors,
        });
        var terrain = new THREE.Mesh( geometry, material );	
        
        terrain.receiveShadow = true;
        terrain.position.add({x: 0, y: 0, z:0 });
        terrain.geometry.rotateX(Math.PI / -2)

        console.log("terrain",terrain)
        
        this.addToMap( terrain, "planes" );
    }

}