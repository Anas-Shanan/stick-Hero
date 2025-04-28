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

export function play(ctx) {
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 3, 130, 0, 2 * Math.PI);

  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "70px Helvetica";
  ctx.textAlign = "center";
  ctx.fillText("PLAY", canvas.width / 2, canvas.height / 3 + 30);
}
