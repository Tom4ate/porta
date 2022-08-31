import * as THREE from 'three';

import { OrbitControls } from './utils/jsm/controls/OrbitControls';

import Stats from './utils/jsm/libs/stats.module.js';
import { GUI } from './utils/jsm/libs/dat.gui.module.js';

var _next_id = 1;

export default class DebugController {
    constructor(app) {
        this.app = app;
        this.stats = null;
        this.baseInspector = null;
        this.entytiFolder = null;
        this.cameraFolder = null;
    }

    getId() {
        return _next_id++;
    }

    createPanel() {
        let options = {
            // ...config,
            width: 310
        };

        const panel = new GUI( options );

        this.baseInspector = {
            panel,
            settings: {
            }
        }
        
        const folderCamera = this.baseInspector.panel.addFolder( 'Player Camera' );
        this.cameraFolder = folderCamera;
        this.app.cameraControl.setUpDebugger(this.cameraFolder);
        
        const folder = this.baseInspector.panel.addFolder( 'All Entitys' );
        this.entytiFolder = folder;

    }

    addEntyti({ entyti, panelConfig }) {
        let entytiName = entyti.name;
        let folder = this.entytiFolder.addFolder( entytiName );
        
        for (let name in panelConfig) {
            folder.add(panelConfig,name);
        }
    }

    showStatus() {
        let stats = new Stats();
        document.body.appendChild( stats.dom );
        this.stats = stats;
    }

    update() {
        if(this.stats) {
            this.stats.update();
        }
    }
    
    createXYZLines() {

        // criam as linhas alciliares 
        // let boxCreator = new BoxCreator(this);

        // let y = boxCreator.addBasicBox(100,0.01,0.01,null,null,null,{ color: red }); // y
        // let x = boxCreator.addBasicBox(0.01,100,0.01,null,null,null,{ color: green }); // x
        // let z = boxCreator.addBasicBox(0.01,0.01,100,null,null,null,{ color: blue }); // y

        // this.addToMap(y,"box");
        // this.addToMap(x,"box");
        // this.addToMap(z,"box");

        // y.material.visible = false;
        // x.material.visible = false;
        // z.material.visible = false;
        
        // this.wireframe = false;
        // this.visibleDebug = false;
        // this.debugAxis = { x, y, z }; 

        // this.keyBordController.addEvent("keydown",{key: 'z'},()=>{
        //     let keys = Object.keys(this.objectsRendered);
        //     let value = !this.wireframe;
        //     this.wireframe = !this.wireframe;

        //     for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
        //         let key = keys[keyIndex];
                
        //         for (let index = 0; index < this.objectsRendered[key].length; index++) {
        //             let element = this.objectsRendered[key][index];

        //             if(element.material) {
        //                 element.material.wireframe = value;
        //             // } else if (element.type = "Group") {
        //             //     console.log(element);
        //             }
        //         }
        //     }
        // })

        // this.keyBordController.addEvent("keydown",{key: 'x'},() => {
        //     let keys = Object.keys(this.debugAxis);
        //     let value = !this.visibleDebug;
        //     this.visibleDebug = !this.visibleDebug;

        //     for (let keyIndex = 0; keyIndex < keys.length; keyIndex++) {
                
        //         this.debugAxis[keys[keyIndex]].material.visible = value;
        //     }
        // })
    }
}