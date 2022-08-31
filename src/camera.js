import * as THREE from 'three';
import { OrbitControls } from './utils/jsm/controls/OrbitControls';

export default class CameraControl {
    constructor(app) {
        this.app = app;
        this.camera = app.camera;
        this.render = app.render;
        this.mode = "none";
        this.controls = null;
        this.target = null;
        this.currentPosition = new THREE.Vector3(0,0,0);
        this.currentLookat = new THREE.Vector3(0,0,0);
        this.idealOffset = {x: -1.3 ,y: 5.07 ,z: -5.5 }
        this.idealLookat = {x: -2.6 ,y: 5 ,z: 20 }
    }

    update(timeElapsed) {
        switch(this.mode) {
            case "playerFollow":
                this.updatePlayerCamera(timeElapsed);
                break;
        }
    }

    setMode(mode) {
        this.mode = mode;

        switch (mode) {
            case "orbit": 
                let controls = this.createOrbitControl(this.app.renderer.domElement);
                this.controls = controls;
                
                break;
            case "playerFollow": 
                this.createPlayerControll();
                break;
        }
    }

    createOrbitControl(domElement) {
        let controls = new OrbitControls(this.camera, domElement);
        controls.target.set(0, 1, 0);
        
        controls.listenToKeyEvents( window ); // optional
        
        controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
        controls.dampingFactor = 0.05;
        
        controls.screenSpacePanning = false;
        
        controls.minDistance = 0.1;
        controls.maxDistance = 500;
        
        controls.maxPolarAngle = Math.PI / 2;
        
        controls.update();

        // alredy animated on app
        // function animate() {
        //     requestAnimationFrame( animate );
        //     controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
        //     app.render();
        // }
        // animate();

        return controls;
    }

    createPlayerControll() {
        // atualiza a posição da camera
        let player = this.app.store.getPlayer();
        this.target = player;
    }

    updatePlayerCamera(timeElapsed) {
        if(!this.target.position){ return; }
        
        let idealOffset = this.CalculateIdealOffset();
        let idealLookat = this.CalculateIdealLookat();
        
        // let t = 0.05;
        // let t = 4.0 * timeElapsed;
        let t = 1.0 - Math.pow(0.01, timeElapsed);

        // console.log("Offset",{x:idealOffset.x,y:idealOffset.y,z:idealOffset.z});
        // console.log("Lookat",{x:idealLookat.x,y:idealLookat.y,z:idealLookat.z});

        // console.log({t,timeElapsed});
        // console.log("this.currentPosition",{x:this.currentPosition.x,y:this.currentPosition.y,z:this.currentPosition.z})
        // console.log("this.currentLookat",{x:this.currentLookat.x,y:this.currentLookat.y,z:this.currentLookat.z})

        this.currentPosition.lerp(idealOffset, t);
        this.currentLookat.lerp(idealLookat, t);

        // console.log("this.currentPosition",this.currentPosition)
        // console.log("this.currentLookat",this.currentLookat)

        // console.log("this.currentPosition",{x:this.currentPosition.x,y:this.currentPosition.y,z:this.currentPosition.z})
        // console.log("this.currentLookat",{x:this.currentLookat.x,y:this.currentLookat.y,z:this.currentLookat.z})

        this.camera.position.copy(this.currentPosition);
        this.camera.lookAt(this.currentLookat);
    }
    
    CalculateIdealOffset() {
        let idealOffset = new THREE.Vector3(this.idealOffset.x, this.idealOffset.y, this.idealOffset.z);
        idealOffset.applyQuaternion(this.target.quaternion);
        idealOffset.add(this.target.position);

        // let terrain = this.FindEntity('terrain').GetComponent('TerrainChunkManager');
        // idealOffset.y = Math.max(idealOffset.y, terrain.GetHeight(idealOffset)[0] + 5.0);

        return idealOffset;
    }

    CalculateIdealLookat() {
        let idealLookat = new THREE.Vector3(this.idealLookat.x, this.idealLookat.y, this.idealLookat.z);
        idealLookat.applyQuaternion(this.target.quaternion);
        idealLookat.add(this.target.position);
        return idealLookat;
    }
    
    setPosition(x,y,z) {
        this.camera.position.set( x,y,z );
    }

    setUpDebugger(folder) {
        let positionFolder = folder.addFolder("Position and direction");

        let Ox = this.idealOffset.x;
        let Oy = this.idealOffset.y;
        let Oz = this.idealOffset.z;
        let Lx = this.idealLookat.x;
        let Ly = this.idealLookat.y;
        let Lz = this.idealLookat.z;
        
        let settings = {
            "offset step x" : Ox,
            "offset step y" : Oy,
            "offset step z" : Oz,
            "lookat step x" : Lx,
            "lookat step y" : Ly,
            "lookat step z" : Lz,
        }
        positionFolder.add( settings, "offset step x",Ox - 20,Ox + 20, 0.001).onChange(this.setUpdater("offset","x"));
        positionFolder.add( settings, "offset step y",Oy - 20,Oy + 20, 0.001).onChange(this.setUpdater("offset","y"));
        positionFolder.add( settings, "offset step z",Oz - 20,Oz + 20, 0.001).onChange(this.setUpdater("offset","z"));
        positionFolder.add( settings, "lookat step x",Lx - 20,Lx + 20, 0.001).onChange(this.setUpdater("lookat","x"));
        positionFolder.add( settings, "lookat step y",Ly - 20,Ly + 20, 0.001).onChange(this.setUpdater("lookat","y"));
        positionFolder.add( settings, "lookat step z",Lz - 20,Lz + 20, 0.001).onChange(this.setUpdater("lookat","z"));
    }
    
    setUpdater(type,axle) {
        let prop = type === "lookat" ? "idealLookat" : "idealOffset" ;
        
        return (value) => {
            this[prop][axle] = value;
        }
    }

}