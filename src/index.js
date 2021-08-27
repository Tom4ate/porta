import * as THREE from 'three';

var camera, scene, renderer;

var geometry, material, mesh;

function animation( time ) {

	mesh.rotation.x = time / 2000;
	mesh.rotation.y = time / 1000;

	renderer.render( scene, camera );

}

function createScene() {

	camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 40 );
	camera.position.z = 1;

	scene = new THREE.Scene();

	renderer = new THREE.WebGLRenderer( { antialias: true } );
	renderer.setSize( window.innerWidth, window.innerHeight );
	renderer.setAnimationLoop( animation );
	document.body.appendChild( renderer.domElement );

}

function addBox(posx = false,posy = false,posz = false) {

	geometry = new THREE.BoxGeometry( 0.2, 0.2, 0.2 );
	material = new THREE.MeshNormalMaterial();

	mesh = new THREE.Mesh( geometry, material );	

	if	(posx) {
		mesh.position.x = posx;
	}
	
	if	(posy) {
		mesh.position.y = posy;
	}

	if	(posz) {
		mesh.position.z = posz;
	}

	
	scene.add( mesh );

}

function component() {
  const element = document.createElement('div');

  // Lodash, currently included via a script, is required for this line to work
  element.innerHTML = "amorzinho da minha vida";

  return element;
}


createScene();
addBox(0,0,0);
addBox(0,0,0);

console.log(camera);

// document.body.appendChild(component());