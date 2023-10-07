import * as THREE from 'three';
import { InteractionManager } from 'three.interactive';

function lerTexto(){
  var mensagem = new SpeechSynthesisUtterance();
  var vozes = speechSynthesis.getVoices(17);
  mensagem.text = "Marte - Para quem não quer algo tão radical por ser o planeta que mais vai se assemelhar as condições da terra dentro do sistema solar. Visitar o monte olimpo que é a maior montanha de do sistema solar" +
  "Uma das viagens mais rápidas possíveis para se fazer"
  + "Conhecer como as sondas espaciais enviadas para lá interagem com o planeta"
  + "Andar em um planeta que possui uma energia gravitacional menor que o da Terra, logo sentindo que seu corpo possui menos massa";
  mensagem.voice = vozes[17]; 
  mensagem.lang = "pt-BR";
  mensagem.volume = 0.8; 
  mensagem.rate = 1.5; 
  mensagem.pitch = 0.5; 
  speechSynthesis.speak(mensagem);
 }
 lerTexto();

//  setTimeout(() => {
//   window.speechSynthesis.getVoices().forEach(function(voice) {
//     console.log(voice.name, voice.lang);
//   });
//  }, 5000);


const container = document.createElement('div');
container.setAttribute('id', 'container');
document.body.appendChild(container);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0.0, 0.0, 10.0);

const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial();

const cube = new THREE.Mesh(geometry, material);
cube.addEventListener('mouseover', (event) => {
  event.target.material.color.set(0xff0000);
  document.body.style.cursor = 'pointer';
});
cube.addEventListener('mouseout', (event) => {
  event.target.material.color.set(0xffffff);
  document.body.style.cursor = 'default';
});
cube.addEventListener('mousedown', (event) => {
  event.target.scale.set(1.1, 1.1, 1.1);
});
cube.addEventListener('click', (event) => {
  event.target.scale.set(1.0, 1.0, 1.0);
});
scene.add(cube);
interactionManager.add(cube);

const animate = (time) => {
  requestAnimationFrame(animate);

  interactionManager.update();

  renderer.render(scene, camera);
};

animate();