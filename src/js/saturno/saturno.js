import { createPlanete } from "../planeta/planeta";
import saturnTexture from "../img/saturn.jpg";

const saturn = createPlanete(10, saturnTexture, 160, 0, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});

export { saturn };