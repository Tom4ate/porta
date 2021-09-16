import * as THREE from 'three';
import CameraController from './camera';
import Store from './store';
import BoxCreator from './box-creator';
import keyBordController from './keybord-controller';

var red = 0xf40404;
var blue = 0x87ceeb;
var green = 0x4f41b;
var gray = 0xcccccc;
const clock = new THREE.Clock();

export default class App {

    constructor(){
        this.camera = null;
        this.scene = null;
        this.renderer = null;
        this.objectsRendered = {};
        this.mixers = [];
        this.entytis = [];
        this.animations = {};
        this.keyBordController = new keyBordController();
        this.store = new Store();
    }
    
    main() {
        console.log("iniciamos o app.",this);
        
        // start 3d start scene
        this.createScene();

        var cameraControl = new CameraController( this );
        cameraControl.setMode("orbit");
        // cameraControl.setMode("keysControl");
        cameraControl.setPosition(0,20,30);
        
        this.setupDebug();
        this.setupTerrain();
        // this.setupSky();
        this.createLight();
        // end 3d scene
        
        // first render
        this.render();

        // load game content
        this.loadPlayer();
        this.loadEntytis();

        // start game loop
        this.animate();
    }

    loadPlayer () {
        var player = this.store.getPlayer();

        player.load( this );
    }
    
    loadEntytis(){
        var entytis = this.store.getEntytis();

        for (let index = 0; index < entytis.length; index++) {
            var entyti = entytis[index];

            entyti.load(this);
        }
    }

    animate() {
        let renderer = this.renderer;
        let scene = this.scene;
        let camera = this.camera;
        let mixers = this.mixers;
        let entytis = this.entytis;
                
        let render = function render () {
            renderer.render( scene, camera );
        };

        var lastSecod = null;
        
        let animate = function animate(t) {

            if(!lastSecod) { lastSecod = t};

            if(entytis.length) {

                let deltaSeconds = clock.getDelta();
                let timeInSecods = (t - lastSecod) * 0.001;

                entytis.map((item) => item._update(timeInSecods,deltaSeconds))
                
            }

            lastSecod = t;
            requestAnimationFrame( animate );
            render();

        }

        animate();
    }

    setupDebug(){

        let boxCreator = new BoxCreator(this);

        let y = boxCreator.addBasicBox(100,0.01,0.01,null,null,null,{ color: red }); // y
        let x = boxCreator.addBasicBox(0.01,100,0.01,null,null,null,{ color: green }); // x
        let z = boxCreator.addBasicBox(0.01,0.01,100,null,null,null,{ color: blue }); // y

        this.addToMap(y,"box");
        this.addToMap(x,"box");
        this.addToMap(z,"box");

        y.material.visible = false;
        x.material.visible = false;
        z.material.visible = false;
        
        this.wireframe = false;
        this.visibleDebug = false;
        this.debugAxis = { x, y, z }; 

        this.keyBordController.addEvent("keydown",{key: 'z'},()=>{
            let keys = Object.keys(this.objectsRendered);
            let value = !this.wireframe;
            this.wireframe = !this.wireframe;

            for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                let key = keys[keyIndex];
                
                for (let index = 0; index < this.objectsRendered[key].length; index++) {
                    let element = this.objectsRendered[key][index];

                    if(element.material) {
                        element.material.wireframe = value;
                    // } else if (element.type = "Group") {
                    //     console.log(element);
                    }
                }
            }
        })

        this.keyBordController.addEvent("keydown",{key: 'x'},() => {
            let keys = Object.keys(this.debugAxis);
            let value = !this.visibleDebug;
            this.visibleDebug = !this.visibleDebug;

            for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                
                this.debugAxis[keys[keyIndex]].material.visible = value;
            }
        })
    }

    setupTerrain() {
                
        // start terrain
        // this.addBasicBox(0,1,1,0,0,0);

        let mapaData = this.store.getMap();

        var x = mapaData.width;
        var y = mapaData.height;

        var geometry = new THREE.PlaneGeometry(x,y,5,5);
        var material = new THREE.MeshBasicMaterial({
            color: mapaData.color,
            // side: THREE.FrontSide,
            // vertexColors: THREE.VertexColors,
        });
        var terrain = new THREE.Mesh( geometry, material );	
        terrain.receiveShadow = true;
        terrain.position.add({x: 0, y: 0, z:0 });
        terrain.geometry.rotateX(Math.PI / -2)
        
        this.addToMap( terrain, "planes" );

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

    addEntyti( entyti ) {
        this.entytis.push( entyti );
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