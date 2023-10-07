import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { InteractionManager } from 'three.interactive';

import sunTexture from "../img/sun.jpg";

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
console.log(container);

// const renderer = new THREE.WebGLRenderer();
// renderer.setPixelRatio(window.devicePixelRatio);
// renderer.setSize(window.innerWidth, window.innerHeight);
// container.appendChild(renderer.domElement);
const planetDiv = document.getElementById('planet');
console.log(planetDiv);

const renderer = new THREE.WebGLRenderer();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(planetDiv.clientWidth, planetDiv.clientHeight); // Use o tamanho da div "planet"
planetDiv.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
// const camera = new THREE.OrthographicCamera(

// );
camera.position.set(0,0,5);

const orbit = new OrbitControls(camera, renderer.domElement);
orbit.update();
const interactionManager = new InteractionManager(
  renderer,
  camera,
  renderer.domElement
);

// const backgroundGeometry = new THREE.PlaneGeometry(100, 100); // Tamanho do plano de fundo
// const backgroundMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff }); // Azul, por exemplo
// const backgroundPlane = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
// scene.add(backgroundPlane);

const geometry = new THREE.BoxGeometry(1,1,1,);
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

// const cube = new THREE.Mesh(geometry, material);
// cube.addEventListener('mouseover', (event) => {
//   console.log("Cheguei aqui")
//   event.target.material.color.set(0xff0000);
//   document.body.style.cursor = 'pointer';
// });
// cube.addEventListener('mouseout', (event) => {
//   event.target.material.color.set(0xffffff);
//   document.body.style.cursor = 'default';
// });
// cube.addEventListener('mousedown', (event) => {
//   event.target.scale.set(1.1, 1.1, 1.1);
// });
// cube.addEventListener('click', (event) => {
//   event.target.scale.set(1.0, 1.0, 1.0);
// });

// const z = document.createElement('div'); // Crie um elemento div para conter o cubo
// z.style.width = '600px'; // Defina a largura desejada para o contêiner (ajuste conforme necessário)
// z.style.height = '600px'; // Defina a altura desejada para o contêiner (ajuste conforme necessário)
// z.style.position = 'relative'; // Defina a posição como relativa
// document.body.appendChild(z); // Adicione o contêiner "z" ao corpo do documento

// scene.add(cube);
// interactionManager.add(cube);

const animate = (time) => {
  requestAnimationFrame(animate);
  cube.rotation.y+= 0.01;
  interactionManager.update();

  renderer.render(scene, camera);
};

animate();