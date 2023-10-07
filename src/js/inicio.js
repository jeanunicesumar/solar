import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { InteractionManager } from 'three.interactive';
import { animateStar } from "./estrelas/estrelas";
import { sun } from "./sol/sol";
import { mars } from "./marte/marte";

const scene = new THREE.Scene();
const textureLoader = new THREE.TextureLoader();
const camera = new THREE.PerspectiveCamera(
  95,
  window.innerWidth / window.innerHeight,
  0.5,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const interactionManager = new InteractionManager(
    renderer,
    camera,
    renderer.domElement
); 


const orbit = new OrbitControls(camera, renderer.domElement);

function animate() {
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);
animateStar();

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});


interactionManager.add(sun);
interactionManager.add(mars);
// sun.addEventListener('click', (event) => {
//   window.location.href ='teste.html'
// })

interactionManager.update();
export { scene, textureLoader, interactionManager, orbit, camera, renderer, THREE };
