import { canvas } from "./main.js";
import { initCanvases } from "./main.js";
import { initHero } from "./Hero.js";
import { initPlatforms } from "./platform.js";
import { clearSticks } from "./stick.js";
/* import Stick from "./stick.js"; */

//////////// reste function
export function resetGame() {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  initCanvases();
  initPlatforms();
  initHero();
  clearSticks();
  /* Stick.lastStick.resetCollision(); */
}
