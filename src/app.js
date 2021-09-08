import * as THREE from 'three';
import CameraController from './camera';

// gltf

import { GLTFLoader } from './utils/jsm/loaders/GLTFLoader.js';
import { RGBELoader } from './utils/jsm/loaders/RGBELoader.js';
import { RoughnessMipmapper } from './utils/jsm/utils/RoughnessMipmapper.js';

// fbx

import { FBXLoader } from './utils/jsm/loaders/FBXLoader.js';

var red = 0xf40404;
var blue = 0x40df4;
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
        this.animations = {};
    }
    
    main() {
        console.log("iniciamos o app.",this);
        var self = this;
        // start 3d start cene

        this.createScene();
        var cameraControl = new CameraController( this );
        cameraControl.setMode("orbit");
        // cameraControl.setMode("keysControl");
        cameraControl.setPosition(0,4,5);
        this.setupDebug();
        this.setupTerrain();
        // this.setupSky();
        this.createLight();

        this.render();
        this.animate();

        // start the game
        this.fbxLoadModels("charters");

        // Play a specific animation 
        // action.play();
    }

    animate() {
        let renderer = this.renderer;
        let scene = this.scene;
        let camera = this.camera;
        let mixers = this.mixers;
                
        let render = function render () {
            renderer.render( scene, camera );
        };
        
        let animate = function animate() {
            
            if(mixers.length) { 
                let deltaSeconds = clock.getDelta();

                mixers.map((item) => item.update( deltaSeconds ));
            }

            requestAnimationFrame( animate );
            render();

        }

        animate();
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

    setupTerrain() {
                
        // start terrain
        // this.addBasicBox(0,1,1,0,0,0);

        var x = 100;
        var y = 100;

        var geometry = new THREE.PlaneGeometry(x,y,5,5);
        var material = new THREE.MeshBasicMaterial({
            // color: 0x6CD63E,
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
        this.scene.background = new THREE.Color( gray );
        this.renderer = new THREE.WebGLRenderer( { antialias: true } );
        
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1;
        this.renderer.outputEncoding = THREE.sRGBEncoding;

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

    setupSky() {
        var self = this;
        
        new RGBELoader()
        .setPath( 'textures/' )
        .load( 'sky.hdr', function ( texture ) {

            texture.mapping = THREE.EquirectangularReflectionMapping;

            self.scene.background = texture;
            self.scene.environment = texture;

            self.render();
            
        });
    }

    gltfLoadThree(){
        var self = this;
        // use of RoughnessMipmapper is optional
        const roughnessMipmapper = new RoughnessMipmapper( self.renderer );

        const loader = new GLTFLoader().setPath( 'models/birch_1/' );
        loader.load( 'birch_1.gltf', function ( gltf ) {

            gltf.scene.traverse( function ( child ) {

                if ( child.isMesh ) {

                    roughnessMipmapper.generateMipmaps( child.material );

                }

            } );

            self.scene.add( gltf.scene );

            roughnessMipmapper.dispose();

            self.render();

        } );
        
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

    fbxLoadModels(type = null ) {

        var items = [
            "models/characters/FBX/Witch.fbx"
            // "models/characters/FBX/BlueSoldier_Female.fbx","models/characters/FBX/BlueSoldier_Male.fbx",
            // "models/characters/FBX/Casual2_Female.fbx","models/characters/FBX/Casual2_Male.fbx","models/characters/FBX/Casual3_Female.fbx",
            // "models/characters/FBX/Casual3_Male.fbx","models/characters/FBX/Casual_Bald.fbx","models/characters/FBX/Casual_Female.fbx","models/characters/FBX/Casual_Male.fbx",
            // "models/characters/FBX/Chef_Female.fbx","models/characters/FBX/Chef_Hat.fbx","models/characters/FBX/Chef_Male.fbx","models/characters/FBX/Cow.fbx","models/characters/FBX/Cowboy_Female.fbx",
            // "models/characters/FBX/Cowboy_Hair.fbx","models/characters/FBX/Cowboy_Male.fbx","models/characters/FBX/Doctor_Female_Old.fbx","models/characters/FBX/Doctor_Female_Young.fbx",
            // "models/characters/FBX/Doctor_Male_Old.fbx","models/characters/FBX/Doctor_Male_Young.fbx","models/characters/FBX/Elf.fbx","models/characters/FBX/Goblin_Female.fbx","models/characters/FBX/Goblin_Male.fbx",
            // "models/characters/FBX/Kimono_Female.fbx","models/characters/FBX/Kimono_Male.fbx","models/characters/FBX/Knight_Golden_Female.fbx","models/characters/FBX/Knight_Golden_Male.fbx",
            // "models/characters/FBX/Knight_Male.fbx","models/characters/FBX/Ninja_Female.fbx","models/characters/FBX/Ninja_Male.fbx","models/characters/FBX/Ninja_Male_Hair.fbx","models/characters/FBX/Ninja_Sand.fbx",
            // "models/characters/FBX/Ninja_Sand_Female.fbx","models/characters/FBX/OldClassy_Female.fbx","models/characters/FBX/OldClassy_Male.fbx","models/characters/FBX/Pirate_Female.fbx",
            // "models/characters/FBX/Pirate_Male.fbx","models/characters/FBX/Pug.fbx","models/characters/FBX/Soldier_Female.fbx","models/characters/FBX/Soldier_Male.fbx","models/characters/FBX/Suit_Female.fbx","models/characters/FBX/Suit_Male.fbx",
            // "models/characters/FBX/VikingHelmet.fbx","models/characters/FBX/Viking_Female.fbx","models/characters/FBX/Viking_Male.fbx","models/characters/FBX/Witch.fbx","models/characters/FBX/Wizard.fbx","models/characters/FBX/Worker_Female.fbx",
            // "models/characters/FBX/Worker_Male.fbx","models/characters/FBX/Zombie_Female.fbx","models/characters/FBX/Zombie_Male.fbx"
        ];

        // var items = [
        //     "models/monster/FBX/Bat.fbx","models/monster/FBX/Dragon.fbx","models/monster/FBX/Skeleton.fbx","models/monster/FBX/Slime.fbx"
        // ];

        var self = this;
        var loader = new FBXLoader();
                            
        var x = 0;
        var z = 0;

        for (let index = 0; index < items.length; index++) {

            var item = items[index];
            
            loader.load(item,function(object) {
                let pos = { x: x * 2 , z: z * - 2 };

                object.position.setZ(pos.z);
                object.position.setX(pos.x);
                object.scale.setLength(0.015);
                let id = self.addToMap( object , "items" );
                self.addAnimations(object ,id,"items");
                
                if(z > 10){
                    z = 0;
                    x++;
                } else {    
                    z++;
                }
                
            });
                            
        }
    }
}