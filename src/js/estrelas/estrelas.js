import starsTexture from "../../img/stars.jpg";
import circlePng from "../../img/circle.png";
import { scene, camera, orbit, renderer, THREE } from "../inicio";

let stars, starGeo;

starGeo = new THREE.BufferGeometry();
const starsCount = 6000;

const positions = new Float32Array(starsCount * 3); // Cada estrela tem três coordenadas (x, y, z)
const velocities = new Float32Array(starsCount);
const accelerations = new Float32Array(starsCount);

for (let i = 0; i < starsCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 600; // Coordenada x
  positions[i * 3 + 1] = (Math.random() - 0.5) * 600; // Coordenada y
  positions[i * 3 + 2] = (Math.random() - 0.5) * 600; // Coordenada z

  velocities[i] = Math.random();
  accelerations[i] = 0;
}

starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
starGeo.setAttribute("velocity", new THREE.BufferAttribute(velocities, 1));
starGeo.setAttribute(
  "acceleration",
  new THREE.BufferAttribute(accelerations, 1)
);

let sprite = new THREE.TextureLoader().load(circlePng);
let starMaterial = new THREE.PointsMaterial({
  color: 0xaaaaaa,
  size: 0.7,
  map: sprite,
});

stars = new THREE.Points(starGeo, starMaterial);

scene.add(stars);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);
  
export function animateStar() {
    const positions = starGeo.getAttribute("position");
    const velocities = starGeo.getAttribute("velocity");
    const accelerations = starGeo.getAttribute("acceleration");
  
    positions.set(positions.array);
  
    for (let i = 0; i < positions.count; i++) {
      velocities.array[i] += accelerations.array[i];
      positions.array[i * 3 + 1] -= velocities.array[i];
  
      if (positions.array[i * 3 + 1] < -200) {
        positions.array[i * 3 + 1] = 200;
        velocities.array[i] = 0;
      }
    }
  
    positions.needsUpdate = true;
  
    stars.updateMatrix();
  
    renderer.render(scene, camera);
    requestAnimationFrame(animateStar);
  }