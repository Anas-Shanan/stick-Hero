import { canvas, initCanvases, holdText, camera } from "./main.js";

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
  holdText();
  /* Stick.lastStick.resetCollision(); */
}

export function play(ctx) {
  ctx.clearRect(0, 0, canvas.width + camera.x, canvas.height);

  ctx.save();

  // Reset any transformations to draw in screen coordinates
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.fillStyle = "white";
  ctx.fontWeight = "bold";
  ctx.font = "140px Verdana, Trebuchet MS, sans-serif";

  ctx.fillText("STICK", canvas.width / 2 - 210, canvas.height * 0.15);
  ctx.fillText("HERO", canvas.width / 2 - 210, canvas.height * 0.27);

  /// the play button
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 110, 0, 2 * Math.PI);

  ctx.fill();

  ctx.fillStyle = "white";
  ctx.fontWeight = "bold";
  ctx.font = "40px Verdana, Trebuchet MS, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("RESTART", canvas.width / 2, canvas.height / 2 + 15);
}
