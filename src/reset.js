import { canvas, initCanvases, holdText } from "./main.js";

import { initHero, score } from "./Hero.js";
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
  ctx.save();

  // Reset any transformations to draw in screen coordinates
  ctx.setTransform(1, 0, 0, 1, 0, 0);

  /// the play button
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 140, 0, 2 * Math.PI);

  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "40px Helvetica";
  ctx.textAlign = "center";
  ctx.fillText("RESTART", canvas.width / 2, canvas.height / 2);
  ctx.fillStyle = "white";
  ctx.font = "30px Helvetica";

  /// draw score
  ctx.fillStyle = "red";
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 4 + 30, 100, 0, 2 * Math.PI);
  ctx.fill();

  ctx.fillStyle = "white";
  ctx.font = "26px Helvetica";
  ctx.textAlign = "center";
  ctx.fillText("FINAL SCORE", canvas.width / 2, canvas.height / 4 + 40);
  ctx.fillStyle = "black";
  ctx.font = "50px Helvetica";
  ctx.fillText(`${score}`, canvas.width / 2, canvas.height / 4 + 100);

  ctx.restore();
}
