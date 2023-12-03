import "./style.css"
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

//Scene Mesh Camera Render

//Scene
const scene = new THREE.Scene();

//lights
const ambientLight = new THREE.AmbientLight(0xffffff,0.5);
const pointLight = new THREE.PointLight(0xffffff,0.5);
pointLight.position.set(2,2,2);
scene.add(ambientLight, pointLight);

//texture
const textureLoader = new THREE.TextureLoader();
const particlesTexture = textureLoader.load("./texture/snow2.png")

//Mesh
const geometry = new THREE.BufferGeometry(0.2,0.2);
const verticesAmount = 10000;
const positionArray = new Float32Array(verticesAmount * 3); // on a besoin de 3000 slots car x,y,z x 1000
for(let i = 0; i < verticesAmount * 3; i++){
    positionArray[i] = (Math.random() - 0.5) * 4;
}
geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3));

const material = new THREE.PointsMaterial({map: particlesTexture});
material.size = 0.02;
material.transparent = true;
/*material.alphaTest = 0.05;*/
material.depthTest = false;
const points = new THREE.Points(geometry, material);
scene.add(points);

//camera
const aspect = {
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,aspect.width/aspect.height, 0.01, 100);
camera.position.z = 0;
scene.add(camera);

//renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(aspect.width, aspect.height);
renderer.setClearColor("rgb(198,223,243)");

//rotation caméra
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enableZoom = false;
controls.enableRotate = false;



//clock
const clock = new THREE.Clock();

//animation
const animate = function(){
    //activer la rotation caméra
    controls.update();
    
    //GetElapsedTime
    const elapsedTime = clock.getElapsedTime();

    //animate particles
    /*camera.rotation.y = elapsedTime * 0.1;*/
    camera.rotation.x = elapsedTime * 0.05;

    

    //Update Rotation on X Axis
    /*mesh.rotation.x = elapsedTime * 0.5;*/

    //Renderer
    renderer.render(scene,camera);

    //RequestAnimationFrame
    window.requestAnimationFrame(animate);

    
}
animate();