import "./style.css"
import * as THREE from "three"


//Scene Mesh Camera Render

//Scene
const scene = new THREE.Scene();

//texture
const textureLoader = new THREE.TextureLoader();
const colorTexture = textureLoader.load("./texture/coran_bord_de_l_eau_redimensionné.jpg");

//Mesh
const geometry = new THREE.PlaneBufferGeometry(1,1);
const material = new THREE.MeshBasicMaterial();
material.map=colorTexture;
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//camera
const aspect = {
    width:window.innerWidth,
    height:window.innerHeight
}
const camera = new THREE.PerspectiveCamera(75,aspect.width/aspect.height);
camera.position.z = 3;
scene.add(camera);

//renderer
const canvas = document.querySelector(".draw");
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(aspect.width, aspect.height);

//clock
const clock = new THREE.Clock();

//animation
const animate = function(){
    //GetElapsedTime
    const elapsedTime = clock.getElapsedTime();

    //Update Rotation on X Axis
    mesh.rotation.x = elapsedTime * 0.5;

    //Renderer
    renderer.render(scene,camera);

    //RequestAnimationFrame
    window.requestAnimationFrame(animate);
}
animate();