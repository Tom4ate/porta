import * as THREE from 'three';
import CameraController from './modules/camera';
import Store from './modules/store';
import keyBordController from './modules/keybord-controller';
import DebugController from './modules/debug-controller';
// import BoxCreator from './box-creator';
// import { RGBA_ASTC_10x10_Format } from 'three';
// import random from 'random';

var red = 0xf40404;
var blue = 0x87ceeb;
var green = 0x4f41b;
var gray = 0xcccccc;
const clock = new THREE.Clock();

export default class App {

    constructor({ env } = {}){
        this.env = env ?? "dev";
        this.devMode = this.env === "dev";
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.objectsRendered = {};
        this.mixers = [];
        this.entitys = [];
        this.animations = {};
        this.keyBordController = new keyBordController(this);
        this.DebugController = new DebugController(this);
        this.cameraControl = null;
        this.store = new Store(this);
    }

    main() {
        console.log("iniciamos o app.",this);

        // start 3d start scene
        this.createScene();
        this.startInitialCamera();

        // for debbugin
        if(this.devMode) {
            this.setupDebug();
        }

        // first render
        this.render();

        // load game content
        this.loadEntitys();

        // start game loop
        this.animate();
       
    }

    startInitialCamera() {
        let cameraControl = new CameraController( this );
        // cameraControl.setMode("orbit");
        cameraControl.setMode("playerFollow");
        cameraControl.setPosition(0,20,30);

        this.cameraControl = cameraControl;
    }

    render(){
        this.renderer.render( this.scene, this.camera );
    }

    loadEntitys(){
        var entitys = this.store.getEntitys();

        console.log("entitys",entitys);

        for (let index = 0; index < entitys.length; index++) {
            var entity = entitys[index];

            entity.load(this);

            if(this.devMode) {
                entity.addToPanel(this);
            }
        }

    }

    animate() {
        let renderer = this.renderer;
        let scene = this.scene;
        let camera = this.camera;
        let mixers = this.mixers;
        let entitys = this.entitys;
                
        let render = function render () {
            renderer.render( scene, camera );
        };

        let updateAplicationState = () => {
            this.DebugController.update(lastSecod);
            this.cameraControl.update(lastSecod);
        }

        var lastSecod = null;
        
        let animate = function animate(t) {

            if(!lastSecod) { lastSecod = t};

            if(entitys.length) {

                let deltaSeconds = clock.getDelta();
                let timeInSecods = (t - lastSecod) * 0.001;

                entitys.map((item) => item._update(timeInSecods,deltaSeconds))
                
            }

            lastSecod = t;
            requestAnimationFrame( animate );
            updateAplicationState( lastSecod );
            render();

        }

        animate();
    }

    setupDebug(){
        // inicia o painel
        this.DebugController.showStatus();
        this.DebugController.createPanel();
        this.DebugController.createXYZLines();
    }

    addToMap( mesh , type = "others") {
        this.scene.add( mesh );

        // add to renderd objects
        if(!this.objectsRendered[type]) {
            this.objectsRendered[type] = [];
        }

        this.objectsRendered[type].push( mesh );
        this.scene.add( mesh );

        return this.objectsRendered[type].length - 1;
    }

    addEntity( entity ) {
        this.entitys.push( entity );
    }

    addAnimations(mesh,id,type = "others") {

        // add to renderd objects
        if(!this.animations[type]) {
            this.animations[type] = [];
        }

        if(!this.animations[type][id]) {
            this.animations[type][id] = [];
        }

        let mixer = new THREE.AnimationMixer( mesh );

        for (let index = 0; index < mesh.animations.length; index++) {
            this.animations[type][id].push(mixer.clipAction( mesh.animations[index] ));    
        }
        
        this.mixers.push(mixer);
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
        this.scene.background = new THREE.Color( blue );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

        this.renderer.setSize( window.innerWidth, window.innerHeight );
        
        document.body.appendChild( this.renderer.domElement );

    }
    
    createLight() {

        var light = new THREE.AmbientLight( 0x404040 ); // soft white light
        this.scene.add( light );

        const hemiLight = new THREE.HemisphereLight( 0xffffff, 0x444444 );
        hemiLight.position.set( 0, 2, 0 );
        this.scene.add( hemiLight );

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