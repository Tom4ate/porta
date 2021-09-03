import * as THREE from 'three';
import CameraController from './camera';
import { DDSLoader } from './loaders/jsm/DDSLoader.js';
import { MTLLoader } from './loaders/jsm/MTLLoader.js';
import { OBJLoader } from './loaders/jsm/OBJLoader.js';

var red = 0xf40404;
var blue = 0x40df4;
var green = 0x4f41b;

export default class App {

    constructor(){
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.objectsRendered = {};
    }
    
    main() {
        console.log("iniciamos o app.",this);

        // start 3d start cene

        this.createScene();
        var cameraControl = new CameraController( this );
        cameraControl.setMode("orbit");
        // cameraControl.setMode("keysControl");
        cameraControl.setPosition(0,1,5);
        this.setupDebug();
        
        // start terrain
        // this.addBasicBox(0,1,1,0,0,0);
        
        const planeVector = new THREE.Vector3(
            1, 0, 1);

        var geometry = new THREE.PlaneGeometry(5,5,5,5);
        var material = new THREE.MeshStandardMaterial({
            color: 0xFFFFFF,
            side: THREE.FrontSide,
            vertexColors: THREE.VertexColors,
        });
        var terrain = new THREE.Mesh( geometry, material );	
        
        terrain.position.add({x: 0, y: 0, z:0 });
        terrain.geometry.rotateX(Math.PI / -2)
        
        // adiciona aos objetos reendenizados
        if(!this.objectsRendered.planes) {
            this.objectsRendered.planes = [];
        }

        this.objectsRendered.planes.push( terrain );
        this.scene.add( terrain );

        let onProgress = ( xhr ) => {
            console.log(xhr);
        }

        let onError = ( e ) => {
            console.log(e);
        }

        const manager = new THREE.LoadingManager();
        manager.addHandler( /\.dds$/i, new DDSLoader() );

        // comment in the following line and import TGALoader if your asset uses TGA textures
        // manager.addHandler( /\.tga$/i, new TGALoader() );
        
        new MTLLoader( manager )
            .setPath( 'models/Trees/' )
            .load( 'Birch_1.mtl', function ( materials ) {

                console.log("jorge?")
                materials.preload();

                new OBJLoader( manager )
                    .setMaterials( materials )
                    .setPath( 'models/obj/male02/' )
                    .load( 'male02.obj', function ( object ) {

                        object.position.y = - 95;
                        scene.add( object );
                        console.log("marcos?")

                    }, onProgress, onError );

            } );
        
        
            
        this.render();
        this.animate();
    }

    animate() {
        let renderer = this.renderer;
        let scene = this.scene;
        let camera = this.camera;
                
        let render = function render () {
            renderer.render( scene, camera );
        };    
        let animate = function animate() {

            requestAnimationFrame( animate );
            render();

        }

    }

    setupDebug(){

        let y = this.addBasicBox(100,0.01,0.01,null,null,null,{ color: red }); // y
        let x = this.addBasicBox(0.01,100,0.01,null,null,null,{ color: green }); // x
        let z = this.addBasicBox(0.01,0.01,100,null,null,null,{ color: blue }); // y

        y.material.visible = false;
        x.material.visible = false;
        z.material.visible = false;
        
        this.wireframe = false;
        this.visibleDebug = false;
        this.debugAxis = { x, y, z }; 
        
        document.addEventListener("keydown",(event) => {
            if(event.key == "w") {
                let keys = Object.keys(this.objectsRendered);
                let value = !this.wireframe;
                this.wireframe = !this.wireframe;

                for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                    let key = keys[keyIndex];
                    
                    for (let index = 0; index < this.objectsRendered[key].length; index++) {
                        let element = this.objectsRendered[key][index];

                        element.material.wireframe = value;
                    }
                }
            }

            if(event.key == "x") {
                let keys = Object.keys(this.debugAxis);
                let value = !this.visibleDebug;
                this.visibleDebug = !this.visibleDebug;

                for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                    
                    this.debugAxis[keys[keyIndex]].material.visible = value;
                }
            }
        });

    }

    render(){
        this.renderer.render( this.scene, this.camera );
    }

    createScene() {

        // camera's value
        let verticalView = 70;
        let frustum = (window.innerWidth / window.innerHeight);
        let nerMax = 0.1;
        let farMax = 500;
        let zPos = 1;

        this.camera = new THREE.PerspectiveCamera( verticalView, frustum, nerMax, farMax );
        this.camera.position.z = zPos;

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0xcccccc );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        document.body.appendChild( this.renderer.domElement );

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
        
        this.scene.add( mesh );
        this.render();

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

        // if	(x === 0 || x) {
        //     mesh.position.x = x;
        // }
        
        // if	(y === 0 || y) {
        //     mesh.position.y = y;
        // }

        // if	(z === 0 || z) {
        //     mesh.position.z = z;
        // }

        if(options.color) {
            material.color.set(options.color)
        }
        
        if(!this.objectsRendered.box) {
            this.objectsRendered.box = [];
        }

        this.objectsRendered.box.push( mesh );
        this.scene.add( mesh );
        this.render();

        return mesh;
    }
    
}