import * as THREE from 'three';
import { OrbitControls } from './utils/jsm/controls/OrbitControls';

export default class CameraControl {
    constructor(camera,render) {
        this._Initialize(camera,render);
    }

    _Initialize(app) {
        this.app = app;
        this.camera = app.camera;
        this.render = app.render;
        this.mode = "none";
        this.speed = 0.1;
    }

    setupControl() {
        // inicia os movimentos da camera 
        let cMov = (index,incrice) => {
            this.speed = 0.1;
            let value = this.camera.position[index] ; 

            if(incrice) {
                value = value + this.speed;
            } else {
                value = value - this.speed;
            }

            this.camera.position[index] = parseFloat(value.toFixed(2));
        }

        let cRot = (index,incrice) => {
            let speed = 0.1;
            let value = this.camera.rotation[index] ; 

            if(incrice) {
                value = value + speed;
            } else {
                value = value - speed;
            }

            this.camera.rotation[index] = parseFloat(value.toFixed(2));
        }
        
        document.addEventListener("keypress",(event) => {
            console.log(event);

            switch (event.key) {
                case "w": cMov("z",false); break;
                case "s": cMov("z",true); break;
                case "a": cMov("x",false); break;
                case "d": cMov("x",true); break;
                case "q": cRot("y",true); break;
                case "e": cRot("y",false); break;
            }

            this.app.render();
        });

    }
    
    setMode(mode) {
        switch (mode) {
            case "orbit": 
                this.mode = "orbit";
                var app = this.app;
                const controls = new OrbitControls(this.camera, this.app.renderer.domElement);
                controls.target.set(0, 0, 0);
                
                controls.listenToKeyEvents( window ); // optional
                
				controls.enableDamping = true; // an animation loop is required when either damping or auto-rotation are enabled
				controls.dampingFactor = 0.05;

				controls.screenSpacePanning = false;

				controls.minDistance = 0.1;
				controls.maxDistance = 500;

				controls.maxPolarAngle = Math.PI / 2;

                controls.update();

                function animate() {

                    requestAnimationFrame( animate );
    
                    controls.update(); // only required if controls.enableDamping = true, or if controls.autoRotate = true
    
                    app.render();
                }

                animate();

                break;
            case "keysControl": 
                this.setupControl();
                break;
        }
    }

    setPosition(x,y,z) {
        this.camera.position.set( x,y,z );
    }

}