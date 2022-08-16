import * as THREE from 'three';

import { OrbitControls } from './utils/jsm/controls/OrbitControls';

import Stats from './utils/jsm/libs/stats.module.js';
import { GUI } from './utils/jsm/libs/dat.gui.module.js';


export default class DebugController {
    constructor() {
        this.stats = null;
    }

    createPanel() {

        const panel = new GUI( { width: 310 } );

        // const folder1 = panel.addFolder( 'Visibility' );
        // const folder2 = panel.addFolder( 'Activation/Deactivation' );
        // const folder3 = panel.addFolder( 'Pausing/Stepping' );
        // const folder4 = panel.addFolder( 'Crossfading' );
        // const folder5 = panel.addFolder( 'Blend Weights' );
        // const folder6 = panel.addFolder( 'General Speed' );

        // settings = {
        //     'show model': true,
        //     'show skeleton': false,
        //     'deactivate all': deactivateAllActions,
        //     'activate all': activateAllActions,
        //     'pause/continue': pauseContinue,
        //     'make single step': toSingleStepMode,
        //     'modify step size': 0.05,
        //     'from walk to idle': function () {

        //         prepareCrossFade( walkAction, idleAction, 1.0 );

        //     },
        //     'from idle to walk': function () {

        //         prepareCrossFade( idleAction, walkAction, 0.5 );

        //     },
        //     'from walk to run': function () {

        //         prepareCrossFade( walkAction, runAction, 2.5 );

        //     },
        //     'from run to walk': function () {

        //         prepareCrossFade( runAction, walkAction, 5.0 );

        //     },
        //     'use default duration': true,
        //     'set custom duration': 3.5,
        //     'modify idle weight': 0.0,
        //     'modify walk weight': 1.0,
        //     'modify run weight': 0.0,
        //     'modify time scale': 1.0
        // };

        // folder1.add( settings, 'show model' ).onChange( showModel );
        // folder1.add( settings, 'show skeleton' ).onChange( showSkeleton );
        // folder2.add( settings, 'deactivate all' );
        // folder2.add( settings, 'activate all' );
        // folder3.add( settings, 'pause/continue' );
        // folder3.add( settings, 'make single step' );
        // folder3.add( settings, 'modify step size', 0.01, 0.1, 0.001 );
        // crossFadeControls.push( folder4.add( settings, 'from walk to idle' ) );
        // crossFadeControls.push( folder4.add( settings, 'from idle to walk' ) );
        // crossFadeControls.push( folder4.add( settings, 'from walk to run' ) );
        // crossFadeControls.push( folder4.add( settings, 'from run to walk' ) );
        // folder4.add( settings, 'use default duration' );
        // folder4.add( settings, 'set custom duration', 0, 10, 0.01 );
        // folder5.add( settings, 'modify idle weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {

        //     setWeight( idleAction, weight );

        // } );
        // folder5.add( settings, 'modify walk weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {

        //     setWeight( walkAction, weight );

        // } );
        // folder5.add( settings, 'modify run weight', 0.0, 1.0, 0.01 ).listen().onChange( function ( weight ) {

        //     setWeight( runAction, weight );

        // } );
        // folder6.add( settings, 'modify time scale', 0.0, 1.5, 0.01 ).onChange( modifyTimeScale );

        // folder1.open();
        // folder2.open();
        // folder3.open();
        // folder4.open();
        // folder5.open();
        // folder6.open();

        // crossFadeControls.forEach( function ( control ) {

        //     control.classList1 = control.domElement.parentElement.parentElement.classList;
        //     control.classList2 = control.domElement.previousElementSibling.classList;

        //     control.setDisabled = function () {

        //         control.classList1.add( 'no-pointer-events' );
        //         control.classList2.add( 'control-disabled' );

        //     };

        //     control.setEnabled = function () {

        //         control.classList1.remove( 'no-pointer-events' );
        //         control.classList2.remove( 'control-disabled' );

        //     };

        // } );

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