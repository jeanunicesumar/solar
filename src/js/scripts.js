import * as THREE from "three";
import { renderer, interactionManager } from "./inicio";
import { animateStar } from "./estrelas/estrelas";
import { scene, camera } from "./inicio";
import { sun } from "./sol/sol";
import { mars } from "./marte/marte";



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

export { THREE };