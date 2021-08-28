import * as THREE from 'three';

export default class App {

    constructor(){
        this.camera = null;
        this.scene = null;
        this.renderer = null;
    }
    
    main() {

        // var geometry, material, mesh;
        // this.renderer.setAnimationLoop( animation );
        
        console.log("iniciamos o app.",this);

        this.setupControl();
        this.createScene();
        let box1 = this.addBox(0.2,0.2,0.2,0,0,0);

        for (let index = 1; index <= 10; index++) {

            let newBox = this.addBox(0.1,0.1,0.1,0,index,0);
            // console.log(index,newBox);
        }

    }

    render(){
        this.renderer.render( this.scene, this.camera );
    }

    setupControl() {
        // inicia os movimentos da camera 
        let cMov = (index,incrice) => {
            let speed = 0.1;
            let value = this.camera.position[index] ; 

            if(incrice) {
                value = value + speed;
            } else {
                value = value - speed;
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

            this.render();
        });

    }
    
    animation(type, mesh, { time } = {} ) {

        switch (type) {
            case "rotation":
                        
                mesh.rotation.x = time / 2000;
                mesh.rotation.y = time / 1000;

                break;
        
            default:
                break;
        }

    }

    createScene() {

        // camera's value
        let verticalView = 70;
        let frustum = (window.innerWidth / window.innerHeight);
        let nerMax = 0.1;
        let farMax = 40;
        let zPos = 1;

        this.camera = new THREE.PerspectiveCamera( verticalView, frustum, nerMax, farMax );
        this.camera.position.z = zPos;

        this.scene = new THREE.Scene();

        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        document.body.appendChild( this.renderer.domElement );

    }

    addBox( height = null,width = null,depth = null, x = null, y = null, z = null, options = null ) {

        // default box
        if(!options) {
            options = {
                material: "normal"
            }
        }

        // 0.2, 0.2, 0.2
        let geometry = new THREE.BoxGeometry( width, height, depth );
        let material = new THREE.MeshNormalMaterial();
        let mesh = new THREE.Mesh( geometry, material );	

        if	(x === 0 || x) {
            mesh.position.x = x;
        }
        
        if	(y === 0 || y) {
            mesh.position.y = y;
        }

        if	(z === 0 || z) {
            mesh.position.z = z;
        }
        
        this.scene.add( mesh );
        this.render();

        return mesh
    }
    
}