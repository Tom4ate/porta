import * as THREE from 'three';
import Entity from './entity';

export default class BaseLight extends Entity {

    constructor(app,dataObject) {
        super(app,dataObject);
    }

    load(app) {
        this.createLight();
        super.load(app);
    }

    createLight() {

        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.addToScene( light );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set( 0, 2, 0 );
        this.addToScene( hemiLight );

        // const dirLight = new THREE.DirectionalLight( 0xffffff );
        // dirLight.position.set( 0, 200, 100 );
        // dirLight.castShadow = true;
        // dirLight.shadow.camera.top = 180;
        // dirLight.shadow.camera.bottom = - 100;
        // dirLight.shadow.camera.left = - 120;
        // dirLight.shadow.camera.right = 120;
        // this.scene.add( dirLight );

    }

}